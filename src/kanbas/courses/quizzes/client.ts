import axios from "axios";
import QuizDetail from "./QuizDetail";

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

export { deleteQuiz, fetchQuizSummariesForCourse, getQuizDetails, updatePublishedStatusOfQuiz, updateQuizDetails, getQuizQuestions }