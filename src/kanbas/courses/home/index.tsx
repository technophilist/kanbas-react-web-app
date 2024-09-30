import Modules from "../modules";
import CourseStatus from "./status";

function Home() {
    return (
        <div className="d-flex" id="wd-home">
            <div className="flex-fill">
                <Modules/>
            </div>
            <div className="d-none d-md-block">
                <CourseStatus/>
            </div>
        </div>
    );
}

export default Home