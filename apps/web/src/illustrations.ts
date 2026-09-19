import type { Art } from "./data/types";

// These are decorative subject symbols, not surveyed buildings or route maps.
const repeat = (n: number, draw: (i: number) => string) =>
  Array.from({ length: n }, (_, i) => draw(i)).join("");
const paper = "#eee5d6";
const accent = "#cab5c8";
const leaf = (x: number, y: number, flip = 1) =>
  `<path d="M${x} ${y}q${22 * flip}-25 ${29 * flip}-20q-2 22 ${-29 * flip} 20m0 0l${20 * flip}-14" fill="#d3d4bd"/>`;
const columns = repeat(8, (i) => {
  const x = 52 + i * 21;
  return `<path d="M${x} 71v52h9V71m-3 5v42m-8 7h13m-13-55h13m-12-5q5 7 11 0"/>`;
});
const art: Record<Art, string> = {
  church: `<path d="M47 143V61h48v82m-52-82 28-35 28 35M95 142V87l57-34 62 34v55Z" fill="${paper}"/><path d="M61 142v-26q10-15 20 0v26m-19-62V65h17v15M71 37V15m-8 8h16M119 142v-34q16-22 32 0v34m25-34V87h17v21M40 148h184M121 89h20m-10-10v20"/>`,
  house: `<path d="M48 83l80-55 83 55M61 75v70h136V75L128 39Z" fill="#f7f4ec"/><path d="M143 37V22h18v28M108 145v-43h37v43M78 91h19v24H78Zm82 0h20v24h-20ZM78 102h19m-10-11v24m73-13h20m-10-11v24M41 148h174M53 152h150"/><path d="M117 82h23V61h-23Zm12-21v21m-12-11h23M189 130q25-28 36 7m-17-13v25"/>`,
  temple: `<path d="M32 61l98-40 98 40ZM43 60l87-32 87 32M35 64h190v7H35ZM42 73h176v54H42Z" fill="${paper}"/>${columns}<path d="M34 128h192v6H34Zm-7 7h206v6H27Zm-7 7h220M103 56l27-21 27 21m-44-4l17-12 17 12"/>`,
  station: `<path d="M31 130V76q99-103 198 0v54Z" fill="${paper}"/><path d="M43 128V79q87-83 174 0v49M48 79h164m-81-62v61m-42-45 18 45m64-45-18 45M48 86h164"/>${repeat(5, (i) => `<path d="M${53 + i * 34} 127V91h24v36m-20-29h16"/>`)}<path d="M29 134h202M43 144l29-10m142 10-29-10M83 154l25-20m67 20-25-20"/><circle cx="130" cy="62" r="11" fill="${paper}"/><path d="M130 55v8l5 3"/>`,
  towers: `${(
    [
      [35, 48],
      [88, 30],
      [145, 48],
      [198, 30],
    ] as const
  )
    .map(
      ([x, y]) =>
        `<path d="M${x} 128V${y}l17-9 17 9V128l-17-9Z" fill="${paper}"/><path d="M${x + 17} ${y - 9}V128"/>${repeat(7, (i) => `<path d="M${x + 3} ${y + 7 + i * 9}l14-7 14 7" opacity=".45"/>`)}`,
    )
    .join("")}<path d="M27 138l104 15 106-15M113 128q14-31 29 0m-33 4h42"/>`,
  garden: `<path d="M128 145V34m0 67q-21-34-47-44m47 19q24-31 51-36m-51 87q30-18 42-33"/>${leaf(127, 74)}${leaf(128, 109, -1)}${leaf(168, 97)}${leaf(87, 61, -1)}<path d="M128 37c-24 1-25-24-8-22 4-18 24-12 21 3 20-5 23 17 8 22 4 18-17 23-21-3Z" fill="#ddb9bb"/><circle cx="133" cy="30" r="6"/><path d="M124 146l-13 9m17-9 1 11m3-12 15 9M79 142h26m49 0h32"/>`,
  market: `<path d="M47 136V77h168v59M36 77l19-39h149l23 39Z" fill="${paper}"/>${repeat(7, (i) => `<path d="M${40 + i * 26} 77v10q12 15 25 0V77l${-8 + i * 2}-39" fill="${i % 2 ? paper : "#dbc0bf"}"/>`)}<path d="M54 110h151v28H54Zm8 9h134m-125 1v12m27-12v12m28-12v12m28-12v12m27-12v12M37 142h189"/>${repeat(6, (i) => `<circle cx="${72 + i * 23}" cy="104" r="7" fill="#d3d4bd"/>`)}`,
  modern: `<path d="M34 128V70l54-30v88Zm54 0V40l49 19v69Zm49 0V21l49 16v91Zm49 0V37l40 37v54Z" fill="${paper}"/><path d="M45 81l32-17m-32 36 32-17m-32 36 32-17M98 62v57m13-51v51m14-46v46M148 42l27 9m-27 10 27 9m-27 10 27 9m-27 10 27 9M197 70l17 15m-17 4 17 15m-17 4 17 15M25 136h210m-199 7h189"/>`,
  plane: `<path d="M130 21c-7 0-10 12-10 25v23L43 105v12l77-19v28l-24 18v8l34-10 34 10v-8l-24-18V98l77 19v-12l-77-36V46c0-13-3-25-10-25Z" fill="${paper}"/><path d="M130 29v105m-8-84q8-6 16 0M71 94v12m117-12v12M46 134h29m109 0h29"/>`,
  loom: `<path d="M54 144V21h12v123m131 0V21h12v123M44 32h175v12H44Zm0 88h175v12H44Z" fill="${paper}"/>${repeat(22, (i) => `<path d="M${72 + i * 5.5} 44v76" opacity=".5"/>`)}<path d="M72 86h119v34H72Z" fill="#ddc0c0"/>${repeat(6, (i) => `<path d="M${81 + i * 19} 115V93m0 9-6-6m6 13 6-6"/>`)}<path d="M49 145h27m112 0h27M61 133l-20 15m162-15 18 15M84 62v16m-3-8h6v12h-6Zm37-15v14m-3-6h6v13h-6Zm41-14v14m-3-6h6v13h-6Z"/><path d="M101 144l54-8 3 7-54 8ZM101 144l-8 6 10 1" fill="${paper}"/>`,
  // A blank medallion and writing tools stand for biography: no invented likeness.
  portrait: `<ellipse cx="114" cy="74" rx="49" ry="57" fill="${paper}"/><ellipse cx="114" cy="74" rx="41" ry="49"/><path d="M92 140h45m-35-13v13m26-13v13M167 125q-8-51 35-96c9 32-1 64-35 96Zm0 0 35-96m-27 68 15-2m-9-18 17-3m-10-16 15-3M160 139l6-17M51 150h163m-67-12h33l5 12h-43Z" fill="${accent}"/>`,
  gate: `<path d="M42 140V24h37v116m102 0V24h37v116M38 21h45v9H38Zm139 0h45v9h-45ZM79 58q51-44 102 0M79 75q51-44 102 0M79 140V76m102 64V76" fill="${paper}"/>${repeat(7, (i) => `<path d="M${91 + i * 13} 139V${62 - Math.sin((i / 6) * Math.PI) * 14}m-3 8 3-6 3 6"/>`)}<path d="M80 112h101m-51-62v90M34 145h193M49 40h23m116 0h23M49 125h23m116 0h23"/>`,
  river: `<path d="M36 57q62 20 107-4t83 2M36 118q38-9 77 8t114-4"/><path d="M25 82h210v10H25Zm8 10v26h16q8-31 38 0h20q13-33 42 0h20q10-29 39 0h18V92" fill="${paper}"/>${repeat(9, (i) => `<path d="M${33 + i * 24} 81V68"/>`)}<path d="M26 68h210M39 139q29-8 58 0m20-1q24 8 48 0m17 5 44-1M65 48l17-11 18 11m-18-11v20M111 26q15 20 34 6"/>`,
  square: `<path d="M29 125l99-51 107 51-106 31Z" fill="${paper}"/><path d="M60 126l69-34 72 34-72 20ZM29 125l100 21 106-21M129 146v10"/><path d="M109 117V96h40v21m-35-21V87h30v9m-14-9V29m-4 56V29h8v56m-12-57 8-10 8 10Z" fill="${accent}"/><path d="M40 94v19m-6-19h12M212 94v19m-6-19h12M55 134l-12 7m157-7 13 7"/>`,
  piano: `<path d="M49 105V64c0-18 32-17 52-27 41-24 87-14 102 10 16 25-14 39-14 58Z" fill="${paper}"/><path d="M49 66c43 8 60-36 108-26 23 4 35 15 35 28M50 104h140v18H50ZM55 123v24m127-24v24m-14-42V88"/>${repeat(14, (i) => `<path d="M${59 + i * 9} 105v17"/>`)}${[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map((i) => `<path d="M${64 + i * 9} 105v10h4v-10" fill="currentColor"/>`).join("")}<path d="M51 97h138M78 144h67m-29-19v17m15-17v17M35 151h174"/>`,
  hospital: `<path d="M93 25h35v26h27v35h-27v27H93V86H66V51h27Z" fill="${paper}"/><path d="M46 133c30-37 46-25 65-11l30-1q18 1 17 10M46 133l20 17c29-6 64 6 90-7l59-32q13-11 4-16c-6-5-15 0-27 7l-42 20M34 128l20-15 25 34-20 14M97 68h27m-13-14v28"/>`,
};

const escapeAttribute = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
const svgAttributes =
  'viewBox="0 0 260 165" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" focusable="false"';

export function illustration(kind: Art, cls = ""): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="illustration ${escapeAttribute(cls)}" ${svgAttributes}>${art[kind]}</svg>`;
}

export function ornament(
  kind: Art,
  x: number,
  y: number,
  width: number,
): string {
  return `<svg class="map-illustration" x="${x}" y="${y}" width="${width}" height="${(width * 165) / 260}" ${svgAttributes}>${art[kind]}</svg>`;
}
