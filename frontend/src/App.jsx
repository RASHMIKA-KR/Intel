import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentRegistration from './components/Student/StudentRegistration';
import StudentHome from './pages/StudentHome';
import InstitutionsList from "./components/Student/InstitutionsList"; // Placeholder for institutions list component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/register" element={<StudentRegistration />} /> 
        <Route path="/student/home" element={<StudentHome />} />   
        <Route path="/students/institution" element={<InstitutionsList/>} />
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;