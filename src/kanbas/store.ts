import {configureStore} from "@reduxjs/toolkit";
import modulesReducer from "./courses/modules/reducer"
import accountReducer from "./account/reducer"
import assignmentsReducer from "./courses/assignments/reducer"

const store = configureStore({
        reducer: {
            modulesReducer,
            accountReducer,
            assignmentsReducer
        }
    }
)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch