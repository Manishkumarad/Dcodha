-- Complete product insert script for DCODHA
-- Based on handwritten product lists for Men (15-52 age) and Women (10-50 age)

-- First, update categories to include gender-specific categories
INSERT INTO categories (name, slug, description) VALUES
('Men', 'men', 'Clothing and accessories for men aged 15-52'),
('Women', 'women', 'Clothing and accessories for women aged 10-50');

-- Get the new category IDs (assuming they will be 6 and 7)
-- Men's Products (Premium and Budget-friendly)

-- T-Shirts - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Polo T-Shirt', 'premium-polo-t-shirt', 'High-quality polo t-shirt for men, premium fabric', 1299, 999, 50, '["S","M","L","XL","XXL"]', '[]', 1),
(6, 'Sports Performance T-Shirt', 'sports-performance-t-shirt', 'Athletic sports t-shirt with moisture-wicking technology', 1199, 899, 60, '["S","M","L","XL"]', '[]', 1),
(6, 'Classic Cotton T-Shirt', 'classic-cotton-t-shirt', 'Comfortable everyday cotton t-shirt', 899, 699, 80, '["S","M","L","XL","XXL"]', '[]', 0);

-- T-Shirts - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Polo T-Shirt', 'basic-polo-t-shirt', 'Affordable polo t-shirt for daily wear', 699, 499, 100, '["S","M","L","XL"]', '[]', 0),
(6, 'Casual Sports T-Shirt', 'casual-sports-t-shirt', 'Budget-friendly sports t-shirt', 599, 399, 120, '["S","M","L","XL"]', '[]', 0),
(6, 'Simple Cotton T-Shirt', 'simple-cotton-t-shirt', 'Basic cotton t-shirt at great value', 499, 299, 150, '["S","M","L","XL","XXL"]', '[]', 0);

-- Full Sleeve T-Shirts
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Full Sleeve T-Shirt', 'premium-full-sleeve-t-shirt', 'High-quality full sleeve t-shirt for cooler weather', 1399, 1099, 40, '["S","M","L","XL","XXL"]', '[]', 1),
(6, 'Casual Full Sleeve T-Shirt', 'casual-full-sleeve-t-shirt', 'Comfortable full sleeve t-shirt for everyday wear', 899, 699, 70, '["S","M","L","XL"]', '[]', 0);

-- Pants - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Trousers', 'premium-trousers', 'Formal trousers for professional occasions', 2499, 1999, 30, '["30","32","34","36","38"]', '[]', 1),
(6, 'Formal Dress Pants', 'formal-dress-pants', 'Classic formal pants for business wear', 2299, 1799, 40, '["30","32","34","36","38"]', '[]', 1);

-- Pants - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Trousers', 'basic-trousers', 'Affordable everyday trousers', 1299, 999, 80, '["30","32","34","36","38"]', '[]', 0),
(6, 'Casual Dress Pants', 'casual-dress-pants', 'Budget-friendly formal pants', 999, 799, 100, '["30","32","34","36","38"]', '[]', 0);

-- Jeans - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Fit Jeans', 'premium-fit-jeans', 'High-quality fitted jeans for men', 1999, 1599, 50, '["30","32","34","36","38"]', '[]', 1),
(6, 'Designer Loose Fit Jeans', 'designer-loose-fit-jeans', 'Premium loose fit jeans with modern styling', 2199, 1799, 40, '["30","32","34","36","38"]', '[]', 1),
(6, 'Premium Baggy Jeans', 'premium-baggy-jeans', 'High-quality baggy jeans for street style', 2399, 1999, 30, '["30","32","34","36","38"]', '[]', 1);

-- Jeans - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Fit Jeans', 'basic-fit-jeans', 'Affordable fitted jeans', 999, 799, 120, '["30","32","34","36","38"]', '[]', 0),
(6, 'Casual Loose Fit Jeans', 'casual-loose-fit-jeans', 'Budget-friendly loose fit jeans', 1099, 899, 100, '["30","32","34","36","38"]', '[]', 0),
(6, 'Simple Baggy Jeans', 'simple-baggy-jeans', 'Affordable baggy jeans', 1199, 999, 80, '["30","32","34","36","38"]', '[]', 0);

-- Inner Wear
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Inner Wear Set', 'premium-inner-wear-set', 'High-quality inner wear for men', 799, 599, 60, '["S","M","L","XL"]', '[]', 1),
(6, 'Basic Inner Wear', 'basic-inner-wear', 'Affordable inner wear options', 399, 299, 150, '["S","M","L","XL"]', '[]', 0);

