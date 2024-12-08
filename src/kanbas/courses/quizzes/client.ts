import axios from "axios";
import QuizDetail from "./detail/QuizDetail";
import Question from "./editor/question-types";
import { AnswerToQuestion } from "./answers/Answer";

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
    const response = await axios.get<{ quiz: QuizDetail }>(`${QUIZZES_API}/${quizId}`)
    return response.data
}

const updateQuizDetails = async (updatedQuiz: QuizDetail) => {
    // STUPID LANGUAGE FOR SOME REASON, UPDATED QUIZ CONTAINS EMPTY FREAKING OBJECTS FOR ANSWERS EVENTHOUG IT IS 
    // NOT INCLUDED IN THE QUIZ DETAILS JSON SCHEMA
    const quizDetail: QuizDetail = {
        id: updatedQuiz.id,
        title: updatedQuiz.title,
        quizType: updatedQuiz.quizType,
        points: updatedQuiz.points,
        assignmentGroup: updatedQuiz.assignmentGroup,
        // Time-related properties
        dueDateTimestampMillis: updatedQuiz.dueDateTimestampMillis,
        availableFromTimestampMillis: updatedQuiz.availableFromTimestampMillis,
        availableUntilTimestampMillis: updatedQuiz.availableUntilTimestampMillis,
        timeLimitInMinutes: updatedQuiz.timeLimitInMinutes,
        // Boolean flags
        shouldShuffleAnswers: updatedQuiz.shouldShuffleAnswers,
        allowMultipleAttempts: updatedQuiz.allowMultipleAttempts,
        maxAttempts: updatedQuiz.maxAttempts,
        isOneQuestionAtATime: updatedQuiz.isOneQuestionAtATime,
        isWebcamRequired: updatedQuiz.isWebcamRequired,
        shouldLockQuestionsAfterAnswering: updatedQuiz.shouldLockQuestionsAfterAnswering,
        showCorrectAnswersImmediately: updatedQuiz.showCorrectAnswersImmediately,
        // Additional properties
        description: updatedQuiz.description,
        assignTo: updatedQuiz.assignTo,
        viewResponses: updatedQuiz.viewResponses,
        accessCode: updatedQuiz.accessCode,
        isPublished: updatedQuiz.isPublished
    }
    const response = await axios.put(`${QUIZZES_API}/${updatedQuiz.id}`, quizDetail)
    return response.data
}

const getQuizQuestions = async (quizId: string) => {
    const response = await axios.get<Question[]>(`${QUIZZES_API}/${quizId}/questions`)
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


type AttemptResponse = Readonly<{
    attemptId: string,
    quizId: string,
    uid: string,
    score: number,
    answers: {
        questionId: {
            type: "true-false" | "multiple-choice" | "fill-in-the-blank",
            answer: boolean | string | string
        }
    }
}>


const getQuizAttempt = async (attemptId: string) => {
    const response = await axios.get<AttemptResponse>(`${QUIZZES_API}/attempts/${attemptId}`)
    return response.data
}


const getQuizAttemptsForUser = async (quizId: string, uid: string) => {
    const response = await axios.get<AttemptResponse[]>(`${QUIZZES_API}/attempts/${quizId}/user/${uid}`)
    return response.data
}

const deleteQuizAttempt = async (attemptId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/attempts/${attemptId}`)
    return response.data
}

const getQuizAttemptsCountForUser = async (quizId: string, uid: string) => {
    const response = await axios.get<{ count: number }>(`${QUIZZES_API}/${quizId}/attempts/count/${uid}`)
    return response.data
}

const createQuizForCourse = async (courseId: string, quizDetail: QuizDetail) => {
    const response = await axios.post(`${QUIZZES_API}/new`, { ...quizDetail, courseId })
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
    getQuizAttemptsForUser,
    deleteQuizAttempt,
    getQuizAttemptsCountForUser,
    createQuizForCourse
}