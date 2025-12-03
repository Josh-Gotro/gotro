import React from "react";

export const SOAHeader = () => {
  const handleNavigation = () => {
    window.location.href = '/portfolio';
  };

  return (
    <nav className="global-nav-menu">
      <div className="inline-div">
        <ul id="menu-statewide-navigation">
          <li>
            <a href="/portfolio" onClick={handleNavigation}>Company Portal</a>
          </li>
          <li>
            <a href="/portfolio" onClick={handleNavigation}>My Account</a>
          </li>
          <li>
            <a href="/portfolio" onClick={handleNavigation}>Departments</a>
          </li>
          <li>
            <a href="/portfolio" onClick={handleNavigation}>Employees</a>
          </li>
          <li>
            <a href="/portfolio" onClick={handleNavigation}>Resources</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SOAHeader;
