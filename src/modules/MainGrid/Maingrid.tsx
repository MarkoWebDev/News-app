import React, { useState, useEffect, useContext } from "react";
import "./MainGrid.scss";
import ArticleItem from "../ArticleItem/ArticleItem";
import Spinner from "../../shared/Spinner/Spinner";
import { InterceptorContext } from "../../core/ErrorInterceptorContext";
import LatestNews from "../LatestNews/LatestNews";
import { Item } from "../../shared/data/data";
import useMediaQuery from "../../shared/MediaQueryHook/MediaQuery";
import { GlobalArticlesContext } from "../../shared/GlobalContext/GlobalContext";

const Maingrid = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [newData, setNewData] = useState<any>([]);
  const { state, fetchStart, fetchStop } = useContext<any>(
    GlobalArticlesContext
  );
  const { handleAddError } = useContext<any>(InterceptorContext);

  useEffect(() => {
    const getTopHeadLines = async () => {
      fetchStart();
      setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk%3A(%22Business%22%22Technology%22%22Home%22%22Health%22%22Science%22%22Sports%22)&page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`
          );
          const articles = await response.json();
          if (articles.status === "OK") {
            setTotalPages(articles?.response?.meta?.hits);
            setData([...data, ...articles.response?.docs]);
            fetchStop();
          } else {
            fetchStop();
            handleAddError(articles?.fault);
          }
          //setat nasu listu na search
          // setData(data);
        } catch (err) {
          //stop the loader
          fetchStop();
          //handle the errorInterceptorContext
          handleAddError(err);
        }
      }, 6000);
    };
    getTopHeadLines();
  }, [page]);

  

  //to group data on home page
  useEffect(() => {
    const groupCategories = () => {
      let categories: any[] = [];
      data?.map((item: any) =>
        categories[item.news_desk]
          ? categories[item.news_desk].push(item)
          : (categories[item.news_desk] = [item])
      );
      setNewData(categories);
    };
    groupCategories();
  }, [data]);

  

  return (
    <div>
      {state.loading ? (
        <div className={isMobile ? "mobile-spinner" : "spinner-section"}>
          <Spinner loading={state.loading}></Spinner>
        </div>
      ) : (
        <div>
          <h2 className={isMobile ? "news-mobile" : "news"}>News</h2>
          <div className={isMobile ? "category-mobile" : "main-section"}>
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
            {state?.article?.length <= 0 &&
              newData?.Business?.map((item: Item, index: number) => {
                return (
                  <div key={index} className="grid-col-1">
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
            {state?.article?.length <= 0 &&
              newData?.Technology?.map((item: Item, index: number) => {
                return (
                  <div key={index} className="grid-col-1">
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
            {state?.article?.length <= 0 &&
              newData?.Health?.map((item: Item, index: number) => {
                return (
                  <div key={index} className="grid-col-1">
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
            <div className={isMobile ? "latest-mobile" : "grid-column"}>
              <LatestNews mobileFlag={isMobile}></LatestNews>
            </div>
            {state?.article?.length <= 0 &&
              newData?.Sports?.map((item: Item, index: number) => {
                return (
                  <div key={index} className="grid-col-3">
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
            {state?.article?.length <= 0 &&
              newData?.Home?.map((item: Item, index: number) => {
                return (
                  <div key={index} className="grid-col-3">
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
            {state?.article?.length <= 0 &&
              newData?.Science?.map((item: Item, index: number) => {
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
          </div>{" "}
          <div className="load-more-section">
            {totalPages !== page &&
              (state?.loading ? (
                <div className="spinner-load-more">
                  <Spinner loading={state?.loading}></Spinner>
                </div>
              ) : (
                <div>
                  <button
                    className="load-more"
                    onClick={() => setPage(page + 1)}
                  >
                    Load More
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Maingrid;
