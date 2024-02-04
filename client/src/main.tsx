import ReactDOM from 'react-dom/client'
import UserContextProvider from './context/UserContext.tsx'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard.tsx'
import GroupChat from './components/GroupChat.tsx'
import Header from './components/Header.tsx';

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App/>,

  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/group/:groupId",
    element:<GroupChat/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UserContextProvider>
      <Header/>
      <div className='border-2 border-black'>

      <RouterProvider router={router}/>
      </div>
    </UserContextProvider>
)
