import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './routes/ErrorPage.jsx';
import HomeRouter from './routes/HomeRouter.jsx';
import CadastroRouter from './routes/CadastroRouter.jsx';
import LoginRouter from './routes/LoginRouter.jsx';
import TelaInicialRouter from './routes/TelaInicialRouter.jsx';
import ContaRouter from './routes/ContaRouter.jsx';
import EletricistasRouter from './routes/EletricistasRouter.jsx';
import PintoresRouter from './routes/PintoresRouter.jsx'; // Importação do PintoresRouter
import PedidosRouter from './routes/PedidosRouter.jsx';
import DetalhePrestadorRoute from './routes/DetalhePrestadorRoute.jsx';
import EncanadorRouter from './routes/EncanadorRouter.jsx';
import CuidadorRouter from './routes/CuidadorRouter.jsx';
import CozinheiroRouter from './routes/CozinheiroRouter.jsx';
import ChaveiroRouter from './routes/ChaveiroRouter.jsx';
import AssistenciaTecRouter from './routes/AssistenciaTecRouter.jsx';
import DiaristaRouter from './routes/DiaristaRouter.jsx';
import PedreiroRouter from './routes/PedreiroRouter.jsx';


import { register } from 'swiper/element/bundle';

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomeRouter />,
      },
      {
        path: 'cadastro',
        element: <CadastroRouter />,
      },
      {
        path: 'login',
        element: <LoginRouter />,
      },
      {
        path: 'home',
        element: <TelaInicialRouter />,
      },
      {
        path: 'conta',
        element: <ContaRouter />,
      },
      {
        path: 'eletricistas',
        element: <EletricistasRouter />,
      },
      {
        path: 'pintores',
        element: <PintoresRouter />,
      },
      {
        path: 'encanador',
        element: <EncanadorRouter />
      },
      {
        path: 'pedidos',
        element: <PedidosRouter />,
      },
      {
        path: 'detalhesDoPrestador',
        element: <DetalhePrestadorRoute />,
      },
      {
        path: 'cuidador',
        element: <CuidadorRouter />,
      },
      {
        path: 'pedreiro',
        element: <PedreiroRouter />,
      },
      {
        path: 'cozinheiro',
        element: <CozinheiroRouter />,
      },
      {
        path: 'chaveiros',
        element: <ChaveiroRouter />,
      },
      {
        path: 'diaristas',
        element: <DiaristaRouter />,
      },
      {
        path: 'assistencia-tecnica',
        element: <AssistenciaTecRouter />,
      },
      {
        path: 'assistencia-tecnica',
        element: <AssistenciaTecRouter />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
 