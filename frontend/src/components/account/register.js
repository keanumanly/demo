import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

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
import FormHelperText from '@material-ui/core/FormHelperText';

import { CreateUser, UpdateUser } from "../action/account"
import Messages from "../common/message"

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
  
function Register(props){
    const classes = useStyles();
    const [username,setusername] = React.useState('');
    const [password, setpassword] = React.useState("");
    const [conpassword, setconpassword] = React.useState("");
    const [firstname,setfirstname] = React.useState('');
    const [lastname, setlastname] = React.useState("");

    const [open, setopen] = React.useState(false);
    const [message, setmessage] = React.useState("");
    const [severity, setseverity] = React.useState("error");

    //error validation
    const [errorusername, errorsetUsername] = React.useState(false);
    const [errorpassword, errorsetPassword] = React.useState(false);
    const [errorconpassword, errorsetConpassword] = React.useState(false);
    const [errorfirstname, errorsetFirstname] = React.useState(false);
    const [errorlastname, errorsetLastname] = React.useState(false);

    function Submit(event){
        event.preventDefault();

        if(username.length !==0 && password.length !==0 && conpassword.length !==0 &&  password === conpassword &&
            password.length >=8 && conpassword.length >=8 && firstname.length !==0 && lastname.length !==0){

                CreateUser(username,password,firstname,lastname)
                .then(res=>{

                    UpdateUser(res.data.user.id)
                    .then(response=>{
                        setopen(true);
                        setmessage('Successfully Created!!!');
                        setseverity('success');
                        setTimeout(()=>{
                            props.history.push("/login");
                        },2000)
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
        }
        else{
            setopen(true);
            setmessage('Please Fill Up the Form Field!');
            setseverity('error');
        
            if(username.length ===0 || firstname.length ===0 || lastname.length ===0){
                errorsetUsername(true)
                errorsetFirstname(true)
                errorsetLastname(true)
                errorsetPassword(true)
                errorsetConpassword(true)
            }
            
            else{
                if(password !== conpassword){
                    errorsetPassword(true)
                    errorsetConpassword(true)
                }
                else if(password.length !==0 || conpassword.length !==0){
                    errorsetPassword(true)
                    errorsetConpassword(true)
                }
                
            }
        }
    }

    // REDIRECT TO DASHBOARD
    const token = localStorage.getItem("token");
    if (token) {
        return <Redirect to="/" />;
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
                        Sign Up
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
                        inputProps={{
                            maxLength: 50,
                        }}
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
                        inputProps={{
                            maxLength: 50,
                        }}
                        value={password}
                        error={errorpassword ? true : false}
                        onChange={e => {
                            e.target.value
                              ? errorsetPassword(false)
                              : errorsetPassword(true);
                            setpassword(e.target.value);
                            
                        }}
                        />
                        <FormHelperText id="component-helper-text">Password atleast 8 characters</FormHelperText>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="conpassword"
                        label="Confirm assword"
                        type="password"
                        id="conpassword"
                        autoComplete="current-password"
                        inputProps={{
                            maxLength: 50,
                        }}
                        value={conpassword}
                        error={errorconpassword ? true : false}
                        onChange={e => {
                            e.target.value
                              ? errorsetConpassword(false)
                              : errorsetConpassword(true);
                            setconpassword(e.target.value);
                            
                        }}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="firstname"
                        autoFocus
                        inputProps={{
                            maxLength: 50,
                        }}
                        value={firstname}
                        error={errorfirstname ? true : false}
                        onChange={e => {
                            e.target.value
                              ? errorsetFirstname(false)
                              : errorsetFirstname(true);
                            setfirstname(e.target.value);
                            
                        }}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lastname"
                        label="Last Name"
                        type="text"
                        id="lastname"
                        autoComplete="Lastname"
                        inputProps={{
                            maxLength: 50,
                        }}
                        value={lastname}
                        error={errorlastname ? true : false}
                        onChange={e => {
                            e.target.value
                              ? errorsetLastname(false)
                              : errorsetLastname(true);
                            setlastname(e.target.value);
                            
                        }}
                        />
                        <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => Submit(e)}
                        >
                        Sign Up
                        </Button>
                        <Grid container>
                        <Grid item>
                            <Link to="/login">
                            {"Sign In Instead"}
                            </Link>
                        </Grid>
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
export default withRouter(Register);