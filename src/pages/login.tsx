import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Typography, Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import loginImg from 'assets/img/login.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: relative;
  width: 1400px;
  height: 1000px;

  background: #ffffff;
`;
const SideLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  width: 700px;
  height: 1000px;

  flex: 1;
`;
const Image = styled.img`
  width: 720px;
  height: 1000px;
`;
const SideRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 700px;
  height: 1000px;
`;

const SideRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 376px;
  height: 526px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 376px;
  height: 42px;
`;

const HeaderText = styled(Typography)`
  width: 376px;
  height: 42px;
  font-family: Roboto;
  font-style: normal;
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
  width: 376px;
`;

const InputComponent = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  width: 376px;
  /* height: 102px; */
  background: #ffffff;
`;

const Label = styled.label`
  width: 376px;
  height: 24px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  color: rgba(0, 0, 0, 0.87);
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  width: 376px;
  height: 20px;
  background: #ffffff;
`;

const LinkTypography = styled(Typography)`
  width: '101px';
  height: '20px';
  font-family: 'Roboto';
  font-weight: '400';
  font-size: '14px';
  line-height: '143%';
  text-align: 'right';
  letter-spacing: '-0.04px';
  color: '#3949AB';
`;

const LoginBtn = styled(Button)`
  width: 376px;
  height: 50px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  background: #66bb6a;
  &:hover {
    background: #66bb6a;
  }
`;

const RegisterBtn = styled(Button)`
  width: 376px;
  height: 50px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #9ccc65;
  border-radius: 5px;
`;

const SuggestTypography = styled(Typography)`
  width: 376px;
  height: 24px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;
  color: rgba(0, 0, 0, 0.87);
`;

const RegisterTypography = styled(Typography)`
  width: 376px;
  height: 24px;
  font-family: Roboto;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;
  color: #9ccc65;
`;

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('Email không được bỏ trống'),
  password: yup
    .string()
    .required('Mật khẩu không được bỏ trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .trim()
  // .matches(/^(?!.* )(?=.*\d)(?=.*[A-Z])$/, 'Mật khẩu không hợp lệ')
});

const Login = () => {
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setDisabled(false);
    if (!isValid) setDisabled(true);
  });

  useEffect(() => {
    setDisabled(false);
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // login
    console.log(data);
  };

  return (
    <Container>
      <SideLeft>
        <Image src={loginImg} alt="img" />
      </SideLeft>
      <SideRight>
        <SideRightContainer>
          <Header>
            <HeaderText>Đăng nhập vào tài khoản</HeaderText>
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
              />
            </InputComponent>
            <InputComponent>
              <Label htmlFor="password">Mật khẩu</Label>
              <TextField
                id="password"
                variant="outlined"
                type="password"
                placeholder="**************"
                fullWidth
                helperText={errors.password?.message && errors.password.message}
                {...register('password')}
              />
            </InputComponent>
            <Links>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                <LinkTypography>Quên mật khẩu?</LinkTypography>
              </Link>
            </Links>
            <LoginBtn onClick={handleSubmit(onSubmit)} disabled={disabled}>
              Đăng nhập
            </LoginBtn>
          </Form>
          <SuggestTypography>
            Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký !
          </SuggestTypography>
          <RegisterBtn>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <RegisterTypography>Đăng ký</RegisterTypography>
            </Link>
          </RegisterBtn>
        </SideRightContainer>
      </SideRight>
    </Container>
  );
};

export default Login;
