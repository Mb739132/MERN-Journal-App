import React from "react";
// import Journal from "../components/Journal";

import Auth from "../utils/auth";
// import { useQuery } from "@apollo/client";

const Home = () => {
  // const journals = data?.journals || [];

  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div>
        {loggedIn && (
          <div>
            <p>vgvhbhnjnj</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
