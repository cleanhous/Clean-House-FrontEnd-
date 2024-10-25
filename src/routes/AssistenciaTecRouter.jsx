import React, { useEffect } from "react";
import AssistenciaTec from "../components/AssistenciaTec";

const AssistenciaTecRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><AssistenciaTec/></h1>
    </div>
  );
}

export default AssistenciaTecRouter;
