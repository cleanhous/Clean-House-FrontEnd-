import { Outlet } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";


function App() {
  return (
    <PrimeReactProvider>
      <div>
        <Outlet />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