-- Linen Shirts - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Half Sleeve Linen Shirt', 'premium-half-sleeve-linen-shirt', 'High-quality linen shirt perfect for summer', 1899, 1499, 40, '["S","M","L","XL"]', '[]', 1),
(6, 'Designer Linen Shirt', 'designer-linen-shirt', 'Premium linen shirt with modern design', 2299, 1899, 30, '["S","M","L","XL"]', '[]', 1);

-- Linen Shirts - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Half Sleeve Linen Shirt', 'basic-half-sleeve-linen-shirt', 'Affordable linen shirt for casual wear', 999, 799, 80, '["S","M","L","XL"]', '[]', 0);

-- Shorts
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Shorts', 'premium-shorts', 'High-quality shorts for men', 1299, 999, 50, '["S","M","L","XL"]', '[]', 1),
(6, 'Casual Shorts', 'casual-shorts', 'Comfortable shorts for everyday wear', 699, 499, 100, '["S","M","L","XL"]', '[]', 0);

-- Coat-Blazers - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Coat Blazer', 'premium-coat-blazer', 'High-quality coat blazer for formal occasions', 4999, 3999, 20, '["S","M","L","XL"]', '[]', 1),
(6, 'Designer Blazer', 'designer-blazer', 'Premium designer blazer with modern cut', 5999, 4999, 15, '["S","M","L","XL"]', '[]', 1);

-- Coat-Blazers - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Coat Blazer', 'basic-coat-blazer', 'Affordable blazer for formal events', 2499, 1999, 40, '["S","M","L","XL"]', '[]', 0),
(6, 'Simple Blazer', 'simple-blazer', 'Budget-friendly blazer option', 1999, 1499, 50, '["S","M","L","XL"]', '[]', 0);

-- Kurtas - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Kurta', 'premium-kurta', 'High-quality traditional kurta for men', 1799, 1399, 40, '["S","M","L","XL"]', '[]', 1),
(6, 'Designer Kurta', 'designer-kurta', 'Premium designer kurta with modern styling', 2299, 1899, 30, '["S","M","L","XL"]', '[]', 1);

-- Kurtas - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Kurta', 'basic-kurta', 'Affordable traditional kurta', 899, 699, 80, '["S","M","L","XL"]', '[]', 0),
(6, 'Simple Kurta', 'simple-kurta', 'Budget-friendly kurta for daily wear', 699, 499, 100, '["S","M","L","XL"]', '[]', 0);

-- Sweatshirts - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Sweatshirt', 'premium-sweatshirt', 'High-quality sweatshirt for men', 1999, 1599, 40, '["S","M","L","XL"]', '[]', 1),
(6, 'Designer Sweatshirt', 'designer-sweatshirt', 'Premium designer sweatshirt', 2499, 1999, 30, '["S","M","L","XL"]', '[]', 1);

-- Sweatshirts - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Sweatshirt', 'basic-sweatshirt', 'Affordable sweatshirt for casual wear', 999, 799, 80, '["S","M","L","XL"]', '[]', 0),
(6, 'Simple Sweatshirt', 'simple-sweatshirt', 'Budget-friendly sweatshirt', 799, 599, 100, '["S","M","L","XL"]', '[]', 0);

-- Hoodies - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Premium Hoodie', 'premium-hoodie', 'High-quality hoodie for men', 2299, 1899, 40, '["S","M","L","XL"]', '[]', 1),
(6, 'Designer Hoodie', 'designer-hoodie', 'Premium designer hoodie with modern style', 2799, 2299, 30, '["S","M","L","XL"]', '[]', 1);

-- Hoodies - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(6, 'Basic Hoodie', 'basic-hoodie', 'Affordable hoodie for everyday wear', 1199, 999, 80, '["S","M","L","XL"]', '[]', 0),
(6, 'Simple Hoodie', 'simple-hoodie', 'Budget-friendly hoodie option', 999, 799, 100, '["S","M","L","XL"]', '[]', 0);

-- Women's Products (age 10-50)

-- Farak/Dupatta
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Traditional Farak', 'traditional-farak', 'Beautiful traditional farak with ethnic designs', 1599, 1299, 40, '["One Size"]', '[]', 1),
(7, 'Designer Farak', 'designer-farak', 'Modern designer farak with contemporary patterns', 1999, 1599, 30, '["One Size"]', '[]', 1),
(7, 'Simple Farak', 'simple-farak', 'Basic farak for daily wear', 799, 599, 80, '["One Size"]', '[]', 0);

