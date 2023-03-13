interface Actions {
  GET_ARTICLE_ARTICLE: string;
  FETCH_START: string;
  FETCH_STOP: string;
  TOGGLE_NAV: string;
  ADD_TO_FAVORITES: string;
  REMOVE_FROM_FAVORITES: string;
}

export const ActionTypes: Actions = {
  GET_ARTICLE_ARTICLE: "GET_ARTICLE_ARTICLE",
  FETCH_START: "FETCH_START",
  FETCH_STOP: "FETCH_STOP",
  TOGGLE_NAV: "TOGGLE_NAV",
  ADD_TO_FAVORITES: "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES: "REMOVE_FROM_FAVORITES",
};

enum TypeAction {
  GET_ARTICLE_ARTICLE = "GET_ARTICLE_ARTICLE",
  FETCH_START = "FETCH_START",
  FETCH_STOP = "FETCH_STOP",
  TOGGLE_NAV = "TOGGLE_NAV",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
}

interface ActionType {
  type: TypeAction | string;
  payload: any;
}

export const GlobalReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.FETCH_START:
      return {
        ...state,
        loading: true,
        article: [],
      };
    case ActionTypes.GET_ARTICLE_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false,
        favorites: state.favorites,
      };
    case ActionTypes.FETCH_STOP:
      return {
        ...state,
        loading: false,
        article: [],
        favorites: state.favorites,
      };
    case ActionTypes.TOGGLE_NAV:
      return {
        ...state,
        open: action.payload,
      };
    case ActionTypes.ADD_TO_FAVORITES:
      const exist = state?.favorites?.find(
        (item: any) => item._id === action.payload._id
      );
      if (!exist)
        return {
          ...state,
          favorites: [...state.favorites, { ...action.payload }],
        };
      return {
        ...state,
      };
    case ActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (item: any) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
