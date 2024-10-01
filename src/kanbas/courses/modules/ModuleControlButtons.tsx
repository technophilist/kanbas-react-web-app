import GreenCheckmark from "./GreenCheckmark";
import {IoEllipsisVertical} from "react-icons/io5";
import {BsPlus} from "react-icons/bs";

function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark/>
            <BsPlus className="fs-4"/>
            <IoEllipsisVertical className="fs-4"/>
        </div>
    )
}

export default ModuleControlButtons;