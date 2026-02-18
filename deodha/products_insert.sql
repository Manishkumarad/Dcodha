-- Insert products from the handwritten lists
-- Men's Products (from first image)

-- T-Shirts
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Classic Cotton T-Shirt', 'classic-cotton-t-shirt', 'Premium quality cotton t-shirt for everyday comfort', 1290, 990, 100, '["S","M","L","XL","XXL"]', '[]', 1),
(1, 'Premium Blend T-Shirt', 'premium-blend-t-shirt', 'Luxurious fabric blend t-shirt with superior comfort', 1590, 1290, 80, '["S","M","L","XL","XXL"]', '[]', 0);

-- Shirts
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Classic Polo Shirt', 'classic-polo-shirt', 'Timeless polo shirt in premium cotton', 1890, 1490, 60, '["S","M","L","XL"]', '[]', 1),
(1, 'Sports Performance Polo', 'sports-performance-polo', 'Athletic polo with moisture-wicking technology', 2090, 1690, 50, '["S","M","L","XL"]', '[]', 0),
(1, 'Formal Dress Shirt', 'formal-dress-shirt', 'Classic dress shirt for professional occasions', 2290, 1890, 70, '["S","M","L","XL","XXL"]', '[]', 0);

-- Inner Wear
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Comfort Fit Boxers', 'comfort-fit-boxers', 'Ultra-soft cotton boxers for all-day comfort', 790, 590, 120, '["S","M","L","XL"]', '[]', 0),
(1, 'Premium Briefs', 'premium-briefs', 'High-quality briefs with superior support', 690, 490, 100, '["S","M","L","XL"]', '[]', 0);

-- Full Sleeve T-Shirt
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Full Sleeve Classic Tee', 'full-sleeve-classic-tee', 'Versatile full sleeve t-shirt in regular fit', 1490, 1190, 80, '["S","M","L","XL","XXL"]', '[]', 1),
(1, 'Slim Fit Full Sleeve Tee', 'slim-fit-full-sleeve-tee', 'Modern slim fit full sleeve t-shirt', 1590, 1290, 60, '["S","M","L","XL"]', '[]', 0);

-- Pants
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(3, 'Classic Chinos', 'classic-chinos', 'Versatile chinos perfect for any occasion', 2790, 2290, 70, '["30","32","34","36"]', '[]', 1),
(3, 'Comfort Fit Pants', 'comfort-fit-pants', 'Relaxed fit pants for everyday wear', 2490, 1990, 80, '["30","32","34","36"]', '[]', 0);

-- Trousers
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(3, 'Formal Dress Trousers', 'formal-dress-trousers', 'Professional trousers for business wear', 3290, 2790, 50, '["30","32","34","36"]', '[]', 1),
(3, 'Slim Fit Trousers', 'slim-fit-trousers', 'Modern slim fit trousers for contemporary style', 2990, 2490, 60, '["30","32","34","36"]', '[]', 0);

-- Jeans
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(3, 'Classic Fit Jeans', 'classic-fit-jeans', 'Traditional straight fit jeans in premium denim', 2890, 2390, 90, '["30","32","34","36"]', '[]', 1),
(3, 'Loose Fit Jeans', 'loose-fit-jeans', 'Relaxed loose fit jeans for casual comfort', 2690, 2190, 70, '["30","32","34","36"]', '[]', 0),
(3, 'Baggy Jeans', 'baggy-jeans', 'Trendy baggy fit jeans for street style', 2790, 2290, 60, '["30","32","34","36"]', '[]', 0);

-- Linen Shirt
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(2, 'Premium Linen Shirt', 'premium-linen-shirt', 'Breathable linen shirt perfect for warm weather', 3190, 2690, 50, '["S","M","L","XL"]', '[]', 1);

-- Half Shorts
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(3, 'Casual Half Shorts', 'casual-half-shorts', 'Comfortable shorts for casual outings', 1590, 1290, 80, '["S","M","L","XL"]', '[]', 0);

