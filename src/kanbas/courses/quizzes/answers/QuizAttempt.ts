import { AnswerToQuestion } from "./Answer"


type QuizAttempt = {
    attemptId: string
    quizId: string
    uid: string
    score: number
    answers: Record<string, AnswerToQuestion>
}

export default QuizAttempt
