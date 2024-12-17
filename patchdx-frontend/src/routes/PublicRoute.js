import { Navigate, Outlet } from "react-router-dom";
import AuthService from '../service/AuthService/AuthService';
const PublicRoute = ({ redirectPath = '/login' }) => {
    if (AuthService?.getAuthtoken()?.isToken) {
        return <Navigate to={AuthService?.getAuthtoken()?.isToken ? "/cases"  : redirectPath} replace />;
    }
    return <Outlet />;
};
export default PublicRoute;