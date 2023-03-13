import React from "react";
import "./Layout.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../Pages/HomePage";
import GeneralPage from "../../Pages/GeneralPage";
import BusinessPage from "../../Pages/BusinessPage";
import HealthPage from "../../Pages/HealthPage";
import SciencePage from "../../Pages/SciencePage";
import SportsPage from "../../Pages/SportsPage";
import TechnologyPage from "../../Pages/TechnologyPage";
import FavoritesPage from "../../Pages/FavoritesPage";
import ErrorInterceptorContext from "../../core/ErrorInterceptorContext";
import ErrorDialog from "../../core/ErrorDialog";
import GlobalContext from "../../shared/GlobalContext/GlobalContext";


const Layout = () => {
  return (
    <div className="layout">
      <BrowserRouter>
        <ErrorInterceptorContext>
          <GlobalContext>
            <Routes>
              <Route
                path="/"
                element={<Navigate replace={true} to={"/home"} />}
              ></Route>
              <Route path={"/home"} element={<HomePage></HomePage>}>
                <Route
                  path="/home/:type"
                  element={<HomePage></HomePage>}
                ></Route>
                <Route
                  path="/home/:type"
                  element={<HomePage></HomePage>}
                ></Route>
              </Route>
              <Route
                path="/general"
                element={<GeneralPage></GeneralPage>}
              ></Route>
              <Route
                path="/business"
                element={<BusinessPage></BusinessPage>}
              ></Route>
              <Route path="/health" element={<HealthPage></HealthPage>}></Route>
              <Route
                path="/science"
                element={<SciencePage></SciencePage>}
              ></Route>
              <Route path="/sports" element={<SportsPage></SportsPage>}></Route>
              <Route
                path="/technology"
                element={<TechnologyPage></TechnologyPage>}
              ></Route>
              <Route
                path="/favorites"
                element={<FavoritesPage></FavoritesPage>}
              ></Route>
            </Routes>
            <ErrorDialog></ErrorDialog>
          </GlobalContext>
        </ErrorInterceptorContext>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
