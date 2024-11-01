import {FaPlus} from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

type ModuleControlProps = {
    moduleName: string
    setModuleName: (title: string) => void
    addModule: () => void
}

function ModulesControls(props: ModuleControlProps) {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            {currentUser && currentUser.role === "FACULTY" && (
                <>
                    <button
                        id="wd-add-module-btn"
                        className="btn btn-lg btn-danger me-1 float-end"
                        data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog"
                    >
                        <FaPlus className="position-relative me-2" style={{bottom: "1px"}}/>
                        Module
                    </button>
                    <ModuleEditor
                        dialogTitle="Add Module"
                        moduleName={props.moduleName}
                        setModuleName={props.setModuleName}
                        addModule={props.addModule}/>
                </>)
            }
            <div className="dropdown d-inline me-1 float-end">
                {currentUser && currentUser.role === "FACULTY" && (<button
                    id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                    <GreenCheckmark/>
                    Publish All
                </button>)}
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
                            <GreenCheckmark/>
                            Publish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
                            <GreenCheckmark/>
                            Publish modules only
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-all-modules-and-items" className="dropdpown-item" href="#">
                            <GreenCheckmark/>
                            Unpublish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
                            <GreenCheckmark/>
                            Unpublish modules only
                        </a>
                    </li>
                </ul>
            </div>
            <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">View Progress</button>
            <button id="wd-collapse-all" className="btn btn-lg  btn-secondary me-1 float-end">Collapse All</button>
        </div>
    );
}

export default ModulesControls