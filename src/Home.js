import React from "react";
import backgroundImage from "./images/2.jpg";

const Home = () => {
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    height: "100vh",
    padding: "60px",
    overflow: "hidden",
  };

  return <div style={backgroundStyles}></div>;
};

export default Home;
