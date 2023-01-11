import React from 'react';
import styled from '@emotion/styled';
import { Typography, Button, TextField } from '@mui/material';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Heading from 'components/Heading';
import Stepper from 'components/Stepper';

const ResultContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 36px;
  margin-top: 80px;

  max-width: 100vw;
  min-height: 531px;
`;

const Result = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  width: 100%;
  min-height: 471px;

  background: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 100%;
  min-height: 471px;
`;

const InfoTypo = styled(Typography)``;

const Frame = styled.div``;

const InputComponent = styled.div``;

const Label = styled.label``;

const Field = styled(TextField)``;

const NoteTypo = styled(Typography)``;

const FrameNote = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FrameNoteTypo = styled(Typography)``;

const SubmitContainer = styled.div``;

const CancelSubmitButton = styled(Button)``;

const ContinueSubmitButton = styled(Button)``;

const InjectionRegistrationStep1 = () => {
  return (
    <div>
      <Header />
      <Heading />
      <Stepper />

      <ResultContainer>
        <Result>
          <Form>
            <InfoTypo>1. Thông tin người đăng ký tiêm</InfoTypo>
            <Frame>
              <InputComponent>
                <Label>Nhóm ưu tiên (*)</Label>
                <Field></Field>
              </InputComponent>
              <InputComponent>
                <Label>Số thẻ BHYT</Label>
                <Field></Field>
              </InputComponent>
            </Frame>
            <Frame>
              <InputComponent>
                <Label>Nghề nghiệp</Label>
                <Field></Field>
              </InputComponent>
              <InputComponent>
                <Label>Đơn vị công tác</Label>
                <Field></Field>
              </InputComponent>
              <InputComponent>
                <Label>Địa chỉ hiện tại</Label>
                <Field></Field>
              </InputComponent>
            </Frame>
            <InfoTypo>2. Thông tin đăng ký tiêm chủng</InfoTypo>
            <Frame>
              <InputComponent>
                <Label>Ngày muốn được tiêm (dự kiến)</Label>
                <Field></Field>
              </InputComponent>
              <InputComponent>
                <Label>Buổi tiêm mong muốn</Label>
                <Field></Field>
              </InputComponent>
            </Frame>
            <NoteTypo>Lưu ý:</NoteTypo>
            {/* <FrameNote>
            <li>
              <FrameNoteTypo>
                Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến
                dịch tiêm chủng Vắc xin COVID - 19
              </FrameNoteTypo>
            </li>{' '}
            <li>
              <FrameNoteTypo>
                Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên,
                Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh
                công dân/HC ...)
              </FrameNoteTypo>
            </li>{' '}
            <li>
              <FrameNoteTypo>
                Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu
                trách nhiệm với các thông tin đã cung cấp.{' '}
              </FrameNoteTypo>
            </li>{' '}
            <li>
              <FrameNoteTypo>
                Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào
                danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc
                xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn! dịch
                tiêm chủng Vắc xin COVID - 19 Xin vui lòng kiểm tra kỹ các thông
                tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại,
                Số CMND/CCCD/Mã định danh công dân/HC ...) Bằng việc nhấn nút
                "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với
                các thông tin đã cung cấp. Cá nhân/Tổ chức đăng ký thành công
                trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ
                thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê
                duyệt. Trân trọng cảm ơn!
              </FrameNoteTypo>
            </li>
          </FrameNote> */}
          </Form>
        </Result>
        {/* <SubmitContainer>
          <CancelSubmitButton>Hủy bỏ</CancelSubmitButton>
          <ContinueSubmitButton>Tiếp tục</ContinueSubmitButton>
        </SubmitContainer> */}
      </ResultContainer>

      <Footer />
    </div>
  );
};

export default InjectionRegistrationStep1;
