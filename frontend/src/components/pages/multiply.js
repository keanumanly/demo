import React,{ useEffect } from 'react';
import MaterialTable from 'material-table';
import Loader from 'react-loader-spinner'

import { Adding,GetList,Deleting,Updating } from "../action/multiplication"
import Messages from "../common/message"

export default function Multiplication(props) {
  const [loading,setloading] = React.useState(true)
  const [open, setopen] = React.useState(false);
  const [message, setmessage] = React.useState("");
  const [severity, setseverity] = React.useState("error");
  const [stopper, Setstopper] = React.useState(true)
  const [grandtotal,setgrandtotal] = React.useState(0)
  const [state, setState] = React.useState({
    columns: [
      { title: 'Number X', field: 'numx' },
      { title: 'Number Y', field: 'numy' },
      { title: 'Product', field: 'total' },
    ],
    data: [],
  });

  useEffect(()=>{
    let isSubscribed = true;
    let count = 0;
    if(isSubscribed && props.id && stopper ){
      GetList(props.id)
      .then(res=>{
        console.log('Already Load the data')
        res.data.forEach(element => {
          state.data.push({numx:element.first_number,
            numy:element.second_number,
            total:element.total,
            numid:element.id})
            count += parseFloat(element.total) ;
        });
        setgrandtotal(count)
        setloading(!isSubscribed)
      })
      .catch(err => console.log(err));
    }
    return () => {
      console.log('unmounting Addition Page')
      isSubscribed = false

    };
  },[props.id,state.data, stopper])

  function AddRow(arg){
    console.log(arg)
    let count = 0;
    Adding(arg.numx,arg.numy,props.id)
    .then(res=>{
      console.log('Successfully Added')
      console.log(res.data)
      Setstopper(false)
      setopen(true)
      setmessage('Successfully Added.')
      setseverity('success')
      count = parseFloat(arg.numx) * parseFloat(arg.numy)
      count = parseFloat(grandtotal) + parseFloat(count)
      setgrandtotal(count)
      setState((prevState) => {
        const data = [...prevState.data];
        data.push({numx:res.data.first_number,
        numy:res.data.second_number,
        total:res.data.total,
        numid:res.data.id});
        return { ...prevState, data };
      });
    })
    .catch(err=>{
      setopen(true)
      setmessage('A valid Integer is required.')
      setseverity('warning')
      console.log(err)})
  }

  function DeleteRow(arg){
    console.log(arg)
    let count = 0;
    Deleting(arg.numid)
    .then(res=>{
      Setstopper(false)
      setopen(true)
      setmessage('Successfully Delete.')
      setseverity('success')
      count = parseFloat(grandtotal) - parseFloat(arg.total)
      setgrandtotal(count)
      setState((prevState) => {
        const data = [...prevState.data];
        data.splice(data.indexOf(arg), 1);
        return { ...prevState, data };
      });
    })
    .catch(err=>console.log(err))
  }
  
  function UpdateRow(newarg,oldarg){
    let count = 0;
    Updating(newarg.numx,newarg.numy,props.id,newarg.numid)
    .then(res=>{
      Setstopper(false)
      setopen(true)
      setmessage('Successfully Updated.')
      setseverity('success')
      if (oldarg) {
        count = parseFloat(oldarg.total) - parseFloat(res.data.total)
        count = parseFloat(grandtotal) - parseFloat(count)
        setgrandtotal(count)
        setState((prevState) => {
          const newdata = {numx:res.data.first_number,
            numy:res.data.second_number,
            total:res.data.total,
            numid:res.data.id}
          const data = [...prevState.data];
          data[data.indexOf(oldarg)] = newdata;
          return { ...prevState, data };
        });
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
      title={`Grand Total: ${grandtotal}`}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            AddRow(newData)
            setTimeout(() => {
              resolve();
            }, 1500);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            UpdateRow(newData, oldData)
            setTimeout(() => {
              resolve();
            }, 1500);
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
