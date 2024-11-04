import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema
import 'primereact/resources/primereact.min.css';                 // Componentes
import 'primeicons/primeicons.css'; 

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './routes/ErrorPage.jsx';
import HomeRouter from './routes/HomeRouter.jsx';
import CadastroRouter from './routes/CadastroRouter.jsx';
import LoginRouter from './routes/LoginRouter.jsx';
import TelaInicialRouter from './routes/TelaInicialRouter.jsx';
import ContaRouter from './routes/ContaRouter.jsx';
import EletricistasRouter from './routes/EletricistasRouter.jsx';
import PintoresRouter from './routes/PintoresRouter.jsx'; 
import PedidosRouter from './routes/PedidosRouter.jsx';
import DetalhePrestadorRoute from './routes/DetalhePrestadorRoute.jsx';
import EncanadorRouter from './routes/EncanadorRouter.jsx';

import CozinheiroRouter from './routes/CozinheiroRouter.jsx';
import ChaveiroRouter from './routes/ChaveiroRouter.jsx';
import AssistenciaTecRouter from './routes/AssistenciaTecRouter.jsx';
import DiaristaRouter from './routes/DiaristaRouter.jsx';
import EmpreiteiroRouter from './routes/EmpreiteiroRouter.jsx'


import { register } from 'swiper/element/bundle';

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ArquitetoRouter from './routes/ArquitetoRoute.jsx';
import AdminRouter from './routes/AdminRouter.jsx';



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
        path: 'arquiteto',
        element: <ArquitetoRouter/>,
      },
      {
        path: 'empreiteiro',
        element: <EmpreiteiroRouter />,
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
        path: 'assistenciatecnica',
        element: <AssistenciaTecRouter />,
      },
      {
        path: 'admin',
        element: <AdminRouter />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
 