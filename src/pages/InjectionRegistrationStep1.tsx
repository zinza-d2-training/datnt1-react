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
import dayjs, { Dayjs } from 'dayjs';
import { injectionSession } from 'dummy-data';
import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';
import { publicRequest } from 'callsApi';
import { addInjectionRegistrationAsync } from 'features/vaccination/injectionRegistrationSlice';

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

export interface PriorityGroup {
  priority_group_id: number;
  description: string;
}

export interface InjectionRegisterFormInputs {
  health_insurance_number: string;
  priorityGroup: string;
  occupation: string;
  work_unit: string;
  address: string;
  expected_injection_date: Dayjs | null;
  injection_session: string;
}

const InjectionRegisterSchema = yup.object().shape({
  priorityGroup: yup.string().required('Nhóm ưu tiên không được bỏ trống'),
  health_insurance_number: yup.lazy((value) => {
    if (value === '') {
      return yup.string();
    }

    return yup.string().matches(/^[0-9]+$/, 'Số thẻ BHYT chỉ được chứa số');
  }),
  occupation: yup.string(),
  work_unit: yup.string(),
  address: yup.string(),
  expected_injection_date: yup.string(),
  injection_session: yup.string()
});

const InjectionRegistrationStep1 = () => {
  const [value, setValues] = React.useState<Dayjs | null>(null);
  const [listPriorityGroup, setListPriorityGroup] = React.useState<
    PriorityGroup[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<InjectionRegisterFormInputs>({
    resolver: yupResolver(InjectionRegisterSchema)
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchPriorityGroupData() {
      const res = await publicRequest.get('priority-group');
      setListPriorityGroup(res.data);
    }
    fetchPriorityGroupData();
  }, []);

  const onSubmit = async (data: InjectionRegisterFormInputs) => {
    const { priorityGroup, expected_injection_date, ...others } = data;
    const priority_group_id = listPriorityGroup.find(
      (item) => item.description === priorityGroup
    )?.priority_group_id as number;
    const formatedExpectedInjectionDate = expected_injection_date
      ? dayjs(expected_injection_date).format('YYYY-MM-DD')
      : undefined;

    await dispatch(
      addInjectionRegistrationAsync({
        priority_group_id,
        expected_injection_date: formatedExpectedInjectionDate
          ? formatedExpectedInjectionDate
          : '',
        ...others
      })
    );
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
                <Label htmlFor="priorityGroup">
                  Nhóm ưu tiên{' '}
                  <Typography component="span" sx={{ color: '#D32F2F' }}>
                    (*)
                  </Typography>
                </Label>
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
                    {listPriorityGroup.map(
                      (group: PriorityGroup, index: number) => (
                        <MenuItem key={index} value={group.description}>
                          {group.description}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.priorityGroup && (
                    <FormHelperText
                      sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
                      {errors.priorityGroup.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputComponent>
              <InputComponent>
                <Label htmlFor="health_insurance_number">Số thẻ BHYT</Label>
                <TextField
                  {...register('health_insurance_number')}
                  helperText={errors.health_insurance_number?.message}
                  type="text"
                  id="health_insurance_number"
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
                <Label htmlFor="occupation">Nghề nghiệp</Label>
                <TextField
                  {...register('occupation')}
                  helperText={errors.occupation?.message}
                  type="text"
                  id="occupation"
                  placeholder="Nghề nghiệp"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
              <InputComponent>
                <Label htmlFor="work_unit">Đơn vị công tác</Label>
                <TextField
                  {...register('work_unit')}
                  helperText={errors.work_unit?.message}
                  type="text"
                  id="work_unit"
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
                <Label htmlFor="expected_injection_date">
                  Ngày muốn được tiêm (dự kiến)
                </Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disablePast
                    views={['year', 'month', 'day']}
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    {...register('expected_injection_date')}
                    onChange={(newValue) => {
                      setValues(newValue);
                      setValue('expected_injection_date', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        helperText={errors.expected_injection_date?.message}
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
              </InputComponent>
              <InputComponent>
                <Label htmlFor="injection_session">Buổi tiêm mong muốn</Label>
                <FormControl fullWidth>
                  <Select
                    {...register('injection_session')}
                    fullWidth
                    displayEmpty={true}
                    id="injection_session"
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
                  {errors.injection_session && (
                    <FormHelperText
                      sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
                      {errors.injection_session.message}
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
