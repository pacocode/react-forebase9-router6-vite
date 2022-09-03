import {Routes, Route} from 'react-router-dom';

import Login from './routes/Login';
import Home from './routes/Home';
import Register from './routes/Register';
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import LayoutContainerForm from './components/LayoutContainerForm';


const App = () =>  {

  const {user} = useContext(UserContext);
  if(user === false){
    return <p>loading user...</p>
  }

  return (
    <>
      <Navbar />
      <h1>App</h1>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path='/' element={<LayoutContainerForm/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
