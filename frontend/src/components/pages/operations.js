import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Addition from "./addition"
import Subtract from "./subtract"
import Multiplication from "./multiply"
import Division from "./divide"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin:'0 auto'
  },
}));

export default function Operations(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background: '#529A96',margin:'0 auto',maxWidth:'95%'}}>
        <Tabs value={value} onChange={handleChange}
        style={{background: '#529A96',margin:'0 auto',maxWidth:'95%'}}
         aria-label="wrapped label tabs example">
          <Tab
            value="one"
            label="Addition"
            wrapped
            {...a11yProps('one')}
            style={{fontWeight:600}} 
          />
          <Tab value="two" label="Subtraction" {...a11yProps('two')} style={{fontWeight:600}} />
          <Tab value="three" label="Multiplication" {...a11yProps('three')} style={{fontWeight:600}}  />
          <Tab value="fourth" label="Division" {...a11yProps('three')} style={{fontWeight:600}}  />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one" style={{maxWidth:'95%',margin:'0 auto'}}>
        <Addition id={props.userid}/>
      </TabPanel>
      <TabPanel value={value} index="two" style={{maxWidth:'95%',margin:'0 auto'}}>
        <Subtract id={props.userid}/>
      </TabPanel>
      <TabPanel value={value} index="three" style={{maxWidth:'95%',margin:'0 auto'}}>
        <Multiplication id={props.userid}/>
      </TabPanel>
      <TabPanel value={value} index="fourth" style={{maxWidth:'95%',margin:'0 auto'}}>
        <Division id={props.userid}/>
      </TabPanel>
    </div>
  );
}
