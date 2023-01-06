import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Typography, Button, TextField, setRef } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import loginImg from 'assets/img/login.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 100vw;
  height: 1000px;
`;

const SideLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  width: 700px;
  height: 1000px;
`;
const Image = styled.img`
  width: 100%;
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

  width: 479px;
  height: 206px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;

  width: 479px;
  height: 48px;
`;

const HeaderTypography = styled(Typography)`
  /* Typography (body1) */

  width: 399px;
  height: 48px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  /* or 24px */

  text-align: center;
  letter-spacing: -0.04px;

  /* Text/Primary */

  color: rgba(0, 0, 0, 0.87);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  width: 479px;
  height: 50px;
`;

const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 479px;
  height: 50px;
`;

const Field = styled(TextField)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 3px;

  width: 100%;
  height: 50px;
`;

const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 16px;

  width: 479px;
  height: 60px;
`;

const ButtonBack = styled(Button)`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;

  width: 101px;
  height: 36px;

  /* Indigo / 700 */

  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;
`;

const ButtonBackTypography = styled(Typography)`
  min-width: 69px;
  height: 24px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */
  letter-spacing: -0.04px;
  text-transform: uppercase;
  /* Indigo / 700 */
  color: #303f9f;
`;

const ButtonSend = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 32px;
  gap: 4px;

  width: 91px;
  height: 36px;

  /* Indigo / 700 */

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
  /* identical to box height, or 24px */

  letter-spacing: -0.04px;
  text-transform: uppercase;

  /* White */

  color: #ffffff;
`;

type EmailValues = {
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
    watch,
    formState: { errors, isValid }
  } = useForm<EmailValues>({
    resolver: yupResolver(emailSchema)
  });

  // const emailInput = watch('email');

  const navigate = useNavigate();

  const handleClick = () => {
    console.log('come to login ');
    seIsRequest(true);
    setTimeout(() => {
      navigate('/login');
      seIsRequest(false);
    }, 2000);
  };

  // useEffect(() => {
  //   const timer = setTimeOut(() => {

  //   },300)
  // },[])

  return (
    <Container>
      <SideLeft>
        <Image src={loginImg} />
      </SideLeft>
      <SideRight>
        <SideRightContainer>
          <Header>
            <HeaderTypography>
              <Typography>
                Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để
                đăng ký (*)
              </Typography>
            </HeaderTypography>
          </Header>
          <Form>
            <InputComponent>
              <TextField
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
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <ButtonBackTypography>QUAY LẠI</ButtonBackTypography>
              </Link>
            </ButtonBack>
            <ButtonSend onClick={handleClick} disabled={!isValid || isRequest}>
              <ButtonSendTypography>GỬI</ButtonSendTypography>
            </ButtonSend>
          </DialogActions>
        </SideRightContainer>
      </SideRight>
    </Container>
  );
};

export default ForgotPassword;
