import React, { useEffect } from "react";
import Pedreiro from "../components/Pedreiro";

const PedreiroRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Pedreiro/></h1>
    </div>
  );
}

export default PedreiroRouter;
