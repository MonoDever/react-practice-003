import { Route,Routes } from 'react-router-dom';
import RegisterPage from '../Views/Login/RegisterPage'
import LoginPage from '../Views/Login/LoginPage';
import ForgotPasswordPage from '../Views/Login/ForgotPasswordPage';
import ResetPasswordPage from '../Views/Login/ResetPasswordPage';
import UserInformationPage from '../Views/Login/UserInformationPage';
import NewProduct from '../Views/Product/NewProduct';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/forgotpassword' element={<ForgotPasswordPage />}/>
        <Route path='/resetpassword' element={<ResetPasswordPage />}/>
        <Route path='/userInformation' element={<UserInformationPage />}/>
        <Route path='/newproduct' element={<NewProduct />}/>
      </Routes>
    </div>
  )
}