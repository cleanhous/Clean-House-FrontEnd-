import { useEffect } from "react";
import Encanador from "../components/Encanador";

const EncanadorRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>
        <Encanador />
      </h1>
    </div>
  );
};

export default EncanadorRouter;
