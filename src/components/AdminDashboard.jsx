import React from 'react';
import { FaClipboard, FaUsers, FaDollarSign } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-cards">
          <div className="dashboard-card card-orders">
            <FaClipboard className="dashboard-icon" />
            <div>
              <h3>120</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="dashboard-card card-users">
            <FaUsers className="dashboard-icon" />
            <div>
              <h3>1,200</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="dashboard-card card-income">
            <FaDollarSign className="dashboard-icon" />
            <div>
              <h3>$35,000</h3>
              <p>Total Income</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
