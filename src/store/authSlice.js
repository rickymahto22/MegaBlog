import {createSlice} from '@reduxjs/toolkit';
//this slice is created so as to check if the user is authenticated
const initialState ={
    status: false,
    userData:null
}

 const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{// THESE REDUCERS ONLY CHANGE THE VALUE OF GIVEN STATE AND NOT CREATE A STATE FOR ITSELF
        login: (state,action) =>{
            state.status = true
            state.userData = action.payload
        },

        logout:(state)=>{
            state.status = false
            state.userData =null;
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer