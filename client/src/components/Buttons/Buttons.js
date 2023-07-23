import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';

const Buttons= ({filterButton}) => {
    const classes = useStyles()
   
let data="";
    return (        
       
            <><Button className={classes.button} onClick={() => filterButton("Not Started")}>Not Started</Button><Button className={classes.button} onClick={() => filterButton("In Progress")}>In Progress</Button><Button className={classes.button} onClick={() => filterButton("Submitted")}>Submitted</Button><Button className={classes.button} onClick={() => filterButton("All")}>All</Button></>
           
    );
};
export default Buttons;