// src/pages/SplashPage.tsx
import React from 'react';
import './SplashPage.scss';

const mockExpiringContracts = [
  { name: 'Sarah Thompson', role: 'Marketing Coordinator', expires: 'Sep 10, 2025' },
  { name: 'James Patel', role: 'Backend Engineer', expires: 'Sep 15, 2025' },
  { name: 'Linda Nguyen', role: 'HR Assistant', expires: 'Sep 20, 2025' },
  { name: 'Carlos Mendez', role: 'DevOps Engineer', expires: 'Sep 25, 2025' },
];

const SplashPage: React.FC = () => {
  return (
    <div className="splashContainer">
      <div className="headerRow">
        <h1>Welcome to the Employee App</h1>
      </div>

      {/* Top Row: Login + Carousel */}
      <div className="topRow">
        <div className="card loginCard">
          <h2>Login</h2>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="buttonBase">Login</button>
        </div>

        <div className="card carouselCard">
          <h3>Contracts Expiring Soon</h3>
          <div className="carousel">
            {mockExpiringContracts.map((employee, idx) => (
              <div key={idx} className="carouselItem">
                <h4>{employee.name}</h4>
                <p>{employee.role}</p>
                <p><strong>Expires:</strong> {employee.expires}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Notifications + Calendar */}
      <div className="dashboardCards">
        <div className="card dashboardCard">
          <h3>Notifications</h3>
          <ul>
            <li>New employee onboarded</li>
            <li>3 contracts expiring soon</li>
            <li>Annual leave request from Sarah</li>
          </ul>
        </div>

        <div className="card dashboardCard">
          <h3>Calendar</h3>
          <div className="calendarPlaceholder">
            <p>[Calendar Component Placeholder]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
