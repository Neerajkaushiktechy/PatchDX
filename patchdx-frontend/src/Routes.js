import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './views/pages/account/LoginPage';
import SidebarLayout from './route-layout/SidebarLayout';
import Header from './views/pages/header/Header';
import HomeRoutes from './routes/Home';
import QuestionnaireForm from './views/pages/questionnaireForm/QuestionnaireForm';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:patientId/:questionnaireId" element={<QuestionnaireForm />} />
        <Route path="/" element={<ProtectedRoute />} >
          <Route path="/clinic" element={<SidebarLayout />} >
            <Route path="*" element={<HomeRoutes />} />
          </Route>
          <Route path="/" element={<Header />} >
            {/* <Route path="*" element={<HomeRoutes />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;