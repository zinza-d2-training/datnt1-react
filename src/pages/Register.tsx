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
    .required('S??? CMND kh??ng ???????c b??? tr???ng')
    .matches(/^[0-9]+$/, 'S??? CMND ch??? ???????c ch???a s??? ')
    .min(12, 'S??? CMND kh??ng h???p l???'),
  email: yup
    .string()
    .email('Email kh??ng h???p l???')
    .required('S??? CMND kh??ng ???????c b??? tr???ng'),
  password: yup
    .string()
    .required('M???t kh???u kh??ng ???????c b??? tr???ng')
    .min(8, 'M???t kh???u ph???i c?? ??t nh???t 8 k?? t???')
    .trim(),
  fullname: yup.string().required('H??? t??n kh??ng ???????c b??? tr???ng'),
  birthday: yup.string().required('Ng??y sinh kh??ng ???????c b??? tr???ng'),
  gender: yup.string().required('Gi???i t??nh kh??ng ???????c b??? tr???ng'),
  province: yup.string().required('T???nh/Th??nh ph??? kh??ng ???????c b??? tr???ng'),
  district: yup.string().required('Qu???n/Huy???n kh??ng ???????c b??? tr???ng'),
  ward: yup.string().required('Ph?????ng/X?? kh??ng ???????c b??? tr???ng')
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
        <HeaderTypography>????ng k?? t??i kho???n</HeaderTypography>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          label="S??? CMND/CCCD"
          placeholder="S??? CMND/CCCD"
          id="identity"
          // helperText="S??? CMND/CCCD kh??ng ???????c b??? tr???ng "
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
          label="M???t kh???u"
          placeholder="*****************"
          id="password"
          type="password"
          helperText={errors.password?.message}
          register={register}
        />
        <InputComponent
          label="H??? v?? t??n"
          placeholder="H??? v?? t??n"
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
                Ng??y sinh{' '}
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
            Gi???i t??nh{' '}
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
                    Gi???i T??nh
                  </Typography>
                );
              }
              return selected;
            }}
            {...register('gender')}>
            <MenuItem disabled value="">
              Gi???i T??nh
            </MenuItem>
            <MenuItem value={'Nam'}>Nam</MenuItem>
            <MenuItem value={'N???'}>N???</MenuItem>
            <MenuItem value={'Kh??c'}>Kh??c</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Label htmlFor="province">
            T???nh/Th??nh ph???{' '}
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
                    T???nh/Th??nh ph???
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
            Qu???n/Huy???n{' '}
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
                    Qu???n/Huy???n
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
            X??/Ph?????ng{' '}
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
                    X??/Ph?????ng
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
          <ButtonContinueTypo>TI???P T???C</ButtonContinueTypo>
          <ArrowForwardIcon sx={{ color: '#3F51B5' }} />
        </ButtonContinue>
      </DialogActions>
    </RegisterContainer>
  );
};

export default Register;
