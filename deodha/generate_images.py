import requests
import json
import os
from urllib.parse import quote

# Create images directory if it doesn't exist
os.makedirs('public/images/products', exist_ok=True)

# Product data with color variations
products = [
    # Men's T-Shirts
    {
        "name": "Classic Cotton T-Shirt",
        "slug": "classic-cotton-t-shirt",
        "colors": ["white", "black", "navy", "gray", "olive"],
        "category": "t-shirt",
        "gender": "male"
    },
    {
        "name": "Premium Blend T-Shirt", 
        "slug": "premium-blend-t-shirt",
        "colors": ["black", "white", "burgundy", "forest", "charcoal"],
        "category": "t-shirt",
        "gender": "male"
    },
    
    # Men's Shirts
    {
        "name": "Classic Polo Shirt",
        "slug": "classic-polo-shirt", 
        "colors": ["navy", "white", "black", "red", "forest"],
        "category": "polo shirt",
        "gender": "male"
    },
    {
        "name": "Sports Performance Polo",
        "slug": "sports-performance-polo",
        "colors": ["black", "navy", "white", "gray", "red"],
        "category": "polo shirt", 
        "gender": "male"
    },
    {
        "name": "Formal Dress Shirt",
        "slug": "formal-dress-shirt",
        "colors": ["white", "light-blue", "pink", "gray", "striped"],
        "category": "dress shirt",
        "gender": "male"
    },
    
    # Men's Jeans
    {
        "name": "Classic Fit Jeans",
        "slug": "classic-fit-jeans",
        "colors": ["blue", "black", "gray", "light-wash", "dark-wash"],
        "category": "jeans",
        "gender": "male"
    },
    {
        "name": "Loose Fit Jeans", 
        "slug": "loose-fit-jeans",
        "colors": ["blue", "black", "light-wash", "distressed", "gray"],
        "category": "jeans",
        "gender": "male"
    },
    {
        "name": "Baggy Jeans",
        "slug": "baggy-jeans", 
        "colors": ["blue", "black", "light-wash", "vintage", "gray"],
        "category": "jeans",
        "gender": "male"
    },
    
    # Men's Hoodies & Sweatshirts
    {
        "name": "Classic Hoodie",
        "slug": "classic-hoodie",
        "colors": ["black", "gray", "navy", "burgundy", "olive"],
        "category": "hoodie",
        "gender": "male"
    },
    {
        "name": "Premium Hoodie",
        "slug": "premium-hoodie", 
        "colors": ["charcoal", "black", "navy", "forest", "burgundy"],
        "category": "hoodie",
        "gender": "male"
    },
    {
        "name": "Classic Sweatshirt",
        "slug": "classic-sweatshirt",
        "colors": ["gray", "black", "navy", "burgundy", "olive"],
        "category": "sweatshirt", 
        "gender": "male"
    },
    
    # Women's Clothing
    {
        "name": "Women's Skinny Jeans",
        "slug": "womens-skinny-jeans",
        "colors": ["blue", "black", "gray", "light-wash", "dark-wash"],
        "category": "jeans",
        "gender": "female"
    },
    {
        "name": "Printed Kurti",
        "slug": "printed-kurti",
        "colors": ["floral-print", "geometric-print", "solid-red", "solid-blue", "multicolor"],
        "category": "kurti",
        "gender": "female"
    },
    {
        "name": "Embroidered Kurti",
        "slug": "embroidered-kurti",
        "colors": ["beige", "maroon", "navy", "black", "pink"],
        "category": "kurti",
        "gender": "female"
    },
    
    # Traditional Wear
    {
        "name": "Traditional Silk Saree",
        "slug": "traditional-silk-saree",
        "colors": ["red-gold", "blue-silver", "green-gold", "maroon", "purple"],
        "category": "saree",
        "gender": "female"
    },
    {
        "name": "Traditional Lehanga",
        "slug": "traditional-lehanga",
        "colors": ["red-gold", "blue-silver", "pink-gold", "green", "maroon"],
        "category": "lehanga",
        "gender": "female"
    },
    
    # Accessories
    {
        "name": "Elegant Handbag",
        "slug": "elegant-handbag",
        "colors": ["black", "brown", "tan", "beige", "burgundy"],
        "category": "handbag",
        "gender": "female"
    }
]

