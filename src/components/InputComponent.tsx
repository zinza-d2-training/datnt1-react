import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import { registerFormInputs } from 'pages/Register';
import { UseFormRegister } from 'react-hook-form';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  width: 100%;
  background: #ffffff;
`;

const Label = styled.label`
  min-height: 24px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  color: rgba(0, 0, 0, 0.87);
`;

const Field = styled(TextField)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 3px;
  width: 100%;
`;

export type registerInput =
  | 'identification_card'
  | 'email'
  | 'password'
  | 'fullname'
  | 'birthday'
  | 'gender'
  | 'province'
  | 'district'
  | 'ward';

type RegisterInputProps = {
  label: string;
  placeholder: string;
  id: string;
  helperText?: string;
  type?: string;
  register: UseFormRegister<registerFormInputs>;
};

const InputComponent = ({
  label,
  placeholder,
  id,
  helperText,
  type,
  register
}: RegisterInputProps) => {
  return (
    <InputContainer>
      <Label htmlFor={id}>
        {label}
        <Typography component="span" sx={{ color: '#D32F2F' }}>
          {' '}
          (*)
        </Typography>
      </Label>
      <Field
        id={id}
        variant="outlined"
        type={type}
        placeholder={placeholder}
        fullWidth
        helperText={helperText}
        {...register(id as registerInput)}
        FormHelperTextProps={{
          sx: { color: '#d32f2f', margin: '3px 0px 0px' }
        }}
      />
    </InputContainer>
  );
};

export default InputComponent;
