import axios from "axios";
import {KanbasModule} from "./index";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

const MODULES_API = `${REMOTE_SERVER}/api/modules`;

const deleteModule = async (moduleId: string) => {
    const response = await axios.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
}

const updateModule = async (module: KanbasModule) => {
    const {data} = await axios.put(`${MODULES_API}/${module._id}`, module)
    return data
}

export {deleteModule, updateModule}