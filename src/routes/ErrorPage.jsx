import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()

  return <div>
    <h1>Algo deu errado</h1>
    <p>{error.statustext}</p>
    <p>{error.error.message}</p>
  </div>;
};

export default ErrorPage;
