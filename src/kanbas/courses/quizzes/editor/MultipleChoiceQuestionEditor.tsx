import { IoTrashOutline } from "react-icons/io5";
import { MultipleChoiceQuestion } from "./question-types";

type MultipleChoiceQuestionEditorProps = {
    multipleChoiceQuestion: MultipleChoiceQuestion,
    updateQuestionText: (questionText: String) => void,
    addChoice: () => void,
    removeChoice: (index: number) => void,
    updateChoice: (index: number, text: string) => void,
    updateCorrectChoice: (index: number) => void
}

function MultipleChoiceQuestionEditor(props: MultipleChoiceQuestionEditorProps) {
    return (
        <div>
            <p className="text-secondary mb-2">Enter your question and multiple answers, then select the one correct
                answer.</p>

            <div className="mb-3">
                <label className="form-label fw-bold">Question:</label>
                <div className="border rounded">
                    <textarea
                        className="form-control border-0"
                        rows={3}
                        placeholder="Enter your question here"
                        value={props.multipleChoiceQuestion.question}
                        onChange={(e) => props.updateQuestionText(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Answers:</label>
                <div className="d-flex flex-column gap-2">
                    {props.multipleChoiceQuestion.choices.map((choice, index) => (
                        <div key={choice.id} className="d-flex align-items-center gap-2">
                            <input
                                type="radio"
                                name="correctAnswer"
                                className="form-check-input"
                                style={{ marginRight: "8px" }}
                                checked={choice.isCorrect}
                                onChange={() => props.updateCorrectChoice(index)}
                            />
                            <label className="text-secondary" style={{ minWidth: "120px" }}>Possible Answer</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter answer text"
                                value={choice.text}
                                onChange={(e) => props.updateChoice(index, e.target.value)}
                            />
                            <IoTrashOutline
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "2rem" }}
                                onClick={() => props.removeChoice(index)}
                            />
                        </div>
                    ))}
                    <hr />
                    <div className="d-flex flex-column">
                        <div
                            className="text-danger align-self-end"
                            style={{ cursor: "pointer" }}
                            onClick={props.addChoice}
                        >+ Add Another Answer</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultipleChoiceQuestionEditor