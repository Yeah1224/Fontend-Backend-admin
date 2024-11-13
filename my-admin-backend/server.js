const express = require('express');

const app = express();
const port = 5000;
const cors = require('cors');


// Middleware xử lý dữ liệu JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Chỉ cho phép frontend từ localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Các phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization'],  // Các header được phép
}));

// Import các router
const adminDashboardRouter = require('./routes/admin/adminDashboard');
const manageUsersRouter = require('./routes/admin/manageUsers');
const manageProductsRouter = require('./routes/admin/manageProducts');

// Sử dụng các router
app.use('/admin/dashboard', adminDashboardRouter); 
app.use('/admin/users', manageUsersRouter);
app.use('/admin/products', manageProductsRouter);

// Xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});