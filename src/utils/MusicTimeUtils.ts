export function MusicTime(duration: number): string {
    let minutes: number = Math.floor(duration / 60000);
    let seconds: number = Math.floor((duration % 60000) / 1000);

    let formattedSeconds: string = seconds < 10 ? `0${minutes}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
}

export function formatUptime(uptime: number) {
    const totalSeconds = Math.floor(uptime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours} ชม. ${minutes} นาที ${seconds} วิ.`;
}
