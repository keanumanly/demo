import React,{ useEffect } from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Messages from "../common/message"
import { Signin, Getaccess, UserInfo } from "../action/account"

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
function Login(props){
    const classes = useStyles();
    const [username,setusername] = React.useState('');
    const [password, setpassword] = React.useState("");

    const [open, setopen] = React.useState(false);
    const [message, setmessage] = React.useState("");
    const [severity, setseverity] = React.useState("error");

    //error validation
    const [errorusername, errorsetUsername] = React.useState(false);
    const [errorpassword, errorsetPassword] = React.useState(false);

    useEffect(()=>{
      let isSubscribed = true;
      if(isSubscribed && localStorage.getItem("token") ){
        UserInfo(localStorage.getItem("token"))
        .then(res=>{
          Getaccess(res.data.id)
          .then(result=>{
            if(result.data[0].usertype === "user"){
              props.history.push("/3");
            }
            else {
              props.history.push("/1");
            }
          })
        })
      }

      return () => {
        console.log('unmounting Login page')
        isSubscribed = false
      };
    },[props.history])

    function Submit(event){
        event.preventDefault();
        if(username.length !== 0 && password.length !== 0){
            Signin(username,password)
            .then(res=>{
                setopen(true)
                setmessage('Successfully Login!!')
                setseverity('info')
                Getaccess(res.data.user.id)
                .then(response=>{
                    setTimeout(() => {
                        localStorage.setItem("token", res.data.token);
                        if(response.data[0].usertype === "user"){
                            props.history.push("/3");
                        }
                        else{
                            props.history.push("/1");
                        }
                        
                    }, 2000);
                })

            })
            .catch(err=>{
                console.log(err.response)
                setopen(true)
                setmessage(err.response.data.non_field_errors[0])
                setseverity('warning')
                errorsetUsername(true)
                errorsetPassword(true)
            })
        }
        else {
            setopen(true)
            setmessage('Invalid Credential')
            setseverity('warning')
            errorsetUsername(true)
            errorsetPassword(true)
        }
    }

    return (
        <React.Fragment>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        error={errorusername ? true : false}
                        onChange={e => {
                            e.target.value
                              ? errorsetUsername(false)
                              : errorsetUsername(true);
                            setusername(e.target.value);
                        }}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        error={errorpassword ? true : false}
                        onChange={e => {
                            e.target.value
                              ? errorsetPassword(false)
                              : errorsetPassword(true);
                            setpassword(e.target.value);
                        }}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => Submit(e)}
                        >
                        Sign In
                        </Button>
                        <Grid container>
                        </Grid>
                        <Box mt={5}>
                        <Copyright />
                        </Box>
                    </form>
                    </div>
                </Grid>
                </Grid>
                <Messages
                    open={open}
                    message={message}
                    severity={severity}
                    handleClose={() => {
                    setopen(false);
                    }}
                />
        </React.Fragment>
    )
}
export default Login;