//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router';



import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'swiper/css/bundle';
import './assets/all.scss';
import routes from './routes/index.jsx';


import { Provider } from 'react-redux';
import coachStore from './pages/coach/coachStore.jsx';



const router = createHashRouter(routes)

createRoot(document.getElementById('root')).render(
  <Provider store={coachStore}>
    <RouterProvider router={router} />
  </Provider>
)
