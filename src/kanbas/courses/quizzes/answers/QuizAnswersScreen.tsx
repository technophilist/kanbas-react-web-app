import Question from "../editor/question-types"
import { AnswerToQuestion, TrueOrFalseAnswer, MultipleChoiceAnswer, FillInTheBlankAnswer } from "./Answer"
import { useCallback, useEffect, useMemo, useState } from "react"
import * as quizzesClient from "../client"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import QuizAttempt from "./QuizAttempt"
import QuizDetail from "../detail/QuizDetail"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"

function QuizAnswersScreen() {
    const navigate = useNavigate()
    const { cid, qid, attemptId } = useParams()
    const location = useLocation()
    const isViewingPreviousAttempt = useMemo(() => location.state?.isPreviousAttempt === true, [location.state])
    const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null)
    const [quizQuestions, setQuizQuestions] = useState<Question[] | null>(null)
    const { currentUser } = useSelector((state: RootState) => state.accountReducer)
    const [quizDetail, setQuizDetail] = useState<QuizDetail | null>(null)
    const [quizAttemptsCount, setQuizAttemptsCount] = useState<number | null>(null)
    const isRetakeQuizButtonDisabledForStudent = useMemo(() => {
        if (!quizDetail || !currentUser || currentUser.role !== 'STUDENT') return true
        if (!quizDetail.allowMultipleAttempts) return true
        return quizDetail.maxAttempts - (quizAttemptsCount || 0) <= 0
    }, [quizDetail, currentUser, quizAttemptsCount])

    // Get the number of attempts for the student
    useEffect(() => {
        if (!qid || !currentUser || currentUser.role !== 'STUDENT') return
        quizzesClient.getQuizAttemptsCountForUser(qid, currentUser._id)
            .then((responseObject) => setQuizAttemptsCount(responseObject.count))
    }, [qid, currentUser])

    // Get the quiz details
    useEffect(() => {
        if (!qid || !currentUser || currentUser.role !== 'STUDENT') return
        quizzesClient.getQuizDetails(qid)
            .then((response) => setQuizDetail(response.quiz))
    }, [qid])

    // Get the quiz attempt
    useEffect(() => {
        if (!attemptId) return
        quizzesClient.getQuizAttempt(attemptId)
            .then((response) => {
                const answers: Record<string, AnswerToQuestion> = {}
                for (const [questionId, answerObject] of Object.entries(response.answers)) {
                    if (answerObject.type === "true-false") {
                        const answer: TrueOrFalseAnswer = {
                            type: answerObject.type,
                            answer: answerObject.answer as boolean
                        }
                        answers[`${questionId}`] = answer
                    } else if (answerObject.type === "multiple-choice") {
                        const answer: MultipleChoiceAnswer = {
                            type: answerObject.type,
                            choiceId: answerObject.answer as string
                        }
                        answers[`${questionId}`] = answer
                    } else if (answerObject.type === "fill-in-the-blank") {
                        const answer: FillInTheBlankAnswer = {
                            type: answerObject.type,
                            text: answerObject.answer as string
                        }
                        answers[`${questionId}`] = answer
                    }
                }
                const attempt: QuizAttempt = {
                    attemptId: response.attemptId,
                    quizId: response.quizId,
                    uid: response.uid,
                    score: response.score,
                    answers: answers
                }
                setQuizAttempt(attempt)
            })
    }, [attemptId])

    // Get the quiz questions
    useEffect(() => {
        if (!quizAttempt) return
        quizzesClient.getQuizQuestions(quizAttempt.quizId)
            .then(setQuizQuestions)
    }, [quizAttempt])

    // Retake the quiz for the student
    const onRetakeQuizButtonStudentClick = useCallback(() => {
        if (!window.confirm('Are you sure you want to retake this quiz? This attempt will be deleted.')) return
        if (!quizAttempt) return
        navigate(`/kanbas/courses/${cid}/quizzes/${qid}/quiz`)
    }, [quizAttempt, navigate])

    const onRetakeQuizButtonFacultyClick = useCallback(() => {
        if (!window.confirm('Are you sure you want to retake this quiz? This attempt will be deleted.')) return
        if (!quizAttempt) return
        quizzesClient.deleteQuizAttempt(quizAttempt.attemptId)
        navigate(`/kanbas/courses/${cid}/quizzes/${qid}/quiz`)
    }, [quizAttempt, navigate])


    const renderQuestionContent = (question: Question, answer: AnswerToQuestion | undefined) => {
        if (!answer) {
            return <div className="text-danger">Question not answered</div>
        }

        switch (question.type) {
            case "true-false":
                const tfAnswer = answer as TrueOrFalseAnswer
                return (
                    <div>
                        <div className="mb-2">
                            <input
                                type="radio"
                                disabled
                                checked={tfAnswer?.answer === true}
                                className="me-2"
                            />
                            <label>True</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                disabled
                                checked={tfAnswer?.answer === false}
                                className="me-2"
                            />
                            <label>False</label>
                        </div>
                    </div>
                )

            case "multiple-choice":
                const mcAnswer = answer as MultipleChoiceAnswer
                return (
                    <div>
                        {question.choices.map((choice) => (
                            <div key={choice.id} className="mb-2">
                                <input
                                    type="radio"
                                    disabled
                                    checked={mcAnswer?.choiceId === choice.id}
                                    className="me-2"
                                />
                                <label>{choice.text}</label>
                            </div>
                        ))}
                    </div>
                )

            case "fill-in-the-blank":
                const fibAnswer = answer as FillInTheBlankAnswer
                return (
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            disabled
                            value={fibAnswer?.text || ''}
                            placeholder="No answer provided"
                        />
                    </div>
                )
        }
    }

    if (!quizAttempt || !quizQuestions) return <div>Loading...</div>

    return (
        <div className="container mt-4">
            <div className={`alert ${isViewingPreviousAttempt ? 'alert-info' : 'alert-success'}`}>
                <h4 className="alert-heading">
                    {isViewingPreviousAttempt
                        ? 'Previous Quiz Attempt Results'
                        : 'Quiz Submitted Successfully!'}
                </h4>
                <p>
                    {isViewingPreviousAttempt
                        ? 'These are the results from your previous attempt at this quiz. You can start a new attempt using the button at the bottom of the page.'
                        : 'Your quiz has been submitted. Thank you for completing the quiz.'}
                </p>
                <hr />
                <h5>Total Score: {quizAttempt.score} points</h5>
            </div>
            <div className="border rounded p-4 mt-4">
                <h5>Your Answers</h5>
                {quizQuestions.map((question, index) => (
                    <div key={question.id} className="mb-4 p-3 border rounded">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6>Question {index + 1}</h6>
                            <span>{question.points} pts</span>
                        </div>
                        <p className="mt-3"><strong>Question: </strong>{question.question}</p>
                        <div className="mt-3">
                            <strong>Your Answer:</strong>
                            <div className="mt-2">
                                {renderQuestionContent(question, quizAttempt.answers[question.id])}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
                {currentUser && currentUser.role === "STUDENT" && quizDetail && (
                    <button
                        className="btn btn-primary"
                        onClick={onRetakeQuizButtonStudentClick}
                        disabled={isRetakeQuizButtonDisabledForStudent}
                    >
                        {`Retake Quiz: ${quizDetail.maxAttempts - (quizAttemptsCount || 0)} attempts remaining`}
                    </button>
                )}
                {currentUser && currentUser.role === "FACULTY" && (
                    <button
                        className="btn btn-primary"
                        onClick={onRetakeQuizButtonFacultyClick}
                    >
                        Retake Quiz
                    </button>
                )}
            </div>
        </div>
    )
}

export default QuizAnswersScreen
