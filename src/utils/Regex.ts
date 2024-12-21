const youTubeMusicRegex = /^(https?:\/\/)?(www\.)?(music\.youtube\.com)\/(watch\?v=|playlist\?list=|results\?search_query=|)([a-zA-Z0-9_-]{11})/;
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|shorts\/|embed\/)?[\w-]+(.*)?$/;
const soundcloudRegex = /^(https?:\/\/)?(www\.)?soundcloud\.com\/[\w-]+\/[\w-]+/;

export { youTubeMusicRegex, youtubeRegex, soundcloudRegex }