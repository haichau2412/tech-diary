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