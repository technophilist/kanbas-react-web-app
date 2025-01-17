import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import QuizDetail from "./QuizDetail"
import * as quizzesClient from "../client"
import { RootState } from '../../../store'
function QuizDetailScreen() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer)
    const { qid } = useParams()
    const navigate = useNavigate()

    const [quizDetails, setQuizDetails] = useState<QuizDetail | null>(null)

    const getDateTimeStringForTimestamp = useCallback((timestamp: string) => {
        const date = new Date(parseInt(timestamp))
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = date.getHours()
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedHours = String(hours % 12 || 12).padStart(2, '0')
        return `${year}/${month}/${day} ${formattedHours}:${minutes} ${ampm}`
    }, [])

    const onPreviewButtonClick = useCallback(async () => {
        if (!qid || !currentUser) return
        const attempts = await quizzesClient.getQuizAttemptsForUser(qid, currentUser._id)
        if (attempts.length > 0) {
            navigate(`quiz/answers/${attempts[0].attemptId}`, {
                state: {
                    isPreviousAttempt: true,
                    isFacultyPreviewingQuiz: true
                }
            })
        } else {
            navigate(`quiz`, {
                state: { isFacultyPreviewingQuiz: true }
            })
        }
    }, [qid, currentUser?._id, navigate])

    const onStartQuizButtonClick = useCallback(async () => {
        if (!qid || !currentUser) return
        const attempts = await quizzesClient.getQuizAttemptsForUser(qid, currentUser._id)
        if (attempts.length > 0) {
            navigate(`quiz/answers/${attempts[0].attemptId}`, {
                state: {
                    isPreviousAttempt: true,
                    isFacultyPreviewingQuiz: false
                }
            })
        } else {
            navigate(`quiz`, {
                state: { isFacultyPreviewingQuiz: false }
            })
        }
    }, [qid, currentUser?._id, navigate])

    useEffect(() => {
        if (!qid) return
        quizzesClient.getQuizDetails(qid)
            .then(data => setQuizDetails(data.quiz))
    }, [qid])

    if (!quizDetails) return <div>Loading...</div>
    return (
        <div className="p-4">
            {currentUser && currentUser.role === "FACULTY" && (
                <div>
                    <div className="d-flex justify-content-center mb-4">
                        <button
                            onClick={onPreviewButtonClick}
                            className="btn btn-light me-2"
                        >Preview</button>
                        <button
                            onClick={() => navigate(`edit`)}
                            className="btn btn-light d-flex align-items-center"
                        ><FaRegEdit className="me-1" /><span className="mt-1">Edit</span></button>
                    </div>
                    <hr className="mb-4" />
                </div>
            )}
            <h2 className="fw-bold">{quizDetails.title}</h2>
            <div className="mt-4">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="text-end text-secondary fw-bold"
                                style={{ width: "200px", whiteSpace: "nowrap" }}>Quiz Type
                            </td>
                            <td>{quizDetails.quizType}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Points</td>
                            <td>{quizDetails.points}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Assignment
                                Group
                            </td>
                            <td>{quizDetails.assignmentGroup}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Shuffle Answers
                            </td>
                            <td>{quizDetails.shouldShuffleAnswers ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Time Limit</td>
                            <td>{quizDetails.timeLimitInMinutes ? `${quizDetails.timeLimitInMinutes} minutes` : "None"}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Multiple
                                Attempts
                            </td>
                            <td>{quizDetails.allowMultipleAttempts ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>View Responses
                            </td>
                            <td>{quizDetails.viewResponses}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Show Correct
                                Answers
                            </td>
                            <td>{quizDetails.showCorrectAnswersImmediately ? "Immediately" : "After submission"}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>One Question at a
                                Time
                            </td>
                            <td>{quizDetails.isOneQuestionAtATime ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Access Code
                            </td>
                            <td>{quizDetails.accessCode}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Webcam Required
                            </td>
                            <td>{quizDetails.isWebcamRequired ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end text-secondary fw-bold" style={{ whiteSpace: "nowrap" }}>Lock Questions
                                After Answering
                            </td>
                            <td>{quizDetails.shouldLockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Due</th>
                            <th>For</th>
                            <th>Available from</th>
                            <th>Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{getDateTimeStringForTimestamp(quizDetails.dueDateTimestampMillis)}</td>
                            <td>{quizDetails.assignTo}</td>
                            <td>{getDateTimeStringForTimestamp(quizDetails.availableFromTimestampMillis)}</td>
                            <td>{getDateTimeStringForTimestamp(quizDetails.availableUntilTimestampMillis)}</td>
                        </tr>
                    </tbody>
                </table>

                {currentUser && currentUser.role === "STUDENT" && (
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-danger"
                            onClick={onStartQuizButtonClick}
                        >Start Quiz</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuizDetailScreen
