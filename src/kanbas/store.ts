import {configureStore} from "@reduxjs/toolkit";
import modulesReducer from "./courses/modules/reducer"

const store = configureStore({
        reducer: {
            modulesReducer
        }
    }
)

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;