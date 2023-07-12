import { createSlice } from '@reduxjs/toolkit'

export const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState: {
        userData: {
            C_USUARIO:'',
            D_DENOMINACION:'',
            ID_REL_PERSONA: null,
            D_MAIL: '',
            USERCAPS: '',
            D_PATH_IMG: ''
        },
        userMenu: [],
        userPerf: [],
        userHome: {},
        status: 'inact', // 'inact'|'loading'|'success'
        error: null
    },
    reducers: {
        setStatus: (state) => {
            if(state.status === 'inact'){
                state.status = 'loading';
            }
        },
        setUserData:(state, action)=>{
            state.status = 'success';
            state.userData = action.payload;
        },
        setUserMenu:(state, action)=>{
            state.status = 'success';
            state.userMenu = action.payload;
        },
        setUserPerf:(state, action)=>{
            state.status = 'success';
            state.userPerf = action.payload;
        },
        setUserHome:(state, action)=>{
            state.status = 'success';
            state.userHome = action.payload;
        }

    }
});

export const { setStatus, setUserData, setUserMenu, setUserPerf, setUserHome } = usuarioSlice.actions;
export default usuarioSlice.reducer;
