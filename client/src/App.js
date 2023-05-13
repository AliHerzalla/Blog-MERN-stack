//files imports
import './style/App.css';

//packages imports
import { Route, Routes } from "react-router-dom";

//pages imports
import Post from "./components/Post";
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import { UserContextProvider } from './context/UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPage from './pages/EditPage';


function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Posts /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/create' element={ <CreatePost /> } />
          <Route path={ "/post/:id" } element={ <PostPage /> } />
          <Route path={ "/edit/:id" } element={ <EditPage /> } />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
