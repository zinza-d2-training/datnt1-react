import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Heading from 'components/Heading';
import Stepper from 'components/Stepper';
import StyledLink from 'components/StyledLink';
import { Dayjs } from 'dayjs';
import { injectionSession, priorityGroup } from 'dummy-data';
import React from 'react';

const ResultContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 36px;
  margin: 80px 0px 675px;

  max-width: 100%;
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

const InfoTypo = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const FormFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  flex-wrap: wrap;
  min-height: 69px;
`;

const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  max-width: 330px;
  width: 330px;
  min-height: 69px;

  background: #ffffff;

  & .MuiInputBase-root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }

  & .MuiSelect-select {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 8px;
    height: 40px;
  }
`;

const PlaceholderTypo = styled(Typography)`
  height: 23px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  color: rgba(0, 0, 0, 0.6);
`;

const Label = styled.label`
  max-width: 330px;
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: rgba(0, 0, 0, 0.87);
`;

const NoteTypo = styled(Typography)`
  height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  color: #d32f2f;
`;

const FrameNote = styled.ul`
  box-sizing: border-box;
  padding: 0px 36px;
  margin: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-height: 96px;
  color: #d32f2f;
`;

const FrameNoteTypo = styled(Typography)`
  max-width: 100%;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: #d32f2f;
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
`;

const CancelSubmitButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;

  max-width: 130px;
  height: 36px;

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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 240,
      width: 330
    }
  }
};

interface InjectionRegisterFormInputs {
  healthInsuranceNumber: number;
  priorityGroup: string;
  ocupation: string;
  workUnit: string;
  address: string;
  estimatedDateInjection: Dayjs | null;
  injectionSession: string;
}

const InjectionRegisterSchema = yup.object().shape({
  healthInsuranceNumber: yup
    .string()
    .required('Số thẻ BHYT không được bỏ trống')
    .matches(/^[0-9]+$/, 'Số thẻ BHYT chỉ được chứa số '),
  priorityGroup: yup.string().required('Nhóm ưu tiên không được bỏ trống'),
  ocupation: yup.string().required('Nghề nghiệp không được bỏ trống'),
  workUnit: yup.string().required('Đơn vị công tác không được bỏ trống'),
  address: yup.string().required('Địa chỉ hiện tại không được bỏ trống'),
  estimatedDateInjection: yup
    .string()
    .required('Ngày tiêm dự kiến không được bỏ trống'),
  injectionSession: yup.string().required('Buổi tiêm không được bỏ trống')
});

