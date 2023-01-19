import styled from '@emotion/styled';
import { faker } from '@faker-js/faker';
import { Typography } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { labels } from 'dummy-data';
import { Line } from 'react-chartjs-2';

const ChartContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 36px;
  width: 100%;
  margin: 84px 0px 39px;
`;

const LineChartContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 10px;

  width: 100%;

  background: #ffffff;
  border: 1px solid rgba(38, 56, 150, 0.14);
  box-shadow: 0px 4px 12px rgba(34, 41, 47, 0.12);
  border-radius: 10px;

  & .line {
    padding: 10px;
    gap: 10px;

    width: 100%;
  }
`;

const ChartTypo = styled(Typography)`
  max-width: 199px;
  height: 32px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: -0.05px;
  color: rgba(0, 0, 0, 0.87);
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Đã tiêm',
      data: labels.map(() =>
        faker.datatype.number({ min: 400000, max: 2200000 })
      ),
      borderColor: '#281ba4',
      backgroundColor: '#281ba4',
      pointBackgroundColor: '#ee0033',
      pointBorderColor: '#f46584'
    }
  ]
};

function LineChart() {
  return (
    <ChartContainer>
      <LineChartContainer>
        <ChartTypo>Dữ liệu tiêm theo ngày</ChartTypo>
        <Line className="line" options={options} data={data} />
      </LineChartContainer>
    </ChartContainer>
  );
}

export default LineChart;
