import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import {QUERY_JOURNAL } from "../utils/queries";

import { Container } from "@mui/material";

import Header from "../components/Header";
const SingleJournal = (props) => {
  
  const { id: journalId } = useParams();

  const { loading, data } = useQuery(QUERY_JOURNAL, {
    variables: { id: journalId },
  });
  const journal = data?.journal || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header></Header>
      <Container>
      <div className="card mb-3">
        <p className="card-header createTitle">
          <span style={{ fontWeight: 700 }} className="text-light">
            {journal.username}
          </span>{" "}
          journal on {journal.createdAt}
        </p>
        <div className="card-body journalBody">
          <h3>{journal.heading}</h3>
          <p>{journal.journalText}</p>
          <img src={journal.image} alt="" className="img"/>
          <button >Delete</button>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default SingleJournal;
