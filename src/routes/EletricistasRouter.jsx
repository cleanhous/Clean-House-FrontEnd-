import { useEffect } from "react";
import Eletricistas from "../components/Eletricistas";

const EletricistasRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1><Eletricistas/></h1>
    </div>
  );
}

export default EletricistasRouter;
