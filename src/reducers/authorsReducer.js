import { GET_AUTHORS, SEARCH_AUTHORS } from "../actions/types";

const initialState = {
  items: [],
  countOfPages: 0,
  countOfAuthors: 0,
  topAuthors: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHORS:
      return {
        ...state,
        items: action.payload,
        countOfPages: action.countOfPages,
        topAuthors: action.topAuthors,
        countOfAuthors: action.countOfAuthors
      };
    case SEARCH_AUTHORS:
      return {
        ...state,
        items: action.payload,
        countOfPages: action.countOfPages,
        countOfAuthors: action.countOfAuthors
      };
    default:
      return state;
  }
}
