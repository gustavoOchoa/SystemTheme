import { configureStore } from '@reduxjs/toolkit'
import usuarioSlice from "./slices/usuariosSlice";

export const store = configureStore({
    reducer: {
        usuarios: usuarioSlice
    },
});