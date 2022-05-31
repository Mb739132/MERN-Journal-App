import React from "react";
import { Link } from "react-router-dom";

const JournalList = ({ journals, heading }) => {
  if (!journals.length) {
    return <h3>No journals Yet</h3>;
  }

  return (
    <div>
      <h3>{heading}</h3>
      {journals &&
        journals.map((journal) => (
          <div key={journal._id} className="card mb-3">
            <p className="card-header">
              {journal.username} journal on {journal.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/journal/${journal._id}`}>
                <h3>{journal.heading}</h3>
                <p>{journal.journalText}</p>
                <img src={journal.image} alt="" />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JournalList;
