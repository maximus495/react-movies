import { createSlice } from "@reduxjs/toolkit";
interface DataI {
  name?: string;
}
export interface LoginSliceI {
  data: DataI;
  token: string;
  Email:string
}

const initialState: LoginSliceI = {
  token: "",
  data: {},
  Email:''
};

export const loginSlice = createSlice({
    name:'loginSlice',
    initialState,
    reducers:{
        setToken: (state, action) => {
            return {
                ...state,
                token:action.payload
            }
        },
        setData: (state, action) => {
            return {
                ...state,
                data:action.payload
            }
        },
        setEmail: (state, action) => {
          return {
              ...state,
              Email:action.payload
          }
        },
        setPass: (state, action) => {
          return {
              ...state,
              Pass:action.payload
          }
        },
    }
})

export const {setToken,setData, setEmail, setPass} =  loginSlice.actions

export default loginSlice.reducer

