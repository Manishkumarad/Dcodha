const fs = require('fs');
const path = require('path');
const https = require('https');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Product data with color variations
const products = [
    // Men's T-Shirts
    {
        name: "Classic Cotton T-Shirt",
        slug: "classic-cotton-t-shirt",
        colors: ["white", "black", "navy", "gray", "olive"],
        category: "t-shirt",
        gender: "male"
    },
    {
        name: "Premium Blend T-Shirt", 
        slug: "premium-blend-t-shirt",
        colors: ["black", "white", "burgundy", "forest", "charcoal"],
        category: "t-shirt",
        gender: "male"
    },
    
    // Men's Shirts
    {
        name: "Classic Polo Shirt",
        slug: "classic-polo-shirt", 
        colors: ["navy", "white", "black", "red", "forest"],
        category: "polo shirt",
        gender: "male"
    },
    {
        name: "Sports Performance Polo",
        slug: "sports-performance-polo",
        colors: ["black", "navy", "white", "gray", "red"],
        category: "polo shirt", 
        gender: "male"
    },
    {
        name: "Formal Dress Shirt",
        slug: "formal-dress-shirt",
        colors: ["white", "light-blue", "pink", "gray", "striped"],
        category: "dress shirt",
        gender: "male"
    },
    
    // Men's Jeans
    {
        name: "Classic Fit Jeans",
        slug: "classic-fit-jeans",
        colors: ["blue", "black", "gray", "light-wash", "dark-wash"],
        category: "jeans",
        gender: "male"
    },
    {
        name: "Loose Fit Jeans", 
        slug: "loose-fit-jeans",
        colors: ["blue", "black", "light-wash", "distressed", "gray"],
        category: "jeans",
        gender: "male"
    },
    {
        name: "Baggy Jeans",
        slug: "baggy-jeans", 
        colors: ["blue", "black", "light-wash", "vintage", "gray"],
        category: "jeans",
        gender: "male"
    },
    
    // Men's Hoodies & Sweatshirts
    {
        name: "Classic Hoodie",
        slug: "classic-hoodie",
        colors: ["black", "gray", "navy", "burgundy", "olive"],
        category: "hoodie",
        gender: "male"
    },
    {
        name: "Premium Hoodie",
        slug: "premium-hoodie", 
        colors: ["charcoal", "black", "navy", "forest", "burgundy"],
        category: "hoodie",
        gender: "male"
    },
    {
        name: "Classic Sweatshirt",
        slug: "classic-sweatshirt",
        colors: ["gray", "black", "navy", "burgundy", "olive"],
        category: "sweatshirt", 
        gender: "male"
    },
    
    // Women's Clothing
    {
        name: "Women's Skinny Jeans",
        slug: "womens-skinny-jeans",
        colors: ["blue", "black", "gray", "light-wash", "dark-wash"],
        category: "jeans",
        gender: "female"
    },
    {
        name: "Printed Kurti",
        slug: "printed-kurti",
        colors: ["floral-print", "geometric-print", "solid-red", "solid-blue", "multicolor"],
        category: "kurti",
        gender: "female"
    },
    {
        name: "Embroidered Kurti",
        slug: "embroidered-kurti",
        colors: ["beige", "maroon", "navy", "black", "pink"],
        category: "kurti",
        gender: "female"
    },
    
    // Traditional Wear
    {
        name: "Traditional Silk Saree",
        slug: "traditional-silk-saree",
        colors: ["red-gold", "blue-silver", "green-gold", "maroon", "purple"],
        category: "saree",
        gender: "female"
    },
    {
        name: "Traditional Lehanga",
        slug: "traditional-lehanga",
        colors: ["red-gold", "blue-silver", "pink-gold", "green", "maroon"],
        category: "lehanga",
        gender: "female"
    },
    
    // Accessories
    {
        name: "Elegant Handbag",
        slug: "elegant-handbag",
        colors: ["black", "brown", "tan", "beige", "burgundy"],
        category: "handbag",
        gender: "female"
    }
];

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve(true));
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
}

async function generatePlaceholderImages() {
    console.log('🎨 Generating minimalist product images for DEODHA...');
    console.log('Note: Using placeholder images. For AI images, integrate with DALL-E, Midjourney, or Stable Diffusion API\n');
    
    const imageUrls = [];
    
    for (const product of products) {
        console.log(`Generating images for ${product.name}...`);
        
        for (let i = 0; i < product.colors.length; i++) {
            const color = product.colors[i];
            
            // Generate unique seed for consistent images
            const seed = `${product.slug}-${color}`.replace(/-/g, '');
            
            // Image dimensions
            const width = 400;
            const height = 600;
            
            // Using Lorem Picsum for placeholder images
            const imageUrl = `https://picsum.photos/${width}/${height}?random=${seed}`;
            
            const filename = `${product.slug}_${color}.jpg`;
            const filepath = path.join(imagesDir, filename);
            
            try {
                await downloadImage(imageUrl, filepath);
                
                imageUrls.push({
                    product_slug: product.slug,
                    color: color,
                    filename: filename,
                    url: `/images/products/${filename}`
                });
                
                console.log(`  ✓ Generated ${filename}`);
            } catch (error) {
                console.log(`  ✗ Failed to generate ${filename}: ${error.message}`);
            }
        }
    }
    
    return imageUrls;
}

function updateProductsWithImages(imageUrls) {
    // Group images by product
    const productImages = {};
    for (const img of imageUrls) {
        if (!productImages[img.product_slug]) {
            productImages[img.product_slug] = [];
        }
        productImages[img.product_slug].push(img.url);
    }
    
    // Read the original SQL file
    const sqlContent = fs.readFileSync('products_insert.sql', 'utf8');
    
    // Create updated SQL with images
    let updatedContent = sqlContent;
    
    // Replace empty images arrays with actual URLs for each product
    for (const [slug, images] of Object.entries(productImages)) {
        const imagesJson = JSON.stringify(images);
        // Find the line with this product and replace the empty images array
        const regex = new RegExp(`('${slug}'.*?)'\\[\\]'(.*?)(,\\s*\\d+\\s*\\))`, 'g');
        updatedContent = updatedContent.replace(regex, `$1'${imagesJson}'$2$3`);
    }
    
    // Write updated SQL file
    fs.writeFileSync('products_insert_with_images.sql', updatedContent);
    
    console.log('\n✓ Updated products_insert_with_images.sql with image URLs');
}

async function main() {
    try {
        const imageUrls = await generatePlaceholderImages();
        updateProductsWithImages(imageUrls);
        
        console.log(`\n✅ Generated ${imageUrls.length} product images`);
        console.log('📁 Images saved to: public/images/products/');
        console.log('📄 Updated SQL file: products_insert_with_images.sql');
        console.log('\n🚀 Next steps:');
        console.log('1. Run the SQL file to add products to your database');
        console.log('2. For real AI images, integrate with an AI image generation API');
        console.log('\n📝 To execute the SQL in MySQL:');
        console.log('   mysql -u root -p1234 deodha_db < products_insert_with_images.sql');
        
    } catch (error) {
        console.error('Error generating images:', error);
    }
}

main();
