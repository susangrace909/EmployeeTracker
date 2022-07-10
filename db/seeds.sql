/*parties */
INSERT INTO departments (name)
VALUES
('Customer Service'),
('Deli'),
('Bakery'),
('Produce'),
('Meat'),
('Grocery');

/*candidates*/
INSERT INTO roles (title, salary, department_id)
VALUES
('Bagger', 14.00, 1),
('Cashier', 16.00, 1),
('CSS', 18.00, 1),
('Deli Clerk', 16.00, 2),
('Meat Specialist', 18.00, 2),
('Bakery Clerk', 14.00, 3),
('Baker', 18.00, 3),
('Cake Decorator', 18.00, 3),
('Fruit Cutter', 15.00, 4),
('Produce Clerk', 14.00, 4),
('Meat Clerk', 16.00, 5),
('Meat Cutter', 18.00, 5),
('Seafood Specialist', 18.00, 5),
('Grocery Clerk', 14.00, 6),
('GRS', 18.00, 6);