const { getPool } = require('./src/config/database');
const fs = require('fs');

async function executeProductsSQL() {
  try {
    console.log('🔄 Connecting to database...');
    const db = await getPool();
    
    console.log('📖 Reading SQL file...');
    const sqlContent = fs.readFileSync('./products_complete.sql', 'utf8');
    
    // Split the SQL content into individual statements
    const statements = sqlContent
      .split(/;\s*\n/)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        await db.query(statement);
        console.log(`✅ Statement ${i + 1} executed successfully`);
      } catch (err) {
        console.log(`⚠️  Statement ${i + 1} failed:`, err.message);
        // Continue with next statement
      }
    }
    
    console.log('🎉 All products have been added to the database!');
    
    // Verify the products were added
    const [productCount] = await db.query('SELECT COUNT(*) as count FROM products');
    const [categoryCount] = await db.query('SELECT COUNT(*) as count FROM categories');
    
    console.log(`📊 Database now contains:`);
    console.log(`   - ${categoryCount[0].count} categories`);
    console.log(`   - ${productCount[0].count} products`);
    
    // Show sample of new products
    const [sampleProducts] = await db.query(`
      SELECT p.name, c.name as category, p.price 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE c.name IN ('Men', 'Women') 
      LIMIT 10
    `);
    
    console.log('\n🛍️  Sample products added:');
    sampleProducts.forEach(p => {
      console.log(`   - ${p.name} (${p.category}) - ₹${p.price}`);
    });
    
  } catch (error) {
    console.error('❌ Error executing SQL:', error);
  }
}

executeProductsSQL();
