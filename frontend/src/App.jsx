import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentRegistrationLogin from './components/Student/StudentRegistrationLogin';
import TeacherRegistrationLogin from './components/Teacher/TeacherRegistrationLogin';
import InstitutionRegistrationLogin from './components/Institution/InstitutionRegistrationLogin';
import CenterRegistrationLogin from './components/Center/CenterRegistrationLogin';
import StudentHome from './pages/StudentHome';
import InstitutionsList from './components/Student/InstitutionsList';
import InstitutionDetails from "./components/Student/InstitutionDetails";
import CentersList from "./components/Student/CentersList";
import CenterDetails from "./components/Student/CenterDetails";
import MaterialList from './components/Student/MaterialList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/register" element={<StudentRegistrationLogin />} />    
        <Route path="/teacher/register" element={<TeacherRegistrationLogin />} />  
        <Route path="/institution/register" element={<InstitutionRegistrationLogin />} />  
        <Route path="/center/register" element={<CenterRegistrationLogin />} />  
        <Route path="/student/home" element={<StudentHome />} /> 
        <Route path="/student/institution" element={<InstitutionsList />} />
        <Route path="/student/institution/:id" element={<InstitutionDetails/>} /> 
        <Route path="/student/centre" element={<CentersList />} />
        <Route path="/student/center/:id" element={<CenterDetails />} />
        <Route path="/student/materials" element={<MaterialList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;