import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import ErrorPage from './routes/ErrorPage.jsx'
import HomeRouter from './routes/HomeRouter.jsx'
import CadastroRouter from './routes/CadastroRouter.jsx'
import LoginRouter from './routes/LoginRouter.jsx'
import TelaInicialRouter from './routes/TelaInicialRouter.jsx'
import ContaRouter from './routes/ContaRouter.jsx'
import EletricistasRouter from './routes/EletricistasRouter.jsx'
import PedidosRouter from './routes/PedidosRouter.jsx'


import { register } from 'swiper/element/bundle'

register();
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import DetalhePrestadorRoute from './routes/DetalhePrestadorRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeRouter />
      },
      {
        path: "cadastro",
        element: <CadastroRouter />
      },
      {
        path: "login",
        element: <LoginRouter />
      },
      {
        path: "home",
        element: <TelaInicialRouter />
      },
      {
        path: "conta",
        element: <ContaRouter />
      },
      {
        path: "eletricistas",
        element: <EletricistasRouter />
      },
      {
        path: "pedidos",
        element: <PedidosRouter />
      },
      {
        path: "detalhesDoPrestador",
        element: <DetalhePrestadorRoute />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
