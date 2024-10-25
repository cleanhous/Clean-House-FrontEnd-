import React, { useEffect } from "react";
import Cozinheiro from "../components/Cozinheiro";

const CozinheiroRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Cozinheiro/></h1>
    </div>
  );
}

export default CozinheiroRouter;
