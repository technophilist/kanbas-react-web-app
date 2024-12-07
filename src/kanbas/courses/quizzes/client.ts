import axios from "axios";
import QuizDetail from "./QuizDetail";
import Question from "./editor/question-types";
import { AnswerToQuestion } from "./Answer";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`

const fetchQuizSummariesForCourse = async (courseId: string) => {
    const response = await axios.get(`${QUIZZES_API}/summary/${courseId}`);
    return response.data
}

const updatePublishedStatusOfQuiz = async (quizId: string, isPublished: boolean) => {
    const response = await axios.patch(`${QUIZZES_API}/${quizId}`, { isPublished })
    return response.data
}

const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`)
    return response.data
}

const getQuizDetails = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`)
    return response.data
}

const updateQuizDetails = async (updatedQuiz: QuizDetail) => {
    const response = await axios.put(`${QUIZZES_API}/${updatedQuiz.id}`, updatedQuiz)
    return response.data
}

const getQuizQuestions = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`)
    return response.data
}

const updateQuizQuestion = async (quizId: string, question: Question) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${question.id}`, question)
    return response.data
}

const updateQuestionsForQuiz = async (quizId: string, questions: Question[]) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/questions`, questions)
    return response.data
}

const saveQuizAttempt = async (quizId: string, uid: string, answers: Record<string, AnswerToQuestion>, score: number) => {
    const response = await axios.post(`${QUIZZES_API}/attempts/new`, { quizId, uid, answers, score })
    return response.data.attemptId
}

const getQuizAttempt = async (attemptId: string) => {
    const response = await axios.get(`${QUIZZES_API}/attempts/${attemptId}`)
    return response.data
}

const getQuizAttemptsForUser = async (quizId: string, uid: string) => {
    const response = await axios.get(`${QUIZZES_API}/attempts/${quizId}/user/${uid}`)
    return response.data
}

export {
    deleteQuiz,
    fetchQuizSummariesForCourse,
    getQuizDetails,
    updatePublishedStatusOfQuiz,
    updateQuizDetails,
    getQuizQuestions,
    updateQuizQuestion,
    updateQuestionsForQuiz,
    saveQuizAttempt,
    getQuizAttempt,
    getQuizAttemptsForUser
}
