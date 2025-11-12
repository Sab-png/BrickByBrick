import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './styles/main.scss'

import routes from './routes/routes'

function App() {

  return <RouterProvider router={router} />
}

const router = createBrowserRouter(routes)

export default App
