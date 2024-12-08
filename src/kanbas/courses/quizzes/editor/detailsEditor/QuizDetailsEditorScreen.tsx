import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImBlocked } from "react-icons/im"
import { BsThreeDotsVertical } from "react-icons/bs"
import QuizDetail from "../../detail/QuizDetail"
import QuestionsTabContent from "./QuestionsTabContent"
import * as quizzesClient from "../../client"
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa"
import DetailsTabContent from "./DetailsTabContent"

function QuizDetailsEditorScreen() {
    const [activeTab, setActiveTab] = useState("details")
    const [quizDetail, setQuizDetail] = useState<QuizDetail | null>(null)
    const [showUnsavedChanges, setShowUnsavedChanges] = useState(false)
    const { cid, qid } = useParams()
    const navigate = useNavigate()

    const fetchQuizDetails = useCallback(async () => {
        if (!qid || !cid) return
        const response = await quizzesClient.getQuizDetails(qid)
        let quiz = response.quiz
        if (!quiz) {
            const newQuiz: QuizDetail = {
                id: qid,
                title: "",
                quizType: "",
                points: 0,
                assignmentGroup: "",
                dueDateTimestampMillis: "",
                availableFromTimestampMillis: "",
                availableUntilTimestampMillis: "",
                timeLimitInMinutes: 1,
                shouldShuffleAnswers: false,
                allowMultipleAttempts: false,
                maxAttempts: 1,
                isOneQuestionAtATime: false,
                isWebcamRequired: false,
                shouldLockQuestionsAfterAnswering: false,
                showCorrectAnswersImmediately: false,
                description: "",
                assignTo: "Everyone",
                viewResponses: "Immediately",
                accessCode: "",
                isPublished: false
            }
            await quizzesClient.createQuizForCourse(cid, newQuiz)
            quiz = (await quizzesClient.getQuizDetails(newQuiz.id)).quiz
        }
        setQuizDetail(quiz)
        setShowUnsavedChanges(false)
    }, [qid, cid])

    const onSave = useCallback((currentQuiz: QuizDetail) => {
        quizzesClient.updateQuizDetails(currentQuiz)
            .then(() => {
                setShowUnsavedChanges(false)
                navigate(`./../`)
            })
    }, [navigate])

    const handleQuizUpdate = useCallback((updatedQuizDetail: QuizDetail) => {
        console.log(`inside component: ${JSON.stringify(updatedQuizDetail)}`)
        setQuizDetail(updatedQuizDetail)
        setShowUnsavedChanges(true)
    }, [])

    const onSaveAndPublish = useCallback((currentQuiz: QuizDetail) => {
        quizzesClient.updateQuizDetails({ ...currentQuiz, isPublished: true })
            .then(() => {
                setShowUnsavedChanges(false)
                navigate(`./../../`)
            })
    }, [navigate])

    const renderContent = useCallback(() => {
        if (!quizDetail) return <div>Loading...</div>
        if (activeTab === "questions") {
            return <QuestionsTabContent />
        }
        return (
            <DetailsTabContent
                quiz={quizDetail}
                setQuizDetail={handleQuizUpdate}
                onSaveButtonClick={onSave}
                onSaveAndPublishButtonClick={onSaveAndPublish}
            />
        )
    }, [activeTab, quizDetail, handleQuizUpdate, onSave, onSaveAndPublish])

    useEffect(() => {
        fetchQuizDetails()
    }, [fetchQuizDetails])

    return (
        <div className="container">
            <div className="d-flex justify-content-end align-items-center mb-3 gap-3">
                <div className="d-flex align-items-center gap-3">
                    <div className="text-secondary d-flex align-items-center">
                        {quizDetail?.isPublished ? (
                            <>
                                <FaCheckCircle className="me-2 text-success" />
                                Published
                            </>
                        ) : (
                            <>
                                <ImBlocked className="me-2 fw-semibold" />
                                Not Published
                            </>
                        )}
                    </div>
                    <button className="btn btn-light">
                        <BsThreeDotsVertical />
                    </button>
                </div>
            </div>
            {showUnsavedChanges && (
                <div className="alert alert-warning d-flex align-items-center">
                    <FaInfoCircle className="me-2" />
                    You have unsaved changes. Click the Save button at the bottom to save your changes.
                </div>
            )}

            <hr />

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
    )
}

export default QuizDetailsEditorScreen 
