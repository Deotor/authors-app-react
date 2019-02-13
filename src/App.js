import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";

import MainRouter from "./components/MainRouter";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MainRouter />
        </div>
      </Provider>
    );
  }
}

export default App;
