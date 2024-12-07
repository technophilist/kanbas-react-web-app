import { useEffect, useState } from "react"
import { FaInfoCircle } from "react-icons/fa"
import Question from "./editor/question-types"
import { useNavigate, useParams } from "react-router-dom"
import QuizDetail from "./detail/QuizDetail"
import * as quizzesClient from "./client"
import { AnswerToQuestion, TrueOrFalseAnswer, MultipleChoiceAnswer, FillInTheBlankAnswer } from "./answers/Answer"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

function QuizScreen() {
    const { qid } = useParams()
    const navigate = useNavigate()
    const [quizDetail, setQuizDetail] = useState<QuizDetail | null>(null)
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
    const [answers, setAnswers] = useState<Record<string, AnswerToQuestion>>({})
    const [isSaving, setIsSaving] = useState(false)
    const { currentUser } = useSelector((state: RootState) => state.accountReducer)

    useEffect(() => {
        if (!qid) return
        quizzesClient.getQuizDetails(qid)
            .then(setQuizDetail)
        quizzesClient.getQuizQuestions(qid)
            .then((questions: Question[]) => {
                setQuestions(questions)
                setCurrentQuestion(questions[0])
            })
    }, [qid])

    const handleAnswerChange = (questionId: string, answer: AnswerToQuestion) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }))
    }

    const renderQuestionContent = (question: Question) => {
        const answer = answers[question.id]

        switch (question.type) {
            case "true-false":
                return (
                    <div>
                        <p>{question.question}</p>
                        <div>
                            <div className="mb-2">
                                <input
                                    type="radio"
                                    id="true"
                                    name="answer"
                                    className="me-2"
                                    checked={answer?.type === 'true-false' && (answer as TrueOrFalseAnswer).answer === true}
                                    onChange={() => handleAnswerChange(question.id, { type: 'true-false', answer: true })}
                                />
                                <label htmlFor="true">True</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="false"
                                    name="answer"
                                    className="me-2"
                                    checked={answer?.type === 'true-false' && (answer as TrueOrFalseAnswer).answer === false}
                                    onChange={() => handleAnswerChange(question.id, { type: 'true-false', answer: false })}
                                />
                                <label htmlFor="false">False</label>
                            </div>
                        </div>
                    </div>
                )
            case "multiple-choice":
                return (
                    <div>
                        <p>{question.question}</p>
                        {question.choices.map((choice) => (
                            <div key={choice.id} className="mb-2">
                                <input
                                    type="radio"
                                    id={choice.id}
                                    name="answer"
                                    className="me-2"
                                    checked={answer?.type === 'multiple-choice' && (answer as MultipleChoiceAnswer).choiceId === choice.id}
                                    onChange={() => handleAnswerChange(question.id, { type: 'multiple-choice', choiceId: choice.id })}
                                />
                                <label htmlFor={choice.id}>{choice.text}</label>
                            </div>
                        ))}
                    </div>
                )
            case "fill-in-the-blank":
                return (
                    <div>
                        <p>{question.question}</p>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your answer"
                            value={answer?.type === 'fill-in-the-blank' ? (answer as FillInTheBlankAnswer).text : ''}
                            onChange={(e) => handleAnswerChange(question.id, { type: 'fill-in-the-blank', text: e.target.value })}
                        />
                    </div>
                )
        }
    }

    const handleSubmitQuiz = async () => {
        if (questions.length === 0 || !currentQuestion || !quizDetail || !currentUser?._id) return
        setIsSaving(true)
        try {
            const attemptId = await quizzesClient.saveQuizAttempt(quizDetail.id, currentUser._id, answers, calculateTotalQuizScore(questions, answers))
            if (!attemptId) throw new Error('Failed to save quiz attempt')
            navigate(`answers/${attemptId}`)
        } catch (error) {
            alert('Failed to save quiz attempt. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    if (questions.length === 0 || !currentQuestion || !quizDetail) return <div>Loading...</div>

    return (
        <div className="container mt-4">
            <h1>Q1 - HTML</h1>
            <div className="alert alert-danger">
                <FaInfoCircle className="me-2" />
                This is a preview of the published version of the quiz
            </div>

            <div className="mt-3">
                <h2 className="mt-2">Quiz Instructions</h2>
                <p>{quizDetail.description}</p>
                <hr />
            </div>

            <div className="border rounded p-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>Question {currentQuestionIndex + 1}</h5>
                    <span>{currentQuestion.points} pts</span>
                </div>

                {renderQuestionContent(currentQuestion)}

                <div className="d-flex justify-content-between mt-4">
                    {!quizDetail.shouldLockQuestionsAfterAnswering && currentQuestionIndex > 0 && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setCurrentQuestionIndex(currentQuestionIndex - 1)
                                setCurrentQuestion(questions[currentQuestionIndex - 1])
                            }}
                        >
                            ← Previous
                        </button>
                    )}
                    {currentQuestionIndex < questions.length - 1 && (
                        <button
                            className="btn btn-secondary ms-auto"
                            onClick={() => {
                                setCurrentQuestionIndex(currentQuestionIndex + 1)
                                setCurrentQuestion(questions[currentQuestionIndex + 1])
                            }}
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>

            <div className="border rounded p-2 mt-4 d-flex justify-content-end">
                <button
                    className="btn btn-primary"
                    onClick={handleSubmitQuiz}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving Quiz...' : 'Submit Quiz'}
                </button>
            </div>
        </div>
    )
}

const calculateTotalQuizScore = (questions: Question[], answers: Record<string, AnswerToQuestion>) => {
    return questions.reduce((total, question) => {
        const answer = answers[question.id]
        if (!answer) return total

        switch (question.type) {
            case "true-false":
                const tfAnswer = answer as TrueOrFalseAnswer
                return total + (tfAnswer.answer === question.correctAnswer ? question.points : 0)
            case "multiple-choice":
                const mcAnswer = answer as MultipleChoiceAnswer
                const correctChoice = question.choices.find(c => c.id === mcAnswer.choiceId)
                return total + (correctChoice?.isCorrect ? question.points : 0)
            case "fill-in-the-blank":
                const fibAnswer = answer as FillInTheBlankAnswer
                return total + (question.possibleAnswers.includes(fibAnswer.text) ? question.points : 0)
            default:
                return total
        }
    }, 0)
}

export default QuizScreen