import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";

function TOC() {
    const {pathname} = useLocation()
    return (
        <ul className = "nav nav-pills">
            <li className = "nav-item"><Link to="/labs" className="nav-link">Labs</Link></li>
            <li className = "nav-item"><Link to="/labs/lab1" className = {`nav-link ${pathname.includes("lab1") ? "active" : ""}`}>Lab 1</Link></li>
            <li className = "nav-item"><Link to="/labs/lab2" className = {`nav-link ${pathname.includes("lab2") ? "active" : ""}`}>Lab 2</Link></li>
            <li className = "nav-item"><Link to="/labs/lab3" className = {`nav-link ${pathname.includes("lab3") ? "active" : ""}`}>Lab 3</Link></li>
            <li className = "nav-item"><Link to = "/labs/lab4" className = {`nav-link ${pathname.includes("lab4") ? "active" : ""}`}>Lab 4</Link></li>
            <li className = "nav-item"><Link to="/kanbas" className="nav-link">Kanbas</Link></li>
            <li className = "nav-item"><a className="nav-link" id="wd-github" href="https://github.com/technophilist/kanbas-react-web-app">Github</a></li>
        </ul>
    )

}

export default TOC