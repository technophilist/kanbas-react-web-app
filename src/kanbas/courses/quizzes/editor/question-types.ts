interface BaseQuestion {
    id: string
    type: "multiple-choice" | "true-false" | "fill-in-the-blank"
    title: string
    points: number
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "multiple-choice"
    question: string
    choices: Array<{
        id: string
        text: string
        isCorrect: boolean
    }>
}

export interface TrueOrFalseQuestion extends BaseQuestion {
    type: "true-false"
    question: string
    correctAnswer: boolean
}

export interface FillInTheBlankQuestion extends BaseQuestion {
    type: "fill-in-the-blank"
    question: string
    possibleAnswers: string[]
}

type Question = MultipleChoiceQuestion | TrueOrFalseQuestion | FillInTheBlankQuestion

export default Question
