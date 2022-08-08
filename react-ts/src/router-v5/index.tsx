import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import Films from '../router-pages/Films';
import Cinemas from '../router-pages/Cinemas';
import Center from '../router-pages/Center';

function HomeRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/films" component={Films}></Route>
        <Route path="/cinemas" component={Cinemas}></Route>
        <Route path="/center" component={Center}></Route>
        {/* 路由重定向 */}
        <Redirect to="/films" from="/"></Redirect>
      </Switch>
    </HashRouter>
  );
}

export default HomeRouter;
