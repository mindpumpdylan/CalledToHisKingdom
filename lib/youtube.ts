const CHANNEL_ID = "UCMRmdQt-BsPL2vQ6NwdO9bw";

export type LatestVideo = {
  videoId: string;
  title: string;
};

function unescapeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export async function getLatestVideo(): Promise<LatestVideo | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const xml = await res.text();
    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
    if (!entry) return null;

    const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
    if (!videoId || !title) return null;

    return { videoId, title: unescapeXmlEntities(title) };
  } catch {
    return null;
  }
}
