import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import StyledLink from 'components/StyledLink';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

type EmailValues = {
  email: string;
};

const emailSchema = yup.object().shape({
  email: yup.string().email().required('Email kh??ng ???????c b??? tr???ng')
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

  const navigate = useNavigate();

  const handleClick = () => {
    seIsRequest(true);
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
            ????? kh??i ph???c m???t kh???u, vui l??ng nh???p ????ng email b???n ???? d??ng ????? ????ng
            k??{' '}
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
            <ButtonBackTypography>QUAY L???I</ButtonBackTypography>
          </StyledLink>
        </ButtonBack>
        <ButtonSend onClick={handleClick} disabled={!isValid || isRequest}>
          <ButtonSendTypography>G???I</ButtonSendTypography>
        </ButtonSend>
      </DialogActions>
    </SideRightContainer>
  );
};

export default ForgotPassword;
