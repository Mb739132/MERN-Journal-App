import React from "react";

import Auth from "../utils/auth";

import Header from "../components/Header";
import LandingPage from "./LandingPage";
const Home = () => {
  // const journals = data?.journals || [];

  const loggedIn = Auth.loggedIn();
  return (
    <main>
      {loggedIn ? (
        <div>
          <Header></Header>
          <p>vgvhbhnjnj</p>
        </div>
      ) : (
        <LandingPage></LandingPage>
      )}
    </main>
  );
};

export default Home;
