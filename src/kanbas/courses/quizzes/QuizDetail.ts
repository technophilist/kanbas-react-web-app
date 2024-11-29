type QuizDetail = {
    // Common properties with aligned names
    title: string
    quizType: string
    points: number
    assignmentGroup: string
    // Time-related properties
    dueDateTimestamp: string
    availableFromTimestamp: string
    availableUntilTimestamp: string
    dueDate: string
    availableFrom: string
    availableUntil: string
    timeLimit: string
    timeLimitInMinutes: number
    // Boolean flags
    shuffleAnswers: boolean
    shouldShuffleAnswers: boolean
    allowMultipleAttempts: boolean
    isMultipleAttempts: boolean
    oneQuestionAtATime: boolean
    isOneQuestionAtATime: boolean
    webcamRequired: boolean
    isWebcamRequired: boolean
    lockQuestionsAfterAnswering: boolean
    shouldLockQuestionsAfterAnswering: boolean
    showCorrectAnswersImmediately: boolean
    // Additional properties
    description: string
    assignTo: string
    viewResponses: string
    accessCode: string
}

export default QuizDetail