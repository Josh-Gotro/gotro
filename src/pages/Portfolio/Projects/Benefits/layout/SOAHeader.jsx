import React from "react";

export const SOAHeader = () => {
  return (
    <nav className="global-nav-menu">
      <div className="inline-div">
        <ul id="menu-statewide-navigation">
          <li>
            <a href="https://alaska.gov">State of Alaska</a>
          </li>
          <li>
            <a href="https://my.alaska.gov">myAlaska</a>
          </li>
          <li>
            <a href="https://alaska.gov/akdir1.html">Departments</a>
          </li>
          <li>
            <a href="https://alaska.gov/employeeHome.html">State Employees</a>
          </li>
          <li>
            <a href="#SOAfooterlinks">Statewide Links</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SOAHeader;
