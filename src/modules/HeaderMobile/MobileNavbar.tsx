import React from "react";
import "./MobileNavbar.scss";
import Search from "../search/Search";
import bars from "../../assets/images/bars.svg";
import close from "../../assets/images/close.svg";
import Sidebar from "../SidebarLinks/Sidebar";
import { useContext } from "react";
import { GlobalArticlesContext } from "../../shared/GlobalContext/GlobalContext";

const MobileNavbar = () => {
  const { state, toggleNav, sectionTop } = useContext<any>(
    GlobalArticlesContext
  );
  return (
    <div ref={sectionTop}>
      <>
        <div>
          {state.open ? (
            <div
              className={
                state.open ? "mobile-header-open" : "mobile-header-close"
              }
            >
              <div className="btn-toggle" onClick={() => toggleNav()}>
                {state.open && (
                  <div>
                    <img src={close} alt="close"></img>
                  </div>
                )}
              </div>
              <div className="title-section">
                <h3 className="title-open">
                  <span className="my-tag">My</span>News
                </h3>
              </div>
              <div className="search">
                <Search></Search>
              </div>
              <div
                className={state.open ? "mobile-grid" : "mobile-header-close"}
              >
                <Sidebar></Sidebar>
              </div>
            </div>
          ) : (
            <div >
              <div className="mobile-header">
                <div>
                  <h3 className="title">
                    <span className="my-tag">My</span>News
                  </h3>
                </div>
                <div className="btn-toggle" onClick={() => toggleNav()}>
                  {!state.open && (
                    <div>
                      <img src={bars} alt="bars"></img>
                    </div>
                  )}
                </div>
              </div>
              <div className="search-header">
                <Search></Search>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default MobileNavbar;
