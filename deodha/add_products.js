const { initDatabase, getPool } = require('./src/config/database');

async function addProductsToDatabase() {
    try {
        console.log('🔄 Initializing database...');
        await initDatabase();
        
        const db = await getPool();
        
        // Read the SQL file
        const fs = require('fs');
        const sqlContent = fs.readFileSync('products_insert_with_images.sql', 'utf8');
        
        // Split into individual statements
        const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);
        
        console.log(`📝 Found ${statements.length} SQL statements to execute...`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i].trim();
            if (statement.startsWith('INSERT INTO products')) {
                try {
                    await db.query(statement);
                    successCount++;
                    console.log(`✅ (${i + 1}/${statements.length}) Product added successfully`);
                } catch (error) {
                    errorCount++;
                    if (error.code === 'ER_DUP_ENTRY') {
                        console.log(`⚠️  (${i + 1}/${statements.length}) Product already exists (duplicate entry)`);
                    } else {
                        console.log(`❌ (${i + 1}/${statements.length}) Error: ${error.message}`);
                    }
                }
            }
        }
        
        console.log(`\n📊 Summary:`);
        console.log(`✅ Successfully added: ${successCount} products`);
        console.log(`❌ Errors: ${errorCount}`);
        
        // Verify the products were added
        const [products] = await db.query('SELECT COUNT(*) as count FROM products');
        console.log(`📦 Total products in database: ${products[0].count}`);
        
        // Show some sample products
        const [sampleProducts] = await db.query('SELECT name, slug, price FROM products ORDER BY id DESC LIMIT 5');
        console.log('\n🆕 Latest products added:');
        sampleProducts.forEach(product => {
            console.log(`  - ${product.name} (${product.slug}) - ₹${product.price}`);
        });
        
        console.log('\n🎉 Products have been added to your DEODHA website!');
        console.log('🌐 Visit http://localhost:5000 to see your new products');
        
    } catch (error) {
        console.error('❌ Error adding products:', error);
    }
}

addProductsToDatabase();
