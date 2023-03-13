import React, { useContext } from "react";
import "./CategoryGridLayout.scss";
import { GlobalArticlesContext } from "../../shared/GlobalContext/GlobalContext";
import ArticleItem from "../ArticleItem/ArticleItem";
import Spinner from "../../shared/Spinner/Spinner";
import useMediaQuery from "../../shared/MediaQueryHook/MediaQuery";
import { Item } from "../../shared/data/data";

const CategoryGridLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { state, handleScroll } = useContext<any>(GlobalArticlesContext);
  return (
    <div>
      <div>
        {state.loading ? (
          <div className={isMobile ? "spinner-mobile" : "spinner"}>
            <Spinner loading={state.loading}></Spinner>
          </div>
        ) : (
          <div className={isMobile ? "category-mobile" : "category-section"}>
            {state?.article?.map((item: Item, index: number) => {
              return (
                <div key={index}>
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
            })}
            {isMobile && (
              <button className="scroll-top" onClick={() => handleScroll()}>
                Back to Top
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryGridLayout;
