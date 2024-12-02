import { useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import { FillInTheBlankQuestion } from "./question-types"

type FillInTheBlankQuestionEditorProps = {
    fillInTheBlankQuestion: FillInTheBlankQuestion,
    updateQuestionText: (updatedQuestionText: string) => void,
    addPossibleAnswer: () => void,
    removePossibleAnswer: (index: number) => void,
    updatePossibleAnswer: (index: number, value: string) => void
}

function FillInTheBlankQuestionEditor(props: FillInTheBlankQuestionEditorProps) {
    return (
        <div>
            <p className="text-secondary mb-2">
                Enter your question text, then define all possible correct answers for the blank.
                Students will see the question followed by a small text box to type their answer.
            </p>

            <div className="mb-3">
                <label className="form-label fw-bold">Question:</label>
                <div className="border rounded">
                    <textarea
                        className="form-control border-0"
                        rows={3}
                        placeholder="Enter your question here. Use _____ to indicate the blank."
                        value={props.fillInTheBlankQuestion.question}
                        onChange={(e) => props.updateQuestionText(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Possible Answers:</label>
                <div className="d-flex flex-column gap-2">
                    {props.fillInTheBlankQuestion.possibleAnswers.map((answer, index) => (
                        <div key={index} className="d-flex align-items-center gap-2">
                            <label className="text-secondary" style={{ minWidth: "120px" }}>Possible Answer</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter answer text"
                                value={answer}
                                onChange={(e) => props.updatePossibleAnswer(index, e.target.value)}
                            />
                            <IoTrashOutline
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "2rem" }}
                                onClick={() => props.removePossibleAnswer(index)}
                            />
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-link text-danger p-0 mt-2"
                        onClick={props.addPossibleAnswer}
                    >
                        + Add Another Answer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FillInTheBlankQuestionEditor