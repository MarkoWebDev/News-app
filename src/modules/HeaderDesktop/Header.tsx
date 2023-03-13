import React from "react";
import "./Header.scss";
import Search from "../search/Search";


const Header = () => {
  return (
    <div className="header">
      <div className="header-section">
        <h3 className="title">
          <span className="my-tag">My</span>News
        </h3>
        <Search></Search>
      </div>
      <div className="hr-rule"></div>
    </div>
  );
};

export default Header;
