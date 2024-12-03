import { useNavigate } from "react-router-dom"
import QuizDetail from "./QuizDetail"
import { useCallback } from "react"

type DetailsTabContentProps = {
    quiz: QuizDetail,
    setQuizDetail: (updatedQuizDetail: QuizDetail) => void,
    onSaveButtonClick: (currentQuiz: QuizDetail) => void
}

function DetailsTabContent(props: DetailsTabContentProps) {
    const navigate = useNavigate()

    const getDateTimeFromTimestamp = useCallback((timestamp: string) => {
        const date = new Date(parseInt(timestamp));
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }, [])

    const getTimestampFromDateTime = useCallback((dateTime: string) => {
        return new Date(dateTime).getTime().toString()
    }, [])

    const handleSave = useCallback(() => {
        props.onSaveButtonClick(props.quiz)
        navigate("../")
    }, [props.quiz])
    return (
        <form>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={props.quiz.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                        ...props.quiz,
                        title: e.target.value
                    })}
                />
            </div>

            <div className="mb-3">
                <label className="form-label text-secondary fw-bold">Quiz Instructions:</label>
                <textarea className="form-control" rows={3} />
            </div>
            <table className="table table-borderless">
                <tbody>
                    <tr>
                        <td className="text-end text-secondary fw-bold" style={{ width: "200px" }}>Quiz Type</td>
                        <td>
                            <select
                                className="form-select"
                                value={props.quiz.quizType}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.setQuizDetail({
                                    ...props.quiz,
                                    quizType: e.target.value
                                })}
                            >
                                <option>Graded Quiz</option>
                                <option>Practice Quiz</option>
                                <option>Graded Survey</option>
                                <option>Ungraded Survey</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="text-end text-secondary fw-bold">Assignment Group</td>
                        <td>
                            <select
                                className="form-select"
                                value={props.quiz.assignmentGroup}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.setQuizDetail({
                                    ...props.quiz,
                                    assignmentGroup: e.target.value
                                })}
                            >
                                <option>ASSIGNMENTS</option>
                                <option>Quizzes</option>
                                <option>Exams</option>
                                <option>Projects</option>
                            </select>
                            <h6 className="fw-semibold mt-3 mb-3 text-muted">Options</h6>
                            <div className="d-flex flex-column">
                                <div>
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        id="shuffleAnswers"
                                        checked={props.quiz.shouldShuffleAnswers}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            shouldShuffleAnswers: e.target.checked
                                        })}
                                    />
                                    <label className="form-label text-secondary" htmlFor="shuffleAnswers">Shuffle
                                        Answers</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        id="showCorrectAnswers"
                                        checked={props.quiz.showCorrectAnswersImmediately}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            showCorrectAnswersImmediately: e.target.checked
                                        })}
                                    />
                                    <label className="form-label text-secondary" htmlFor="showCorrectAnswers">Show
                                        Correct Answers Immediately</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        id="oneQuestionAtATime"
                                        checked={props.quiz.isOneQuestionAtATime}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            isOneQuestionAtATime: e.target.checked
                                        })}
                                    />
                                    <label className="form-label text-secondary" htmlFor="oneQuestionAtATime">One
                                        Question at a Time</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        id="lockQuestions"
                                        checked={props.quiz.shouldLockQuestionsAfterAnswering}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            shouldLockQuestionsAfterAnswering: e.target.checked
                                        })}
                                    />
                                    <label className="form-label text-secondary" htmlFor="lockQuestions">Lock Questions
                                        After Answering</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        id="webcamRequired"
                                        checked={props.quiz.isWebcamRequired}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            isWebcamRequired: e.target.checked
                                        })}
                                    />
                                    <label className="form-label text-secondary" htmlFor="webcamRequired">Webcam
                                        Required</label>
                                </div>
                                <div className="d-flex">
                                    <input
                                        type="checkbox"
                                        checked={props.quiz.timeLimitInMinutes !== null}
                                        className="form-check-input me-2 mb-1 align-self-end"
                                        id="timeLimit"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                props.setQuizDetail({
                                                    ...props.quiz,
                                                    timeLimitInMinutes: props.quiz.timeLimitInMinutes || 0
                                                })
                                            } else {
                                                props.setQuizDetail({
                                                    ...props.quiz,
                                                    timeLimitInMinutes: null
                                                })
                                            }
                                        }}
                                    />
                                    <label className="form-label text-secondary align-self-end m-0" htmlFor="timeLimit">Time
                                        limit</label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            style={{
                                                width: "75px"
                                            }}
                                            className="form-control ms-5 me-2"
                                            id="timeLimitMinutes"
                                            type="number"
                                            value={props.quiz.timeLimitInMinutes || 0}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                                ...props.quiz,
                                                timeLimitInMinutes: parseInt(e.target.value)
                                            })}
                                        />
                                        <label className="form-label text-secondary"
                                            htmlFor="timeLimitMinutes">Minutes</label>
                                    </div>
                                </div>
                                <div
                                    className="d-flex align-items-center align-content-center p-1 border-top border-bottom border-start border-end rounded-2 mt-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input mt-2 ms-2 me-2 align-self-baseline"
                                        id="multipleAttempts"
                                        checked={props.quiz.allowMultipleAttempts}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            allowMultipleAttempts: e.target.checked
                                        })}
                                    />
                                    <label className="form-label text-secondary mt-1" htmlFor="multipleAttempts">Allow
                                        Multiple Attempts</label>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="text-end text-secondary fw-bold">Points</td>
                        <td>
                            <input
                                type="number"
                                className="form-control"
                                style={{ width: "100px" }}
                                value={props.quiz.points}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                    ...props.quiz,
                                    points: parseInt(e.target.value)
                                })}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="text-end text-secondary fw-bold">Access Code</td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={props.quiz.accessCode}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                    ...props.quiz,
                                    accessCode: e.target.value
                                })}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="text-end text-secondary fw-bold">Assign</td>
                        <td>
                            <div className="border border-1 rounded-1 p-4">
                                <div className="mb-3">
                                    <label htmlFor="assignTo" className="form-label text-end text-secondary fw-bold">Assign
                                        to</label>
                                    <input
                                        id="assignTo"
                                        type="text"
                                        className="form-control"
                                        placeholder="Assign to"
                                        value={props.quiz.assignTo}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            assignTo: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dueDate" className="form-label text-end text-secondary fw-bold">Due
                                        Date</label>
                                    <input
                                        id="dueDate"
                                        type="datetime-local"
                                        className="form-control"
                                        value={getDateTimeFromTimestamp(props.quiz.dueDateTimestampMillis)}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            dueDateTimestampMillis: getTimestampFromDateTime(e.target.value)
                                        })}
                                    />
                                </div>
                                <div className="d-flex gap-3">
                                    <div className="flex-grow-1">
                                        <label htmlFor="availableFrom"
                                            className="form-label text-end text-secondary fw-bold">Available
                                            from</label>
                                        <input
                                            id="availableFrom"
                                            type="datetime-local"
                                            className="form-control"
                                            placeholder="Available from"
                                            value={getDateTimeFromTimestamp(props.quiz.availableFromTimestampMillis)}
                                            onChange={(e) => props.setQuizDetail({
                                                ...props.quiz,
                                                availableFromTimestampMillis: getTimestampFromDateTime(e.target.value)
                                            })}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <label htmlFor="availableUntil"
                                            className="form-label text-end text-secondary fw-bold">Available
                                            until</label>
                                        <input
                                            id="availableUntil"
                                            type="datetime-local"
                                            className="form-control"
                                            placeholder="Until"
                                            value={getDateTimeFromTimestamp(props.quiz.availableUntilTimestampMillis)}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                                ...props.quiz,
                                                availableUntilTimestampMillis: getTimestampFromDateTime(e.target.value)
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="d-flex justify-content-center gap-2 mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => navigate("../")}>
                    Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleSave}>
                    Save
                </button>
            </div>
        </form>
    )
}

export default DetailsTabContent