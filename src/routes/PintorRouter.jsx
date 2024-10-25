import React, { useEffect } from "react";
import Pintor from "../components/Pintor";

const PintorRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Pintor/></h1>
    </div>
  );
}

export default PintorRouter;
