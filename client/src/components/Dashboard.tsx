import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Sensor from './Sensor';
import './Dashboard.css';

const SENSORS_URL = 'http://localhost:3030/sensors';

interface ISensors {
  id: string;
  battery: number;
  name: string;
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    maxWidth: 700,
  },
}));

const Dashboard: React.FC = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    fetch(SENSORS_URL)
      .then((data) => data.json())
      .then((json) => setSensors(json));
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {sensors.map((s: ISensors) => (
          <Grid item xs={6} md={3} key={s.id}>
            <Link
              to={{
                pathname: `/history/${s.id}`,
                state: { sensorName: s.name },
              }}
              key={s.id}
            >
              <Sensor id={s.id} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
