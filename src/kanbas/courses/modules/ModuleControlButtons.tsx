import GreenCheckmark from "./GreenCheckmark";
import {IoEllipsisVertical} from "react-icons/io5";
import {BsPlus} from "react-icons/bs";
import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";

type ModuleControlsButtonsProps = {
    moduleId: string
    deleteModule: (moduleId: string) => void
    editModule: (moduleId: string) => void
}

function ModuleControlButtons(props: ModuleControlsButtonsProps) {
    return (
        <div className="float-end">
            <FaPencil
                onClick={() => props.editModule(props.moduleId)}
                className="text-primary me-3"/>
            <FaTrash className="text-danger me-2 mb-1" onClick={() => props.deleteModule(props.moduleId)}/>
            <GreenCheckmark/>
            <BsPlus className="fs-4"/>
            <IoEllipsisVertical className="fs-4"/>
        </div>
    )
}

export default ModuleControlButtons;