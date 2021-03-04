import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './SensorChart.css';

interface Props {
  histData:
    | {
        date: string;
        temp: number;
        humidity: number;
      }[]
    | undefined;
}

const chartConstants = {
  width: window.innerWidth * 0.9,
  height: window.innerHeight * 0.4,
};

const SensorChart: React.FC<Props> = ({ histData }) => {
  const makeDateString = (date: string) => {
    let out = '';
    if (date.length > 0) {
      out = new Date(date)
        .toLocaleDateString('sv-SE', {
          day: 'numeric',
          month: 'long',
          weekday: 'short',
        })
        .slice(0, -1);
    }
    return out;
  };

  const tickMap: boolean[] | undefined = histData
    ?.map(({ date }) => makeDateString(date))
    .map((date, i, self) => self.indexOf(date) === i);

  const ticksArray: string[] | undefined = histData
    ?.map(({ date }, i) => (tickMap![i] ? date : ''))
    .filter((el) => el !== '');
  return (
    <div className="chart">
      <p>Temperature</p>
      <LineChart
        width={chartConstants.width}
        height={chartConstants.height}
        data={histData}
        syncId="date"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          ticks={ticksArray}
          tickFormatter={makeDateString}
        />
        <YAxis
          domain={[
            (dataMin: number) => Math.round(dataMin - 10),
            (dataMax: number) => Math.round(dataMax + 10),
          ]}
          minTickGap={5}
          allowDecimals={false}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#ff4f2b"
          fill="#ff4f2b"
          dot={false}
          strokeWidth={3}
          activeDot={{ stroke: '#ff4f2b', strokeWidth: 9 }}
        />
      </LineChart>
      <p>Humidity</p>
      <LineChart
        width={chartConstants.width}
        height={chartConstants.height}
        data={histData}
        syncId="date"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          ticks={ticksArray}
          tickFormatter={makeDateString}
        />
        <YAxis
          domain={[
            (dataMin: number) => Math.round(dataMin - 10),
            (dataMax: number) => Math.min(Math.round(dataMax + 10), 100),
          ]}
          minTickGap={5}
          allowDecimals={false}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#2b7cff"
          fill="#2b7cff"
          dot={false}
          strokeWidth={3}
          activeDot={{ stroke: '#2b7cff', strokeWidth: 9 }}
        />
      </LineChart>
    </div>
  );
};

export default SensorChart;
