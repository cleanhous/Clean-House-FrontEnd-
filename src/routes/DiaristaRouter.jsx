import React, { useEffect } from "react";
import Diarista from "../components/Diarista";

const DiaristaRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Diarista/></h1>
    </div>
  );
}

export default DiaristaRouter;
