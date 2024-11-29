import React, {useCallback, useMemo, useState} from "react"
import {FaCheckCircle, FaRocket} from "react-icons/fa"
import {BsThreeDotsVertical} from "react-icons/bs"
import {FaCaretDown} from "react-icons/fa"
import {useSelector} from "react-redux"
import {RootState} from "../../store"
import {ImBlocked} from "react-icons/im";
import {useNavigate} from "react-router-dom";

type Quiz = {
    id: string,
    title: string,
    availableEpochTimestamp: string,
    dueEpochTimestamp: string,
    points: number,
    questionsCount: number,
    isPublished: string,
}

const quizzes = [
    {
        id: "q1-html",
        title: "Q1 - HTML",
        availableEpochTimestamp: "1695222000000", // Sep 20 2023 13:00:00
        dueEpochTimestamp: "1695308400000", // Sep 21 2023 13:00:00
        points: 29,
        questionsCount: 11,
        isPublished: "false",
    },
    {
        id: "q2-css",
        title: "Q2 - CSS",
        availableEpochTimestamp: "1696431600000", // Oct 4 2023 13:00:00
        dueEpochTimestamp: "1696518000000", // Oct 5 2023 13:00:00
        points: 32,
        questionsCount: 7,
        isPublished: "true",
    },
    {
        id: "exam1-fa23",
        title: "EXAM 1 FA 23",
        availableEpochTimestamp: "1698252600000", // Oct 25 2023 17:30:00
        dueEpochTimestamp: "1698339000000", // Oct 26 2023 17:30:00
        points: 113,
        questionsCount: 20,
        isPublished: "true",
    },
    {
        id: "q3-js-es6",
        title: "Q3 - JS, ES6",
        availableEpochTimestamp: "1732665600000", // 26 Nov 2024
        dueEpochTimestamp: "1732752000000", // 27 Nov 2024
        points: 38,
        questionsCount: 13,
        isPublished: "false",
    },
    {
        id: "q3",
        title: "Q3",
        availableEpochTimestamp: "1732838400000",
        dueEpochTimestamp: "1732924800000",
        points: 31,
        questionsCount: 8,
        isPublished: "false",
    },
    {
        id: "q4-node",
        title: "Q4 - NODE",
        availableEpochTimestamp: "1700416800000", // Nov 19 2023 15:00:00
        dueEpochTimestamp: "1700503200000", // Nov 20 2023 15:00:00
        points: 25,
        questionsCount: 4,
        isPublished: "true",
    },
    {
        id: "q5-mongo",
        title: "Q5 - MONGO",
        availableEpochTimestamp: "1701349200000", // Nov 30 2023 11:40:00
        dueEpochTimestamp: "1701356400000", // Nov 30 2023 13:00:00
        points: 38,
        questionsCount: 10,
        isPublished: "false",
    },
    {
        id: "exam2-fa23",
        title: "EXAM 2 FA23",
        availableEpochTimestamp: "1702645200000", // Dec 15 2023 10:30:00
        dueEpochTimestamp: "1702656000000", // Dec 15 2023 13:00:00
        points: 104,
        questionsCount: 18,
        isPublished: "false",
    },
]

function Quizzes() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)

    const getQuizStatusString = useCallback((quiz: Quiz) => {
        const currentEpoch = Date.now()
        const availableEpoch = parseInt(quiz.availableEpochTimestamp)
        const dueEpoch = parseInt(quiz.dueEpochTimestamp)

        if (currentEpoch > dueEpoch) return "Closed"
        if (currentEpoch >= availableEpoch && currentEpoch <= dueEpoch) return "Available"

        const availableDate = new Date(availableEpoch)
        const month = availableDate.toLocaleString('default', {month: 'short'})
        const day = availableDate.getDate()
        const hours = availableDate.getHours()
        const minutes = availableDate.getMinutes()
        const period = hours >= 12 ? 'pm' : 'am'
        const formattedHours = hours % 12 || 12
        return `Not available until ${month} ${day} at ${formattedHours}:${minutes.toString().padStart(2, '0')}${period}`
    }, [])

    const formatDueDate = useCallback((timestamp: string) => {
        if (timestamp === "multiple") return "Due Multiple Dates"
        const date = new Date(parseInt(timestamp))
        const month = date.toLocaleString('default', {month: 'short'})
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const period = hours >= 12 ? 'pm' : 'am'
        const formattedHours = hours % 12 || 12
        return `Due ${month} ${day} at ${formattedHours}${minutes ? ':' + minutes.toString().padStart(2, '0') : ''}${period}`
    }, [])

    const filteredQuizzes = useMemo(() => {
        if (searchTerm.length === 0) return quizzes
        return quizzes.filter(quiz =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    type="text"
                    className="form-control w-50 text-muted p-2"
                    placeholder="Search for Quiz"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {currentUser?.role === "FACULTY" && (
                    <button
                        onClick={() => navigate("new")}
                        className="btn btn-danger"
                    >+ Quiz</button>
                )}
            </div>
            <hr className="mb-4"/>
            <div className="d-flex align-items-center bg-secondary p-4">
                <FaCaretDown className="me-2"/>
                <h5 className="mb-0 fw-bold">Assignment Quizzes</h5>
            </div>
            <ul className="list-group w-100 rounded-0">
                {filteredQuizzes.map((quiz) => (
                    <li
                        key={quiz.id}
                        className={`wd-lesson list-group-item d-flex justify-content-between align-items-center border-dark-subtle ${getQuizStatusString(quiz) === "Closed" ? "bg-light text-muted" : ""}`}
                    >
                        <div className="d-flex align-items-center">
                            <FaRocket className="me-4 text-success"/>
                            <div>
                                <h6
                                    onClick={() => navigate(`${quiz.id}`)}
                                    className="mb-1 fw-semibold">{quiz.title}
                                </h6>
                                <small className="text-muted">
                                    {getQuizStatusString(quiz)} | {formatDueDate(quiz.dueEpochTimestamp)} | {quiz.points} pts
                                    | {quiz.questionsCount} Questions
                                </small>
                            </div>
                        </div>
                        {currentUser && currentUser.role === "FACULTY" &&
                            <div className="text-end d-flex align-items-center">
                                {quiz.isPublished === "true" ? (
                                    <FaCheckCircle className="text-success me-2"/>
                                ) : (
                                    <ImBlocked className="text-danger me-2"/>
                                )}
                                <div className="dropdown">
                                    <button
                                        className="btn btn-link p-0"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <BsThreeDotsVertical className="text-secondary"/>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className="dropdown-item">Edit</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item">Delete</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item">
                                                {quiz.isPublished === "true" ? "Unpublish" : "Publish"}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                    </li>
                ))}
            </ul>
        </div>)
}

export default Quizzes