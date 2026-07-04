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

function parseEntries(xml: string): LatestVideo[] {
  const entries: LatestVideo[] = [];
  for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const entry = match[1];
    const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
    if (videoId && title) {
      entries.push({ videoId, title: unescapeXmlEntities(title) });
    }
  }
  return entries;
}

// YouTube Shorts render at /shorts/{id} with a 200; regular videos 303-redirect
// to /watch?v={id}. The RSS feed itself carries no duration/type field, so this
// probe is how we tell the weekly episode apart from the channel's daily Shorts.
async function isShort(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      method: "HEAD",
      redirect: "manual",
      next: { revalidate: 3600 },
    });
    return res.status === 200;
  } catch {
    return true;
  }
}

export async function getLatestVideo(): Promise<LatestVideo | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const entries = parseEntries(await res.text());
    if (entries.length === 0) return null;

    const shortFlags = await Promise.all(entries.map((entry) => isShort(entry.videoId)));
    const latestEpisode = entries.find((_, i) => !shortFlags[i]);
    return latestEpisode ?? null;
  } catch {
    return null;
  }
}
