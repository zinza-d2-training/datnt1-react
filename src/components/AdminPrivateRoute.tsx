import { Navigate, Outlet } from 'react-router-dom';
import { RootState, useAppSelector } from 'store';

import useAccessToken from 'hooks/useAccessToken';

const AdminPrivateRoute = () => {
  const selectAdminRole = useAppSelector(
    (state: RootState) => state.user.userInfo.role_id
  );

  const isLogin = useAccessToken();

  return isLogin === null ? (
    <Navigate to="/login" />
  ) : selectAdminRole === 2 ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/document" />
  );
};

export default AdminPrivateRoute;
