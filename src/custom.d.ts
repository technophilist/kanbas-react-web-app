// without this, importing *.svg won't work
declare module '*.jpeg' {
    const content: string;
    export default content;
}
declare module '*.png' {
    const content: string;
    export default content;
}