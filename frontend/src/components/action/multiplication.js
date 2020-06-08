import axios from "axios"

// Add item in Addition
export const Adding =(first_number,second_number,userid)=>{
    const total = parseFloat(first_number) * parseFloat(second_number);
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({first_number,second_number,total,userid});
    
    return axios.post(`api/multiplication/`,body,config);
}

export const GetList = (userid) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.get(`api/getmultiplication/${userid}`,config);
}

export const Deleting = (id) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.delete(`api/multiplication/${id}`,config);
}

export const Updating = (first_number,second_number,userid,id) =>{
    const total = parseFloat(first_number) * parseFloat(second_number);
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({first_number,second_number,total,userid});

    return axios.put(`api/multiplication/${id}/`,body,config);
}