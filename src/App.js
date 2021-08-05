import './App.scss'

import SingIn from './components/SignIn/SingIn'
import Crud from './components/Crud/Crud'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './utils/Api'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
function App() {
  const [user] = useAuthState(auth)
  return (
    <>
    <div className="App">
      {user ? <Crud/>:  <SingIn/> }
    </div>
    <ToastContainer />
    </>
  )
}

export default App
