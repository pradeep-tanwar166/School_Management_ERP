import Home from './pages/Home'
import Admission from './pages/Admission'
import Fees from './pages/Fees';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import StudentRecords from './pages/StudentRecords';
import FeesRecords from './pages/FeesRecords';
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./components/PrivateRoutes";
import { Toaster } from 'sonner';


function App() {
  return (
    <div>
      <Toaster   position="top-right"
        richColors
        closeButton
        duration={3000}/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
 <Route path='/signup' element={<Signup/>}></Route>
            <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/admission" element={<Admission/>}></Route>
        <Route path="/fees" element={<Fees/>}></Route>
        <Route path="/studentrecords" element={<StudentRecords/>}></Route>
        <Route path="/feesrecords" element={<FeesRecords/>}></Route>
      
        
        </Route>
      </Routes>
     
    </div>
  )
}

export default App
