import React from "react";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_JOURNALS } from "../utils/queries";
import Header from "../components/Header";
import LandingPage from "./LandingPage";
import Journal from "../components/Journal";
import JournalList from "../components/JournalList";

import { Container, Grid } from "@mui/material";
const Home = () => {
  const { loading, data } = useQuery(QUERY_JOURNALS);
  const journals = data?.journals || [];

  const loggedIn = Auth.loggedIn();
  return (
    <>
      <Header></Header>
      <Container>
        {loggedIn ? (
          <div className="col-12 mb-3">
            <Journal />
            <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <Grid container spacing={2}>
                  <JournalList
                    journals={journals}
                  />
                </Grid>
              )}
            </div>
          </div>
        ) : (
          <LandingPage></LandingPage>
        )}
      </Container>
    </>
  );
};
export default Home;
