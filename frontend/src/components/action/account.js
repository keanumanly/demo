import axios from "axios"

// Register Account for Users Only
 export const CreateUser =(username,password,first_name,last_name)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({username,password,first_name,last_name});
    

    return axios.post(`api/auth/register`,body,config);
    // return axios.get(`api/accounts/`);
 }

 // Update Access Control After Registration
 export const UpdateUser =(userid,usertype="user")=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({userid,usertype});
    
    
    return axios.post(`api/usertype/`,body,config);
 }

// Update user account
export const UpdateAdmintype =(id,userid,usertype="admin")=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({userid,usertype});
    
    
    return axios.put(`api/usertype/${id}/`,body,config);
 }
export const UpdateUsertype =(id,userid,usertype="user")=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({userid,usertype});
    
    
    return axios.put(`api/usertype/${id}/`,body,config);
 }
// Login 
export const Signin = (username,password) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({username,password});

    return axios.post(`api/auth/login`,body,config)
    
}

// Get Access Control 
export const Getaccess = (id) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.get(`api/access/${id}`,config)
}

// Get User Info
export const UserInfo = (token) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // If token, add to headers config
    if(token){
        config.headers['Authorization'] = `token ${token}`;
    }

    return axios.get('api/auth/user',config);
}

// Logout
export const Logout = (token) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // If token, add to headers config
    if(token){
        config.headers['Authorization'] = `token ${token}`;
    }

    return axios.post('api/auth/logout',null,config);
}

export const List = () =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.get(`api/accounts/`,config)
}

export const Userlist = async () => {
    const list = await List();
    
    const  data = await list.data.map( async res =>{
        const accesscontrol = await Getaccess(res.id)
        .then(result=>{
            
            return {id:res.id, username:res.username,
                password:res.password, first_name:res.first_name,
                last_name:res.last_name,usertype:result.data[0].usertype}
        })
        // console.log(accesscontrol)
        return accesscontrol
    })

    const functionWithPromise = item => {
        //a function that returns a promise
        return Promise.resolve(item);
     };
    
    const anAsyncFunction = async item => {
        return functionWithPromise(item);
    };
    const getData = async () => {
        return Promise.all(data.map(item => anAsyncFunction(item)));
    };
    
    return getData();
}

export const Adding = async (username,password,first_name,last_name,usertype) =>{
    console.log(username,password,first_name,last_name)
    if(password.length >=8){
        const created = await CreateUser(username,password,first_name,last_name)
        .then(async res=>{

            // if(usertype === "user"){
                const account = await UpdateUser(res.data.user.id)
                console.log(account.data.usertype)
                return {id:res.data.user.id,username:res.data.user.username,
                        password:res.data.user.password,first_name:res.data.user.first_name,
                        last_name:res.data.user.last_name,usertype:account.data.usertype}

            // }
            // else {
            //     const account = await UpdateAdmin(res.data.user.id)
            //     console.log(account.data.usertype)
            //     return {id:res.data.user.id,username:res.data.user.username,
            //             password:res.data.user.password,first_name:res.data.user.first_name,
            //             last_name:res.data.user.last_name,usertype:account.data.usertype}
            // }
        })
        return created;
    }
    else {
        const data =password.length >=8?'Please Complete Field':'Password atleast 8 characters'
        return data;
    }

}

export const UploadState = (id,username,password,first_name,last_name) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({username,password,first_name,last_name});
    
    return axios.put(`api/changepassword/${id}/`,body,config)
}

export const Updating = async (username,password,first_name,last_name,usertype,id) =>{
    console.log(username,password,first_name,last_name,usertype,id)

    if(password.length >=8  ){
        if(usertype === "user" || usertype === "admin"){

            const updated = await UploadState(id,username,password,first_name,last_name)
            .then( async res=>{
                // console.log(res.data)
                if(usertype === "user"){
                    const access = await Getaccess(res.data.id)
                    const account = await UpdateUsertype(access.data[0].id,res.data.id)
                    
                    return {id:res.data.id,username:res.data.username,
                            password:res.data.password,first_name:res.data.first_name,
                            last_name:res.data.last_name,usertype:account.data.usertype}
                }
                else {
                    const access = await Getaccess(res.data.id)
                    const account = await UpdateAdmintype(access.data[0].id,res.data.id)
                    
                    return {id:res.data.id,username:res.data.username,
                            password:res.data.password,first_name:res.data.first_name,
                            last_name:res.data.last_name,usertype:account.data.usertype}
                }
                
            })

            return updated;
        }
        else {
            const data ='Invalid Input User Type'
            return data
        }

    }
    else {
        const data =password.length >=8?'Please Complete Field':'Password atleast 8 characters'
        return data;
    }
}


export const Deleting = (id) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.delete(`api/accounts/${id}/`,null,config)
}