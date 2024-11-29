import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {FaRegEdit} from 'react-icons/fa'
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useParams} from "react-router-dom";

type QuizDetail = {
    quizType: string
    points: string
    assignmentGroup: string
    shouldShuffleAnswers: boolean
    timeLimitInMinutes: number
    isMultipleAttempts: boolean
    viewResponses: string
    showCorrectAnswers: string
    isOneQuestionAtATime: boolean
    accessCode: string
    isRequiredToViewResults: boolean
    isWebcamRequired: boolean
    shouldLockQuestionsAfterAnswering: boolean
    title: string
    dueDateTimestamp: string
    availableFromTimestamp: string
    availableUntilTimestamp: string
}

function QuizDetailScreen() {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)
    const {qid} = useParams() //TODO: use this for fetching the quizdetails from server

    const [quizDetails, setQuizDetails] = useState<QuizDetail>(
        {
            quizType: "Multiple Choice",
            points: "100",
            assignmentGroup: "Group A",
            shouldShuffleAnswers: true,
            timeLimitInMinutes: 60,
            isMultipleAttempts: false,
            viewResponses: "After each attempt",
            showCorrectAnswers: "Immediately",
            isOneQuestionAtATime: true,
            accessCode: "1234",
            isRequiredToViewResults: true,
            isWebcamRequired: false,
            shouldLockQuestionsAfterAnswering: true,
            title: "Sample Quiz",
            dueDateTimestamp: "1672531199000",
            availableFromTimestamp: "1672444800000",
            availableUntilTimestamp: "1672617599000"
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
                        <button className="btn btn-light d-flex align-items-center"><FaRegEdit className="me-1"/><span
                            className="mt-1">Edit</span></button>
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
                        <td>{quizDetails.showCorrectAnswers}</td>
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
                        <td className="text-end text-secondary fw-bold" style={{whiteSpace: "nowrap"}}>Required to View
                            Quiz Results
                        </td>
                        <td>{quizDetails.isRequiredToViewResults ? "Yes" : "No"}</td>
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
