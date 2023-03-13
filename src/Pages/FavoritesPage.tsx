import React from 'react'
import useMediaQuery from '../shared/MediaQueryHook/MediaQuery';
import MobileNavbar from '../modules/HeaderMobile/MobileNavbar';
import WrapperContainer from '../shared/Wrappper/WrapperContainer';
import Header from '../modules/HeaderDesktop/Header';
import FavoritesGridLayout from '../modules/FavoritesGridLayout/FavoritesGridLayout';
import Sidebar from '../modules/SidebarLinks/Sidebar';

const FavoritesPage = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");
   return (
     <div>
       <div>
         {isMobile ? (
           <div>
             <MobileNavbar></MobileNavbar>
             <FavoritesGridLayout></FavoritesGridLayout>
           </div>
         ) : (
           <WrapperContainer>
             <Header></Header>
             <div className={isMobile ? "main-mobile" : "main"}>
               <Sidebar></Sidebar>
               <FavoritesGridLayout></FavoritesGridLayout>
             </div>
           </WrapperContainer>
         )}
       </div>
     </div>
   );
}

export default FavoritesPage