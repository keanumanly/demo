import React,{ useEffect } from 'react';
import MaterialTable from 'material-table';
import Loader from 'react-loader-spinner'

import { Userlist,Adding,Updating,Deleting } from "../action/account"
import Messages from "../common/message"

export default function AccountList(props) {
  const [loading,setloading] = React.useState(true)
  const [open, setopen] = React.useState(false);
  const [message, setmessage] = React.useState("");
  const [severity, setseverity] = React.useState("error");
  const [stopper,Setstopper] = React.useState(true)
  const [state, setState] = React.useState({
    columns: [
      { title: 'First Name', field: 'first_name' },
      { title: 'Last Name', field: 'last_name' },
      { title: 'Username', field: 'username' },
      { title: 'User Type', field: 'usertype' },
      { title: 'Password', field: 'password' },
    ],
    data: [
      // {  username: '5',password: '2',first_name:'5' },
      // {  username: '1',password: '2',first_name:'5' },
    ],
  });

  useEffect(()=>{
    let isSubscribed = true;
    if(isSubscribed && stopper ){
      Userlist()
      .then(res=>{
        console.log('Already Load the data')
        res.forEach(element => {
          if(element.usertype === "user"){
            state.data.push({username:element.username,
              password:element.password,
              first_name:element.first_name,
              last_name:element.last_name,
              usertype:element.usertype,
              numid:element.id})
          }
        });
        setloading(!isSubscribed)
      })
      .catch(err => console.log(err));
    }
    return () => {
      console.log('unmounting Account List Page')
      isSubscribed = false

    };
  },[state.data, stopper])

  function AddRow(arg){
    console.log(arg)
    // if(arg.password.length >=8 && arg.username.length >=1 && arg.first_name.length >=1 &&
    //   arg.last_name.length >=1 && arg.usertype.length >=1){
      Adding(arg.username,arg.password,arg.first_name,arg.last_name,arg.usertype)
      .then(res=>{
        if(arg.password.length >=8 ){

          console.log('Successfully Added')
          console.log(res)
          Setstopper(false)
          setopen(true)
          setmessage('Successfully Added.')
          setseverity('success')
          setState((prevState) => {
            const data = [...prevState.data];
            data.push({username:res.username,
              password:res.password,
              first_name:res.first_name,
              last_name:res.last_name,
              usertype:res.usertype,
              numid:res.id});
            return { ...prevState, data };
          });        
        }
        else{
          setopen(true)
          setmessage(res)
          setseverity('warning')
        }

      })
      .catch(err=>{
        console.log(err.response)
        setopen(true)
        setmessage(err.response?
            err.response.data.username?err.response.data.username[0]:'Please Complete Field.'
            :'Please Complete Field.')
        setseverity('warning')
        // console.log(err.response.data.username?err.response.data.username[0]:'no data')
        
      })
    // }
    
  }

  function DeleteRow(arg){
    console.log(arg)
    Deleting(arg.numid)
    .then(res=>{
      Setstopper(false)
      setopen(true)
      setmessage('Successfully Delete.')
      setseverity('success')
      setState((prevState) => {
        const data = [...prevState.data];
        data.splice(data.indexOf(arg), 1);
        return { ...prevState, data };
      });
    })
    .catch(err=>console.log(err))
  }
  
  function UpdateRow(newarg,oldarg){
    Updating(newarg.username,newarg.password,newarg.first_name,
      newarg.last_name,newarg.usertype,newarg.numid)
    .then(res=>{
      if(newarg.password.length >=8 ){
        if(newarg.usertype === "user" || newarg.usertype === "admin"){
          Setstopper(false)
          setopen(true)
          setmessage('Successfully Updated.')
          setseverity('success')
          if (oldarg) {
            setState((prevState) => {
              const data = [...prevState.data];
              if(res.usertype === "user"){
                const newdata = {username:res.username,
                  password:res.password,
                  first_name:res.first_name,
                  last_name:res.last_name,
                  usertype:res.usertype,
                  numid:res.id}
                
                data[data.indexOf(oldarg)] = newdata;
              }
              else if (res.usertype === "admin"){
                data.splice(data.indexOf(oldarg), 1);
              }
              
              return { ...prevState, data };
            });
          }

        }
        else{
          setopen(true)
          setmessage(res)
          setseverity('warning')
        }
        
      }
      else{
        setopen(true)
        setmessage(res)
        setseverity('warning')
      }

    })
    .catch(err=>console.log(err))
  }

  return (
    <React.Fragment>
      {loading? 
        <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: 'nowrap',
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          height:'50vh'
          }} >
          <Loader
            type="Grid"
            color="#529A96"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      :
    <MaterialTable
      title='Account List'
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            AddRow(newData)
            setTimeout(() => {
              resolve();
            }, 3800);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            UpdateRow(newData, oldData)
            setTimeout(() => {
              resolve();
            }, 2000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            DeleteRow(oldData)
            setTimeout(() => {
              resolve();
            }, 1500);
          }),
      }}
    />
    }
    <Messages
        open={open}
        message={message}
        severity={severity}
        handleClose={() => {
        setopen(false);
        }}
    />
    </React.Fragment>
  );
}
