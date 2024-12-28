import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import {FaTrash} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {deleteAssignment} from "../assignments/reducer";

type LessonControlButtons = {
    deleteAssignment: () => void
}
function LessonControlButtons(props:LessonControlButtons) {
    return (
        <>
            <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Delete Assignment
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button onClick={() => props.deleteAssignment()} type="button" data-bs-dismiss="modal"
                                    className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="float-end d-flex">
                <FaTrash
                    className="text-danger me-2 mb-1"
                    data-bs-toggle="modal"
                    data-bs-target="#wd-add-module-dialog"
                />
                <GreenCheckmark/>
                <IoEllipsisVertical className="fs-4"/>
            </div>
        </>
    )
}

export default LessonControlButtons;