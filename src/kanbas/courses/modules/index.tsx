import ModuleControls from "./ModuleControls";
import {useMemo} from "react";
import {BsGripVertical} from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import dbModules from "../../database/modules.json"
import {useParams} from "react-router-dom";

function Modules() {
    const {cid} = useParams()
    const moduleItems = useMemo(() => {
        return dbModules
            .filter((module) => module.course === cid)
            .map((module) => {
                return (
                    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3"/> {module.name} <ModuleControlButtons/>
                        </div>
                        {module.lessons && module.lessons.map((lesson: any) => (
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3"/> {lesson.name} <LessonControlButtons/>
                            </li>))}
                    </li>)
            })
    }, [cid])
    return (
        <div>
            <ModuleControls/> <br/> <br/> <br/>
            <ul id="wd-modules" className="list-group rounded-0">
                {moduleItems}
            </ul>
        </div>
    )
}

export default Modules