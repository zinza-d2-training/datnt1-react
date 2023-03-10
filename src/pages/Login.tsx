import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import StyledLink from 'components/StyledLink';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const SideRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;
  gap: 24px;
  max-width: 53.7%;
  min-height: 100vh;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
`;

const HeaderText = styled(Typography)`
  max-width: 376px;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 33px;
  line-height: 123.5%;
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
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 100%;
  background: #ffffff;
`;

const Label = styled.label`
  max-width: 376px;
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  min-height: 20px;
  background: #ffffff;
  width: 100%;
`;

const LinkTypography = styled(Typography)`
  max-width: 101px;
  min-height: 20px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  text-align: right;
  letter-spacing: -0.04px;
  color: #3949ab;
`;

const LoginBtn = styled(Button)`
  max-width: 376px;
  min-height: 50px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  background: #66bb6a;
  &:hover {
    background: #66bb6a;
  }
  text-transform: none;
`;

const RegisterBtn = styled(Button)`
  max-width: 376px;
  min-height: 50px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #9ccc65;
  border-radius: 5px;
  text-transform: none;
`;

const SuggestTypography = styled(Typography)`
  width: 100%;
  min-height: 24px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;
  color: rgba(0, 0, 0, 0.87);
`;

const RegisterTypography = styled(Typography)`
  max-width: 376px;
  min-height: 24px;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;
  color: #9ccc65;
`;

interface LoginFormInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email kh??ng ???????c b??? tr???ng'),
  password: yup
    .string()
    .required('M???t kh???u kh??ng ???????c b??? tr???ng')
    .min(8, 'M???t kh???u ph???i c?? ??t nh???t 8 k?? t???')
    .trim()
  // .matches(/^(?!.* )(?=.*\d)(?=.*[A-Z])$/, 'M???t kh???u kh??ng h???p l???')
});

const Login = () => {
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema)
  });

  useEffect(() => {
    setDisabled(false);
    if (!isValid) setDisabled(true);
  });

  useEffect(() => {
    setDisabled(false);
  }, []);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // login
  };

  return (
    <SideRightContainer>
      <Header>
        <HeaderText>????ng nh???p v??o t??i kho???n</HeaderText>
      </Header>
      <Form>
        <InputComponent>
          <Label htmlFor="email">Email</Label>
          <TextField
            id="email"
            variant="outlined"
            placeholder="user@gmail.com"
            type="text"
            required
            fullWidth
            helperText={errors.email?.message && errors.email.message}
            {...register('email')}
            FormHelperTextProps={{
              sx: { color: '#d32f2f', margin: '3px 0px 0px' }
            }}
          />
        </InputComponent>
        <InputComponent>
          <Label htmlFor="password">M???t kh???u</Label>
          <TextField
            id="password"
            variant="outlined"
            type="password"
            placeholder="**************"
            fullWidth
            helperText={errors.password?.message && errors.password.message}
            {...register('password')}
            FormHelperTextProps={{
              sx: { color: '#d32f2f', margin: '3px 0px 0px' }
            }}
          />
        </InputComponent>
        <Links>
          <StyledLink to="/forgot-password">
            <LinkTypography>Qu??n m???t kh???u?</LinkTypography>
          </StyledLink>
        </Links>
        <LoginBtn
          fullWidth
          onClick={handleSubmit(onSubmit)}
          disabled={disabled}>
          ????ng nh???p
        </LoginBtn>
      </Form>
      <SuggestTypography>
        Ho???c ????ng k?? t??i kho???n, n???u b???n ch??a ????ng k?? !
      </SuggestTypography>
      <RegisterBtn fullWidth>
        <StyledLink to="/register">
          <RegisterTypography>????ng k??</RegisterTypography>
        </StyledLink>
      </RegisterBtn>
    </SideRightContainer>
  );
};

export default Login;
