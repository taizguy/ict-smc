/** Original decorative drawings for LearnSMC's learning pathways. */
export function StudioSketch({ kind }: { kind: 'recognize' | 'decide' | 'evaluate' | 'read' | 'path' }) {
  return <svg className={`studio-sketch studio-sketch--${kind}`} viewBox="0 0 360 180" width="360" height="180" aria-hidden="true" focusable="false">
    <defs><pattern id={`sketch-grid-${kind}`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" opacity=".1"/></pattern></defs>
    <rect width="360" height="180" fill={`url(#sketch-grid-${kind})`}/>
    {kind === 'recognize' && <>
      <path className="sketch-grid-line" d="M32 140H328M32 90H328M32 40H328"/>
      <g className="sketch-candles"><path d="M65 62v64m42-53v62m42-30v47m42-77v75m42-103v66m42-89v61"/><path className="sketch-filled" d="M57 79h16v31H57zM99 90h16v27H99zM141 117h16v15h-16zM183 90h16v39h-16zM225 58h16v42h-16zM267 38h16v33h-16z"/></g>
      <path className="sketch-dashed" d="M32 119H310"/><circle className="sketch-ring" cx="149" cy="131" r="29"/><path d="m170 150 20 19M292 55q28-30 34-15m-10-8 10 8-13 3"/>
    </>}
    {kind === 'decide' && <>
      <rect className="sketch-paper" x="34" y="25" width="124" height="125" rx="14" transform="rotate(-5 96 87)"/>
      <path d="m61 63 8 8 15-20m-23 40 8 8 15-20m-23 41 8 8 15-20M98 61h36M98 92h30M98 122h35"/>
      <path className="sketch-dashed" d="M174 95h38m0 0q20-42 50-42m-50 42q22 42 50 42"/>
      <circle className="sketch-orb" cx="284" cy="48" r="23"/><circle className="sketch-orb-alt" cx="284" cy="137" r="23"/><path d="m273 50 8 8 14-18m-22 87 20 20m-20 0 20-20"/>
    </>}
    {kind === 'evaluate' && <>
      <path className="sketch-paper" d="M36 27h284v128H36z"/><path className="sketch-grid-line" d="M60 50H300M60 87H300M60 125H300"/>
      <path className="sketch-curve" d="m58 117 23-15 22 11 24-39 23 15 24-30 21 25 25-22 23 11 25-33 30 12"/>
      <path className="sketch-dashed" d="M214 32v117"/><circle className="sketch-orb" cx="58" cy="117" r="5"/><circle className="sketch-orb-alt" cx="298" cy="52" r="5"/>
      <path d="m225 163 23 4 15-9m-78 1 12 7"/>
    </>}
    {kind === 'read' && <>
      <path className="sketch-paper" d="M47 46q54-20 125 5v105q-69-25-125-5zM172 51q69-24 139-5v105q-66-19-139 5z"/>
      <path d="m65 70 83 2M65 87l63 2M65 104l75 2M196 72h89M196 89h65M196 106h80"/>
      <circle className="sketch-orb" cx="170" cy="32" r="16"/><path d="m171 49-2 34m0-14-24-9m24 9 26-8m-26 22-16 19m16-19 20 15"/>
      <path className="sketch-dashed" d="m96 20 9 10m157-14-10 12m-31-16 2 12"/>
    </>}
    {kind === 'path' && <>
      <path className="sketch-dashed" d="M35 131q40-90 95-23t88-26q23-64 102-29"/>
      <circle className="sketch-orb" cx="42" cy="117" r="21"/><circle className="sketch-orb-alt" cx="179" cy="113" r="21"/><circle className="sketch-orb" cx="300" cy="49" r="21"/>
      <path d="m33 118 8 8 12-18m118 5 8 8 12-18m100-53 8 8 12-18M80 46h48m-24-24v48m152 73 7 7 14-15"/>
    </>}
  </svg>;
}
