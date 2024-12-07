export type TrueOrFalseAnswer = {
    type: 'true-false'
    answer: boolean
}

export type MultipleChoiceAnswer = {
    type: 'multiple-choice'
    choiceId: string
}

export type FillInTheBlankAnswer = {
    type: 'fill-in-the-blank'
    text: string
}

export type AnswerToQuestion = TrueOrFalseAnswer | MultipleChoiceAnswer | FillInTheBlankAnswer

