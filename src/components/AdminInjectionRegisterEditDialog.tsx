import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { userRequest } from 'callsApi';
import dayjs, { Dayjs } from 'dayjs';
import {
  RegisterInfo,
  UpdateInjectionRegistrationByAdmin,
  updateInjectionRegistrationByAdminAsync
} from 'features/vaccination/injectionRegistrationSlice';
import {
  getVaccinationSiteAsync,
  SearchFilterDefault,
  updateVaccinationSiteByIdAsync,
  VaccinationSiteInfo
} from 'features/vaccination/vaccinationSiteSlice';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';
import * as yup from 'yup';

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 444px;
  min-height: 521px;
  background: #ffffff;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`;

const DialogTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 64px;

  & .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const DialogTitle = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 24px;

  width: 388px;
  height: 64px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: -0.05px;

  color: rgba(0, 0, 0, 0.87);
`;

const DialogContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;

  width: 100%;
  min-height: 396px;
`;

const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 100%;
  min-height: 69px;

  background: #ffffff;
`;

const Label = styled.label`
  width: 100%;
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
`;

const Field = styled(TextField)``;

const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px;
  gap: 16px;

  width: 100%;
  min-height: 60px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;

  min-width: 217px;
  min-height: 36px;

  & .css-c4uyv3-MuiButtonBase-root-MuiButton-root:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
  }
`;

const CancelButton = styled(Button)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;
  min-width: 89px;
  min-height: 36px;

  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;

  height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;

  color: #303f9f;
`;

const ConfirmedButton = styled(Button)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;
  width: 112px;
  height: 36px;

  background: #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;

  color: #ffffff;
`;

interface AdminInjectionRegisterEditDialogProps {
  handleClose: () => void;
  registerInfo: RegisterInfo | undefined;
}

interface updatedInjectionRegistration {
  expected_injection_date: Dayjs | null;
  vaccine: string;
  vaccination_site: string;
  status: string;
}

interface Vaccine {
  vaccine_id: number;
  name: string;
  lot_number: string;
}

const status = ['Đăng ký chưa hoàn thành', 'Đăng ký thành công', 'Đã tiêm'];

const UserInfoSchema = yup.object().shape({
  expected_injection_date: yup
    .string()
    .required('Ngày tiêm không được bỏ trống'),
  vaccine: yup.string().required('Loại vaccine không được bỏ trống'),
  vaccination_site: yup.string().required('Địa điểm tiêm không được bỏ trống'),
  status: yup.string().required('Trạng thái không được bỏ trống')
});

const AdminInjectionRegisterEditDialog = ({
  handleClose,
  registerInfo
}: AdminInjectionRegisterEditDialogProps) => {
  const [value, setValues] = React.useState<Dayjs | null>(
    dayjs(registerInfo?.expected_injection_date)
  );
  const [listVaccine, setListVaccine] = React.useState<Vaccine[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<updatedInjectionRegistration>({
    resolver: yupResolver(UserInfoSchema)
  });

  const dispatch = useAppDispatch();
  const selectVaccinationSites = useAppSelector(
    (state: RootState) => state.vaccinationSite.vaccinationSites
  );

  useEffect(() => {
    async function fetchVaccineData() {
      const res = await userRequest.get<Vaccine[]>('vaccine');

      setListVaccine(res.data);
    }

    dispatch(getVaccinationSiteAsync(SearchFilterDefault));
    fetchVaccineData();
  }, []);

  const onSubmit: SubmitHandler<updatedInjectionRegistration> = (
    data: updatedInjectionRegistration
  ) => {
    const { vaccine, vaccination_site, expected_injection_date, ...others } =
      data;

    let formatedDate = dayjs(expected_injection_date).format('YYYY-MM-DD');

    if (formatedDate === 'Invalid Date') {
      const date = expected_injection_date?.toString();
      const newDate = date?.split('/').reverse().join('/');

      formatedDate = dayjs(newDate).format('YYYY-MM-DD');
    }

    const vaccine_id = listVaccine.find(
      (vac) => vac.name === vaccine
    )?.vaccine_id;

    const vaccination_site_id = selectVaccinationSites.find(
      (site) => site.name === vaccination_site
    )?.vaccination_site_id;

    dispatch(
      updateInjectionRegistrationByAdminAsync({
        injection_registration_id: registerInfo?.injection_registration_id,
        vaccination_site_id,
        vaccine_id,
        expected_injection_date: formatedDate,
        ...others
      })
    );

    handleClose();
  };

  return (
    <DialogContainer>
      <DialogTitleContainer>
        <DialogTitle>Cập Nhật Điểm Tiêm</DialogTitle>
        <CloseIcon onClick={handleClose} />
      </DialogTitleContainer>
      <DialogContentContainer>
        <InputComponent>
          <Label htmlFor="expected_injection_date">Ngày tiêm dự kiến</Label>
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
          <Label htmlFor="vaccine">Loại Vaccine</Label>
          <Select
            {...register('vaccine')}
            fullWidth
            displayEmpty={true}
            id="vaccine"
            defaultValue={registerInfo?.vaccine_name}>
            {listVaccine.map((vaccine: Vaccine, index: number) => (
              <MenuItem key={index} value={vaccine.name}>
                {vaccine.name}
              </MenuItem>
            ))}
          </Select>
          {errors.vaccine && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.vaccine.message}
            </FormHelperText>
          )}
        </InputComponent>
        <InputComponent>
          <Label htmlFor="vaccination_site">Điểm tiêm</Label>
          <Select
            {...register('vaccination_site')}
            fullWidth
            displayEmpty={true}
            id="vaccination_site"
            defaultValue={registerInfo?.vaccination_site_name}>
            {selectVaccinationSites.map(
              (vaccination_site: VaccinationSiteInfo, index: number) => (
                <MenuItem key={index} value={vaccination_site.name}>
                  {vaccination_site.name}
                </MenuItem>
              )
            )}
          </Select>
          {errors.vaccination_site && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.vaccination_site.message}
            </FormHelperText>
          )}
        </InputComponent>
        <InputComponent>
          <Label htmlFor="status">Trạng thái</Label>
          <Select
            {...register('status')}
            fullWidth
            displayEmpty={true}
            id="status"
            defaultValue={registerInfo?.status}>
            {status.map((status: string, index: number) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {errors.status && (
            <FormHelperText sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
              {errors.status.message}
            </FormHelperText>
          )}
        </InputComponent>
      </DialogContentContainer>
      <DialogActions>
        <ButtonGroup>
          <CancelButton onClick={handleClose}>Hủy Bỏ</CancelButton>
          <ConfirmedButton onClick={handleSubmit(onSubmit)}>
            Xác Nhận
          </ConfirmedButton>
        </ButtonGroup>
      </DialogActions>
    </DialogContainer>
  );
};

export default AdminInjectionRegisterEditDialog;
