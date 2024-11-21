import ModuleControls from "./ModuleControls";
import {useCallback, useEffect, useMemo, useState} from "react";
import {BsGripVertical} from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {setModules, addModule, deleteModule, editModule, updateModule} from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client"

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
    const fetchModules = useCallback(async () => {
        const modules = await coursesClient.findModulesForCourse(cid as string)
        dispatch(setModules(modules))
    }, [cid, dispatch])
    const createModuleForCourse = useCallback(async () => {
        if (!cid) return
        const newModule = {name: moduleName, course: cid}
        const module = await coursesClient.createModuleForCourse(cid, newModule)
        dispatch(addModule(module))
    }, [cid, dispatch, moduleName])
    const removeModule = useCallback(async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId)
        dispatch(deleteModule(moduleId))
    }, [dispatch])
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)
    const saveModule = useCallback(async (module: KanbasModule) => {
        await modulesClient.updateModule(module)
        dispatch(updateModule(module))
    }, [])
    const moduleItems = useMemo(() => {
        return modules
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
                                        saveModule({...module, editing: false})
                                    }}
                                    defaultValue={module.name}
                                />
                            )}
                            {currentUser && currentUser.role === "FACULTY" && <ModuleControlButtons
                                deleteModule={removeModule}
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

    useEffect(() => {
        fetchModules()
    }, [fetchModules]);
    return (
        <div>
            <ModuleControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={createModuleForCourse}
            /> <br/> <br/> <br/>
            <ul id="wd-modules" className="list-group rounded-0">
                {moduleItems}
            </ul>
        </div>
    )
}

export default Modules