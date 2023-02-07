import { publicRequest } from 'callsApi';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const ConfirmResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const parsedSearch = queryString.parse(location.search);

  useEffect(() => {
    async function callResetPasswordApi() {
      try {
        await publicRequest.get(
          `forgot-password/reset-password?token=${parsedSearch.token}`
        );
        alert(
          'Xác đặt lại mật khẩu thành công! Vào email để nhận mật khẩu mới.'
        );
        navigate('/login');
      } catch (error) {
        alert(
          'Bạn đã xác nhận đặt lại mật khẩu thành công hoặc mã token đã hết hạn ! Vào email để nhận mật khẩu mới hoặc truy cập lại trang quên mật khẩu.'
        );
      }
    }
    callResetPasswordApi();
  }, []);

  return <div>Confirm Reset PassWord</div>;
};

export default ConfirmResetPassword;
