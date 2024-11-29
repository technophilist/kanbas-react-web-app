import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {FaRegEdit} from 'react-icons/fa'
import {useSelector} from "react-redux"
import {RootState} from "../../store"
import {useNavigate, useParams} from "react-router-dom"
import QuizDetail from "./QuizDetail";

function QuizDetailScreen() {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)
    const {qid} = useParams() //TODO: use this for fetching the quizdetails from server
    const navigate = useNavigate()

    const [quizDetails, setQuizDetails] = useState<QuizDetail>(
        {
            title: "Sample Quiz",
            quizType: "Multiple Choice",
            points: 100,
            assignmentGroup: "Group A",
            dueDateTimestamp: "1700000000000",
            availableFromTimestamp: "1690000000000",
            availableUntilTimestamp: "1710000000000",
            dueDate: "2023-12-15",
            availableFrom: "2023-11-15",
            availableUntil: "2024-01-15",
            timeLimit: "60",
            timeLimitInMinutes: 60,
            shuffleAnswers: true,
            shouldShuffleAnswers: true,
            allowMultipleAttempts: false,
            isMultipleAttempts: false,
            oneQuestionAtATime: true,
            isOneQuestionAtATime: true,
            webcamRequired: false,
            isWebcamRequired: false,
            lockQuestionsAfterAnswering: true,
            shouldLockQuestionsAfterAnswering: true,
            description: "This is a sample quiz description.",
            assignTo: "Class A",
            viewResponses: "After submission",
            showCorrectAnswersImmediately: true,
            accessCode: "12345"
        }
    )


    const getDateTimeStringForTimestamp = useCallback((timestamp: string) => {
        const date = new Date(parseInt(timestamp))
        return date.toLocaleString()
    }, [])

    return (
        <div className="p-4">
            {currentUser && currentUser.role === "FACULTY" && (
                <div>
                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-light me-2">Preview</button>
                        <button
                            onClick={() => navigate(`edit`)}
                            className="btn btn-light d-flex align-items-center"
                        ><FaRegEdit className="me-1"/><span className="mt-1">Edit</span></button>
                    </div>
                    <hr className="mb-4"/>
                </div>
            )}
            <h2 className="fw-bold">{quizDetails.title}</h2>
            <div className="mt-4">
                <table className="table table-borderless">
                    <tbody>
                    <tr>
                        <td className="text-end text-secondary fw-bold"
                            style={{width: "200px", whiteSpace: "nowrap"}}>Quiz Type
                        </td>
                        <td>{quizDetails.quizType}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Points</td>
                        <td>{quizDetails.points}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Assignment
                            Group
                        </td>
                        <td>{quizDetails.assignmentGroup}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Shuffle Answers
                        </td>
                        <td>{quizDetails.shouldShuffleAnswers ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Time Limit</td>
                        <td>{quizDetails.timeLimitInMinutes} minutes</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Multiple
                            Attempts
                        </td>
                        <td>{quizDetails.isMultipleAttempts ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>View Responses
                        </td>
                        <td>{quizDetails.viewResponses}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Show Correct
                            Answers
                        </td>
                        <td>{quizDetails.showCorrectAnswersImmediately ? "Immediately" : "After submission"}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>One Question at a
                            Time
                        </td>
                        <td>{quizDetails.isOneQuestionAtATime ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Access Code
                        </td>
                        <td>{quizDetails.accessCode}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Webcam Required
                        </td>
                        <td>{quizDetails.isWebcamRequired ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Lock Questions
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
                        <td>{getDateTimeStringForTimestamp(quizDetails.dueDateTimestamp)}</td>
                        <td>Everyone</td>
                        <td>{getDateTimeStringForTimestamp(quizDetails.availableFromTimestamp)}</td>
                        <td>{getDateTimeStringForTimestamp(quizDetails.availableUntilTimestamp)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default QuizDetailScreen
