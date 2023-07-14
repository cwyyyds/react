import React from "react";
import ReactDom from "react-dom";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routes from "./router/routers";

ReactDom.render(
  <Router>
    <Link to="/">
      {" "}
      <Button type="primary">组件一</Button>
    </Link>
    <br />
    <Link to="/two">
      <Button type="primary">组件二</Button>
    </Link>
    <br />
    <Link to="/tree">组件三</Link>

    {routes.map((value, key) => {
      if (value.exact) {
        return (
          <Route
            exact
            path={value.path}
            component={value.component}
            key={key}
          />
        );
      } else {
        return (
          <Route path={value.path} component={value.component} key={key} />
        );
      }
    })}
  </Router>,
  document.getElementById("xbeichen")
);
