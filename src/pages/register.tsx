import React from 'react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import InputComponent from 'components/InputComponent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 0px 0px;
  gap: 16px;

  width: 57%;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  min-width: 39%;
  min-height: 42px;
`;

const HeaderTypography = styled(Typography)`
  max-width: 100%;
  min-height: 42px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 123.5%;
  /* identical to box height, or 42px */

  /* Text/Primary */

  color: rgba(0, 0, 0, 0.87);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 0px 0px;
  gap: 16px;
  width: 100%;
  /* max-width: 400px; */
  /* min-height: 934px; */
`;

const Label = styled.label`
  max-width: 400px;
  min-height: 24px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  color: rgba(0, 0, 0, 0.87);
`;

const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 0px;
  gap: 16px;

  width: 100%;
  min-height: 60px;
`;

const ButtonContinue = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  gap: 8px;

  width: 103px;
  min-height: 36px;

  border-radius: 4px;
`;

const ButtonContinueTypo = styled(Button)`
  min-width: 63px;
  min-height: 24px;
  text-align: center;
  padding: 0px;
  /* Components/Button Medium */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  letter-spacing: 0.46px;
  text-transform: uppercase;

  /* Primary/Main */

  color: #3f51b5;
`;

interface Province {
  id: number;
  name: string;
}
interface District {
  id: number;
  name: string;
  provinceId: number;
}
interface Ward {
  id: number;
  name: string;
  districtId: number;
}

const provinces: Province[] = [
  {
    id: 1,
    name: 'Hà Nội'
  },
  {
    id: 2,
    name: 'Hồ Chí Minh'
  },
  {
    id: 3,
    name: 'Đà Nẵng'
  }
];

const districts: District[] = [
  { id: 1, name: 'Quận Đống Đa', provinceId: 1 },
  { id: 2, name: 'Quận Cầu Giấy', provinceId: 1 },
  { id: 3, name: 'Quận 1', provinceId: 2 },
  { id: 4, name: 'Quận 2', provinceId: 2 }
];

const wards: Ward[] = [
  { id: 1, name: 'Phường Văn Chương', districtId: 1 },
  { id: 2, name: 'Phường Văn Miếu', districtId: 1 },
  { id: 3, name: 'Phường Dịch Vọng', districtId: 2 },
  { id: 4, name: 'Phường Dịch Vọng Hậu', districtId: 2 },
  { id: 5, name: 'Phường Bến Nghé', districtId: 3 },
  { id: 6, name: 'Phường An Phú', districtId: 4 },
  { id: 7, name: 'Phường Bến Thành', districtId: 3 },
  { id: 8, name: 'Phường Bình An', districtId: 4 }
];

export interface registerFormInputs {
  identity: string;
  email: string;
  password: string;
  fullname: string;
  birthday: string;
  gender: string;
  province: string;
  district: string;
  ward: string;
}

const registerSchema = yup.object().shape({
  identity: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(12, 'Số CMND không hợp lệ')
    .required('Số CMND không được bỏ trống'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Số CMND không được bỏ trống'),
  password: yup
    .string()
    .required('Mật khẩu không được bỏ trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .trim(),
  fullname: yup.string().required('Họ tên không được bỏ trống'),
  birthday: yup.string().required('Ngày sinh không được bỏ trống'),
  gender: yup.string().required('Giới tính không được bỏ trống'),
  province: yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
  district: yup.string().required('Quận/Huyện không được bỏ trống'),
  ward: yup.string().required('Phường/Xã không được bỏ trống')
});

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<registerFormInputs>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<registerFormInputs> = (data) => {
    // register
    console.log(data);
  };

  return (
    <RegisterContainer>
      <Header>
        <HeaderTypography>Đăng ký tài khoản</HeaderTypography>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          label="Số CMND/CCCD"
          placeholder="Số CMND/CCCD"
          id="identity"
          // helperText="Số CMND/CCCD không được bỏ trống "
          helperText={errors.identity?.message}
          register={register}
        />
        <InputComponent
          label="Email"
          placeholder="Email"
          id="email"
          helperText={errors.email?.message}
          register={register}
        />
        <InputComponent
          label="Mật khẩu"
          placeholder="*****************"
          id="password"
          type="password"
          helperText={errors.password?.message}
          register={register}
        />
        <InputComponent
          label="Họ và tên"
          placeholder="Họ và tên"
          id="fullname"
          helperText={errors.fullname?.message}
          register={register}
        />
        <Controller
          control={control}
          {...register('birthday')}
          name="birthday"
          render={({ field: { value, ...fieldProps } }) => (
            <>
              <Label htmlFor="birthday">
                Ngày sinh <span style={{ color: '#D32F2F' }}>(*)</span>
              </Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...fieldProps}
                  value={value}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </>
          )}
        />
        <FormControl fullWidth>
          <Label htmlFor="gender">
            Giới tính <span style={{ color: '#D32F2F' }}>(*)</span>
          </Label>
          <Select
            displayEmpty={true}
            id="gender"
            renderValue={(selected: any) => {
              if (!selected) {
                return <span style={{ color: '#c5c5c5' }}>Giới Tính</span>;
              }
              return selected;
            }}
            {...register('gender')}>
            <MenuItem disabled value="">
              Giới Tính
            </MenuItem>
            <MenuItem value={'Nam'}>Nam</MenuItem>
            <MenuItem value={'Nữ'}>Nữ</MenuItem>
            <MenuItem value={'Khác'}>Khác</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Label htmlFor="province">
            Tỉnh/Thành phố <span style={{ color: '#D32F2F' }}>(*)</span>
          </Label>
          <Select
            displayEmpty={true}
            id="province"
            renderValue={(selected: any) => {
              if (!selected) {
                return <span style={{ color: '#c5c5c5' }}>Tỉnh/Thành phố</span>;
              }
              return selected;
            }}
            {...register('province')}>
            {provinces.map((province: Province) => (
              <MenuItem key={province.id} value={province.name}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Label htmlFor="district">
            Quận/Huyện <span style={{ color: '#D32F2F' }}>(*)</span>
          </Label>
          <Select
            displayEmpty={true}
            id="district"
            renderValue={(selected: any) => {
              if (!selected) {
                return <span style={{ color: '#c5c5c5' }}>Quận/Huyện</span>;
              }
              return selected;
            }}
            {...register('district')}>
            {districts.map((district: Province) => (
              <MenuItem key={district.id} value={district.name}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Label htmlFor="ward">
            Xã/Phường <span style={{ color: '#D32F2F' }}>(*)</span>
          </Label>
          <Select
            displayEmpty={true}
            id="ward"
            renderValue={(selected: any) => {
              if (!selected) {
                return <span style={{ color: '#c5c5c5' }}>Xã/Phường</span>;
              }
              return selected;
            }}
            {...register('ward')}>
            {wards.map((ward: Province) => (
              <MenuItem key={ward.id} value={ward.name}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Form>
      <DialogActions>
        <ButtonContinue type="submit" onClick={handleSubmit(onSubmit)}>
          <ButtonContinueTypo>TIẾP TỤC</ButtonContinueTypo>
          <ArrowForwardIcon style={{ color: '#3F51B5' }} />
        </ButtonContinue>
      </DialogActions>
    </RegisterContainer>
  );
};

export default Register;
