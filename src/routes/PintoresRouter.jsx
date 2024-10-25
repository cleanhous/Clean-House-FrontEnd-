import { useEffect } from "react";
import Pintores from "../components/Pintores";

const PintoresRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Pintores /></h1>
    </div>
  );
}

export default PintoresRouter;
