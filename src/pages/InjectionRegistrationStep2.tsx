import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Hospital from 'assets/img/hospital.png';
import Shield from 'assets/img/shield.png';
import Vaccine from 'assets/img/vaccine2.png';
import Footer from 'components/Footer';
import Header from 'components/Header';
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
  width: 100vw;
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

  /* Indigo / 700 */

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

  /* Indigo / 700 */

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
`;

const InjectionRegistrationStep2 = () => {
  return (
    <div>
      <Header />
      <Heading />
      <Stepper />

      <ResultContainer>
        <ResultItem>
          <Logo src={Shield} alt="" />
          <ResultContent>
            1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy
            nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn.
            Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh
            hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng
            vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch
            theo quy định.
          </ResultContent>
        </ResultItem>
        <ResultItem>
          <Logo src={Vaccine} alt="" />
          <ResultContent>
            2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện
            tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn
            nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi
            2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca
            có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.
          </ResultContent>
        </ResultItem>
        <ResultItem>
          <Logo src={Hospital} alt="" />
          <ResultContent>
            3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng
            cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều
            trị kịp thời.
          </ResultContent>
        </ResultItem>
        <Divider />
        <ResultConfirm>
          <ResultConfirmTypo>
            Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ
            và:{' '}
          </ResultConfirmTypo>
          <FormControlLabel control={<Checkbox />} label="Đồng ý tiêm chủng" />
        </ResultConfirm>
      </ResultContainer>
      <SubmitContainer>
        <StyledLink to="/injection-registration/step1">
          <BackSubmitButton>
            <ArrowBackIcon />
            Quay lại
          </BackSubmitButton>
        </StyledLink>
        <StyledLink to="/injection-registration/step3">
          <ContinueSubmitButton>
            Tiếp tục
            <ArrowForwardIcon />
          </ContinueSubmitButton>
        </StyledLink>
      </SubmitContainer>

      <Footer />
    </div>
  );
};

export default InjectionRegistrationStep2;
