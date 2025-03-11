import App from '../App';
import BookingPage from '../pages/order/BookingPage';
import CheckoutFail from '../pages/order/CheckoutFail';
import CheckoutPage from '../pages/order/CheckoutPage';
import CheckoutSuccess from '../pages/order/CheckoutSuccess';
import Home from '../pages/home/Home';
import Coach from '../pages/coach/Coach';
import CoachPage from '../pages/coach/coachComps/coachPage/CoachPage';
import SkiResortListPage from '../pages/skihouse/SkiResortListPage';
import SkiResortDetailPage from '../pages/skihouse/SkiResortDetailPage';
import SignInForm from '../pages/home/homeComps/SignInForm';
import SignUpForm from '../pages/home/homeComps/SignUpForm';
import ArticlePage from '../pages/article/ArticlePage';
import AboutUs from '../pages/about/AboutUs';
import NotFound from '../components/NotFound';
import AdminLogin from '../pages/admin/AdminLogin';
import OrderListPage from '../pages/admin/OrderListPage';
import OrderDetailPage from '../pages/admin/OrderDetailPage';
import AdminLayout from '../layout/AdminLayout';


const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element:<Home />
      },
      {
        path:'booking',
        element:<BookingPage />
      },
      {
        path:'checkout',
        element:<CheckoutPage />
      },
      {
        path:'checkout-success',
        element:<CheckoutSuccess />
      },
      {
        path:'checkout-fail',
        element:<CheckoutFail />
      },
      {
        path: 'coach',
        element:<Coach />,
      },
      {
        path: ':id',
        element: <CoachPage />
      },
      {
        path:'ski-house',
        element: <SkiResortListPage />
      },
      {
        path: 'ski-house/:id',
        element: <SkiResortDetailPage />
      },
      {
        path: 'sign-in',
        element: <SignInForm />
      },
      {
        path: 'sign-up',
        element: <SignUpForm />
      },
      {
        path: 'article',
        element: <ArticlePage />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path:'*',
        element:<NotFound />
      }
    ]
  },
  {
    path: '/adminLogin',
    element: <AdminLogin />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: '',
            element: <OrderListPage />
        },
        {
            path: 'orders',
            element: <OrderListPage />
        }
    ]
  },
]

export default routes;