import CourseList from './pages/CourseList.tsx';
import Contact from './pages/Contact.tsx';
import About from './pages/About.tsx';
import CoursePage from './pages/CoursePage.tsx';
import ChangeLog from './pages/ChangeLog.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound.tsx';
import Home from './pages/Home.tsx';
import UsageGuide from './pages/UsageGuide.tsx';
import DataTransparency from './pages/DataTransparency.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import ReactGA from 'react-ga4';

const App = () => {

  const TRACKING_ID = 'G-9NYXVBNR4G';
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send({hitType: 'pageview', page: "/"});


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/course/*" element={<CoursePage />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/courses/*" element={<CourseList/>} />
        <Route path="/changelog" element={<ChangeLog/>} /> 
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/usage-guide" element={<UsageGuide/>} />
        <Route path="/data-transparency" element={<DataTransparency/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
