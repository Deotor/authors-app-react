import React from "react";
import { Switch, Route } from "react-router-dom";
import Authors from "./AuthorsComponent/Authors";

const MainRouter = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Authors} />
    </Switch>
  </main>
);

export default MainRouter;
