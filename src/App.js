import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ManageProducts from './components/ManageProducts';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css'; // Nếu có file CSS cho App

const App = () => {
  return (
    <Router>
      <Header />
      <Sidebar />
      <main className="main-content"> {/* Thêm class cho phần nội dung chính */}
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/products" element={<ManageProducts />} />
          {/* Thêm các route khác nếu cần */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
