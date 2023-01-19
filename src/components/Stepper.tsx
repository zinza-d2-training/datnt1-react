import styled from '@emotion/styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';

const StepperContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;

  width: 100%;
  height: 40px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;

  height: 24px;
`;

const Line = styled.div`
  width: 250px;
  height: 1px;

  background: #bdbdbd;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 20px;
  height: 20px;

  background: rgba(0, 0, 0, 0.38);
  border-radius: 20px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;

  letter-spacing: -0.04px;

  position: relative;
  color: #ffffff;

  & .circleIcon {
    width: 24px;
    height: 24px;
    font-size: 24px;
    border-radius: 20px;
    background: #ffffff;
    color: #1976d2;
  }

  & .MuiTypography-root {
    margin: 0;
    position: absolute;
    top: 32px;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    min-width: 120px;
    min-height: 20px;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    letter-spacing: -0.04px;
    text-align: center;

    color: rgba(0, 0, 0, 0.87);
  }
`;

const registerSteps = [
  {
    step: 1,
    content: 'Thông tin cá nhân'
  },
  {
    step: 2,
    content: 'Phiếu đồng ý tiêm'
  },
  {
    step: 3,
    content: 'Hoàn thành'
  }
];

interface StepperProps {
  step: number;
}

const Stepper = ({ step }: StepperProps) => {
  return (
    <StepperContainer>
      <Content>
        {registerSteps.map((registerStep) => {
          return registerStep.step === step ? (
            <>
              <Circle>
                <CheckCircleIcon className="circleIcon" />
                <Typography>{registerStep.content}</Typography>
              </Circle>
              {registerStep.step !== registerSteps.length ? <Line /> : null}
            </>
          ) : (
            <>
              <Circle>
                {registerStep.step}
                <Typography>{registerStep.content}</Typography>
              </Circle>
              {registerStep.step !== registerSteps.length ? <Line /> : null}
            </>
          );
        })}
      </Content>
    </StepperContainer>
  );
};

export default Stepper;
