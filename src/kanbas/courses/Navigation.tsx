import {Link} from "react-router-dom";

function CoursesNavigation() {
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            <Link id="wd-course-home-link"
                  to="/kanbas/courses/1234/home"
                  className="list-group-item active border-0">Home</Link>
            <Link
                id="wd-course-modules-link"
                className="list-group-item text-danger border-0"
                to="/kanbas/courses/1234/modules">Modules</Link>
            <Link id="wd-course-piazza-link" className="list-group-item text-danger border-0"
                  to="/kanbas/courses/1234/piazza">Piazza</Link>

            <Link id="wd-course-zoom-link" className="list-group-item text-danger border-0"
                  to="/kanbas/courses/1234/zoom">Zoom</Link>

            <Link id="wd-course-quizzes-link" className="list-group-item text-danger border-0"
                  to="/kanbas/courses/1234/assignments">Assignments</Link>

            <Link id="wd-course-assignments-link" className="list-group-item text-danger border-0"
                  to="/kanbas/courses/1234/quizzes">Quizzes</Link>

            <Link id="wd-course-grades-link" className="list-group-item text-danger border-0"
                  to="/kanbas/courses/1234/grades">Grades</Link>

            <Link id="wd-course-people-link" className="list-group-item text-danger border-0"
                  to="/kanbas/courses/1234/people">People</Link>
        </div>);
}

export default CoursesNavigation