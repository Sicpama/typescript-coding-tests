import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-flex">
          <div className="header-left">
            <div className="header-icon">⚡</div>
            <div>
              <h1 className="header-title">TypeScript Coding Tests</h1>
              <p className="header-subtitle">
                15-minute coding challenges for software engineers
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
