import React, { useState, useEffect } from 'react';
import './History.css';
import { useHistory } from 'react-router-dom';
import SensorChart from './SensorChart';

const HISTORY_URL = 'http://localhost:3030/history';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
  location: {
    state: {
      sensorName: string;
    };
  };
}

interface History {
  id: string;
  date: string;
  data: {
    name: string;
    value: number;
  }[];
}
interface Reading {
  name: string;
  value: number;
}

interface ParsedReading {
  date: string;
  temp: number;
  humidity: number;
}

const History: React.FC<Props> = ({ match, location }) => {
  const {
    params: { id },
  } = match;

  const {
    state: { sensorName },
  } = location;

  const [history, setHistory] = useState<ParsedReading[]>();

  function parseData(histReadings: History[]) {
    function parseReading(readings: Reading[]) {
      const objs = readings.map((reading: Reading) => ({
        [reading.name]: reading.value,
      }));
      return Object.assign(objs[0], objs[1]);
    }

    return histReadings
      .slice(Math.max(histReadings.length - 150, 0))
      .map((el: History) => ({
        date: el.date,
        temp: parseReading(el.data).temp,
        humidity: parseReading(el.data).humidity,
      }));
  }

  useEffect(() => {
    fetch(`${HISTORY_URL}/${id}`)
      .then((resp) => resp.json())
      .then((json) => setHistory(parseData(json.history)));
  }, []);

  const browserHistory = useHistory();
  return (
    <div>
      <h1>{sensorName}</h1>
      <SensorChart histData={history} />
      <button type="button" onClick={() => browserHistory.goBack()}>
        Back
      </button>
    </div>
  );
};

export default History;
