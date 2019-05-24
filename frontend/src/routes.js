import AuthPage from './pages/Login'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import Home from './pages/Home'

export const routes = [
  {
    path: '/login',
    component: AuthPage
  },
  {
    label: 'Home',
    path: '/home',
    private: true,
    component: Home,
    routes: [
      {
        label: 'dashboard',
        path: '/home',
        exact: true,
        component: EventsPage
      },
      {
        path: '/home/events',
        component: EventsPage
      },
      {
        path: '/home/bookings',
        component: BookingsPage
      }
    ]
  }
]
export const siderRoutes = [
  {
    label: 'dashboard',
    icon: 'dashboard',
    path: '/home'
  },
  {
    label: 'events',
    icon: 'smile',
    path: '/home/events'
  },
  {
    label: 'bookings',
    icon: 'schedule',
    path: '/home/bookings'
  }
]
