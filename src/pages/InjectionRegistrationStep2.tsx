import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Hospital from 'assets/img/hospital.png';
import Shield from 'assets/img/shield.png';
import Vaccine from 'assets/img/vaccine2.png';
import Heading from 'components/Heading';
import Stepper from 'components/Stepper';
import StyledLink from 'components/StyledLink';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  padding: 0px 36px;
  margin-top: 80px;
  width: 100%;
  min-height: 288px;
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
`;

const ResultContent = styled(Typography)`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: #eeeeee;
`;

const ResultConfirm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;

  min-height: 42px;

  & .MuiFormControlLabel-root {
    margin: 0;
  }

  & .MuiFormControlLabel-root .MuiTypography-root {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.15px;

    color: rgba(0, 0, 0, 0.87);
  }
`;

const ResultConfirmTypo = styled(Typography)`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0px 0px;
  gap: 16px;
  width: 100%;
  min-height: 60px;
  margin-bottom: 918px;
`;

const BackSubmitButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;

  max-width: 140px;
  height: 36px;

  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;

  color: #303f9f;
`;

const ContinueSubmitButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 32px;
  gap: 4px;

  max-width: 170px;
  height: 36px;

  background: #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;

  color: #fff;

  &:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
  }
`;

interface PolicyInputs {
  policy: boolean;
}

const PolicySchema = yup.object().shape({
  policy: yup.boolean().oneOf([true], '(T??ch v??o ?? ????? ti???p t???c)')
});

const InjectionRegistrationStep2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PolicyInputs>({
    resolver: yupResolver(PolicySchema)
  });

  const navigate = useNavigate();

  const onSubmit = () => {
    if (isValid) {
      navigate('/injection-registration/step3');
    }
  };

  return (
    <div>
      <Heading />
      <Stepper step={2} />

      <ResultContainer>
        <ResultItem>
          <Logo src={Shield} alt="" />
          <ResultContent>
            1. Ti??m ch???ng v???c xin l?? bi???n ph??p ph??ng ch???ng d???ch hi???u qu???, tuy
            nhi??n v???c xin ph??ng COVID-19 c?? th??? kh??ng ph??ng ???????c b???nh ho??n to??n.
            Ng?????i ???????c ti??m ch???ng v???c xin ph??ng COVID-19 c?? th??? ph??ng ???????c b???nh
            ho???c gi???m m???c ????? n???ng n???u m???c b???nh. Tuy nhi??n, sau khi ti??m ch???ng
            v???n ph???i ti???p t???c th???c hi???n nghi??m c??c bi???n ph??p ph??ng ch???ng d???ch
            theo quy ?????nh.
          </ResultContent>
        </ResultItem>
        <ResultItem>
          <Logo src={Vaccine} alt="" />
          <ResultContent>
            2. Ti??m ch???ng v???c xin ph??ng COVID-19 c?? th??? g??y ra m???t s??? bi???u hi???n
            t???i ch??? ti??m ho???c to??n th??n nh?? s??ng, ??au ch??? ti??m, nh???c ?????u, bu???n
            n??n, s???t, ??au c?????ho???c tai bi???n n???ng sau ti??m ch???ng. Ti??m v???c xin m??i
            2 do Pfizer s???n xu???t ??? ng?????i ???? ti??m m??i 1 b???ng v???c xin AstraZeneca
            c?? th??? t??ng kh??? n??ng x???y ra ph???n ???ng th??ng th?????ng sau ti??m ch???ng.
          </ResultContent>
        </ResultItem>
        <ResultItem>
          <Logo src={Hospital} alt="" />
          <ResultContent>
            3. Khi c?? tri???u ch???ng b???t th?????ng v??? s???c kh???e, ng?????i ???????c ti??m ch???ng
            c???n ?????n ngay c?? s??? y t??? g???n nh???t ????? ???????c t?? v???n, th??m kh??m v?? ??i???u
            tr??? k???p th???i.
          </ResultContent>
        </ResultItem>
        <Divider />
        <ResultConfirm>
          <ResultConfirmTypo>
            Sau khi ???? ?????c c??c th??ng tin n??u tr??n, t??i ???? hi???u v??? c??c nguy c??
            v??:{' '}
          </ResultConfirmTypo>
          <FormControlLabel
            control={<Checkbox {...register('policy')} />}
            label="?????ng ?? ti??m ch???ng"
          />
          {errors.policy && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.policy.message}
            </FormHelperText>
          )}
        </ResultConfirm>
      </ResultContainer>
      <SubmitContainer>
        <StyledLink to="/injection-registration/step1">
          <BackSubmitButton>
            <ArrowBackIcon />
            Quay l???i
          </BackSubmitButton>
        </StyledLink>
        <ContinueSubmitButton onClick={handleSubmit(onSubmit)}>
          Ti???p t???c
          <ArrowForwardIcon />
        </ContinueSubmitButton>
      </SubmitContainer>
    </div>
  );
};

export default InjectionRegistrationStep2;
