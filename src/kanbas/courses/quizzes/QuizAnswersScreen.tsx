import Question from "./editor/question-types"
import { AnswerToQuestion, TrueOrFalseAnswer, MultipleChoiceAnswer, FillInTheBlankAnswer } from "./Answer"
import { useEffect, useMemo, useState } from "react"
import * as quizzesClient from "./client"
import { useParams, useLocation } from "react-router-dom"
import QuizAttempt from "./QuizAttempt"

function QuizAnswersScreen() {
    const { attemptId } = useParams()
    const location = useLocation()
    const isViewingPreviousAttempt = useMemo(() => location.state?.isPreviousAttempt === true, [location.state])
    const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null)
    const [quizQuestions, setQuizQuestions] = useState<Question[] | null>(null)

    useEffect(() => {
        if (!attemptId) return
        quizzesClient.getQuizAttempt(attemptId)
            .then(setQuizAttempt)
    }, [attemptId])

    useEffect(() => {
        if (!quizAttempt) return
        quizzesClient.getQuizQuestions(quizAttempt.quizId)
            .then(setQuizQuestions)
    }, [quizAttempt])


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
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        if (window.confirm('Are you sure you want to retake this quiz? This attempt will be deleted.')) {
                            // TODO: STOPSHIP: Handle retake quiz
                        }
                    }}
                >
                    {isViewingPreviousAttempt ? 'Start New Attempt' : 'Retake Quiz'}
                </button>
            </div>
        </div>
    )
}

export default QuizAnswersScreen
