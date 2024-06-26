import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentRegistration from './components/Student/StudentRegistration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/register" element={<StudentRegistration />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;