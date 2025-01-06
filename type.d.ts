type Video = {
    youtubeId: string,
    customName: string,

}

type Note = {
    from: number,
    text: string,
}


type VideoWithNote = {
    youtubeId: string,
    notes: Note[],
}

declare module '*.mp3' {

    const src: string;

    export default src;

}