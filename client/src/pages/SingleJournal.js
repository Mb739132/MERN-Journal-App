import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { QUERY_JOURNAL } from "../utils/queries";

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
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {journal.username}
          </span>{" "}
          journal on {journal.createdAt}
        </p>
        <div className="card-body">
          <p>{journal.heading}</p>
          <p>{journal.journalText}</p>
          <img src={journal.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SingleJournal;
