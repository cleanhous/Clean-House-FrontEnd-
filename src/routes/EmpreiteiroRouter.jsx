import { useEffect } from "react";
import Empreiteiro from "../components/Empreiteiro"

const EmpreiteiroRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Empreiteiro/></h1>
    </div>
  );
}

export default EmpreiteiroRouter;
