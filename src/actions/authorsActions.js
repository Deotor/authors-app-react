import { GET_AUTHORS, SEARCH_AUTHORS } from "./types";

export const fetchAuthors = (page, sortBy) => {
  let data = require("../assets/data.json");
  console.log(data);
  let topAuthors = getTopAuthors(data);
  data = sortByFunc(data, sortBy);
  let res;
  if (page === 1) res = data.slice(0, page * 10);
  else res = data.slice(page * 10, (page + 1) * 10);
  return {
    type: GET_AUTHORS,
    payload: res,
    countOfPages: Math.ceil(data.length / 10 - 1),
    countOfAuthors: data.length,
    topAuthors: topAuthors
  };
};

export const searchAuthors = (searched, sortBy) => {
  let data = require("../assets/data.json");
  let s = searched => {
    return searched.charAt(0).toUpperCase() + searched.slice(1);
  };
  let res = data.filter(author => {
    if (author.name.search(s(searched)) + 1) return author;
  });
  res = sortByFunc(res, sortBy);
  return {
    type: SEARCH_AUTHORS,
    payload: res,
    countOfAuthors: res.length,
    countOfPages: Math.ceil(res.length / 10)
  };
};

function getTopAuthors(data) {
  data = sortByFunc(data, "pageviews-descending");
  return data.slice(0, 3);
}

function sortByFunc(data, sortBy) {
  if (sortBy === "name-ascending") {
    data.sort(function(first, second) {
      if (first.name > second.name) {
        return 1;
      }
      if (first.name < second.name) {
        return -1;
      }
      return 0;
    });
  }
  if (sortBy === "name-descending") {
    data.sort(function(first, second) {
      if (first.name > second.name) {
        return -1;
      }
      if (first.name < second.name) {
        return 1;
      }
      return 0;
    });
  }

  if (sortBy === "pageviews-ascending") {
    data.sort(function(first, second) {
      return first.pageviews - second.pageviews;
    });
  }
  if (sortBy === "pageviews-descending") {
    data.sort(function(first, second) {
      return second.pageviews - first.pageviews;
    });
  }
  return data;
}
