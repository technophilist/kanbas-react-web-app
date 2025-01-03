type QuizDetail = {
    // Common properties with aligned names
    id: string,
    title: string
    quizType: string
    points: number
    assignmentGroup: string
    // Time-related properties
    dueDateTimestampMillis: string
    availableFromTimestampMillis: string
    availableUntilTimestampMillis: string
    timeLimitInMinutes: number | null
    // Boolean flags
    shouldShuffleAnswers: boolean
    allowMultipleAttempts: boolean
    maxAttempts: number,
    isOneQuestionAtATime: boolean
    isWebcamRequired: boolean
    shouldLockQuestionsAfterAnswering: boolean
    showCorrectAnswersImmediately: boolean
    // Additional properties
    description: string
    assignTo: string
    viewResponses: string
    accessCode: string,
    isPublished: boolean
}

export default QuizDetail