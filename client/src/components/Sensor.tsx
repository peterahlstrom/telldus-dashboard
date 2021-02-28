import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './Sensor.css';

const SENSORS_URL = 'http://localhost:3030/sensor';

interface Sensor {
  id: string;
  name: string;
  data: {
    name: string;
    value: number;
  }[];
}

interface Props {
  id: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 700,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const Sensor: React.FC<Props> = ({ id }) => {
  const [sensorData, setSensorData] = useState<Sensor | undefined>(undefined);

  useEffect(() => {
    fetch(`${SENSORS_URL}/${id}`)
      .then((resp) => resp.json())
      .then((json) => setSensorData(json));
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <h1>{sensorData?.name}</h1>
        <h2>
          &#127777;{sensorData?.data?.find((e) => e.name === 'temp')?.value}
          &deg;
        </h2>
        <h2>
          &#x1F4A7;{sensorData?.data?.find((e) => e.name === 'humidity')?.value}
          %
        </h2>
      </Paper>
    </div>
  );
};

export default Sensor;
