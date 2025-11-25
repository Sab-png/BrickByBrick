import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import  FiltersContextProvider from './providers/FiltersContextProvider';

import './styles/main.scss'

import routes from './routes/routes'

function App() {

  return (
    <FiltersContextProvider>
      <RouterProvider router={router} />
    </FiltersContextProvider>
  )
}

const router = createBrowserRouter(routes)

export default App
