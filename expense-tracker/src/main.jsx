import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { store } from './store/store.js'
import { Provider } from 'react-redux'
// import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import GroupDashboard from './pages/GroupDetails.jsx'
import GroupList from './pages/GroupList.jsx'
import AddExpenses from './pages/AddExpenses.jsx'
import GroupMembers from './pages/GroupMembers.jsx'
import Home from './pages/Home.jsx'
import GroupDetails from './pages/GroupDetails.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <div>Page Not Found</div>,
//     children: [
//       { index: true, element: <GroupList /> },
//       { path: '/group/:groupId', element: <GroupDashboard /> },
//       { path: '/group/:groupId/add-expense', element: <AddExpenses /> },
//       { path: '/group/:groupId/members', element: <GroupMembers /> },
//       {path: '*', element: <Navigate to='/'/>}
//     ]
//   }
// ])

createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  //   <RouterProvider router={router} />
  // </Provider>,
  <StrictMode>
    {/* <Home /> */}
    <GroupDetails />
  </StrictMode>
)
