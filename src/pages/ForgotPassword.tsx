import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import StyledLink from 'components/StyledLink';
import { forgotPasswordAsync } from 'features/user/forgotPasswordSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/index';
import * as yup from 'yup';

const SideRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;
  gap: 24px;

  max-width: 68.4%;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
`;

const HeaderTypography = styled(Typography)`
  max-width: 399px;
  min-height: 48px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;
  color: rgba(0, 0, 0, 0.87);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  width: 100%;
`;

const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 100%;
`;

const Field = styled(TextField)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 3px;
`;

const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 16px;

  width: 100%;
  height: 60px;

  & .css-1x9d9yr-MuiButtonBase-root-MuiButton-root:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
  }
`;

const ButtonBack = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;

  max-width: 101px;
  height: 36px;

  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;
`;

const ButtonBackTypography = styled(Typography)`
  min-width: 69px;
  height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;
  color: #303f9f;
`;

const ButtonSend = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 32px;
  gap: 4px;

  max-width: 91px;
  height: 36px;

  background: #303f9f;
  border-radius: 8px 8px 8px 0px;
`;

const ButtonSendTypography = styled(Typography)`
  min-width: 27px;
  height: 24px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;
  color: #ffffff;
`;

type EmailFormInputs = {
  email: string;
};

const emailSchema = yup.object().shape({
  email: yup.string().email().required('Email không được bỏ trống')
});

const ForgotPassword = () => {
  const [isRequest, seIsRequest] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<EmailFormInputs>({
    resolver: yupResolver(emailSchema)
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick: SubmitHandler<EmailFormInputs> = (
    data: EmailFormInputs
  ) => {
    seIsRequest(true);
    dispatch(forgotPasswordAsync(data));
    setTimeout(() => {
      navigate('/login');
      seIsRequest(false);
    }, 2000);
  };

  return (
    <SideRightContainer>
      <Header>
        <HeaderTypography>
          <Typography>
            Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng
            ký{' '}
            <Typography component="span" sx={{ color: '#cf3430' }}>
              (*)
            </Typography>
          </Typography>
        </HeaderTypography>
      </Header>
      <Form>
        <InputComponent>
          <Field
            id="email"
            variant="outlined"
            placeholder="Email"
            required
            fullWidth
            helperText={errors.email?.message && errors.email.message}
            {...register('email')}
          />
        </InputComponent>
      </Form>
      <DialogActions>
        <ButtonBack>
          <StyledLink to="/login">
            <ButtonBackTypography>QUAY LẠI</ButtonBackTypography>
          </StyledLink>
        </ButtonBack>
        <ButtonSend
          onClick={handleSubmit(handleClick)}
          disabled={!isValid || isRequest}>
          <ButtonSendTypography>GỬI</ButtonSendTypography>
        </ButtonSend>
      </DialogActions>
    </SideRightContainer>
  );
};

export default ForgotPassword;
