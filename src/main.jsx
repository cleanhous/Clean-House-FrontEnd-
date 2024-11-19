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
import LoginAdminRouter from './routes/LoginAdminRouter.jsx';


import { register } from 'swiper/element/bundle';

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ArquitetoRouter from './routes/ArquitetoRoute.jsx';
import AdminRouter from './routes/AdminRouter.jsx';



import PrivateRoute from './components/PrivateRoute.jsx'; // Certifique-se de importar o componente

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Rotas públicas
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
      // Rotas privadas
      {
        path: 'home',
        element: <PrivateRoute element={<TelaInicialRouter />} />,
      },
      {
        path: 'conta',
        element: <PrivateRoute element={<ContaRouter />} />,
      },
      {
        path: 'eletricistas',
        element: <PrivateRoute element={<EletricistasRouter />} />,
      },
      {
        path: 'pintores',
        element: <PrivateRoute element={<PintoresRouter />} />,
      },
      {
        path: 'encanador',
        element: <PrivateRoute element={<EncanadorRouter />} />,
      },
      {
        path: 'pedidos',
        element: <PrivateRoute element={<PedidosRouter />} />,
      },
      {
        path: 'detalhesDoPrestador',
        element: <PrivateRoute element={<DetalhePrestadorRoute />} />,
      },
      {
        path: 'arquiteto',
        element: <PrivateRoute element={<ArquitetoRouter />} />,
      },
      {
        path: 'empreiteiro',
        element: <PrivateRoute element={<EmpreiteiroRouter />} />,
      },
      {
        path: 'cozinheiro',
        element: <PrivateRoute element={<CozinheiroRouter />} />,
      },
      {
        path: 'chaveiros',
        element: <PrivateRoute element={<ChaveiroRouter />} />,
      },
      {
        path: 'diaristas',
        element: <PrivateRoute element={<DiaristaRouter />} />,
      },
      {
        path: 'assistenciatecnica',
        element: <PrivateRoute element={<AssistenciaTecRouter />} />,
      },
      {
        path: 'admin',
        element: <PrivateRoute element={<AdminRouter />} />,
      },
      {
        path: 'admin/login',
        element: <LoginAdminRouter />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
 