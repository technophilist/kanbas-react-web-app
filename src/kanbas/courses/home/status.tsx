import {MdDoNotDisturbAlt} from "react-icons/md";
import {FaCheckCircle} from "react-icons/fa";
import {BiImport} from "react-icons/bi";
import {LiaFileImportSolid} from "react-icons/lia";
import {IoMdNotificationsOutline} from "react-icons/io";
import {PiChartBarHorizontalFill, PiCrosshair} from "react-icons/pi";
import {IoMegaphoneOutline} from "react-icons/io5";

function CourseStatus() {
    return (
        <div id="wd-course-status" className="ps-2" style={{width: "300px"}}>
            <h2>Course Status</h2>
            <div className="d-flex">
                <div className="w-50 pe-1">
                    <button className="btn btn-lg btn-secondary w-100 text-nowrap d-flex align-items-center justify-content-center">
                        <MdDoNotDisturbAlt className="fs-5"/> Unpublish
                    </button>
                </div>
                <div className="w-50">
                    <button className="btn btn-lg btn-success w-100 d-flex align-items-center justify-content-center">
                        <FaCheckCircle className="me-2 fs-5"/> Publish
                    </button>
                </div>
            </div>
            <br/>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start d-flex align-items-center">
                <BiImport className="me-2 fs-5"/> Import Existing Content
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <LiaFileImportSolid className="me-2 fs-5"/> Import from Commons
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start d-flex align-items-center"><PiCrosshair className="me-2 fs-5"/>Choose
                Home page
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start d-flex align-items-center"><PiChartBarHorizontalFill
                className="me-2 fs-5" style={{transform: "rotate(270deg)"}}/> View Course Stream
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start d-flex align-items-center">
                <IoMegaphoneOutline className="me-2 fs-5"/>New Announcement
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start d-flex align-items-center"><PiChartBarHorizontalFill
                className="me-2 fs-5" style={{transform: "rotate(270deg)"}}/>New Analytics
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start d-flex align-items-center">
                <IoMdNotificationsOutline className="me-2 fs-5"/>View Course Notifications
            </button>
        </div>)
}

export default CourseStatus