import { FaInfoCircle } from "react-icons/fa";
import Question, { MultipleChoiceQuestion } from "./editor/question-types";
import QuestionEditor from "./editor/QuestionEditor";
import { useCallback, useEffect, useState } from "react";
import * as quizzesClient from "./client";
import { useParams } from "react-router-dom";

function QuestionsTabContent() {
    const [existingQuestions, setExistingQuestions] = useState<Question[]>([])
    const [newQuestions, setNewQuestions] = useState<Question[]>([])
    const { qid } = useParams()

    const fetchQuestions = useCallback(async () => {
        if (!qid) return
        const questions = await quizzesClient.getQuizQuestions(qid)
        setExistingQuestions(questions)
    }, [qid])

    const updateQuestion = useCallback(async (updatedQuestion: Question) => {
        if (!qid) return
        await quizzesClient.updateQuizQuestion(qid, updatedQuestion)
        fetchQuestions()
    }, [fetchQuestions])

    const deleteQuestion = useCallback((questionToDelete: Question) => {
        setExistingQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionToDelete.id))
    }, [])

    const updateNewQuestion = useCallback((updatedQuestion: Question) => {
        setNewQuestions(prevQuestions => prevQuestions.map(question => question.id === updatedQuestion.id ? updatedQuestion : question))
    }, [])

    const deleteNewQuestion = useCallback((questionToDelete: Question) => {
        setNewQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionToDelete.id))
    }, [])

    useEffect(() => {
        fetchQuestions()
    }, [qid, fetchQuestions])

    return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center mt-4 mb-4">
                {existingQuestions.map((question) => (
                    <div className="mt-4">
                        <QuestionEditor
                            key={question.id}
                            question={question}
                            updateQuestion={updateQuestion}
                            deleteQuestion={deleteQuestion}
                        />
                    </div>
                ))}
                {newQuestions.map((question) => (
                    <div key={question.id} className="d-flex flex-column mt-4">
                        <div className="d-flex align-items-center m-0 mb-1 p-2 w-50 alert alert-info align-self-center">
                            <FaInfoCircle className="me-2" />
                            New question - Click "Save" at the bottom to add it to the quiz
                        </div>
                        <QuestionEditor
                            question={question}
                            updateQuestion={updateNewQuestion}
                            deleteQuestion={deleteNewQuestion}
                        />
                    </div>
                ))}
                <button
                    className="btn btn-secondary align-self-center mt-4"
                    onClick={() => {
                        const newMcqQuestion: MultipleChoiceQuestion = {
                            id: `${Date.now()}`,
                            type: "multiple-choice",
                            title: "",
                            points: 0,
                            question: "",
                            choices: []
                        }
                        setNewQuestions(previouslyAddedQuestions => [...previouslyAddedQuestions, newMcqQuestion])
                    }}
                >+ New Question
                </button>
            </div>
            <hr className="mb-4" />
            <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-light border">Cancel</button>
                <button className="btn btn-danger">Save</button>
            </div>
        </div>
    )
}

export default QuestionsTabContent