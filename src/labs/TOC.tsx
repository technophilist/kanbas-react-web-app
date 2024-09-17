import {Link} from "react-router-dom";

function TOC() {
    return (
        <ul>
            <li><Link to="/labs">Labs</Link></li>
            <li><Link to="/labs/lab1">Lab 1</Link></li>
            <li><Link to="/labs/lab2">Lab 2</Link></li>
            <li><Link to="/labs/lab3">Lab 3</Link></li>
            <li><Link to="/kanbas">Kanbas</Link></li>
            <li><a id="wd-github" href="https://github.com/technophilist/kanbas-react-web-app">Github</a></li>
        </ul>
    )

}

export default TOC