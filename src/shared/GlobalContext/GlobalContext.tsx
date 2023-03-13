import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { GlobalReducer, ActionTypes } from "../GlobalReducer/Globalreducer";
import { useMemo, useRef } from "react";
import { Item } from "../data/data";

interface InitialState {
  article: Item[];
  loading: boolean;
  open: boolean;
  favorites: Item[];
}

export const initialState: InitialState = {
  article: sessionStorage.getItem("article")
    ? JSON.parse(sessionStorage.getItem("article") || "")
    : [],
  loading: false,
  open: false,
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites") || "")
    : [],
};

export const GlobalArticlesContext = createContext<InitialState>(initialState);

const GlobalContext = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const sectionTop = useRef<any | HTMLDivElement>();

  //save to LOCAL/SESSION when state changes
  useEffect(() => {
    sessionStorage.setItem("article", JSON.stringify(state.article));
  }, [state.article]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites) || "");
  }, [state.favorites]);

  const getArticles = (data: InitialState) => {
    dispatch({ type: ActionTypes.GET_ARTICLE_ARTICLE, payload: data });
  };

  const fetchStart = () => {
    dispatch({
      type: ActionTypes.FETCH_START,
      payload: undefined,
    });
  };

  const fetchStop = () => {
    dispatch({
      type: ActionTypes.FETCH_STOP,
      payload: undefined,
    });
  };

  const toggleNav = useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_NAV, payload: !state.open });
  }, [state.open]);

  const addToFavorites = (article: InitialState) => {
    dispatch({ type: ActionTypes.ADD_TO_FAVORITES, payload: article });
  };
  const removeFromFavorites = (_id: string) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_FAVORITES, payload: _id });
  };
  const handleScroll = () => {
    sectionTop.current?.scrollIntoView({ behavior: "smooth" });
  };

  const value: any = useMemo(
    () => ({
      state: state,
      getArticles: getArticles,
      fetchStart: fetchStart,
      fetchStop: fetchStop,
      toggleNav: toggleNav,
      addToFavorites: addToFavorites,
      removeFromFavorites: removeFromFavorites,
      handleScroll: handleScroll,
      sectionTop: sectionTop,
    }),
    [state, toggleNav]
  );

  return (
    <div>
      <GlobalArticlesContext.Provider value={value}>
        {children}
      </GlobalArticlesContext.Provider>
    </div>
  );
};

export default GlobalContext;
