import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor"
import FillInTheBlankQuestionEditor from "./FillInTheBlankQuestionEditor"
import TrueOrFalseQuestionEditor from "./TrueOrFalseQuestionEditor"
import { useCallback, useMemo, useState } from "react"
import Question, { FillInTheBlankQuestion, MultipleChoiceQuestion, TrueOrFalseQuestion } from "./question-types";

type QuestionEditorProps = {
    question: Question,
    updateQuestion: (question: Question) => void,
    deleteQuestion: (question: Question) => void
}
function QuestionEditor(props: QuestionEditorProps) {
    const [componentQuestionInstance, setComponentQuestionInstance] = useState(props.question)
    const [isModified, setIsModified] = useState(false)

    const updateComponentQuestion = useCallback((updater: (prev: Question) => Question) => {
        setComponentQuestionInstance(updater)
        setIsModified(true)
    }, [])

    const multipleChoiceQuestionOperations = useMemo(() => {
        return {
            updateQuestionText: (updatedQuestionText: String) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "multiple-choice") return prevQuestionObject
                    return { ...prevQuestionObject, question: updatedQuestionText } as MultipleChoiceQuestion
                })
            },
            addNewEmptyChoice: () => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "multiple-choice") return prevQuestionObject
                    return {
                        ...prevQuestionObject,
                        choices: [...prevQuestionObject.choices, { id: Date.now().toString(), text: "", isCorrect: false }]
                    }
                })
            },
            removeChoice: (index: number) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "multiple-choice") return prevQuestionObject
                    return { ...prevQuestionObject, choices: prevQuestionObject.choices.filter((_, i) => i !== index) }
                })
            },
            updateChoice: (index: number, newText: string) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "multiple-choice") return prevQuestionObject
                    return { ...prevQuestionObject, choices: prevQuestionObject.choices.map((choice, i) => i === index ? { ...choice, text: newText } : choice) }
                })
            },
            updateCorrectChoice: (index: number) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "multiple-choice") return prevQuestionObject
                    return { ...prevQuestionObject, choices: prevQuestionObject.choices.map((choice, i) => i === index ? { ...choice, isCorrect: true } : { ...choice, isCorrect: false }) }
                })
            }
        }
    }, [])
    const trueOrFalseQuestionOperations = useMemo(() => {
        return {
            updateQuestionText: (updatedQuestionText: string) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "true-false") return prevQuestionObject
                    return { ...prevQuestionObject, question: updatedQuestionText } as TrueOrFalseQuestion
                })
            },
            updateCorrectAnswer: (correctAnswer: boolean) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "true-false") return prevQuestionObject
                    return { ...prevQuestionObject, correctAnswer: correctAnswer } as TrueOrFalseQuestion
                })
            }
        }
    }, [])
    const fillInTheBlankQuestionOperations = useMemo(() => {
        return {
            updateQuestionText: (updatedQuestionText: string) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "fill-in-the-blank") return prevQuestionObject
                    return { ...prevQuestionObject, question: updatedQuestionText } as FillInTheBlankQuestion
                })
            },
            addPossibleAnswer: () => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "fill-in-the-blank") return prevQuestionObject
                    return { ...prevQuestionObject, possibleAnswers: [...prevQuestionObject.possibleAnswers, ""] } as FillInTheBlankQuestion
                })
            },
            removePossibleAnswer: (index: number) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "fill-in-the-blank") return prevQuestionObject
                    return { ...prevQuestionObject, possibleAnswers: prevQuestionObject.possibleAnswers.filter((_, i) => i !== index) } as FillInTheBlankQuestion
                })
            },
            updatePossibleAnswer: (index: number, newText: string) => {
                updateComponentQuestion(prevQuestionObject => {
                    if (prevQuestionObject.type !== "fill-in-the-blank") return prevQuestionObject
                    return { ...prevQuestionObject, possibleAnswers: prevQuestionObject.possibleAnswers.map((answer, i) => i === index ? newText : answer) } as FillInTheBlankQuestion
                })
            }
        }
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="border rounded p-3 w-50 mt-4">
                <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the title here"
                            value={componentQuestionInstance.title}
                            onChange={(e) => {
                                updateComponentQuestion(prevQuestionObject => {
                                    return { ...prevQuestionObject, title: e.target.value }
                                })
                            }}
                        />
                        <select
                            className="form-select"
                            value={componentQuestionInstance.type}
                            onChange={(e) => {
                                let changedType = e.target.value
                                if (changedType === "multiple-choice") {
                                    const multipleChoiceQuestion: MultipleChoiceQuestion = {
                                        ...componentQuestionInstance,
                                        choices: [],
                                        type: "multiple-choice"
                                    }
                                    updateComponentQuestion(() => multipleChoiceQuestion)
                                    return
                                }
                                if (changedType === "true-false") {
                                    const trueOrFalseQuestion: TrueOrFalseQuestion = {
                                        ...componentQuestionInstance,
                                        type: "true-false",
                                        correctAnswer: true
                                    }
                                    updateComponentQuestion(() => trueOrFalseQuestion)
                                    return
                                }
                                if (changedType === "fill-in-the-blank") {
                                    const fillInTheBlanksQuestion: FillInTheBlankQuestion = {
                                        ...componentQuestionInstance,
                                        type: "fill-in-the-blank",
                                        possibleAnswers: []
                                    }
                                    updateComponentQuestion(() => fillInTheBlanksQuestion)
                                }
                            }}
                            disabled={false}
                        >
                            <option value={"multiple-choice "}>Multiple Choice</option>
                            <option value={"true-false"}>True/False</option>
                            <option value={"fill-in-the-blank"}>Fill in the blank</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-baseline">
                        <span className="ms-2 fw-semibold">pts:</span>
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: "60px" }}
                            value={componentQuestionInstance.points}
                            onChange={(e) => {
                                updateComponentQuestion(prevQuestionObject => {
                                    return { ...prevQuestionObject, points: parseInt(e.target.value) }
                                })
                            }}
                        />
                    </div>
                </div>
                <hr />
                {componentQuestionInstance.type === "multiple-choice" && (
                    <MultipleChoiceQuestionEditor
                        multipleChoiceQuestion={componentQuestionInstance}
                        updateQuestionText={multipleChoiceQuestionOperations.updateQuestionText}
                        addChoice={multipleChoiceQuestionOperations.addNewEmptyChoice}
                        removeChoice={multipleChoiceQuestionOperations.removeChoice}
                        updateChoice={multipleChoiceQuestionOperations.updateChoice}
                        updateCorrectChoice={multipleChoiceQuestionOperations.updateCorrectChoice}
                    />
                )}
                {componentQuestionInstance.type === "true-false" && (
                    <TrueOrFalseQuestionEditor
                        trueOrFalseQuestion={componentQuestionInstance}
                        updateQuestionText={trueOrFalseQuestionOperations.updateQuestionText}
                        updateCorrectAnswer={trueOrFalseQuestionOperations.updateCorrectAnswer}
                    />
                )}
                {componentQuestionInstance.type === "fill-in-the-blank" && (
                    <FillInTheBlankQuestionEditor
                        fillInTheBlankQuestion={componentQuestionInstance}
                        updateQuestionText={fillInTheBlankQuestionOperations.updateQuestionText}
                        addPossibleAnswer={fillInTheBlankQuestionOperations.addPossibleAnswer}
                        removePossibleAnswer={fillInTheBlankQuestionOperations.removePossibleAnswer}
                        updatePossibleAnswer={fillInTheBlankQuestionOperations.updatePossibleAnswer}
                    />
                )}
                <div className="d-flex flex-column gap-2">
                    {isModified && (
                        <small className="text-muted fst-italic">
                            Question has been modified. Click "Update Question" to save your changes.
                        </small>
                    )}
                    <div className="d-flex gap-2">
                        <button className="btn btn-light border" onClick={() => props.deleteQuestion(componentQuestionInstance)}>Delete</button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                props.updateQuestion(componentQuestionInstance)
                                setIsModified(false)
                            }}
                        >
                            Update Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuestionEditor