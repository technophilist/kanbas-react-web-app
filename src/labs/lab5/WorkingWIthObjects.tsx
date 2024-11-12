import {useState} from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER
const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0
    })

    const [module, setModule] = useState({
        id: "1",
        name: "Module Name",
        description: "Create a NodeJS server with ExpressJS",
        course: "course"
    })

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a
                id="wd-retrieve-assignments"
                className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}
            >
                Get Assignment
            </a>
            <hr/>
            <h4>Retrieving Properties</h4>
            <a id=
                   "wd-retrieve-assignment-title" className=
                   "btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <h4>Modifying Properties</h4>
            <a id=
                   "wd-update-assignment-title"
               className=
                   "btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                   defaultValue={assignment.title} onChange={(e) =>
                setAssignment({...assignment, title: e.target.value})}/>
            <a id="wd-update-assignment-score"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update score
            </a>
            <input className="form-control w-75" id="wd-assignment-score"
                   type="number"
                   value={assignment.score}
                   defaultValue={assignment.score} onChange={(e) =>
                setAssignment({...assignment, score: parseInt(e.target.value)})}/>
            <a id="wd-update-assignment-score"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Completed Status
            </a>
            <label htmlFor="wd-assignment-completed">Completed</label>
            <input
                className="form-check-input"
                type="checkbox"
                checked={assignment.completed}
                onChange={(e) => setAssignment({...assignment, completed: e.target.checked})}/>
            <hr/>
            {/*Module*/}
            <h4>Retrieving Module</h4>
            <a
                id="wd-retrieve-assignments"
                className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}
            >
                Get Module
            </a>
            <hr/>
            <h4>Retrieving Module Name</h4>
            <a id=
                   "wd-retrieve-assignment-title" className=
                   "btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <hr/>
            <h4>Modifying Module</h4>
            <a id="wd-update-assignment-title"
               className="btn btn-primary float-end"
               href={`${REMOTE_SERVER}/lab5/module/name/${module.name}`}>
                Update Module Name
            </a>
            <input className="form-control w-75"
                   id="wd-assignment-title"
                   defaultValue={module.name}
                   onChange={(e) => setModule({...module, name: e.target.value})}/>
            <a id="wd-update-assignment-title"
               className="btn btn-primary float-end"
               href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}>
                Update Module Description
            </a>
            <input
                id="wd-assignment-description"
                className="form-control w-75"
                type="text"
                defaultValue={module.description}
                onChange={(e) => setModule({...module, description: e.target.value})}
            />
        </div>
    );
}

export default WorkingWithObjects