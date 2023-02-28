import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Heading from 'components/Heading';
import Stepper from 'components/Stepper';
import StyledLink from 'components/StyledLink';
import dayjs from 'dayjs';
import { RootState, useAppSelector } from 'store/index';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0px 36px;
  margin-top: 80px;
  min-height: 364px;
`;

const ResultTypo = styled(Typography)`
  min-height: 32px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: -0.05px;
  text-align: center;

  color: rgba(0, 0, 0, 0.87);

  & .MuiTypography-root {
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 20px;
    line-height: 160%;

    letter-spacing: -0.05px;
    color: #ef5350;
  }
`;

const ResultThanksTypo = styled(Typography)`
  min-height: 48px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-align: center;

  color: rgba(0, 0, 0, 0.87);

  & .MuiTypography-root {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;

    letter-spacing: -0.04px;
    color: #1e88e5;
  }
`;

const SuggestAppTypo = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);

  margin-bottom: 24px;

  & .MuiTypography-root {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.04px;
    color: #d32f2f;
    text-decoration: none;
  }
`;

const ResultFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  min-height: 52;
`;

const ResultFrameItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 0px;
  gap: 4px;

  min-height: 52px;
`;

const FrameItemKey = styled(Typography)`
  height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const FrameItemValue = styled(Typography)`
  height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
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

  max-width: 160px;
  min-height: 36px;

  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
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

  max-width: 219px;
  min-height: 36px;

  background: #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
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

const InjectionRegistrationStep3 = () => {
  const selectUser = useAppSelector((state: RootState) => state.user.userInfo);
  const selectInjectionRegistrationInfo = useAppSelector(
    (state: RootState) => state.injectionRegistration.injectionRegistrationInfo
  );

  const exportPDF = () => {
    const inputFile: HTMLElement | null = document.getElementById('pdf');
    if (inputFile) {
      html2canvas(inputFile).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const PdfFile = new jsPDF();
        PdfFile.addImage(imgData, 'JEPG', 5, 40, 200, 60);
        PdfFile.save('Thông tin đăng ký tiêm chủng.pdf');
      });
    }
  };

  return (
    <div>
      <Heading />
      <Stepper step={3} />
      <ResultContainer id="pdf">
        <ResultTypo>
          Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là{' '}
          <Typography component="span">
            {selectInjectionRegistrationInfo.injection_register_code}
          </Typography>
          .
        </ResultTypo>
        <ResultThanksTypo>
          Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y
          tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối
          tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ
          liên hệ với quý khách theo số điện thoại{' '}
          <Typography component="span">0123456789</Typography> khi có kế hoạch
          tiêm trong thời gian sớm nhất.
        </ResultThanksTypo>
        <SuggestAppTypo>
          Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại{' '}
          <Typography
            component="a"
            href="https://hssk.kcb.vn/#/sskdt"
            target={'_blank'}>
            https://hssk.kcb.vn/#/sskdt
          </Typography>{' '}
          để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng
          COVID-19
        </SuggestAppTypo>
        <ResultFrame>
          <ResultFrameItem>
            <FrameItemKey>Họ và tên</FrameItemKey>
            <FrameItemValue>{selectUser.fullname}</FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Ngày sinh</FrameItemKey>
            <FrameItemValue>
              {dayjs(selectUser.birthday).format('DD/MM/YYYY')}
            </FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Giới tính</FrameItemKey>
            <FrameItemValue>{selectUser.gender}</FrameItemValue>
          </ResultFrameItem>
        </ResultFrame>
        <ResultFrame>
          <ResultFrameItem>
            <FrameItemKey>Số CMND/CCCD/Mã định danh công dân</FrameItemKey>
            <FrameItemValue>{selectUser.identification_card}</FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Số thẻ BHYT</FrameItemKey>
            <FrameItemValue>
              {selectUser.health_insurance_number}
            </FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey></FrameItemKey>
            <FrameItemValue></FrameItemValue>
          </ResultFrameItem>
        </ResultFrame>
        <ResultFrame>
          <ResultFrameItem>
            <FrameItemKey>Tỉnh/Thành phố</FrameItemKey>
            <FrameItemValue>{selectUser.province_name} </FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Quận/Huyện</FrameItemKey>
            <FrameItemValue>{selectUser.district_name}</FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Xã/Phường</FrameItemKey>
            <FrameItemValue>{selectUser.ward_name}</FrameItemValue>
          </ResultFrameItem>
        </ResultFrame>
      </ResultContainer>
      <SubmitContainer>
        <StyledLink to="/">
          <BackSubmitButton>
            <ArrowBackIcon />
            Trang Chủ
          </BackSubmitButton>
        </StyledLink>
        <ContinueSubmitButton onClick={exportPDF}>
          Xuất thông tin
          <ArrowForwardIcon />
        </ContinueSubmitButton>
      </SubmitContainer>
    </div>
  );
};

export default InjectionRegistrationStep3;
