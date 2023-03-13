import React, { useState, useEffect, useRef, useContext } from "react";
import "./Latest.scss";
import { InterceptorContext } from "../../core/ErrorInterceptorContext";
import { useParams, useLocation } from "react-router-dom";

interface ItemProp {
  pub_date: string;
  headline: {
    main: string;
  };
}

interface LatestProp {
  mobileFlag: boolean;
}

const LatestNews = React.memo(({ mobileFlag }: LatestProp) => {
  const latestRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const { handleAddError } = useContext<any>(InterceptorContext);
  let location = useLocation();
  let { type } = useParams();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?&page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`
        );
        const latestArticles = await response.json();
        if (latestArticles.status === "OK") {
          setPrevPage(page);
          setData([...data, ...latestArticles.response.docs]);
        } else {
          handleAddError(latestArticles?.fault);
        }
      } catch (err) {
        //handle the errorInterceptorContext
        handleAddError(err);
      }
    };
    if (location.pathname === "/home" && mobileFlag) {
      return;
    }
    if (type === "featured") {
      return;
    } else {
      if (prevPage !== page) {
        fetchLatest();
      }
    }
  }, [page, prevPage]);

  const timeFormat = (str: string) => {
    const time = new Date(str).toLocaleTimeString();
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    const fullTime = `${hours}:${minutes}`;
    return fullTime;
  };

  const handleScroll = () => {
    if (latestRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = latestRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage(page + 1);
      }
    }
  };

  return (
    <div>
      <div className="latest">
        <div className="latest-section" onScroll={handleScroll} ref={latestRef}>
          <div className="top">
            <h4 className="title">
              {" "}
              <span className="circle"></span>Latest news
            </h4>
          </div>
          <div>
            {data?.map((item: ItemProp, index: number) => {
              return (
                <div className="latest-content" key={index}>
                  <p className="time">{timeFormat(item.pub_date)}</p>
                  <p className="text">{item?.headline?.main}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom">
          <button className="btn-see-all">
            See all news <span className="arrow">{">"}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default LatestNews;
