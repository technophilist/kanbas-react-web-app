import { TrueOrFalseQuestion } from "./question-types"

type TrueOrFalseQuestionEditorProps = {
    trueOrFalseQuestion: TrueOrFalseQuestion,
    updateQuestionText: (updatedQuestionText: string) => void,
    updateCorrectAnswer: (correctAnswer: boolean) => void
}

function TrueOrFalseQuestionEditor(props: TrueOrFalseQuestionEditorProps) {
    return (
        <div>
            <p className="text-secondary mb-2">Enter your question text, then select if True or False is the correct
                answer.</p>

            <div className="mb-3">
                <label className="form-label fw-bold">Question:</label>
                <div className="border rounded">
                    <textarea
                        className="form-control border-0"
                        rows={3}
                        placeholder="Enter your question here"
                        value={props.trueOrFalseQuestion.question}
                        onChange={(e) => props.updateQuestionText(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Answers:</label>
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                        <input
                            type="radio"
                            name="correctAnswer"
                            className="form-check-input"
                            style={{ marginRight: "8px" }}
                            checked={props.trueOrFalseQuestion.correctAnswer === true}
                            onChange={() => props.updateCorrectAnswer(true)}
                        />
                        <label className="text-secondary" style={{ minWidth: "120px" }}>True</label>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <input
                            type="radio"
                            name="correctAnswer"
                            className="form-check-input"
                            style={{ marginRight: "8px" }}
                            checked={props.trueOrFalseQuestion.correctAnswer === false}
                            onChange={() => props.updateCorrectAnswer(false)}
                        />
                        <label className="text-secondary" style={{ minWidth: "120px" }}>False</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrueOrFalseQuestionEditor