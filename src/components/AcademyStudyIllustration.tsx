import React, { useId } from 'react';

/** Original code-native illustration for the light academy theme. */
export function AcademyStudyIllustration() {
  const titleId = useId();
  return <svg className="study-illustration" viewBox="0 0 640 570" width="640" height="570" role="img" aria-labelledby={titleId} xmlns="http://www.w3.org/2000/svg">
    <title id={titleId}>A student studies a price chart, risk notes and a notebook in a quiet, sunlit workspace.</title>
    <rect x="35" y="25" width="565" height="510" rx="110" fill="#e9eee1" />
    <circle cx="480" cy="120" r="55" fill="#eee0b7" />
    <g fill="none" stroke="#a8b8a1" strokeWidth="1.5"><path d="M76 88h145m-145 35h95M490 362h77m-77 22h60" /><path d="M62 290q30-20 58 0m367 188h65" /></g>
    <g stroke="#294c3e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <rect x="221" y="116" width="290" height="205" rx="14" fill="#fdfdf8" />
      <path d="M222 148h288" fill="none" stroke="#cbd4c1" />
      <circle cx="241" cy="133" r="3" fill="#b5c5ac" stroke="none" /><circle cx="255" cy="133" r="3" fill="#b5c5ac" stroke="none" />
      <path d="M244 179h245m-245 35h245m-245 35h245m-245 35h245" stroke="#e2e8da" strokeWidth="1" />
      <rect x="330" y="221" width="132" height="30" fill="#deeadf" stroke="none" />
      {[{ x:265,y:238,h:28,b:true },{ x:294,y:225,h:29,b:true },{ x:323,y:241,h:23,b:false },{ x:352,y:215,h:36,b:true },{ x:381,y:192,h:32,b:true },{ x:410,y:205,h:22,b:false },{ x:439,y:181,h:32,b:true },{ x:468,y:169,h:25,b:true }].map(c => <g key={c.x} stroke={c.b?'#39765a':'#b46c53'}><path d={`M${c.x} ${c.y-9}v${c.h+18}`} strokeWidth="2" /><rect x={c.x-5} y={c.y} width="10" height={c.h} fill={c.b?'#39765a':'#f0c4a9'} strokeWidth="1.5" /></g>)}
      <path d="M346 323v28m42-28v28m-60 0h78" fill="none" />
      <rect x="116" y="361" width="425" height="17" rx="5" fill="#d1b48e" />
      <path d="M148 379v125m359-125v125" fill="none" strokeWidth="7" />
      <path d="M105 275q-25 19-13 54l22 58h84v-97Z" fill="#c1d2bb" />
      <path d="M115 389h86m-79 0-12 118m82-118 16 118" fill="none" strokeWidth="5" />
      <path d="M157 270q28-5 48 18l28 60-48 15-36-50Z" fill="#f9f5e9" />
      <path d="M167 216q-22-13-39 5-15 20 3 46 12 14 31-1l10-22Z" fill="#e9c9aa" />
      <path d="M127 240q-17-6-12-23 6-25 35-22 24 2 27 24-20-6-29 9l-4 17" fill="#294c3e" />
      <path d="M164 293l37 49 53 9" fill="none" stroke="#e9c9aa" strokeWidth="16" />
      <path d="M180 382l51 31-8 75m-69-107 26 48-16 59" fill="none" stroke="#657e63" strokeWidth="21" />
      <path d="M158 494h28m30 0h30" strokeWidth="12" />
      <path d="M276 343l38-12 30 20-42 10Z" fill="#fdfdf8" /><path d="m311 335-9 20" stroke="#cbd4c1" strokeWidth="1.5" />
      <path d="M448 328h30v27h-30Zm30 4q19-2 16 10-2 8-16 5" fill="#fdfdf8" />
      <path d="M543 314l-11 43h-32l-10-43Z" fill="#c58c65" />
      <path d="M516 315v-73m0 32q-35-5-28-35 32 3 28 35Zm0-12q31-6 31-34-31-3-31 34Zm0-12q-26-19-12-44 24 17 12 44Z" fill="#8eac83" stroke="#557950" strokeWidth="2" />
    </g>
    <text x="343" y="97" fill="#52645b" fontFamily="sans-serif" fontSize="13" letterSpacing="2">OBSERVE · QUESTION · PRACTICE</text>
  </svg>;
}
