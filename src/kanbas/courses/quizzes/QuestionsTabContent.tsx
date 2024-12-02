import { FaInfoCircle } from "react-icons/fa";
import Question, { MultipleChoiceQuestion } from "./editor/question-types";
import QuestionEditor from "./editor/QuestionEditor";
import { useCallback, useState } from "react";

const fakeQuestions: Array<Question> = [
    {
        id: "q1",
        type: "multiple-choice",
        title: "Basic JavaScript Question",
        points: 5,
        question: "Which of the following is NOT a JavaScript data type?",
        choices: [
            {
                id: "c1",
                text: "String",
                isCorrect: false
            },
            {
                id: "c2",
                text: "Integer",
                isCorrect: true
            },
            {
                id: "c3",
                text: "Boolean",
                isCorrect: false
            },
            {
                id: "c4",
                text: "Undefined",
                isCorrect: false
            }
        ]
    },
    {
        id: "q2",
        type: "multiple-choice",
        title: "React Hooks Question",
        points: 4,
        question: "Which hook would you use to perform side effects in a React component?",
        choices: [
            {
                id: "c1",
                text: "useState",
                isCorrect: false
            },
            {
                id: "c2",
                text: "useEffect",
                isCorrect: true
            },
            {
                id: "c3",
                text: "useContext",
                isCorrect: false
            },
            {
                id: "c4",
                text: "useReducer",
                isCorrect: false
            }
        ]
    },
    {
        id: "q3",
        type: "true-false",
        title: "React Components Question",
        points: 3,
        question: "In React, all functional components must start with a capital letter.",
        correctAnswer: true
    },
    {
        id: "q4",
        type: "true-false",
        title: "JavaScript Scope",
        points: 3,
        question: "Variables declared with 'let' are hoisted to the top of their scope.",
        correctAnswer: false
    },
    {
        id: "q5",
        type: "fill-in-the-blank",
        title: "HTML Basics",
        points: 4,
        question: "The HTML tag used to create a hyperlink is _____.",
        possibleAnswers: ["<a>", "a", "<a", "a>"]
    },
    {
        id: "q6",
        type: "fill-in-the-blank",
        title: "CSS Selector",
        points: 3,
        question: "To select an element by its ID in CSS, you use the _____ symbol.",
        possibleAnswers: ["#", "hashtag", "pound", "number sign"]
    }
]
function QuestionsTabContent() {
    const [existingQuestions, setExistingQuestions] = useState(fakeQuestions)
    const [newQuestions, setNewQuestions] = useState<Question[]>([])

    const updateQuestion = useCallback((updatedQuestion: Question) => {
        setExistingQuestions(prevQuestions =>
            prevQuestions.map(question => question.id === updatedQuestion.id ? updatedQuestion : question)
        )
    }, [])

    const deleteQuestion = useCallback((questionToDelete: Question) => {
        setExistingQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionToDelete.id))
    }, [])

    const updateNewQuestion = useCallback((updatedQuestion: Question) => {
        setNewQuestions(prevQuestions => prevQuestions.map(question => question.id === updatedQuestion.id ? updatedQuestion : question))
    }, [])

    const deleteNewQuestion = useCallback((questionToDelete: Question) => {
        setNewQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionToDelete.id))
    }, [])

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