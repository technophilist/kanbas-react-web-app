import Modules from "../modules";
import CourseStatus from "./status";

function Home() {
    return (
        <table id="wd-home">
            <tbody>
            <tr>
                <td>
                    <button>Collapse All</button>
                    <button>View Progress</button>
                    <select>
                        <option value="Publish All">Publish All</option>
                    </select>
                    <button>+ Module</button>
                </td>
            </tr>
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