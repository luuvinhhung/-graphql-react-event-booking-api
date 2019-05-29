// import AuthPage from './pages/Login/Login'
// import EventsPage from './pages/Events/Events'
// import BookingsPage from './pages/Bookings/Bookings'
// import Home from './pages/Home/Home'

export const routes = [
  {
    label: 'Login',
    path: '/login',
    component: 'Login'
  },
  {
    label: 'Home',
    path: '/home',
    private: true,
    component: 'Home',
    routes: [
      {
        label: 'Events',
        path: '/home',
        exact: true,
        component: 'EventsPage'
      },
      {
        label: 'Events',
        path: '/home/events',
        component: 'EventsPage'
      },
      {
        label: 'Bookings',
        path: '/home/bookings',
        component: 'BookingsPage'
      },
      {
        label: 'EventList',
        path: '/home/eventlist',
        component: 'EventListPage'
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
  },
  {
    label: 'EventList',
    icon: 'schedule',
    path: '/home/eventlist'
  }
]
