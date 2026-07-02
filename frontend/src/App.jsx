import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import './App.css';
import CreateEmployee from './components/CreateEmployee';
import UpdateEmployee from './components/UpdateEmployee';

function PrivateRouter({ children})
{
    return localStorage.getItem("logged") ? children : <Navigate to="/login"></Navigate>;
}

function App()
{
   return(
    <div className='bg-color'>
          <BrowserRouter>
            <Header/>
              <Routes>
                <Route path="/login" element={<Login/>}></Route>
                {/* protected Pages */}
                <Route path="/" element={<PrivateRouter><EmployeeList/></PrivateRouter>}></Route>
                <Route path="/add-emp" element={<PrivateRouter><CreateEmployee/></PrivateRouter>}></Route>
                <Route path="/update-emp/:id" element={<PrivateRouter><UpdateEmployee/></PrivateRouter>}></Route>
              </Routes>
            <Footer/>
          </BrowserRouter>
    </div>
   )
}
export default App;
