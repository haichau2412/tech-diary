export type Note = {
    from: number,
    text: string
}

export type YouTubeNote = {
    id: string
    duration: number
    customName: string
    note: Note
}

export type Player = {
    playerInfo: {
        duration: number
    }

}

export type VideoState = "paused" | "playing"