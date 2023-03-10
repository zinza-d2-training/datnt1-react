import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateIcon from '@mui/icons-material/Create';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Divider from 'components/Divider';
import MenuUser from 'components/MenuUser';
import { districts, provinces, wards } from 'dummy-data';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 36px;
  gap: 24px;

  width: 100%;
`;

const SectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 8px;
  gap: 16px;
  width: 100%;

  background: #ffffff;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 100%;
  min-height: 24px;

  & .MuiSvgIcon-root {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const SectionHeaderTypo = styled(Typography)`
  max-width: 128px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const SectionContentRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 16px;
  gap: 16px;

  width: 100%;
  min-height: 69px;
`;

const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 25%;
  min-height: 69px;

  background: #ffffff;

  & .MuiInputBase-root {
    height: 40px;
    color: rgba(0, 0, 0, 0.87);
  }
`;

const Label = styled.label`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
`;

const Field = styled(TextField)``;

const CancelButton = styled(Button)`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 84px;
  height: 36px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  border-radius: 4px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.46px;
  text-transform: uppercase;

  color: #3f51b5;
`;

const SavedButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 60px;
  height: 36px;
  background: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.46px;
  text-transform: uppercase;

  color: #ffffff;

  &:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
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

interface UserInfoInputs {
  identificationCode: string;
  fullname: string;
  birthday: string;
  gender: string;
  province: string;
  district?: string;
  ward?: string;
  password: string;
  confirmedPassword: string;
}

const UserInfoSchema = yup.object().shape({
  identificationCode: yup
    .string()
    .required('S??? CMND/CCCD/M?? ?????nh danh kh??ng ???????c b??? tr???ng'),
  fullname: yup.string().required('H??? v?? t??n kh??ng ???????c b??? tr???ng'),
  birthday: yup.string().required('Ng??y sinh kh??ng ???????c b??? tr???ng'),
  gender: yup.string().required('Gi???i t??nh kh??ng ???????c b??? tr???ng'),
  province: yup.string().required('T???nh/Th??nh ph??? kh??ng ???????c b??? tr???ng'),
  district: yup.string().required('Qu???n/Huy???n kh??ng ???????c b??? tr???ng'),
  ward: yup.string().required('X??/Ph?????ng kh??ng ???????c b??? tr???ng'),
  password: yup.string().required('M???t kh???u m???i kh??ng ???????c b??? tr???ng'),
  confirmedPassword: yup
    .string()
    .required('X??c nh???n l???i m???t kh???u kh??ng ???????c b??? tr???ng')
});

const Account = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<UserInfoInputs>({
    resolver: yupResolver(UserInfoSchema)
  });

  return (
    <div>
      <MenuUser userTab={'account'} />
      <Divider />

      <ResultContainer>
        <SectionInfo>
          <SectionHeader>
            <SectionHeaderTypo>Th??ng tin c?? nh??n</SectionHeaderTypo>
            <CreateIcon />
          </SectionHeader>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="identificationCode">
                S??? CMND/CCCD/M?? ?????nh danh
              </Label>
              <Field
                {...register('identificationCode')}
                helperText={errors.identificationCode?.message}
                type="text"
                id="identificationCode"
                defaultValue="030012345678" // value
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
          </SectionContentRow>
        </SectionInfo>
        <SectionInfo>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="fullname">H??? v?? t??n</Label>
              <Field
                {...register('fullname')}
                helperText={errors.fullname?.message}
                type="text"
                id="fullname"
                defaultValue="Nguy???n V??n A" // value
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
            <InputComponent>
              <Label htmlFor="birthday">Ng??y sinh</Label>
              <Controller
                control={control}
                {...register('birthday')}
                name="birthday"
                render={({ field: { value, ...fieldProps } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...fieldProps}
                      value={value}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </InputComponent>
            <InputComponent>
              <Label htmlFor="gender">Gi???i t??nh</Label>
              <Select
                fullWidth
                displayEmpty={true}
                id="gender"
                defaultValue={'Nam'}
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
                <MenuItem value={'Nam'}>Nam</MenuItem>
                <MenuItem value={'N???'}>N???</MenuItem>
                <MenuItem value={'Kh??c'}>Kh??c</MenuItem>
              </Select>
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="province">T???nh/Th??nh ph???</Label>
              <Select
                {...register('province')}
                fullWidth
                displayEmpty={true}
                id="province"
                defaultValue={'H?? N???i'}
                renderValue={(selected: string) => {
                  if (!selected) {
                    return;
                    <PlaceholderTypo>T???nh/Th??nh ph???</PlaceholderTypo>;
                  }
                  return selected;
                }}>
                {provinces.map((province) => (
                  <MenuItem key={province.id} value={province.name}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="district">Qu???n/Huy???n</Label>
              <Select
                // disabled={watch('province') ? false : true}
                {...register('district')}
                fullWidth
                displayEmpty={true}
                id="district"
                defaultValue={'Qu???n ?????ng ??a'}
                renderValue={(selected: string) => {
                  if (!watch('district')) {
                    return <PlaceholderTypo>Qu???n/Huy???n</PlaceholderTypo>;
                  } else {
                    return selected;
                  }
                }}>
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.name}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="ward">X??/Ph?????ng</Label>
              <Select
                // disabled={watch('district') ? false : true}
                {...register('ward')}
                fullWidth
                displayEmpty={true}
                id="ward"
                defaultValue={'Ph?????ng V??n Ch????ng'}
                renderValue={(selected: string) => {
                  if (!watch('ward')) {
                    return <PlaceholderTypo>X??/Ph?????ng</PlaceholderTypo>;
                  } else {
                    return selected;
                  }
                }}>
                {wards.map((ward) => (
                  <MenuItem key={ward.id} value={ward.name}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <CancelButton>H???y B???</CancelButton>
            <SavedButton>L??u</SavedButton>
          </SectionContentRow>
        </SectionInfo>
        <SectionInfo>
          <SectionHeader>
            <SectionHeaderTypo>M???t kh???u</SectionHeaderTypo>
            <CreateIcon />
          </SectionHeader>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="password">M???t kh???u m???i</Label>
              <Field
                // {...register('password')}
                // helperText={errors.password?.message}
                type="password"
                id="password"
                defaultValue="" // value
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="confirmedPassword">X??c nh???n l???i m???t kh???u</Label>
              <Field
                {...register('confirmedPassword')}
                helperText={errors.confirmedPassword?.message}
                type="password"
                id="confirmedPassword"
                defaultValue="" // value
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <CancelButton>H???y B???</CancelButton>
            <SavedButton>L??u</SavedButton>
          </SectionContentRow>
        </SectionInfo>
      </ResultContainer>
    </div>
  );
};

export default Account;
