import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StepperContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;

  width: 100vw;
  height: 40px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;

  /* max-width: 604px; */
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
    /* color: #ffffff; */
    color: #1976d2;
  }

  & span {
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

const Stepper = () => {
  return (
    <StepperContainer>
      <Content>
        <Circle>
          <CheckCircleIcon className="circleIcon" />
          <span>Thông tin cá nhân</span>
        </Circle>
        <Line />
        <Circle>
          3 <span>Phiếu đồng ý tiêm</span>
        </Circle>
        <Line />
        <Circle>
          4 <span>Hoàn thành</span>
        </Circle>
      </Content>
    </StepperContainer>
  );
};

export default Stepper;
