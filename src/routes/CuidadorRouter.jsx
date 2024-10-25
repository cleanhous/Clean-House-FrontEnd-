import React, { useEffect } from "react";
import Cuidador from "../components/Cuidador";

const CuidadorRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Cuidador/></h1>
    </div>
  );
}

export default CuidadorRouter;
