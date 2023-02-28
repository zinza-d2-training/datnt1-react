import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import {
  updateVaccinationSiteByIdAsync,
  VaccinationSiteInfo
} from 'features/vaccination/vaccinationSiteSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/index';
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

interface AdminEditDialogProps {
  handleClose: () => void;
  site: VaccinationSiteInfo | undefined;
  listSites: string[];
}

interface updatedInjectionPointInputs {
  name: string;
  address: string;
  leader: string;
  number_of_tables: number;
}

const UserInfoSchema = yup.object().shape({
  name: yup.string().required('Tên điểm tiêm không được bỏ trống'),
  address: yup.string().required('Địa chỉ không được bỏ trống'),
  leader: yup.string().required('Người đứng đầu cơ sở không được bỏ trống'),
  number_of_tables: yup
    .number()
    .integer()
    .positive()
    .required('Số bàn tiêm không được bỏ trống')
});

const AdminEditDialog = ({
  handleClose,
  site,
  listSites
}: AdminEditDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<updatedInjectionPointInputs>({
    resolver: yupResolver(UserInfoSchema)
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<updatedInjectionPointInputs> = (
    data: updatedInjectionPointInputs
  ) => {
    dispatch(
      updateVaccinationSiteByIdAsync({
        vaccination_site_id: site?.vaccination_site_id as number,
        ...data
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
          <Label htmlFor="name">Tên điểm tiêm</Label>
          <Select
            {...register('name')}
            fullWidth
            displayEmpty={true}
            id="name"
            defaultValue={site?.name}>
            {listSites.map((site: string, index: number) => (
              <MenuItem key={index} value={site}>
                {site}
              </MenuItem>
            ))}
          </Select>
        </InputComponent>
        <InputComponent>
          <Label htmlFor="address">Địa chỉ</Label>
          <Field
            {...register('address')}
            helperText={errors.address?.message}
            type="text"
            id="address"
            defaultValue={site?.address}
            fullWidth
            required
            FormHelperTextProps={{
              sx: { color: '#d32f2f', margin: '3px 0px 0px' }
            }}
          />
        </InputComponent>
        <InputComponent>
          <Label htmlFor="leader">Người đứng đầu cơ sở</Label>
          <Field
            {...register('leader')}
            helperText={errors.leader?.message}
            type="text"
            id="leader"
            defaultValue={site?.leader}
            fullWidth
            required
            FormHelperTextProps={{
              sx: { color: '#d32f2f', margin: '3px 0px 0px' }
            }}
          />
        </InputComponent>
        <InputComponent>
          <Label htmlFor="number_of_tables">Số bàn tiêm</Label>
          <Field
            {...register('number_of_tables')}
            helperText={errors.number_of_tables?.message}
            type="text"
            id="number_of_tables"
            defaultValue={site?.number_of_tables}
            fullWidth
            required
            FormHelperTextProps={{
              sx: { color: '#d32f2f', margin: '3px 0px 0px' }
            }}
          />
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

export default AdminEditDialog;
