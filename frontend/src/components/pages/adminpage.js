import React,{ useEffect } from 'react';
import { Redirect,withRouter } from "react-router-dom";

import { UserInfo,Logout } from "../action/account"
import Messages from "../common/message"
import AccountList from "./accountlist"
import Loader from 'react-loader-spinner'
import BgImg from "../assets/undraw_version_control_9bpv.svg"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign:'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform:'uppercase',
    fontWeight:600,
    textAlign:'left',
    fontSize:'16px'
  },
  btn:{
    textTransform:'uppercase',
    fontWeight:600
  }
}));

function AdminPage(props) {
  const classes = useStyles();
  const [data,setdata] = React.useState([])
  const [open, setopen] = React.useState(false);
  const [message, setmessage] = React.useState("");
  const [severity, setseverity] = React.useState("error");
  const [stopper, Setstopper] = React.useState(true)
  
  useEffect(()=>{
    let isSubscribed = true;
    if(isSubscribed && localStorage.getItem("token") ){
      
      UserInfo(localStorage.getItem("token"))
      .then(res=>{
        console.log('Already Load the data')
        
        setTimeout(() => {
          setdata(res.data) 
          if(stopper){
            setopen(true)
            setmessage(`Welcome ${res.data.first_name} ${res.data.last_name}!`)
            setseverity('info')
            Setstopper(false)
          }
        }, 1000);
      })
      .catch(err => console.log(err));
    }
    else {
      return <Redirect to="/login" />;
    }
    return () => {
      console.log('unmounting user page')
      isSubscribed = false
    };
  },[setdata,stopper])

  function onLogout (){
    Logout(localStorage.getItem("token"))
    .then(()=>{
      setopen(true)
      setmessage(`Logouting Now.`)
      setseverity('info')
      Setstopper(false)
      setTimeout(() => {
        localStorage.clear()
        props.history.push('/');
      }, 1000);
    })
  }

  return (
    <>
    {
      data.length !== 0?
    <div className={classes.root}>
      <AppBar position="static" style={{marginBottom:'5%'}}>
        <Toolbar style={{background: '#529A96'}}>
          <Typography variant="h6" className={classes.title}>
            {data.username} 
          </Typography>
          <Button color="inherit" className={classes.btn} onClick={()=>onLogout()}>logout</Button>
        </Toolbar>
      </AppBar>
      <img src={BgImg} alt="svg_image" style={{width:'25%'}} />
      <AccountList userid={data.id} />
    </div>      
      :
      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: 'nowrap',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height:'100vh'
        }} >
      <Loader
         type="Grid"
         color="#529A96"
         height={100}
         width={100}
         timeout={3000}
      />
      </div>

    }
    <Messages
        open={open}
        message={message}
        severity={severity}
        handleClose={() => {
        setopen(false);
        }}
    />
    </>
  );
}

export default withRouter(AdminPage);