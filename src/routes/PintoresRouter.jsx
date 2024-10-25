import React, { useEffect } from "react";
import Home from "../components/pintores";

const PintoresRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Home/></h1>
    </div>
  );
}

export default PintoresRouter;
