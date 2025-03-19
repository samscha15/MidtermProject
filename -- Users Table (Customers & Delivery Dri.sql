-- User Table (Customer/Drivers)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    user_type ENUM('customer', 'driver', 'admin') DEFAULT 'customer',
    age_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    INDEX(email)
);

-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    alcohol_content DECIMAL(5,2),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    INDEX(name)
);

-- Orders Table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    INDEX(user_id)
);


-- Payments Table
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_method ENUM('credit_card', 'paypal', 'crypto', 'cash_on_delivery') NOT NULL,
    transaction_id VARCHAR(255) UNIQUE,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    INDEX(order_id)
    INDEX(user_id)
);

-- Delivery Table
CREATE TABLE deliveries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    driver_id INT NOT NULL,
    delivery_status ENUM('assigned', 'in_transit', 'delivered', 'failed') DEFAULT 'assigned',
    estimated_delivery_time TIMESTAMP,
    actual_delivery_time TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE CASCADE
    INDEX(order_id)
    INDEX(driver_id)
);


-- Sample Customers
INSERT INTO users (name, email, password_hash, phone, address, user_type, age_verified, created_at)
VALUES 
('Sam Schaefer', 'samascha1015@gmail.com', 'hashedpassword1', '812-225-0693', '3126 Talisman Rd', 'customer', TRUE, '2025-03-18 23:54:01'),
('Caitlin Mahon', 'caitlin@gmail.com', 'hashedpassword2', '502-989-4321', '4108 South 3rd', 'customer', TRUE, '2025-03-18 23:54:01'),
('Jordan Williamd', 'jormwill@gmail.com', 'hashedpassword3', '812-751-7000', '5007 Klondike Drive', 'customer', TRUE, '2025-03-18 23:54:01');
