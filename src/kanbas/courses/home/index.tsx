import Modules from "../modules";
import CourseStatus from "./status";

function Home() {
    return (
        <table id="wd-home">
            <tbody>
            <tr>
                <td valign="top">
                    <Modules/>
                </td>
                <td valign="top">
                    <CourseStatus/>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Home