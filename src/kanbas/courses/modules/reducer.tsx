import {createSlice} from "@reduxjs/toolkit";
import modules from "../../database/modules.json";
import {KanbasModule} from "./index";

const initialState: { modules: KanbasModule[] } = {
    modules: modules
}

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addModule: (state, {payload: module}) => {
            const newModule: KanbasModule = {
                description: "",
                _id: new Date().getTime().toString(),
                lessons: [],
                name: module.name,
                course: module.course
            };
            state.modules = [...state.modules, newModule]
        },
        deleteModule: (state, {payload: moduleId}) => {
            state.modules = state.modules.filter((m: any) => m.id !== moduleId);
        },
        updateModule: (state, {payload: module}) => {
            state.modules = state.modules.map((m: any) =>
                m._id === module._id ? module : m
            ) as any;
        },
        editModule: (state, {payload: moduleId}) => {
            state.modules = state.modules.map((m: any) =>
                m._id === moduleId ? {...m, editing: true} : m
            ) as any;
        },
    },
});

export const {addModule, deleteModule, updateModule, editModule} = modulesSlice.actions;
export default modulesSlice.reducer;