import React, { useCallback, useEffect, useMemo, useState } from "react"
import { FaCheckCircle, FaRocket } from "react-icons/fa"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaCaretDown } from "react-icons/fa"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { ImBlocked } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client"

type Quiz = {
    id: string,
    title: string,
    availableEpochTimestamp: string,
    dueEpochTimestamp: string,
    points: number,
    questionsCount: number,
    isPublished: boolean,
}

function Quizzes() {
    const navigate = useNavigate()
    const { cid } = useParams()
    const [searchTerm, setSearchTerm] = useState("")
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const { currentUser } = useSelector((state: RootState) => state.accountReducer)

    const getQuizStatusString = useCallback((quiz: Quiz) => {
        const currentEpoch = Date.now()
        const availableEpoch = parseInt(quiz.availableEpochTimestamp)
        const dueEpoch = parseInt(quiz.dueEpochTimestamp)

        if (currentEpoch > dueEpoch) return "Closed"
        if (currentEpoch >= availableEpoch && currentEpoch <= dueEpoch) return "Available"

        const availableDate = new Date(availableEpoch)
        const month = availableDate.toLocaleString('default', { month: 'short' })
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
        const month = date.toLocaleString('default', { month: 'short' })
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
    }, [searchTerm, quizzes])

    const fetchQuizSummariesForCourse = useCallback(async () => {
        if (!cid) return
        quizzesClient.fetchQuizSummariesForCourse(cid)
            .then(quizzes => setQuizzes(quizzes))
    }, [cid])

    const updatePublishedStatusOfQuiz = useCallback(async (quizId: string, isPublished: boolean) => {
        if (!cid) return
        await quizzesClient.updatePublishedStatusOfQuiz(quizId, isPublished)
        fetchQuizSummariesForCourse()
    }, [cid])

    const deleteQuiz = useCallback(async (quizId: string) => {
        if (!cid) return
        await quizzesClient.deleteQuiz(quizId)
        fetchQuizSummariesForCourse()
    }, [cid])

    useEffect(() => {
        if (!cid) return
        fetchQuizSummariesForCourse()
    }, [cid])

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
            <hr className="mb-4" />
            <div className="d-flex align-items-center bg-secondary p-4">
                <FaCaretDown className="me-2" />
                <h5 className="mb-0 fw-bold">Assignment Quizzes</h5>
            </div>
            <ul className="list-group w-100 rounded-0">
                {filteredQuizzes.map((quiz) => (
                    <li
                        key={quiz.id}
                        className={`wd-lesson list-group-item d-flex justify-content-between align-items-center border-dark-subtle ${getQuizStatusString(quiz) === "Closed" ? "bg-light text-muted" : ""}`}
                    >
                        <div className="d-flex align-items-center">
                            <FaRocket className="me-4 text-success" />
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
                                {quiz.isPublished ? (
                                    <FaCheckCircle
                                        onClick={() => updatePublishedStatusOfQuiz(quiz.id, false)}
                                        className="text-success me-2"
                                    />
                                ) : (
                                    <ImBlocked
                                        onClick={() => updatePublishedStatusOfQuiz(quiz.id, true)}
                                        className="text-danger me-2"
                                    />
                                )}
                                <div className="dropdown">
                                    <button
                                        className="btn btn-link p-0"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <BsThreeDotsVertical className="text-secondary" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => navigate(`${quiz.id}`)}
                                            >Edit</button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => deleteQuiz(quiz.id)}
                                            >Delete</button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => updatePublishedStatusOfQuiz(quiz.id, !quiz.isPublished)}
                                            >
                                                {quiz.isPublished ? "Unpublish" : "Publish"}
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