import React from "react";
import "./Pages.scss";
import Header from "../modules/HeaderDesktop/Header";
import MobileNavbar from "../modules/HeaderMobile/MobileNavbar";
import useMediaQuery from "../shared/MediaQueryHook/MediaQuery";
import WrapperContainer from "../shared/Wrappper/WrapperContainer";
import { NavLink, useLocation } from "react-router-dom";
import LatestNews from "../modules/LatestNews/LatestNews";
import Maingrid from "../modules/MainGrid/Maingrid";
import Sidebar from "../modules/SidebarLinks/Sidebar";

const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  let location = useLocation();

  const mobileSections = () => {
    if (location.pathname === "/home/latest") {
      return <LatestNews mobileFlag={false}></LatestNews>;
    }
    if (location.pathname === "/home/featured") {
      return <Maingrid></Maingrid>;
    }
    return;
  };
  return (
    <div>
      {isMobile ? (
        <div>
          <MobileNavbar></MobileNavbar>
          <div className="nav-btns">
            <div className="feature">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "latest-active" : "latest"
                }
                to="/home/featured"
              >
                Featured
              </NavLink>
            </div>
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "latest-active" : "latest"
                }
                to="/home/latest"
              >
                Latest
              </NavLink>
            </div>
          </div>
          <div className="content">{mobileSections()}</div>
        </div>
      ) : (
        <WrapperContainer>
          <Header></Header>
          <div className={isMobile ? "main-mobile" : "main"}>
            <Sidebar></Sidebar>
            {location.pathname === "/home" ? (
              <Maingrid></Maingrid>
            ) : (
              <h1 className="url-info">
                Check url address{" "}
                <span className="my-tag">navigate on sidebar</span>
              </h1>
            )}
          </div>
        </WrapperContainer>
      )}
    </div>
  );
};

export default Home;
