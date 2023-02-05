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
import FormHelperText from '@mui/material/FormHelperText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { publicRequest } from 'callsApi';
import InputComponent from 'components/InputComponent';
import dayjs, { Dayjs } from 'dayjs';
import { District, Province, Ward } from 'dummy-data';
import { registerAsync } from 'features/user/registerSlice';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';
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
  identification_card: string;
  email: string;
  password: string;
  fullname: string;
  birthday: Dayjs | null;
  gender: string;
  province: string;
  district: string;
  ward: string;
}

yup.addMethod(
  yup.mixed,
  'length',
  function (lengthOpt1: number, lengthOpt2: number, msg: string) {
    return this.test({
      name: 'length',
      message: msg,
      test: (value) => {
        return (
          (value && value.toString().length === lengthOpt1) ||
          (value && value.toString().length === lengthOpt2)
        );
      }
    });
  }
);

const registerSchema = yup.object().shape({
  identification_card: yup
    .string()
    .required('Số CMND không được bỏ trống')
    .matches(/^[0-9]+$/, 'Số CMND chỉ được chứa số ')
    .length(12, 'Số CMND phải chứa 12 số'),
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
  const [provincesData, setProvincesData] = React.useState<Province[]>([]);
  const [districtsData, setDistrictsData] = React.useState<District[]>([]);
  const [wardsData, setWardsData] = React.useState<Ward[]>([]);

  const [value, setValues] = React.useState<Dayjs | null>(null);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    watch,
    formState: { errors, isValid }
  } = useForm<registerFormInputs>({ resolver: yupResolver(registerSchema) });

  const selectRegister = useAppSelector((state: RootState) => state.register);

  useEffect(() => {
    async function fetchProvincesData() {
      // You can await here
      try {
        const response = await publicRequest.get(
          'administrative-unit/provinces'
        );
        setProvincesData(response.data);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
    fetchProvincesData();
  }, []);

  useEffect(() => {
    resetField('district');
    resetField('ward');

    // Lấy province_id hiện tại đang chọn
    const province: Province = provincesData.filter((province) => {
      return province.name === watch('province');
    })[0];

    // Lấy ra các quận thuộc province đang chọn
    async function fetchDistrictsData() {
      try {
        const response = await publicRequest.get(
          `administrative-unit/districts/${province?.province_id}`
        );

        setDistrictsData(response.data);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    if (watch('province')) {
      fetchDistrictsData();
    }
  }, [watch('province')]);

  useEffect(() => {
    resetField('ward');
    // Lấy district_id hiện tại đang chọn
    const district: District = districtsData.filter((district) => {
      return district.name === watch('district');
    })[0];

    //Lấy ra các quận thuộc district đang chọn
    async function fetchWardsData() {
      try {
        const response = await publicRequest.get(
          `administrative-unit/wards/${district?.district_id}`
        );

        setWardsData(response.data);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    if (watch('district')) {
      fetchWardsData();
    }
  }, [watch('district')]);

  const onSubmit: SubmitHandler<registerFormInputs> = (data) => {
    // register
    if (isValid) {
      let { district, province, ward, birthday, ...registerInfo } = data;

      const ward_id = wardsData.filter((item) => item.name === ward)[0].ward_id;
      const formatedBirthday = dayjs(birthday).format('YYYY-MM-DD');

      dispatch(
        registerAsync({ ...registerInfo, birthday: formatedBirthday, ward_id })
      );
    }
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
          id="identification_card"
          // helperText="Số CMND/CCCD không được bỏ trống "
          helperText={errors.identification_card?.message}
          register={register}
        />
        <InputComponent
          label="Email"
          placeholder="Email"
          id="email"
          helperText={
            (selectRegister.status === 'rejected'
              ? 'Email đã tồn tại!'
              : undefined) || errors.email?.message
          }
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            openTo="year"
            views={['year', 'month', 'day']}
            inputFormat="DD/MM/YYYY"
            value={value}
            {...register('birthday')}
            onChange={(newValue) => {
              setValues(newValue);
              setValue('birthday', newValue);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                helperText={!value && errors.birthday?.message}
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
          {errors.gender && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.gender.message}
            </FormHelperText>
          )}
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
            {provincesData.map((province: Province) => (
              <MenuItem key={province.province_id} value={province.name}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
          {errors.province && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.province.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <Label htmlFor="district">
            Quận/Huyện{' '}
            <Typography component="span" sx={{ color: '#D32F2F' }}>
              (*)
            </Typography>
          </Label>
          <Select
            disabled={watch('province') ? false : true}
            displayEmpty={true}
            id="district"
            renderValue={(selected: any) => {
              if (!watch('district')) {
                return (
                  <Typography component="span" sx={{ color: '#c5c5c5' }}>
                    Quận/Huyện
                  </Typography>
                );
              }
              return selected;
            }}
            {...register('district')}>
            {districtsData.map((district: District) => (
              <MenuItem key={district.district_id} value={district.name}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
          {errors.district && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.district.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <Label htmlFor="ward">
            Xã/Phường{' '}
            <Typography component="span" sx={{ color: '#D32F2F' }}>
              (*)
            </Typography>
          </Label>
          <Select
            disabled={watch('district') ? false : true}
            displayEmpty={true}
            id="ward"
            renderValue={(selected: any) => {
              if (!watch('ward')) {
                return (
                  <Typography component="span" sx={{ color: '#c5c5c5' }}>
                    Xã/Phường
                  </Typography>
                );
              }
              return selected;
            }}
            {...register('ward')}>
            {wardsData.map((ward: Ward) => (
              <MenuItem key={ward.ward_id} value={ward.name}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
          {errors.ward && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.ward.message}
            </FormHelperText>
          )}
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
