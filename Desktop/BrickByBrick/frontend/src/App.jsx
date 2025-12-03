import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import  FiltersContextProvider from './providers/FiltersContextProvider';
import AuthContextProvider from './providers/AuthContextProvider';

import './styles/main.scss'

import routes from './routes/routes'

function App() {

  return (
    <AuthContextProvider>
      <FiltersContextProvider>
        <RouterProvider router={router} />
      </FiltersContextProvider>
    </AuthContextProvider>
  )
}

const router = createBrowserRouter(routes)

export default App
