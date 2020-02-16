
import * as serviceWorker from './serviceWorker';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from './store/configureStore';
import { Provider } from "react-redux";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';



import Home from "./components/Home";
import Detail from "./components/Detail";


ReactDOM.render(
	 <Provider store={store}>
		  <BrowserRouter>
		    <Switch>
		      <Route exact path="/"  component={Home} />
		      <Route exact path="/view-detail"  component={Detail} />
		    </Switch>
		  </BrowserRouter>
   </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
