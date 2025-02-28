//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'swiper/css/bundle';
import './assets/all.scss';


import routes from './routes/index.jsx';

const router = createHashRouter(routes)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
