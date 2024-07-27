export function MusicTime(duration: number): string {
        let minutes: number = Math.floor(duration / 60000);
        let seconds: number = Math.floor((duration % 60000) / 1000);

        let formattedSeconds: string = seconds < 10 ? `0${minutes}` : `${seconds}`;
        return `${minutes}:${formattedSeconds}`
}