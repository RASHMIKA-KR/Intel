import { BrowserRouter, Route, Routes } from 'react-router-dom';
//loginPage
import LandingPage from './pages/LandingPage';
import StudentRegistrationLogin from './components/Student/StudentRegistrationLogin';
import TeacherRegistrationLogin from './components/Teacher/TeacherRegistrationLogin';
import InstitutionRegistrationLogin from './components/Institution/InstitutionRegistrationLogin';
import CenterRegistrationLogin from './components/Center/CenterRegistrationLogin';

//students
import StudentHome from './pages/StudentHome';
import InstitutionsList from './components/Student/InstitutionsList';
import AdminHome from './pages/AdminHome';
import InstitutionDetails from "./components/Student/InstitutionDetails";
import CentersList from "./components/Student/CentersList";
import CenterDetails from "./components/Student/CenterDetails";
import MaterialList from './components/Student/MaterialList';
import AdminLogin from './components/Admin/AdminLogin';
<<<<<<< HEAD
import ApprovalsPage from './components/Admin/ApprovalsPage';
import InstitutionsPage from './components/Admin/InstitutionsPage';
import CentersPage from './components/Admin/CentersPage';
import InstitutionDetail from './components/Admin/InstitutionDetail';
import CenterDetail from './components/Admin/CenterDetail';

=======
//Institutions
import InstitutionHome from "./pages/InstitutionHome";
//Teacher
import TeacherHome from "./pages/TeacherHome";
//Center
import CenterHome from "./pages/CenterHome";
>>>>>>> 4837aa0272e8b54b7e26e8b0ff85af56dd2c32ab
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/register" element={<StudentRegistrationLogin />} />    
        <Route path="/teacher/register" element={<TeacherRegistrationLogin />} />  
        <Route path="/institution/register" element={<InstitutionRegistrationLogin />} />  
        <Route path="/center/register" element={<CenterRegistrationLogin />} />  
        <Route path="/admin/login" element={<AdminLogin />} /> 
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/admin/home" element={<AdminHome/>}/> 
        <Route path="/student/institution" element={<InstitutionsList />} /> 
        <Route path="/student/home" element={<StudentHome />} /> 
        <Route path="/student/institution" element={<InstitutionsList />} />
        <Route path="/student/institution/:id" element={<InstitutionDetails/>} /> 
        <Route path="/student/centre" element={<CentersList />} />
        <Route path="/student/center/:id" element={<CenterDetails />} />
        <Route path="/student/materials" element={<MaterialList/>}/>
<<<<<<< HEAD
        <Route path="/admin/approvals" element={<ApprovalsPage />} />
        <Route path="/admin/institutions" element={<InstitutionsPage />} />
        <Route path="/admin/centers" element={<CentersPage />} />
        <Route path="/admin/institutions/:id" element={<InstitutionDetail />} />
        <Route path="/admin/centers/:id" element={<CenterDetail />} />

=======

        <Route path="/institution/home" element={<InstitutionHome />} />


        <Route path="/teacher/home" element={<TeacherHome/>} />

        <Route path="/center/home" element={<CenterHome />} />
>>>>>>> 4837aa0272e8b54b7e26e8b0ff85af56dd2c32ab
      </Routes>
    </BrowserRouter>
  );
}

export default App;
