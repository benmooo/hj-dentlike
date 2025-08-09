-- Table: Users | Dentists
-- Stores user registration and login details, based on signupPayload and loginPayload.
-- i.e. Dentists
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    practice_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Stores the hashed password
    address VARCHAR(255) NOT NULL,
    suburb VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    country_code VARCHAR(10) NOT NULL, -- e.g., 'AU', 'US'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Patients
-- Stores patient-specific information, linked to a dentist.
CREATE TABLE Patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dentist_id UUID NOT NULL, -- Foreign key to the Dentists table
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')), -- Enforced values
    age INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dentist_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Table: Orders
-- Stores the primary details of each dental order.
CREATE TABLE Orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by UUID NOT NULL, -- Foreign key to the Dentists table (who created the order)
    patient_id UUID NOT NULL, -- Foreign key to the Patients table (for whom the order is)
    order_date DATE NOT NULL,
    due_date DATE NOT NULL,
    impression_method VARCHAR(50) NOT NULL CHECK (impression_method IN ('oralScan', 'plasterModel')), -- Enforced values
    order_property VARCHAR(50) CHECK (order_property IN ('urgent', 'rework', '')), -- Enforced values
    special_requirements TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE RESTRICT,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE RESTRICT
);

-- Table: Solutions
-- Stores details for each solution item within an order.
CREATE TABLE Solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL, -- Foreign key to the Products table # product的概念其实只是 材料 + 牙齿类型的组合 并无实际意义
    order_id UUID NOT NULL, -- Foreign key to the Orders table
    tooth_positions VARCHAR(100),
    item_type VARCHAR(100) NOT NULL,
    material VARCHAR(100),
    tooth_color VARCHAR(50),
    stain VARCHAR(50),
    occlusal_space TEXT,
    crown_type VARCHAR(100),
    restoration_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE
);


-- Table: Attachments
-- Stores metadata for files uploaded as part of an order or other context.
CREATE TABLE Attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(2048) NOT NULL, -- URL to the stored file (e.g., cloud storage)
    file_type VARCHAR(50),
    file_size INT, -- size in bytes
    uploaded_by UUID, -- Optional: links to the dentist who uploaded it
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES Users(id) ON DELETE SET NULL
);

-- Table: OrderAttachments
-- A join table for the many-to-many relationship between Orders and Attachments.
CREATE TABLE OrderAttachments (
    order_id UUID NOT NULL,
    attachment_id UUID NOT NULL,
    PRIMARY KEY (order_id, attachment_id),
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (attachment_id) REFERENCES Attachments(id) ON DELETE CASCADE
);
