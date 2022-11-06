import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleAnime from "./pages/SingleAnime";
import SavedAnime from "./pages/SavedAnime";

import { setContext } from "@apollo/client/link/context";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://mern-anime-finder.vercel.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Check first if user is logged in, 'if (loggedIn) { then do this }'
let loggedIn =
  localStorage.getItem("id_token") == null
    ? false
    : localStorage.getItem("id_token") == "undefined"
    ? false
    : true;

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/anime/:param" component={SingleAnime} />
            {/* User can only access About route (page) IF they are logged in */}
            {loggedIn && (
              <Route exact path="/saved-anime" component={SavedAnime} />
            )}
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
