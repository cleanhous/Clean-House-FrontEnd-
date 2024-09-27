import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import ErrorPage from './routes/ErrorPage.jsx'
import HomeRouter from './routes/HomeRouter.jsx'
import CadastroRouter from './routes/CadastroRouter.jsx'
import LoginRouter from './routes/LoginRouter.jsx'
import TelaInicial from './components/TelaInicial.jsx'

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
        element: <TelaInicial />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
