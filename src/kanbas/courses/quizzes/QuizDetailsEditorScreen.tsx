import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImBlocked } from "react-icons/im"
import { BsThreeDotsVertical } from "react-icons/bs"
import QuizDetail from "./QuizDetail"
import QuestionsTabContent from "./QuestionsTabContent"
import * as quizzesClient from "./client"
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa"
import DetailsTabContent from "./DetailsTabContent"


function QuizDetailsEditorScreen() {
    const [activeTab, setActiveTab] = useState("details")
    const [quizDetail, setQuizDetail] = useState<QuizDetail | null>(null)
    const [showUnsavedChanges, setShowUnsavedChanges] = useState(false)
    const { qid } = useParams()
    const navigate = useNavigate()

    const fetchQuizDetails = useCallback(() => {
        if (!qid) return
        quizzesClient.getQuizDetails(qid)
            .then(quiz => {
                setQuizDetail(quiz)
                setShowUnsavedChanges(false)
            })
    }, [qid])

    const onSave = useCallback((currentQuiz: QuizDetail) => {
        quizzesClient.updateQuizDetails(currentQuiz)
            .then(() => {
                setShowUnsavedChanges(false)
                navigate(`./../`)
            })
    }, [navigate])

    const handleQuizUpdate = useCallback((updatedQuizDetail: QuizDetail) => {
        setQuizDetail(updatedQuizDetail)
        setShowUnsavedChanges(true)
    }, [])

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
            />
        )
    }, [activeTab, quizDetail, handleQuizUpdate, onSave])

    useEffect(fetchQuizDetails, [fetchQuizDetails])

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
