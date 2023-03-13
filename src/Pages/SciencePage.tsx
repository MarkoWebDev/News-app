import React from "react";
import useMediaQuery from "../shared/MediaQueryHook/MediaQuery";
import MobileNavbar from "../modules/HeaderMobile/MobileNavbar";
import WrapperContainer from "../shared/Wrappper/WrapperContainer";
import Header from "../modules/HeaderDesktop/Header";
import CategoryGridLayout from "../modules/CategoryGridLayout/CategoryGridLayout";
import Sidebar from "../modules/SidebarLinks/Sidebar";

const SciencePage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      <div>
        {isMobile ? (
          <div>
            <MobileNavbar></MobileNavbar>
            <CategoryGridLayout></CategoryGridLayout>
          </div>
        ) : (
          <WrapperContainer>
            <Header></Header>
            <div className={isMobile ? "main-mobile" : "main"}>
              <Sidebar></Sidebar>
              <CategoryGridLayout></CategoryGridLayout>
            </div>
          </WrapperContainer>
        )}
      </div>
    </div>
  );
};

export default SciencePage;
