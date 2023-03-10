import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputComponent from 'components/InputComponent';
import {
  District,
  districts,
  Province,
  provinces,
  Ward,
  wards
} from 'dummy-data';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

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
  font-weight: 700;
  font-size: 34px;
  line-height: 123.5%;

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
`;

const Label = styled.label`
  max-width: 400px;
  min-height: 24px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  letter-spacing: 0.46px;
  text-transform: uppercase;

  color: #3f51b5;
`;

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
    .required('Số CMND không được bỏ trống')
    .matches(/^[0-9]+$/, 'Số CMND chỉ được chứa số ')
    .min(12, 'Số CMND không hợp lệ'),
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
    control,
    formState: { errors, isValid }
  } = useForm<registerFormInputs>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<registerFormInputs> = (data) => {
    // register
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
                Ngày sinh{' '}
                <Typography component="span" sx={{ color: '#D32F2F' }}>
                  (*)
                </Typography>
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
            Giới tính{' '}
            <Typography component="span" sx={{ color: '#D32F2F' }}>
              (*)
            </Typography>
          </Label>
          <Select
            displayEmpty={true}
            id="gender"
            renderValue={(selected: any) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: '#c5c5c5' }}>
                    Giới Tính
                  </Typography>
                );
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
            Tỉnh/Thành phố{' '}
            <Typography component="span" sx={{ color: '#D32F2F' }}>
              (*)
            </Typography>
          </Label>
          <Select
            displayEmpty={true}
            id="province"
            renderValue={(selected: any) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: '#c5c5c5' }}>
                    Tỉnh/Thành phố
                  </Typography>
                );
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
            Quận/Huyện{' '}
            <Typography component="span" sx={{ color: '#D32F2F' }}>
              (*)
            </Typography>
          </Label>
          <Select
            displayEmpty={true}
            id="district"
            renderValue={(selected: any) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: '#c5c5c5' }}>
                    Quận/Huyện
                  </Typography>
                );
              }
              return selected;
            }}
            {...register('district')}>
            {districts.map((district: District) => (
              <MenuItem key={district.id} value={district.name}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Label htmlFor="ward">
            Xã/Phường{' '}
            <Typography component="span" sx={{ color: '#D32F2F' }}>
              (*)
            </Typography>
          </Label>
          <Select
            displayEmpty={true}
            id="ward"
            renderValue={(selected: any) => {
              if (!selected) {
                return (
                  <Typography component="span" sx={{ color: '#c5c5c5' }}>
                    Xã/Phường
                  </Typography>
                );
              }
              return selected;
            }}
            {...register('ward')}>
            {wards.map((ward: Ward) => (
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
          <ArrowForwardIcon sx={{ color: '#3F51B5' }} />
        </ButtonContinue>
      </DialogActions>
    </RegisterContainer>
  );
};

export default Register;
