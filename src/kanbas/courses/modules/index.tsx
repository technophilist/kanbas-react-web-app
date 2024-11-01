import ModuleControls from "./ModuleControls";
import {useMemo, useState} from "react";
import {BsGripVertical} from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {addModule, deleteModule, editModule, updateModule} from "./reducer";
import {BiImport} from "react-icons/bi";
import {deleteAssignment} from "../assignments/reducer";

export type KanbasModule = {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons: {
        _id: string;
        name: string;
        description: string;
        module: string;
    }[],
    editing?: boolean
}

function Modules() {
    const {cid} = useParams()
    const [moduleName, setModuleName] = useState("")
    const {modules} = useSelector((state: RootState) => state.modulesReducer)
    const dispatch = useDispatch<AppDispatch>()
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)

    const moduleItems = useMemo(() => {
        return modules
            .filter((module) => module.course === cid)
            .map((module) => {
                return (
                    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3"/>
                            {!module.editing && module.name}
                            {module.editing && (
                                <input
                                    className="form-control w-50 d-inline-block"
                                    onChange={(e) => {
                                        dispatch(updateModule({...module, name: e.target.value}))
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key !== "Enter") return
                                        dispatch(updateModule({...module, editing: false}))
                                    }}
                                    defaultValue={module.name}
                                />
                            )}
                            {currentUser && currentUser.role === "FACULTY" && <ModuleControlButtons
                                deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                                moduleId={module._id}
                                editModule={(moduleId) => dispatch(editModule(moduleId))}
                            />}
                        </div>
                        {module.lessons && module.lessons.map((lesson) => (
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3"/> {lesson.name}
                            </li>))}
                    </li>)
            })
    }, [cid, currentUser, dispatch, modules])
    return (
        <div>
            <ModuleControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={() => {
                    dispatch(addModule({name: moduleName, course: cid}))
                    setModuleName("")
                }}
            /> <br/> <br/> <br/>
            <ul id="wd-modules" className="list-group rounded-0">
                {moduleItems}
            </ul>
        </div>
    )
}

export default Modules