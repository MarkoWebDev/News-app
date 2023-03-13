import React, { useContext } from "react";
import "./ArticleItem.scss";
import useMediaQuery from "../../shared/MediaQueryHook/MediaQuery";
import { FaStar, FaBookmark } from "react-icons/fa";
import { GlobalArticlesContext } from "../../shared/GlobalContext/GlobalContext";

interface DataProps {
  id: number;
  name: string;
  url: string;
  category: string;
  author: string;
  article: any;
}

interface Item {
  _id: string;
}

const ArticleItem = React.memo(
  ({ id, name, url, category, author, article }: DataProps) => {
    const imageUrl = "https://www.nytimes.com/";
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { state, addToFavorites } = useContext<any>(GlobalArticlesContext);

    return (
      <div
        
        className={isMobile ? "article-item-mobile" : "article-item"}
      >
        <div className={isMobile ? "article-mobile" : "article"}>
          {url === undefined ? (
            <div className="noArticleImage"></div>
          ) : (
            <img
              className="articleImage"
              src={`${imageUrl}${url}`}
              alt={name}
            ></img>
          )}
          <div className="article-content">
            <h6 className="category">{category}</h6>
            <h4 className="headline">{name}</h4>
            <div className="bottom-content">
              <p className="author">{author}</p>
              <div className="bookmark" onClick={() => addToFavorites(article)}>
                <FaBookmark></FaBookmark>
              </div>
              {state.favorites.map(
                (item: Item) =>
                  item._id === article?._id && (
                    <div className="favorite">
                      <FaStar></FaStar>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ArticleItem;
