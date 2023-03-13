import React, { useContext } from "react";
import "./FavoritesGridLayout.scss";
import { GlobalArticlesContext } from "../../shared/GlobalContext/GlobalContext";
import ArticleItem from "../ArticleItem/ArticleItem";
import Spinner from "../../shared/Spinner/Spinner";
import useMediaQuery from "../../shared/MediaQueryHook/MediaQuery";

const FavoritesGridLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { state, removeFromFavorites } = useContext<any>(GlobalArticlesContext);
  return (
    <div>
      <div className={isMobile ? "category-mobile" : "category-section"}>
        {state.loading ? (
          <div className={isMobile ? "spinner-mobile" : "spinner"}>
            <Spinner loading={state.loading}></Spinner>
          </div>
        ) : state?.favorites.length <= 0 ? (
          <div className="title-section">
            <h3 className="title">
              <span className="add">Add</span>articles to favorites
            </h3>
          </div>
        ) : (
          state?.favorites?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="tooltip"
                onClick={() => removeFromFavorites(item?._id)}
              >
                <span className="tooltiptext">
                  Click to remove from favorites
                </span>

                <ArticleItem
                  id={item?._id}
                  category={item?.news_desk}
                  name={item?.headline?.main}
                  url={item?.multimedia[0]?.url}
                  author={item?.byline?.original?.split(",")[0]}
                  article={item}
                ></ArticleItem>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FavoritesGridLayout;