const InjectionRegistrationStep1 = () => {
  const [value, setValues] = React.useState<Dayjs | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid }
  } = useForm<InjectionRegisterFormInputs>({
    resolver: yupResolver(InjectionRegisterSchema)
  });

  const navigate = useNavigate();

  const onSubmit = (data: InjectionRegisterFormInputs) => {
    navigate('/injection-registration/step2');
  };

  return (
    <div>
      <Heading />
      <Stepper step={1} />
      <ResultContainer>
        <Result>
          <Form>
            <InfoTypo>1. Thông tin người đăng ký tiêm</InfoTypo>
            <FormFrame>
              <InputComponent>
                <Label htmlFor="priorityGroup">Nhóm ưu tiên (*)</Label>
                <FormControl fullWidth>
                  <Select
                    {...register('priorityGroup')}
                    displayEmpty={true}
                    id="priorityGroup"
                    renderValue={(selected: string) => {
                      if (!selected) {
                        return <PlaceholderTypo>Nhóm ưu tiên</PlaceholderTypo>;
                      }
                      return selected;
                    }}
                    MenuProps={MenuProps}>
                    {priorityGroup.map((group) => (
                      <MenuItem key={group.id} value={group.name}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.injectionSession && (
                    <FormHelperText
                      sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
                      {errors.injectionSession.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputComponent>
              <InputComponent>
                <Label htmlFor="healthInsuranceNumber">Số thẻ BHYT</Label>
                <TextField
                  {...register('healthInsuranceNumber')}
                  helperText={errors.healthInsuranceNumber?.message}
                  type="text"
                  id="healthInsuranceNumber"
                  placeholder="Số thẻ BHYT"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
            </FormFrame>
            <FormFrame>
              <InputComponent>
                <Label htmlFor="ocupation">Nghề nghiệp</Label>
                <TextField
                  {...register('ocupation')}
                  helperText={errors.ocupation?.message}
                  type="text"
                  id="ocupation"
                  placeholder="Nghề nghiệp"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
              <InputComponent>
                <Label htmlFor="workUnit">Đơn vị công tác</Label>
                <TextField
                  {...register('workUnit')}
                  helperText={errors.workUnit?.message}
                  type="text"
                  id="workUnit"
                  placeholder="Đơn vị công tác"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
              <InputComponent>
                <Label htmlFor="address">Địa chỉ hiện tại</Label>
                <TextField
                  {...register('address')}
                  helperText={errors.address?.message}
                  type="text"
                  id="address"
                  placeholder="Địa chỉ hiện tại"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
            </FormFrame>
            <InfoTypo>2. Thông tin đăng ký tiêm chủng</InfoTypo>
            <FormFrame>
              <InputComponent>
                <Label htmlFor="estimatedDateInjection">
                  Ngày muốn được tiêm (dự kiến)
                </Label>
                {/* <Controller
                  control={control}
                  {...register('estimatedDateInjection')}
                  name="estimatedDateInjection"
                  render={({ field: { value, ...fieldProps } }) => ( */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={value}
                    {...register('estimatedDateInjection')}
                    onChange={(newValue) => {
                      setValues(newValue);
                      setValue('estimatedDateInjection', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        helperText={errors.estimatedDateInjection?.message}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: 'Ngày/Tháng/Năm'
                        }}
                        FormHelperTextProps={{
                          sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
                {/* )}
                /> */}
              </InputComponent>
              <InputComponent>
                <Label htmlFor="injectionSession">Buổi tiêm mong muốn</Label>
                <FormControl fullWidth>
                  <Select
                    {...register('injectionSession')}
                    fullWidth
                    displayEmpty={true}
                    id="injectionSession"
                    renderValue={(selected: string) => {
                      if (!selected) {
                        return (
                          <PlaceholderTypo>Buổi tiêm mong muốn</PlaceholderTypo>
                        );
                      }
                      return selected;
                    }}
                    MenuProps={MenuProps}>
                    {injectionSession.map((session) => (
                      <MenuItem key={session.id} value={session.name}>
                        {session.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.injectionSession && (
                    <FormHelperText
                      sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
                      {errors.injectionSession.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputComponent>
            </FormFrame>
            <NoteTypo>Lưu ý:</NoteTypo>
            <FrameNote>
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
                  Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý
                  chịu trách nhiệm với các thông tin đã cung cấp.{' '}
                </FrameNoteTypo>
              </li>{' '}
              <li>
                <FrameNoteTypo>
                  Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa
                  vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi
                  có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
                  dịch tiêm chủng Vắc xin COVID - 19 Xin vui lòng kiểm tra kỹ
                  các thông tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh, Số
                  điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...) Bằng
                  việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu
                  trách nhiệm với các thông tin đã cung cấp. Cá nhân/Tổ chức
                  đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt
                  tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế
                  hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
                </FrameNoteTypo>
              </li>
            </FrameNote>
          </Form>
        </Result>
        <SubmitContainer>
          <StyledLink to="/">
            <CancelSubmitButton>
              <ArrowBackIcon />
              Hủy bỏ
            </CancelSubmitButton>
          </StyledLink>
          <ContinueSubmitButton
            onClick={handleSubmit(onSubmit)}
            // disabled={!isValid}
          >
            Tiếp tục
            <ArrowForwardIcon />
          </ContinueSubmitButton>
        </SubmitContainer>
      </ResultContainer>
    </div>
  );
};

export default InjectionRegistrationStep1;