-- Coat-Blazers
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(2, 'Classic Blazer', 'classic-blazer', 'Timeless blazer for formal occasions', 5990, 4990, 30, '["S","M","L","XL"]', '[]', 1),
(2, 'Modern Coat', 'modern-coat', 'Contemporary coat for sophisticated style', 6990, 5990, 25, '["S","M","L","XL"]', '[]', 0);

-- Kurtas
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Traditional Kurta', 'traditional-kurta', 'Classic ethnic kurta for cultural occasions', 2490, 1990, 60, '["S","M","L","XL"]', '[]', 1),
(1, 'Modern Kurta', 'modern-kurta', 'Contemporary kurta with modern design', 2290, 1790, 50, '["S","M","L","XL"]', '[]', 0);

-- Sweatshirts
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(2, 'Classic Sweatshirt', 'classic-sweatshirt', 'Cozy sweatshirt for casual comfort', 2390, 1890, 70, '["S","M","L","XL"]', '[]', 1),
(2, 'Premium Sweatshirt', 'premium-sweatshirt', 'High-quality sweatshirt with superior fabric', 2790, 2290, 50, '["S","M","L","XL"]', '[]', 0);

-- Hoodies
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(2, 'Classic Hoodie', 'classic-hoodie', 'Comfortable hoodie for everyday wear', 2590, 2090, 80, '["S","M","L","XL"]', '[]', 1),
(2, 'Premium Hoodie', 'premium-hoodie', 'Luxury hoodie with premium materials', 2990, 2490, 60, '["S","M","L","XL"]', '[]', 0);

-- Women's Products (from second image)

-- Farak (Assuming this means Farak/Dupatta)
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(4, 'Elegant Farak', 'elegant-farak', 'Beautiful traditional farak with intricate designs', 1890, 1490, 40, '["One Size"]', '[]', 1);

-- Women's Jeans
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(3, 'Women\'s Skinny Jeans', 'womens-skinny-jeans', 'Form-fitting skinny jeans for women', 2990, 2490, 70, '["26","28","30","32"]', '[]', 1),
(3, 'Women\'s Bootcut Jeans', 'womens-bootcut-jeans', 'Classic bootcut jeans for women', 2790, 2290, 60, '["26","28","30","32"]', '[]', 0);

-- Saree
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Traditional Silk Saree', 'traditional-silk-saree', 'Elegant silk saree with traditional designs', 8990, 7490, 30, '["One Size"]', '[]', 1),
(1, 'Designer Saree', 'designer-saree', 'Contemporary designer saree for modern women', 6990, 5990, 25, '["One Size"]', '[]', 0);

-- Lehanga
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Traditional Lehanga', 'traditional-lehanga', 'Classic lehanga for festive occasions', 9990, 8490, 20, '["S","M","L"]', '[]', 1),
(1, 'Designer Lehanga', 'designer-lehanga', 'Modern designer lehanga with contemporary style', 11990, 9990, 15, '["S","M","L"]', '[]', 0);

-- Women's Inner Wear
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Women\'s Comfort Bra', 'womens-comfort-bra', 'Comfortable everyday bra for women', 890, 690, 100, '["32","34","36","38"]', '[]', 0),
(1, 'Women\'s Premium Lingerie', 'womens-premium-lingerie', 'Luxury lingerie set for special occasions', 1890, 1490, 50, '["32","34","36","38"]', '[]', 0);

-- Kurti (Kuratre)
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(1, 'Printed Kurti', 'printed-kurti', 'Beautiful printed kurti for casual wear', 1890, 1490, 80, '["S","M","L","XL"]', '[]', 1),
(1, 'Embroidered Kurti', 'embroidered-kurti', 'Elegant embroidered kurti for special occasions', 2290, 1890, 60, '["S","M","L","XL"]', '[]', 0);

-- Ladies Bag
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(4, 'Elegant Handbag', 'elegant-handbag', 'Stylish handbag for modern women', 3490, 2790, 40, '["One Size"]', '[]', 1),
(4, 'Designer Tote Bag', 'designer-tote-bag', 'Spacious tote bag with contemporary design', 2890, 2290, 50, '["One Size"]', '[]', 0);
