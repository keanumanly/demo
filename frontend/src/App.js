import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/account/login"
// import Register from "./components/account/register"
import PrivateRoute from "./components/common/privateroute"
import AdminPage from "./components/pages/adminpage"
import UserPage from "./components/pages/userpage"


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props =><Login {...props} /> } />
        <Route path="/login" exact render={props =><Login {...props} /> } />
        {/* <Route path="/register" exact render={props =><Register {...props} /> } /> */}

        {/* <Route path="/1" exact render={props =><AdminPage {...props} /> } />
        <Route path="/3" exact render={props =><UserPage {...props} /> } /> */}

        <PrivateRoute exact path="/1" component={AdminPage} />
        <PrivateRoute exact path="/3" component={UserPage} />

        <Route path='/'  render={props => <Login {...props} />}  />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
