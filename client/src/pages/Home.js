import React from "react";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_JOURNALS } from "../utils/queries";
import Header from "../components/Header";
import LandingPage from "./LandingPage";
import Journal from "../components/Journal";
import JournalList from "../components/JournalList";
const Home = () => {
  const { loading, data } = useQuery(QUERY_JOURNALS);
  const journals = data?.journals || [];

  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <Header></Header>
      {loggedIn ? (
        <div className="col-12 mb-3">
          <Journal />
        </div>
      ) : (
        <LandingPage></LandingPage>
      )}
      <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <JournalList
            journals={journals}
            title="Some Feed for Thought(s)..."
          />
        )}
      </div>
    </main>
  );
};
export default Home;
