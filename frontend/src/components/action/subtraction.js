import axios from "axios"

// Add item in Addition
export const Adding =(first_number,second_number,userid)=>{
    const total = parseFloat(first_number) - parseFloat(second_number);
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({first_number,second_number,total,userid});
    
    return axios.post(`api/subtraction/`,body,config);
}

export const GetList = (userid) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.get(`api/getsubtraction/${userid}`,config);
}

export const Deleting = (id) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.delete(`api/subtraction/${id}`,config);
}

export const Updating = (first_number,second_number,userid,id) =>{
    const total = parseFloat(first_number) - parseFloat(second_number);
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({first_number,second_number,total,userid});

    return axios.put(`api/subtraction/${id}/`,body,config);
}