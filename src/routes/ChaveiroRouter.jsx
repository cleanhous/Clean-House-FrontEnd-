import React, { useEffect } from "react";
import Chaveiro from "../components/Chaveiro";

const ChaveiroRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Chaveiro/></h1>
    </div>
  );
}

export default ChaveiroRouter;
