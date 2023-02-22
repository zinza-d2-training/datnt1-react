import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

import { publicRequest } from 'callsApi';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ConfirmResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [open, setOpen] = useState(true);

  const parsedSearch = queryString.parse(location.search);

  useEffect(() => {
    async function callResetPasswordApi() {
      try {
        await publicRequest.get(
          `forgot-password/reset-password?token=${parsedSearch.token}`
        );

        setIsSuccess(true);
      } catch (error) {
        setIsFail(true);
      }
    }
    callResetPasswordApi();
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {isSuccess && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}>
            Xác đặt lại mật khẩu thành công! Vào email để nhận mật khẩu mới.
          </Alert>
        </Snackbar>
      )}
      {isFail && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: '100%' }}>
            Bạn đã xác nhận đặt lại mật khẩu thành công hoặc mã token đã hết hạn
            ! Vào email để nhận mật khẩu mới hoặc truy cập lại trang quên mật
            khẩu.
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default ConfirmResetPassword;
