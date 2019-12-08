import React from 'react';

import TaskStatus from '../../../static/TaskStatus';

import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import classes from './ToggleButtons.module.css';


const ToggleButtons = (props) => {

  return (
      <Grid className={classes.Content}>

        <div>

          <ToggleButtonGroup
            id={props.id}
            size="small"
            value={props.status}
            onChange={props.toggleChanged}
            exclusive>

            <ToggleButton 
              value={TaskStatus.ACTIVE} 
              disabled={props.status === TaskStatus.ACTIVE}> active </ToggleButton>

            <ToggleButton 
              value={TaskStatus.COMPLETED} 
              disabled={props.status === TaskStatus.COMPLETED}> completed</ToggleButton>

          </ToggleButtonGroup>

        </div>
        
      </Grid>
  );
}
export default ToggleButtons;
