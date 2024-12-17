import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from '../service/authService/AuthService';

const ProtectedRoute = ({ redirectPath="/" }) => {
    const location = useLocation();
    if (!AuthService.getAuthtoken()?.isToken) {
        return <Navigate to={redirectPath}
            replace
            state={{ from: location }} />;
    }
    return <Outlet />;
};
export default ProtectedRoute;