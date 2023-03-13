import React, { useContext, useState } from "react";
import "./Search.scss";
import { InterceptorContext } from "../../core/ErrorInterceptorContext";
import { GlobalArticlesContext } from "../../shared/GlobalContext/GlobalContext";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const { getArticles } = useContext<any>(GlobalArticlesContext);
  const { handleAddError } = useContext<any>(InterceptorContext);

  //implement search to search for articles
  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    try {
      if (query.length > 0) {
        const response = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.REACT_APP_API_KEY}`
        );
        const searchedData = await response.json();
        getArticles(searchedData?.response?.docs);
      }
    } catch (err) {
      handleAddError(err);
    }

    setQuery("");
  };

  return (
    <div>
      <div className="input-section">
        <form onSubmit={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="search-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            id="query"
            name="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            placeholder="Search news"
          ></input>
          <button className="btn-search" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