-- Women's Jeans
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Women\'s Premium Jeans', 'womens-premium-jeans', 'High-quality jeans designed for women', 2199, 1799, 50, '["26","28","30","32","34"]', '[]', 1),
(7, 'Women\'s Casual Jeans', 'womens-casual-jeans', 'Comfortable jeans for everyday wear', 1299, 999, 80, '["26","28","30","32","34"]', '[]', 1),
(7, 'Women\'s Basic Jeans', 'womens-basic-jeans', 'Affordable jeans for women', 799, 599, 120, '["26","28","30","32","34"]', '[]', 0);

-- Saree - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Premium Silk Saree', 'premium-silk-saree', 'Luxurious silk saree with intricate designs', 8999, 7499, 20, '["One Size"]', '[]', 1),
(7, 'Designer Saree', 'designer-saree', 'High-end designer saree for special occasions', 12999, 10999, 15, '["One Size"]', '[]', 1);

-- Saree - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Basic Cotton Saree', 'basic-cotton-saree', 'Comfortable cotton saree for daily wear', 1999, 1599, 60, '["One Size"]', '[]', 0),
(7, 'Simple Saree', 'simple-saree', 'Affordable saree option', 1299, 999, 80, '["One Size"]', '[]', 0);

-- Lehanga - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Premium Lehanga', 'premium-lehanga', 'Luxurious lehanga for weddings and festivals', 15999, 12999, 10, '["S","M","L","XL"]', '[]', 1),
(7, 'Designer Lehanga', 'designer-lehanga', 'High-end designer lehanga with modern styling', 19999, 16999, 8, '["S","M","L","XL"]', '[]', 1);

-- Lehanga - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Basic Lehanga', 'basic-lehanga', 'Traditional lehanga at affordable price', 4999, 3999, 30, '["S","M","L","XL"]', '[]', 0),
(7, 'Simple Lehanga', 'simple-lehanga', 'Budget-friendly lehanga option', 3999, 2999, 40, '["S","M","L","XL"]', '[]', 0);

-- Women's Inner Wear
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Premium Inner Wear Set', 'womens-premium-inner-wear-set', 'High-quality inner wear for women', 1299, 999, 50, '["32","34","36","38","40"]', '[]', 1),
(7, 'Basic Inner Wear', 'womens-basic-inner-wear', 'Affordable inner wear options', 599, 399, 100, '["32","34","36","38","40"]', '[]', 0);

-- Kurti/Kuratra - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Premium Kurti', 'premium-kurti', 'High-quality kurti with elegant designs', 2499, 1999, 40, '["S","M","L","XL","XXL"]', '[]', 1),
(7, 'Designer Kurti', 'designer-kurti', 'Premium designer kurti with modern patterns', 2999, 2499, 30, '["S","M","L","XL","XXL"]', '[]', 1);

-- Kurti/Kuratra - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Basic Kurti', 'basic-kurti', 'Comfortable kurti for daily wear', 999, 799, 80, '["S","M","L","XL","XXL"]', '[]', 0),
(7, 'Simple Kurti', 'simple-kurti', 'Affordable kurti option', 699, 499, 100, '["S","M","L","XL","XXL"]', '[]', 0);

-- Ladies Bag - Premium
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Premium Ladies Handbag', 'premium-ladies-handbag', 'Luxurious handbag for modern women', 4999, 3999, 25, '["One Size"]', '[]', 1),
(7, 'Designer Ladies Bag', 'designer-ladies-bag', 'High-end designer bag with elegant styling', 6999, 5999, 20, '["One Size"]', '[]', 1);

-- Ladies Bag - Budget-friendly
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
(7, 'Basic Ladies Handbag', 'basic-ladies-handbag', 'Practical handbag for everyday use', 1999, 1599, 60, '["One Size"]', '[]', 0),
(7, 'Simple Ladies Bag', 'simple-ladies-bag', 'Affordable bag option for women', 1299, 999, 80, '["One Size"]', '[]', 0);

-- Update existing products to have proper category assignments
UPDATE products SET category_id = 6 WHERE category_id IN (1,2,3) AND id <= 10; -- Move some existing products to Men
UPDATE products SET category_id = 7 WHERE category_id IN (1,2,3) AND id > 10 AND id <= 15; -- Move some to Women
