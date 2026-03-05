import React from "react";

function Welcome() {
  const username = localStorage.getItem("username");
  return <h1>Welcome, {username}!</h1>;
};

export default Welcome;