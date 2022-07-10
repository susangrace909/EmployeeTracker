DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

/*candidates*/
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

/*parties*/
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);