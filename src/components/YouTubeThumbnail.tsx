import { useState } from 'react';

/** Prefer YouTube's WebP thumbnail; unavailable/unsupported variants fall back to JPEG. */
export function YouTubeThumbnail({videoId,alt,className}:{videoId:string;alt:string;className?:string}) {
  const [fallback,setFallback]=useState(false);
  return <img src={`https://i.ytimg.com/${fallback?'vi':'vi_webp'}/${videoId}/hqdefault.${fallback?'jpg':'webp'}`}
    alt={alt} className={className} width="480" height="360" loading="lazy" decoding="async"
    onError={()=>{if(!fallback)setFallback(true);}}/>;
}
