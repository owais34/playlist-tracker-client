import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import AddPlaylist from './pages/AddPlaylist/AddPlaylist';
import { Resume } from './pages/Resume/Resume';

const router = createBrowserRouter([
  {
    path: "/",
    element : <Home/>
  },
  {
    path : "addPlaylist",
    element: <AddPlaylist/>
  },
  {
    path : "resume/:id",
    element:<Resume/>
  },
  {
    path : "admin",
    element: <h1>admin</h1>,
    children : [
      {
        path: "addbook",
        element: <h1>Add book page</h1>
      },
      {
        path: "viewbook",
        element: <h1>View Books page</h1>
      },
      {
        path: "editbook/:bookid",
        element: <h1>Edit book page</h1>
      }
    ]
  }

])

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading ....</p>} />
  );
}

export default App;
