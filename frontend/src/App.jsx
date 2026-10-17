import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { CoursesPage } from './pages/CoursesPage.jsx';
import { CourseDetailPage } from './pages/CourseDetailPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:id" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
