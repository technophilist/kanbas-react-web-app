import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ImBlocked} from "react-icons/im";
import {BsThreeDotsVertical} from "react-icons/bs";
import QuizDetail from "./QuizDetail";

type DetailsTabContentProps = {
    quiz: QuizDetail,
    setQuizDetail: (updatedQuizDetail: QuizDetail) => void
}

function DetailsTabContent(props: DetailsTabContentProps) {
    const navigate = useNavigate();


    const handleSave = () => {
        navigate("../"); // Navigate back to quiz list
    };
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
                <textarea className="form-control" rows={3}/>
            </div>
            <table className="table table-borderless">
                <tbody>
                <tr>
                    <td className="text-end text-secondary fw-bold" style={{width: "200px"}}>Quiz Type</td>
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
                                    checked={props.quiz.shuffleAnswers}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                        ...props.quiz,
                                        shuffleAnswers: e.target.checked
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
                                    checked={props.quiz.oneQuestionAtATime}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                        ...props.quiz,
                                        oneQuestionAtATime: e.target.checked
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
                                    checked={props.quiz.lockQuestionsAfterAnswering}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                        ...props.quiz,
                                        lockQuestionsAfterAnswering: e.target.checked
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
                                    checked={props.quiz.webcamRequired}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                        ...props.quiz,
                                        webcamRequired: e.target.checked
                                    })}
                                />
                                <label className="form-label text-secondary" htmlFor="webcamRequired">Webcam
                                    Required</label>
                            </div>
                            <div className="d-flex">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2 mb-1 align-self-end"
                                    id="timeLimit"
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
                                        value={props.quiz.timeLimit}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            timeLimit: e.target.value
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
                            style={{width: "100px"}}
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
                                    type="date"
                                    className="form-control"
                                    value={props.quiz.dueDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                        ...props.quiz,
                                        dueDate: e.target.value
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
                                        type="date"
                                        className="form-control"
                                        placeholder="Available from"
                                        value={props.quiz.availableFrom}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            availableFrom: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <label htmlFor="availableUntil"
                                           className="form-label text-end text-secondary fw-bold">Available
                                        until</label>
                                    <input
                                        id="availableUntil"
                                        type="date"
                                        className="form-control"
                                        placeholder="Until"
                                        value={props.quiz.availableUntil}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuizDetail({
                                            ...props.quiz,
                                            availableUntil: e.target.value
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
    );
}

function QuestionsTabContent() {
    return <p>Questions content will go here</p>;
}

function QuizDetailsEditorScreen() {
    const [activeTab, setActiveTab] = useState("details");
    const [quizDetail, setQuizDetail] = useState<QuizDetail>({
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
        timeLimit: "20",
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
    })
    const renderContent = useCallback(() => {
        if (activeTab === "questions") {
            return <QuestionsTabContent/>
        }
        return (
            <DetailsTabContent
                quiz={quizDetail}
                setQuizDetail={updatedQuizDetail => setQuizDetail(updatedQuizDetail)}
            />
        )
    }, [activeTab, quizDetail])

    return (
        <div className="container">
            <div className="d-flex justify-content-end align-items-center mb-3 gap-3">
                <div className="d-flex align-items-center gap-3">
                    <div className="text-secondary d-flex align-items-center">
                        <ImBlocked className="me-2 fw-semibold"/>
                        Not Published
                    </div>
                    <button className="btn btn-light">
                        <BsThreeDotsVertical/>
                    </button>
                </div>
            </div>

            <hr/>

            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "details" ? "active" : "text-danger"}`}
                        onClick={() => setActiveTab("details")}
                    >
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "questions" ? "active" : "text-danger"}`}
                        onClick={() => setActiveTab("questions")}
                    >
                        Questions
                    </button>
                </li>
            </ul>

            {renderContent()}
        </div>
    );
}

export default QuizDetailsEditorScreen;
