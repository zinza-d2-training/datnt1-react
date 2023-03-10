import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { injectionInforRows } from 'dummy-data';
import { useForm } from 'react-hook-form';
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
}

interface updatedInjectionPointInputs {
  injectionPointName: string;
  address: string;
  leader: string;
  numberOfTables: number;
}

const UserInfoSchema = yup.object().shape({
  injectionPointName: yup
    .string()
    .required('T??n ??i???m tiem kh??ng ???????c b??? tr???ng'),
  address: yup.string().required('?????a ch??? kh??ng ???????c b??? tr???ng'),
  leader: yup.string().required('Ng?????i ?????ng ?????u c?? s??? kh??ng ???????c b??? tr???ng'),
  numberOfTables: yup
    .number()
    .integer()
    .positive()
    .required('S??? b??n ti??m kh??ng ???????c b??? tr???ng')
});

const AdminEditDialog = ({ handleClose }: AdminEditDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<updatedInjectionPointInputs>({
    resolver: yupResolver(UserInfoSchema)
  });

  const onSubmit = () => {
    handleClose();
  };

  return (
    <DialogContainer>
      <DialogTitleContainer>
        <DialogTitle>C???p Nh???t ??i???m Ti??m</DialogTitle>
        <CloseIcon onClick={handleClose} />
      </DialogTitleContainer>
      <DialogContentContainer>
        <InputComponent>
          <Label htmlFor="injectionPointName">T??n ??i???m ti??m</Label>
          <Select
            {...register('injectionPointName')}
            fullWidth
            displayEmpty={true}
            id="injectionPointName"
            defaultValue={'H?? N???i'}>
            {injectionInforRows.map((injectionPoint) => (
              <MenuItem
                key={injectionPoint.injectionNumber}
                value={injectionPoint.injectionPointName}>
                {injectionPoint.injectionPointName}
              </MenuItem>
            ))}
          </Select>
        </InputComponent>
        <InputComponent>
          <Label htmlFor="address">?????a ch???</Label>
          <Field
            {...register('address')}
            helperText={errors.address?.message}
            type="text"
            id="address"
            defaultValue="Smart City" // value
            fullWidth
            required
            FormHelperTextProps={{
              sx: { color: '#d32f2f', margin: '3px 0px 0px' }
            }}
          />
        </InputComponent>
        <InputComponent>
          <Label htmlFor="leader">Ng?????i ?????ng ?????u c?? s???</Label>
          <Field
            {...register('leader')}
            helperText={errors.leader?.message}
            type="text"
            id="leader"
            defaultValue="?????ng Thai Mai" // value
            fullWidth
            required
            FormHelperTextProps={{
              sx: { color: '#d32f2f', margin: '3px 0px 0px' }
            }}
          />
        </InputComponent>
        <InputComponent>
          <Label htmlFor="numberOfTables">S??? b??n ti??m</Label>
          <Field
            {...register('numberOfTables')}
            helperText={errors.numberOfTables?.message}
            type="text"
            id="numberOfTables"
            defaultValue="1" // value
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
          <CancelButton onClick={handleClose}>H???y B???</CancelButton>
          <ConfirmedButton onClick={handleSubmit(onSubmit)}>
            X??c Nh???n
          </ConfirmedButton>
        </ButtonGroup>
      </DialogActions>
    </DialogContainer>
  );
};

export default AdminEditDialog;
