import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'

export const routes = [
  {
    path: '/auth',
    component: AuthPage
  },
  {
    path: '/events',
    component: EventsPage,
    private: true
  },
  {
    path: '/bookings',
    component: BookingsPage
  }
]
