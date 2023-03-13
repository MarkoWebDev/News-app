import React, { useContext } from "react";
import "./Sidebar.scss";
import { mobileGridData } from "../../shared/data/data";
import { NavLink } from "react-router-dom";
import { GlobalArticlesContext } from "../../shared/GlobalContext/GlobalContext";
import { InterceptorContext } from "../../core/ErrorInterceptorContext";
import useMediaQuery from "../../shared/MediaQueryHook/MediaQuery";
import { NavItemProps } from "../../shared/data/data";

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { state, fetchStart, getArticles, fetchStop, toggleNav } =
    useContext<any>(GlobalArticlesContext);
  const { handleAddError } = useContext<any>(InterceptorContext);
  const API_KEY = process.env.REACT_APP_API_KEY;


  /**
   * search articles by category button
   * @param {string} category
   *
   */
  const getCategoriesArticles = async (category: string) => {
    //start fetching and start the spinner(loader)
    //send flag for navbar on mobile screen
    if (isMobile) {
      toggleNav();
    }
    if (category !== "") {
      fetchStart();
    }
    setTimeout(async () => {
      try {
        if (category !== "/home") {
          const response = await fetch(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk%3A(%22${category}%22)&sort=newest&api-key=${API_KEY}`
          );
          const articlesCat = await response.json();
          if (articlesCat.status === "OK") {
            getArticles(articlesCat?.response?.docs);
          } else {
            //stop the loader
            fetchStop();
            //handle the errorInterceptorContext
            handleAddError(articlesCat?.fault);
          }
        }
      } catch (err) {
        //stop the loader
        fetchStop();
        //handle the errorInterceptorContext
        handleAddError(err);
      }
    }, 6000);
  };

  return (
    <div className={!state.open ? "sidebar-section" : "mobile-grid"}>
      <div className={isMobile ? "mobile-grid" : "sidebar-section"}>
        {mobileGridData.map((item: NavItemProps) => {
          return (
            <div key={item.id}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  isActive ? "nav-block-active" : undefined
                }
              >
                <div
                  className="nav-block"
                  onClick={() => getCategoriesArticles(item.category)}
                >
                  <img className="icon" src={item.image} alt={item.name}></img>
                  <li className="nav-text">{item.name}</li>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
