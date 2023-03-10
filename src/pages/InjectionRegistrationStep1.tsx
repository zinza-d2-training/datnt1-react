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
    .required('S??? th??? BHYT kh??ng ???????c b??? tr???ng')
    .matches(/^[0-9]+$/, 'S??? th??? BHYT ch??? ???????c ch???a s??? '),
  priorityGroup: yup.string().required('Nh??m ??u ti??n kh??ng ???????c b??? tr???ng'),
  ocupation: yup.string().required('Ngh??? nghi???p kh??ng ???????c b??? tr???ng'),
  workUnit: yup.string().required('????n v??? c??ng t??c kh??ng ???????c b??? tr???ng'),
  address: yup.string().required('?????a ch??? hi???n t???i kh??ng ???????c b??? tr???ng'),
  estimatedDateInjection: yup
    .string()
    .required('Ng??y ti??m d??? ki???n kh??ng ???????c b??? tr???ng'),
  injectionSession: yup.string().required('Bu???i ti??m kh??ng ???????c b??? tr???ng')
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
            <InfoTypo>1. Th??ng tin ng?????i ????ng k?? ti??m</InfoTypo>
            <FormFrame>
              <InputComponent>
                <Label htmlFor="priorityGroup">Nh??m ??u ti??n (*)</Label>
                <FormControl fullWidth>
                  <Select
                    {...register('priorityGroup')}
                    displayEmpty={true}
                    id="priorityGroup"
                    renderValue={(selected: string) => {
                      if (!selected) {
                        return <PlaceholderTypo>Nh??m ??u ti??n</PlaceholderTypo>;
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
                <Label htmlFor="healthInsuranceNumber">S??? th??? BHYT</Label>
                <TextField
                  {...register('healthInsuranceNumber')}
                  helperText={errors.healthInsuranceNumber?.message}
                  type="text"
                  id="healthInsuranceNumber"
                  placeholder="S??? th??? BHYT"
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
                <Label htmlFor="ocupation">Ngh??? nghi???p</Label>
                <TextField
                  {...register('ocupation')}
                  helperText={errors.ocupation?.message}
                  type="text"
                  id="ocupation"
                  placeholder="Ngh??? nghi???p"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
              <InputComponent>
                <Label htmlFor="workUnit">????n v??? c??ng t??c</Label>
                <TextField
                  {...register('workUnit')}
                  helperText={errors.workUnit?.message}
                  type="text"
                  id="workUnit"
                  placeholder="????n v??? c??ng t??c"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
              <InputComponent>
                <Label htmlFor="address">?????a ch??? hi???n t???i</Label>
                <TextField
                  {...register('address')}
                  helperText={errors.address?.message}
                  type="text"
                  id="address"
                  placeholder="?????a ch??? hi???n t???i"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                  }}
                />
              </InputComponent>
            </FormFrame>
            <InfoTypo>2. Th??ng tin ????ng k?? ti??m ch???ng</InfoTypo>
            <FormFrame>
              <InputComponent>
                <Label htmlFor="estimatedDateInjection">
                  Ng??y mu???n ???????c ti??m (d??? ki???n)
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
                          placeholder: 'Ng??y/Th??ng/N??m'
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
                <Label htmlFor="injectionSession">Bu???i ti??m mong mu???n</Label>
                <FormControl fullWidth>
                  <Select
                    {...register('injectionSession')}
                    fullWidth
                    displayEmpty={true}
                    id="injectionSession"
                    renderValue={(selected: string) => {
                      if (!selected) {
                        return (
                          <PlaceholderTypo>Bu???i ti??m mong mu???n</PlaceholderTypo>
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
            <NoteTypo>L??u ??:</NoteTypo>
            <FrameNote>
              <li>
                <FrameNoteTypo>
                  Vi???c ????ng k?? th??ng tin ho??n to??n b???o m???t v?? ph???c v??? cho chi???n
                  d???ch ti??m ch???ng V???c xin COVID - 19
                </FrameNoteTypo>
              </li>{' '}
              <li>
                <FrameNoteTypo>
                  Xin vui l??ng ki???m tra k??? c??c th??ng tin b???t bu???c(VD: H??? v?? t??n,
                  Ng??y th??ng n??m sinh, S??? ??i???n tho???i, S??? CMND/CCCD/M?? ?????nh danh
                  c??ng d??n/HC ...)
                </FrameNoteTypo>
              </li>{' '}
              <li>
                <FrameNoteTypo>
                  B???ng vi???c nh???n n??t "X??c nh???n", b???n ho??n to??n hi???u v?? ?????ng ??
                  ch???u tr??ch nhi???m v???i c??c th??ng tin ???? cung c???p.{' '}
                </FrameNoteTypo>
              </li>{' '}
              <li>
                <FrameNoteTypo>
                  C?? nh??n/T??? ch???c ????ng k?? th??nh c??ng tr??n h??? th???ng s??? ???????c ????a
                  v??o danh s??ch ?????t ti??m. C?? s??? y t??? s??? th??ng b??o l???ch ti??m khi
                  c?? v???c xin v?? k??? ho???ch ti??m ???????c ph?? duy???t. Tr??n tr???ng c???m ??n!
                  d???ch ti??m ch???ng V???c xin COVID - 19 Xin vui l??ng ki???m tra k???
                  c??c th??ng tin b???t bu???c(VD: H??? v?? t??n, Ng??y th??ng n??m sinh, S???
                  ??i???n tho???i, S??? CMND/CCCD/M?? ?????nh danh c??ng d??n/HC ...) B???ng
                  vi???c nh???n n??t "X??c nh???n", b???n ho??n to??n hi???u v?? ?????ng ?? ch???u
                  tr??ch nhi???m v???i c??c th??ng tin ???? cung c???p. C?? nh??n/T??? ch???c
                  ????ng k?? th??nh c??ng tr??n h??? th???ng s??? ???????c ????a v??o danh s??ch ?????t
                  ti??m. C?? s??? y t??? s??? th??ng b??o l???ch ti??m khi c?? v???c xin v?? k???
                  ho???ch ti??m ???????c ph?? duy???t. Tr??n tr???ng c???m ??n!
                </FrameNoteTypo>
              </li>
            </FrameNote>
          </Form>
        </Result>
        <SubmitContainer>
          <StyledLink to="/">
            <CancelSubmitButton>
              <ArrowBackIcon />
              H???y b???
            </CancelSubmitButton>
          </StyledLink>
          <ContinueSubmitButton
            onClick={handleSubmit(onSubmit)}
            // disabled={!isValid}
          >
            Ti???p t???c
            <ArrowForwardIcon />
          </ContinueSubmitButton>
        </SubmitContainer>
      </ResultContainer>
    </div>
  );
};

export default InjectionRegistrationStep1;