def generate_minimalist_prompt(product_name, color, category, gender):
    """Generate minimalist fashion prompts matching DEODHA aesthetic"""
    
    # Base prompt structure for minimalist style
    base_style = "minimalist fashion photography, clean background, soft lighting, professional model"
    
    # Gender-specific model description
    model_desc = "male model" if gender == "male" else "female model"
    
    # Category-specific descriptions
    category_desc = {
        "t-shirt": f"wearing a {color} {category}",
        "polo shirt": f"wearing a {color} {category}",
        "dress shirt": f"wearing a {color} {category}",
        "jeans": f"wearing {color} {category}",
        "hoodie": f"wearing a {color} {category}",
        "sweatshirt": f"wearing a {color} {category}",
        "kurti": f"wearing a {color} {category}",
        "saree": f"dressed in a {color} {category}",
        "lehanga": f"wearing a {color} {category}",
        "handbag": f"holding a {color} {category}"
    }
    
    # Color variations
    color_desc = {
        "white": "pure white",
        "black": "deep black", 
        "navy": "navy blue",
        "gray": "charcoal gray",
        "olive": "olive green",
        "burgundy": "burgundy red",
        "forest": "forest green",
        "red": "classic red",
        "blue": "royal blue",
        "light-wash": "light wash denim",
        "dark-wash": "dark wash denim",
        "distressed": "distressed denim",
        "vintage": "vintage wash",
        "charcoal": "charcoal gray",
        "floral-print": "floral print",
        "geometric-print": "geometric print",
        "solid-red": "solid red",
        "solid-blue": "solid blue",
        "multicolor": "multicolor pattern",
        "beige": "beige",
        "maroon": "maroon",
        "pink": "pink",
        "red-gold": "red with gold accents",
        "blue-silver": "blue with silver accents",
        "green-gold": "green with gold accents",
        "purple": "purple",
        "brown": "rich brown",
        "tan": "tan"
    }
    
    # Build the full prompt
    prompt = f"{base_style}, {model_desc} {category_desc.get(category, f'wearing {color} {category}')}, {color_desc.get(color, color)}, sophisticated style, high-end fashion"
    
    return prompt

def download_image(url, filepath):
    """Download image from URL"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def generate_placeholder_images():
    """Generate placeholder images using a free image service"""
    
    image_urls = []
    
    for product in products:
        print(f"Generating images for {product['name']}...")
        
        for i, color in enumerate(product['colors']):
            # Generate prompt
            prompt = generate_minimalist_prompt(
                product['name'], 
                color, 
                product['category'], 
                product['gender']
            )
            
            # Using Lorem Picsum with seed for consistent images
            # In a real implementation, you'd use an AI image generation API
            seed = f"{product['slug']}-{color}".replace('-', '')
            
            # Create different dimensions for variety
            width = 400
            height = 600
            
            # Generate image URL
            image_url = f"https://picsum.photos/{width}/{height}?random={seed}"
            
            # Download image
            filename = f"{product['slug']}_{color}.jpg"
            filepath = f"public/images/products/{filename}"
            
            if download_image(image_url, filepath):
                image_urls.append({
                    "product_slug": product['slug'],
                    "color": color,
                    "filename": filename,
                    "url": f"/images/products/{filename}",
                    "prompt": prompt
                })
                print(f"  ✓ Generated {filename}")
            else:
                print(f"  ✗ Failed to generate {filename}")
    
    return image_urls

def update_product_images(image_urls):
    """Update the SQL file with image URLs"""
    
    # Group images by product
    product_images = {}
    for img in image_urls:
        if img['product_slug'] not in product_images:
            product_images[img['product_slug']] = []
        product_images[img['product_slug']].append(img['url'])
    
    # Read the original SQL file
    with open('products_insert.sql', 'r') as f:
        sql_content = f.read()
    
    # Update each product's images field
    for slug, images in product_images.items():
        images_json = json.dumps(images)
        # Replace the empty images array with actual URLs
        old_pattern = f"'{slug}'.*'\\[\\]'"
        new_pattern = f"'{slug}'.*'{images_json}'"
        
        # This is a simplified approach - in practice you'd need more sophisticated parsing
        sql_content = sql_content.replace(f"'{slug}'", f"'{slug}'")
        sql_content = sql_content.replace("'[]'", f"'{images_json}'")
    
    # Write updated SQL
    with open('products_insert_with_images.sql', 'w') as f:
        f.write(sql_content)
    
    print("✓ Updated products_insert_with_images.sql with image URLs")

if __name__ == "__main__":
    print("🎨 Generating minimalist product images for DEODHA...")
    print("Note: This uses placeholder images. For AI-generated images, integrate with DALL-E, Midjourney, or Stable Diffusion API")
    
    image_urls = generate_placeholder_images()
    update_product_images(image_urls)
    
    print(f"\n✅ Generated {len(image_urls)} product images")
    print("📁 Images saved to: public/images/products/")
    print("📄 Updated SQL file: products_insert_with_images.sql")
    print("\n🚀 Next steps:")
    print("1. Run the SQL file to add products to your database")
    print("2. For real AI images, integrate with an AI image generation API")
