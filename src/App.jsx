import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'

// Simple inline icons (no external assets)
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
/* Insights nav item chevron (20×20, white stroke) */
const IconInsightsChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M5 7.5L7.73726 10.2373C8.52929 11.0293 8.92531 11.4253 9.38197 11.5737C9.78365 11.7042 10.2163 11.7042 10.618 11.5737C11.0747 11.4253 11.4707 11.0293 12.2627 10.2373L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
/* Search icon – inside search box (Figma 116:1577): dark grey outline magnifying glass */
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden>
    <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
/* Notification icon – Figma 115:945: bell outline + 8px red dot top-right */
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden>
    <path d="M10 3.5a3.5 3.5 0 00-3.5 3.5v2.2c0 .35-.12.7-.32.95L4.5 13v1.2c0 .4.3.8.8.8h9.4c.5 0 .8-.4.8-.8V13l-1.68-2.85a2.5 2.5 0 01-.32-.95V7a3.5 3.5 0 00-3.5-3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 15.2a2 2 0 004 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M9.5 14.2v.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
)
const NotificationButton = () => (
  <button type="button" className="relative rounded-[10px] w-9 h-9 flex items-center justify-center hover:bg-gray-100 shrink-0" aria-label="Notifications">
    <span className="absolute left-2 top-2 text-[#4a5565]">
      <IconBell />
    </span>
    <span className="absolute left-6 top-1 w-2 h-2 rounded-full bg-[#fb2c36]" aria-hidden />
  </button>
)
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 8h16M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconWarning = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
    <path d="M6 1l5 9H1L6 1z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    <path d="M6 4v3M6 8v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
)
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6 4v2l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
)
const IconTrendUp = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M3 14l5-5 4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconLocation = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10 2C6.7 2 4 4.7 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const IconTag = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M2 6l6-4 10 10-6 6-10-10v-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
  </svg>
)
const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
  </svg>
)
const IconPound = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M7 20h10M7 4h2c2.2 0 4 1.8 4 4s-1.8 4-4 4H7M13 4h2c2.2 0 4 1.8 4 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M3 17l5-5 4 4 6-8 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10 2l2.2 4.5 4.9.7-3.5 3.4.8 4.9L10 13.5l-4.4 2.1.8-4.9-3.5-3.4 4.9-.7L10 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)
const IconInfo = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="6.5" r="1.25" fill="currentColor" />
    <path d="M10 9v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10 4c-4 0-7 3-9 6 2 3 5 6 9 6s7-3 9-6c-2-3-5-6-9-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)
const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <rect x="3.5" y="8" width="13" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6 8V5a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const IconSparkle = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10 2l1.2 3.6 3.8.2-2.8 2.4 1 3.6L10 10.4l-2.2 2.4 1-3.6L6 5.8l3.8-.2L10 2z" fill="currentColor" />
  </svg>
)
const IconAI = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10 2v3M10 15v3M2 10h3M15 10h3M5.05 5.05l2.1 2.1M12.85 12.85l2.1 2.1M5.05 14.95l2.1-2.1M12.85 7.15l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const IconSave = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M4 2h9l3 3v12H4V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M4 2v16h12V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10h6M7 13h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const IconShare = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M15 10v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5M10 12V3M10 3l3 3M10 3L7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconBulb = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10 3c-2.2 0-4 1.8-4 4 0 1.2.5 2.2 1.3 2.9l.7.6v.5h4V10.5l.7-.6c.8-.7 1.3-1.7 1.3-2.9 0-2.2-1.8-4-4-4zM7 13v1.5c0 .3.2.5.5.5h5c.3 0 .5-.2.5-.5V13H7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
  </svg>
)
const IconDocument = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M4 2h8l4 4v12H4V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10h8M6 13h8M6 16h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const TRIPS_GRAPH_NODES = [
  { x: 85, y: 55 }, { x: 118, y: 48 }, { x: 145, y: 62 }, { x: 95, y: 92 }, { x: 125, y: 95 }, { x: 155, y: 88 },
  { x: 175, y: 55 }, { x: 205, y: 70 }, { x: 75, y: 125 }, { x: 105, y: 130 }, { x: 135, y: 122 },
  { x: 505, y: 50 }, { x: 535, y: 58 }, { x: 565, y: 48 }, { x: 515, y: 88 }, { x: 545, y: 92 }, { x: 575, y: 85 },
  { x: 525, y: 125 }, { x: 555, y: 118 }, { x: 518, y: 155 }, { x: 548, y: 162 }, { x: 578, y: 150 },
  { x: 515, y: 200 }, { x: 542, y: 195 }, { x: 572, y: 208 }, { x: 530, y: 235 }, { x: 560, y: 242 },
  { x: 510, y: 275 }, { x: 538, y: 268 }, { x: 568, y: 280 }, { x: 520, y: 305 }, { x: 550, y: 298 },
  { x: 95, y: 255 }, { x: 125, y: 262 }, { x: 155, y: 248 }, { x: 85, y: 288 }, { x: 118, y: 295 }, { x: 145, y: 282 },
  { x: 295, y: 280 }, { x: 325, y: 272 }, { x: 355, y: 285 }, { x: 310, y: 305 }, { x: 340, y: 298 }, { x: 370, y: 312 },
  { x: 525, y: 115 }, { x: 555, y: 125 }, { x: 530, y: 195 }, { x: 560, y: 200 },
  { x: 320, y: 180 },
]
const TRIPS_GRAPH_NODE_COLORS = [
  ...Array(11).fill('#7dd3fc'),
  ...Array(9).fill('#2dd4bf'),
  ...Array(7).fill('#c084fc'),
  ...Array(5).fill('#c084fc'),
  ...Array(6).fill('#84cc16'),
  ...Array(6).fill('#1e3a8a'),
  ...Array(4).fill('#84cc16'),
  '#84cc16',
]
const TRIPS_GRAPH_PINK_INDICES = [2, 5, 14, 22, 35, 39]

function TripsNetworkGraph() {
  const w = 640
  const h = 360
  const centerNode = TRIPS_GRAPH_NODES[TRIPS_GRAPH_NODES.length - 1]
  return (
    <div className="relative rounded-xl overflow-hidden bg-[#0a0a0a]" style={{ minHeight: 360 }}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet" style={{ height: 360 }}>
        {[[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [8, 9], [11, 12], [12, 13], [16, 17], [19, 20], [21, 22], [24, 25], [27, 28], [30, 31], [32, 33], [36, 37], [38, 39]].map(([a, b]) => (
          <line key={`e-${a}-${b}`} x1={TRIPS_GRAPH_NODES[a].x} y1={TRIPS_GRAPH_NODES[a].y} x2={TRIPS_GRAPH_NODES[b].x} y2={TRIPS_GRAPH_NODES[b].y} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        ))}
        {TRIPS_GRAPH_NODES.slice(0, -1).map((n, i) =>
          TRIPS_GRAPH_PINK_INDICES.includes(i) ? null : (
            <line key={`g-${i}`} x1={n.x} y1={n.y} x2={centerNode.x} y2={centerNode.y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          )
        )}
        {TRIPS_GRAPH_PINK_INDICES.map((i) => (
          <line key={`p-${i}`} x1={TRIPS_GRAPH_NODES[i].x} y1={TRIPS_GRAPH_NODES[i].y} x2={centerNode.x} y2={centerNode.y} stroke="#ec4899" strokeWidth="2.5" />
        ))}
        {TRIPS_GRAPH_NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i === TRIPS_GRAPH_NODES.length - 1 ? 8 : 3} fill={TRIPS_GRAPH_NODE_COLORS[i]} />
        ))}
      </svg>
      <div className="absolute left-3 top-3 bg-white rounded-lg shadow-sm px-3 py-2 min-w-[140px]">
        <p className="text-sm font-medium text-[#0a0a0a] mb-2">Countries</p>
        <ul className="space-y-1 text-sm text-[#0a0a0a]">
          {TRIPS_COUNTRIES.map((c) => (
            <li key={c.name} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.filled ? '' : 'border border-current'}`} style={{ backgroundColor: c.filled ? c.color : 'transparent', borderColor: c.color }} />
              {c.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1f2937] rounded-lg px-4 py-3 text-white text-sm">
        <p>From: 444 DE BIJENKORF AMSTERDAM FEMME</p>
        <p>To: 565 DE BIJENKORF MAASTRICHT</p>
        <p>Value transferred: 63.35K</p>
      </div>
      <div className="absolute bottom-3 left-3 flex gap-2">
        {['M15 19l-7-7 7-7', 'M5 15l7-7 7 7', 'M19 9l-7 7-7-7'].map((d, i) => (
          <button key={i} type="button" className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center hover:bg-[#16a34a]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
          </button>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button type="button" className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center hover:bg-[#16a34a]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
        </button>
        <button type="button" className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center hover:bg-[#16a34a]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
        </button>
      </div>
    </div>
  )
}

const IconEllipsisVertical = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <circle cx="10" cy="4" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="10" cy="16" r="1.5" fill="currentColor" />
  </svg>
)

// Sidebar icons – Autone Design System 2.0 (12299:63282), inactive #22272f
const IconGrid = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const IconReplenishment = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M1.75 6.33301V11.4997C1.75 11.9642 1.75 12.1964 1.77886 12.391C1.95121 13.5529 2.8635 14.4652 4.02539 14.6375C4.21996 14.6664 4.4522 14.6664 4.91667 14.6664L6.21121 14.6663M0.75 7.33301L5.06634 3.01667C6.12239 1.96062 6.65041 1.4326 7.25929 1.23476C7.79487 1.06074 8.3718 1.06074 8.90738 1.23476C9.51625 1.4326 10.0443 1.96062 11.1003 3.01667L15.4167 7.33301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.7628 7.76938L11.7518 7.16279L11.7518 7.16279C11.2657 6.87108 11.0226 6.72523 10.7631 6.66824C10.5335 6.61783 10.2958 6.61783 10.0662 6.66824C9.80673 6.72523 9.56364 6.87108 9.07746 7.16279L8.06647 7.76938C7.60633 8.04547 7.37626 8.18351 7.20915 8.37356C7.06126 8.54175 6.94975 8.7387 6.88162 8.95204C6.80463 9.19313 6.80463 9.46143 6.80463 9.99804V10.7332C6.80463 11.2032 6.80463 11.4382 6.86387 11.6515C6.93501 11.9077 7.06795 12.1425 7.25102 12.3353C7.40345 12.4958 7.60496 12.6167 8.00797 12.8585L9.03561 13.4751C9.53618 13.7754 9.78646 13.9256 10.0531 13.9819C10.289 14.0316 10.5329 14.0283 10.7673 13.9721C11.0323 13.9086 11.2784 13.7516 11.7705 13.4377L13.1372 12.5659C13.4613 12.3591 13.6234 12.2558 13.7409 12.1169C13.8449 11.9939 13.923 11.8513 13.9708 11.6976C14.0247 11.5238 14.0247 11.3316 14.0247 10.9472V9.99804C14.0247 9.46143 14.0247 9.19313 13.9477 8.95204C13.8796 8.7387 13.768 8.54175 13.6202 8.37356C13.453 8.18351 13.223 8.04546 12.7628 7.76938Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.78998 9.42942L10.8582 8.16553" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.4146 10.512L13.6636 8.52649M10.4146 10.512L7.16559 8.52649M10.4146 10.512V14.122" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
/* Icon=new reorder – segment control (Figma 202:3165) – box with circular arrow */
/* Icon=reorder – Figma 2:1218 */
const IconReorder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" className="shrink-0" data-name="Icon=reorder" data-node-id="2:1218" aria-hidden>
    <path d="M14.0834 6.66687C14.0834 6.37443 14.0834 6.22821 14.0709 6.09155C13.9923 5.2347 13.5496 4.45283 12.8553 3.94462C12.7446 3.86357 12.6192 3.78834 12.3684 3.63788L9.88631 2.14862C8.98841 1.60988 8.53946 1.34051 8.06019 1.23526C7.63627 1.14217 7.19719 1.14217 6.77326 1.23526C6.294 1.34051 5.84505 1.60988 4.94715 2.14862L3.08048 3.26862C2.23068 3.7785 1.80578 4.03344 1.49715 4.38444C1.22402 4.69505 1.01808 5.05879 0.89225 5.4528C0.750061 5.89804 0.750061 6.39356 0.750061 7.38458V8.61582C0.750061 9.60685 0.750061 10.1024 0.89225 10.5476C1.01808 10.9416 1.22402 11.3054 1.49715 11.616C1.80578 11.967 2.23068 12.2219 3.08048 12.7318L5.1945 14.0002L6.18194 14.5927C6.63089 14.862 6.85536 14.9967 7.09499 15.0493C7.30696 15.0959 7.5265 15.0959 7.73846 15.0493C7.97809 14.9967 8.20257 14.862 8.65152 14.5927L9.36117 14.1669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.41681 6.33358L8.23503 4.00024" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.41681 8.33354L13.4168 4.66687M7.41681 8.33354L1.41681 4.66687M7.41681 8.33354V15.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.4151 10.1948V9.22255M10.4151 10.1948C10.4151 10.1948 11.341 8.66699 13.1929 8.66699C13.7002 8.66699 14.1741 8.80137 14.5818 9.03628M10.4151 10.1948H11.3873M15.0262 12.0281C15.0262 12.0281 14.0603 13.5559 12.5262 13.5559C12.0203 13.5559 11.5459 13.4206 11.1373 13.1843M15.0262 12.0281H14.054M15.0262 12.0281V13.0003" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconRebalancing = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <rect x="1.33337" y="1.33337" width="13.3333" height="13.3333" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 8C4 10.2091 5.79086 12 8 12C10.2091 12 11.6667 10 11.6667 10M12 8C12 5.79086 10.2222 4 8 4C5.33333 4 4.33333 6 4.33333 6M4.33333 6V4.33333M4.33333 6H6M11.6667 10H10M11.6667 10V11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconBuy = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6h18M16 10a4 4 0 11-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
/* Icon=bars – Insights nav (Figma 13111:40 / 14404:7252) – three vertical bars, increasing height L→R */
const IconBars = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0" data-name="Icon=bars" data-node-id="I14404:7252;12203:35386" aria-hidden>
    <path d="M6 18v-5M12 18v-9M18 18v-13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
/* Icon=new reorder – Optimiser nav (Figma 12205:40449 / 14404:7825) */
const IconOptimiser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden data-name="Icon=new reorder" data-node-id="12205:40449">
    <path d="M17.5006 8.3335C17.5006 7.55493 17.5006 7.16564 17.4124 6.80999C17.2806 6.27849 17.0058 5.7932 16.6179 5.40672C16.3583 5.14811 16.0245 4.94783 15.3569 4.54726L11.6368 2.31524C10.7389 1.7765 10.29 1.50713 9.81072 1.40189C9.38679 1.30879 8.94772 1.30879 8.52379 1.40189C8.04453 1.50713 7.59558 1.7765 6.69768 2.31524L3.16434 4.43524C2.31455 4.94512 1.88965 5.20006 1.58101 5.55106C1.30788 5.86168 1.10194 6.22541 0.976112 6.61943C0.833923 7.06467 0.833923 7.56018 0.833923 8.55121V11.4491C0.833923 12.4401 0.833923 12.9357 0.976112 13.3809C1.10194 13.7749 1.30788 14.1386 1.58101 14.4493C1.88965 14.8003 2.31455 15.0552 3.16434 15.5651L6.38948 17.5002L7.93247 18.426C8.38142 18.6953 8.60589 18.83 8.84552 18.8826C9.05749 18.9292 9.27703 18.9292 9.48899 18.8826C9.72862 18.83 9.9531 18.6953 10.402 18.426L11.5978 17.7085" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.41736 7.91667L10.1901 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.16736 10.4168L16.6674 5.8335M9.16736 10.4168L1.66736 5.8335M9.16736 10.4168V18.7502" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.9152 12.7432V11.5279M12.9152 12.7432C12.9152 12.7432 14.0726 10.8335 16.3874 10.8335C17.0215 10.8335 17.6139 11.0015 18.1236 11.2951M12.9152 12.7432H14.1305M18.6791 15.0349C18.6791 15.0349 17.4718 16.9446 15.5541 16.9446C14.9217 16.9446 14.3287 16.7755 13.818 16.4801M18.6791 15.0349H17.4638M18.6791 15.0349V16.2502" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconGridDots = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => (
      <circle key={`${r}-${c}`} cx={5 + c * 7} cy={5 + r * 7} r="2" fill="currentColor" />
    )))}
  </svg>
)
/* Icon=calendar-dates – Figma 202:3228 Event Date button (2:261) */
const IconCalendarSidebar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18" fill="none" className="shrink-0" data-name="Icon=calendar-dates" data-node-id="2:261" aria-hidden>
    <defs>
      <clipPath id="clip0_IconCalendarSidebar">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip0_IconCalendarSidebar)">
      <rect x="1.5" y="1.5" width="15" height="15" rx="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 0.75L6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 0.75L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.75 6H5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="9.75" r="0.75" fill="currentColor" />
      <circle cx="6" cy="12.75" r="0.75" fill="currentColor" />
      <circle cx="9" cy="12.75" r="0.75" fill="currentColor" />
      <circle cx="12" cy="12.75" r="0.75" fill="currentColor" />
      <circle cx="9" cy="9.75" r="0.75" fill="currentColor" />
      <circle cx="12" cy="9.75" r="0.75" fill="currentColor" />
    </g>
  </svg>
)
/* Icon=list – list view (Figma 2:571) */
const IconList = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <defs>
      <clipPath id="clip0_IconList">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip0_IconList)">
      <path d="M7.33337 13.3334L14.6667 13.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.33337 8L14.6667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.33337 2.66663L14.6667 2.66662" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="2.66671" cy="2.66671" r="1.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.00004 7.99996C4.00004 8.73634 3.40309 9.33329 2.66671 9.33329C1.93033 9.33329 1.33337 8.73634 1.33337 7.99996C1.33337 7.26358 1.93033 6.66663 2.66671 6.66663C3.40309 6.66663 4.00004 7.26358 4.00004 7.99996Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="2.66671" cy="13.3333" r="1.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)
/* Icon=calendar-note – week view (Figma 2:452) */
/* Icon=calendar-note – week view (Figma 2:452 / 203:1343 segment) */
const IconCalendarNote = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <defs>
      <clipPath id="clip0_IconCalendarNote">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip0_IconCalendarNote)">
      <rect x="1.33337" y="1.33337" width="13.3333" height="13.3333" rx="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.33337 0.666626L5.33337 2.66663" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.6666 0.666626L10.6666 2.66663" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.3333 5.33337H4.66663" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)
const IconGears = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const IconTeam = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M12.5 8.33268C14.3409 8.33268 15.8333 6.8403 15.8333 4.99935C15.8333 3.1584 14.3409 1.66602 12.5 1.66602" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6.66665" cy="4.99935" r="3.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M0.833313 14.9993C0.833313 13.1584 2.3257 11.666 4.16665 11.666H9.16664C11.0076 11.666 12.5 13.1584 12.5 14.9993V14.9993C12.5 16.8403 11.0076 18.3327 9.16665 18.3327H4.16665C2.3257 18.3327 0.833313 16.8403 0.833313 14.9993V14.9993Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.1667 18.3327H16.5C17.9728 18.3327 19.1667 17.1388 19.1667 15.666C19.1667 13.4569 17.3758 11.666 15.1667 11.666H14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconClockSidebar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 block">
    <path d="M10 0.917969C15.0163 0.918145 19.0838 4.98465 19.084 10.001C19.0838 15.0173 15.0163 19.0848 10 19.085C8.97617 19.0849 8.07457 18.9377 7.22754 18.6348C6.86937 18.5066 6.60549 18.4121 6.41406 18.3457C6.31862 18.3126 6.24418 18.2884 6.18848 18.2705C6.16125 18.2618 6.13997 18.2547 6.12402 18.25C6.11634 18.2478 6.10973 18.2462 6.10547 18.2451C6.10257 18.2443 6.10036 18.2435 6.09961 18.2432C5.69406 18.1479 5.42764 18.2253 5.08789 18.3867C4.76636 18.5396 4.1972 18.8901 3.51465 19.0039C2.49746 19.1732 1.59253 18.3402 1.67676 17.3125C1.70767 16.9368 1.84949 16.6047 1.95508 16.3711C2.07883 16.0973 2.15469 15.9502 2.2002 15.792C2.38122 15.1617 2.16846 14.7093 1.75391 13.8145C1.21645 12.6542 0.91704 11.3612 0.916992 10.001C0.917168 4.98465 4.98367 0.918144 10 0.917969ZM6.66699 9.16797C6.20675 9.16797 5.83301 9.54074 5.83301 10.001C5.83301 10.4612 6.20675 10.834 6.66699 10.834C7.12708 10.8338 7.5 10.4611 7.5 10.001C7.5 9.54085 7.12708 9.16814 6.66699 9.16797ZM10 9.16797C9.53976 9.16797 9.16699 9.54074 9.16699 10.001C9.16699 10.4612 9.53976 10.834 10 10.834C10.4602 10.834 10.833 10.4612 10.833 10.001C10.833 9.54074 10.4602 9.16797 10 9.16797ZM13.333 9.16797C12.8729 9.16814 12.5 9.54085 12.5 10.001C12.5 10.4611 12.8729 10.8338 13.333 10.834C13.7932 10.834 14.167 10.4612 14.167 10.001C14.167 9.54074 13.7932 9.16797 13.333 9.16797Z" fill="currentColor" />
  </svg>
)
const IconDollar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M13.3334 2.35942C12.3126 1.91343 11.1852 1.66602 10 1.66602C5.39765 1.66602 1.66669 5.39698 1.66669 9.99935C1.66669 14.6017 5.39765 18.3327 10 18.3327C14.6024 18.3327 18.3334 14.6017 18.3334 9.99935C18.3334 8.12297 17.7132 6.39144 16.6667 4.99854M7.49992 11.666C7.49992 12.5865 8.24611 13.3327 9.16659 13.3327H11.0471C11.8495 13.3327 12.4999 12.6822 12.4999 11.8798C12.4999 11.2545 12.0998 10.6993 11.5065 10.5015L8.49333 9.49715C7.90008 9.2994 7.49992 8.74421 7.49992 8.11886C7.49992 7.31648 8.15038 6.66602 8.95276 6.66602H10.8333C11.7537 6.66602 12.4999 7.41221 12.4999 8.33268M9.99992 5.41602V14.5827" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="9.99935" r="8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconFlagUK = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none" className="shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.95029 -1.25H0V1.25L16.3725 13.75L18.3333 13.75V11.25L1.95029 -1.25Z" fill="white" />
    <path d="M0.650483 -1.25L18.3333 12.2854V13.75L17.6981 13.75L0 0.200559V-1.25H0.650483Z" fill="#F93939" />
    <path fillRule="evenodd" clipRule="evenodd" d="M16.5873 -1.25H18.3333V1.25C18.3333 1.25 6.99269 9.57806 1.74603 13.75H0V11.25L16.5873 -1.25Z" fill="white" />
    <path d="M18.3333 -1.25H17.7412L0 12.2971V13.75H0.650483L18.3333 0.211513V-1.25Z" fill="#F93939" />
    <path fillRule="evenodd" clipRule="evenodd" d="M6.66729 -1.25H11.6813V3.37682H18.3333V9.12013H11.6813V13.75H6.66729V9.12013H0V3.37682H6.66729V-1.25Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.7193 -1.25H10.614V4.51923H18.3333V7.98077H10.614V13.75H7.7193V7.98077H0V4.51923H7.7193V-1.25Z" fill="#F93939" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconCollapse = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden>
    <path d="M12 5l-5 5 5 5M7 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* Logo from Figma 145-914: 24px icon + wordmark, gap 6px. Assets use dark fill; invert for white on sidebar. */
function AutoneLogo({ className = '' }) {
  return (
    <div className={`flex items-center gap-[6px] h-6 [&_img]:invert ${className}`} data-name="autone-logo">
      <img src="/logo-icon.svg" alt="" className="w-6 h-6 shrink-0 block" aria-hidden />
      <img src="/logo-wordmark.svg" alt="autone" className="h-[24px] w-[112px] shrink-0 block" />
    </div>
  )
}

/* Top bar – Autone Design System 12301:65728 */
const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconExternalLink = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M6 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V6M11 2h3v3M7 9l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconUpload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M8 11V2M8 2l3 3M8 2L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

function TopBar({ title = 'Team', subtitle = 'Manage permissions and invites throughout your team', primaryButtonLabel = '', primaryButtonHref = '#', onPrimaryClick }) {
  return (
    <header className="bg-[#12171e] flex items-center justify-between p-6 shrink-0" data-name="Top bar" data-node-id="12301:65733">
      <div className="flex flex-1 flex-col gap-1 min-w-[520px]">
        <h1 className="font-sans text-2xl font-medium text-white leading-tight">{title}</h1>
        {subtitle && (
          <p className="font-sans text-sm font-normal text-[#878d94] leading-tight whitespace-nowrap">{subtitle}</p>
        )}
      </div>
      <div className="flex flex-1 gap-1.5 items-center justify-end min-w-0 shrink-0">
        {primaryButtonLabel && (
          onPrimaryClick
            ? (
                <button type="button" onClick={onPrimaryClick} className="bg-[#0267ff] flex items-center justify-center h-12 px-4 rounded-[4px] text-base font-medium text-white hover:bg-[#0252cc] shrink-0">
                  {primaryButtonLabel}
                </button>
              )
            : (
                <a href={primaryButtonHref} className="bg-[#0267ff] flex items-center justify-center h-12 px-4 rounded-[4px] text-base font-medium text-white hover:bg-[#0252cc] shrink-0">
                  {primaryButtonLabel}
                </a>
              )
        )}
      </div>
    </header>
  )
}

const WEEK_DAYS = [
  { day: 'Mon', date: 23, today: true, events: [] },
  { day: 'Tue', date: 24, today: false, events: [{ route: 'London → Manchester', units: '450 units', time: '10:00 AM', category: 'Athletic wear', priority: 'critical' }] },
  { day: 'Wed', date: 25, today: false, events: [
    { route: 'Birmingham → Edinburgh', units: '320 units', time: '2:00 PM', category: 'Accessories', priority: 'high' },
    { route: 'Leeds → London', units: '280 units', time: '4:30 PM', category: 'Spring collection', priority: 'critical' },
  ]},
  { day: 'Thu', date: 26, today: false, events: [{ route: 'Manchester → Birmingham', units: '195 units', time: '11:00 AM', category: 'Footwear', priority: 'medium' }] },
  { day: 'Fri', date: 27, today: false, events: [{ route: 'Edinburgh → Leeds', units: '380 units', time: '9:00 AM', category: 'Winter stock', priority: 'critical' }] },
  { day: 'Sat', date: 28, today: false, events: [{ route: 'London → Birmingham', units: '520 units', time: '1:00 PM', category: 'Outerwear', priority: 'high' }] },
  { day: 'Sun', date: 1, today: false, events: [] },
]

const ALERTS = [
  { type: 'critical', title: 'Data age - critical warning', badge: '41 hours', body: 'Your data has not been updated for 41 hours. Older data can cause multiple issues across the platform.' },
  { type: 'high', title: 'Recommendation - winter jackets', badge: '12% remaining', body: 'SKU #WJ-2024 is at 12% stock level in Northeast region' },
  { type: 'high', title: 'Recommendation - London flagship', badge: '-18% WoW', body: 'Week-over-week sales down 18% compared to last month' },
  { type: 'high', title: 'High return rate - summer dresses', badge: '24% returns', body: 'Return rate of 24% detected for SKU #SD-1245' },
]

const RECOMMENDATIONS = [
  { title: 'Increase order - athletic wear', body: 'Based on the forecast, increase next order by 35%', impact: '+£45K potential revenue' },
  { title: 'Redistribute inventory - accessories', body: 'Move 450 units from Manchester to Birmingham for better turnover', impact: '+22% faster sell-through' },
  { title: 'Markdown opportunity - spring collection', body: 'Apply 20% discount to clear slow-moving spring items before season end', impact: '£28K inventory clearance' },
]

const VALUE_CARDS = [
  { value: '127', unit: 'incidents', title: 'Stockouts avoided', body: 'Prevented out-of-stock situations this month', icon: IconShield, bg: 'bg-blue-50', iconBg: 'bg-blue-100' },
  { value: '£248K', unit: 'saved', title: 'Cost savings', body: 'Avoided stockouts and overstock situations', icon: IconPound, bg: 'bg-green-50', iconBg: 'bg-green-100' },
  { value: '43%', unit: 'increase', title: 'Margin improvements', body: 'Enhanced profitability through optimized pricing', icon: IconChart, bg: 'bg-purple-50', iconBg: 'bg-purple-100' },
]

function EventCard({ route, units, time, category, priority }) {
  const styles = {
    critical: 'bg-red-50 border-l-4 border-red-500 text-red-900',
    high: 'bg-amber-50 border-l-4 border-amber-500 text-amber-900',
    medium: 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900',
  }
  return (
    <div className={`rounded-lg p-2 text-xs ${styles[priority] || styles.medium}`}>
      <div className="font-medium">{route}</div>
      <div className="opacity-90">{units}</div>
      <div className="flex items-center gap-1 opacity-75">
        <IconClock />
        <span>{time}</span>
      </div>
      <div className="opacity-75">{category}</div>
    </div>
  )
}

/* Insights page – Analytics dashboard */
const INSIGHTS_TABS = ['Retail', 'Buying', 'Data health', 'Best sellers', 'Business KPIs', 'Assortment KPIs', 'Data exploration']
const INSIGHTS_FILTER_CHIPS = [
  'Customer new demo', 'Date (Select)', 'Season (Select)', 'Department (Select)', 'Sub department (Select)',
  'Gender (Select)', 'Collection type (Select)', 'Brand (Select)', 'Color (Select)', 'Product ID (Select)',
  'Product labels (Select)', 'Top N products (Select)', 'Region (Select)', 'Country (Select)',
  'Location type (Select)', 'Location (Select)',
]
const INSIGHTS_ACTIVE_CHIPS = [
  'Metric Volume', 'Retail attribute Department', 'Variance Last year', 'View period Weekly', 'Location attributes Location Type', 'Product attributes Department',
]
const BUYING_FILTER_CHIPS_ROW1 = [
  'Customer new demo',
  'Min date Last 4 Months (01/10/2025 < 01/02/2026)',
  'Department (Select)',
  'Sub department (Select)',
  'Gender (Select)',
  'Brand (Select)',
  'Style (Select)',
  'Event (Select)',
  'Season (Select)',
  'Product ID (Select)',
]
const BUYING_FILTER_CHIPS_ROW2 = [
  'Region (Select)',
  'Country (Select)',
  'Location (Select)',
  'Location type (Select)',
  'Location attributes Region',
  'Product attributes Department',
]
const BUYING_REPORT_COLUMNS = ['Location attribute', 'Product attribute', 'Products', 'Locations', 'Sales units', 'Sales value', 'Available qty EOP', 'Available value EOP', 'Sell Through', 'Assorted products', 'Mix sales', 'Mix assortment', 'Avg Price (Sell out)']
const DATA_HEALTH_TABS = ['File validations', 'Ingested data validations', 'Dimension attributes', 'Distribution flow', 'Inventory reliability']
const DATA_HEALTH_FILTERS = ['Customer new demo', 'File dimensional / transaction (Select)', 'File data type (Select)', 'File received at (Select)']
const DATA_HEALTH_KPI_CARDS = [
  { title: 'File processed - completed', desc: '% of files that were successfully processed out of total files...', date: '24/02/2026', value: '100.00%', comparison: 'vs 17/02/2026 (0)', chartColor: '#16a34a' },
  { title: 'Failed validations', desc: '% of file validation runs that failed checks', date: '24/02/2026', value: '50.00%', comparison: 'vs 17/02/2026 (0)', chartColor: '#ea580c' },
  { title: 'Daily file upload', desc: 'Number of files uploaded', date: '24/02/2026', value: '4', comparison: '0% vs 17/02/2026 (4)', chartColor: '#7c3aed' },
  { title: 'Daily failed runs % vs monthly average', desc: "Compares the day's failed validation percentage with the monthly average", date: '24/02/2026', value: '33.33%', comparison: '↑133.33% vs 17/02/2026 (-100.00%)', chartColor: '#ea580c' },
]
const FILE_VALIDATIONS_COLUMNS = ['Customer', 'Data type', 'Received at', 'Processing status', 'Failed validations', 'Row count', 'File size', 'Upload ID', 'Distinct dates', 'File name', 'Processing ended at', 'Error message']
const FILE_VALIDATIONS_ROWS = [
  { customer: 'Customer A', dataType: 'Sales', receivedAt: '16/12/2025 10:00', status: 'completed', failed: 0, rowCount: 12500, fileSize: '28.4M', uploadId: 'UP-001', distinctDates: 5, fileName: 'sales_dec.xlsx', endedAt: '16/12/2025 10:05', error: '' },
  { customer: 'Customer B', dataType: 'Inventory', receivedAt: '16/12/2025 11:30', status: 'failed', failed: 3, rowCount: 8200, fileSize: '15.2M', uploadId: 'UP-002', distinctDates: 2, fileName: 'inv_1216.csv', endedAt: '16/12/2025 11:35', error: 'Validation rule 2' },
  { customer: 'Customer A', dataType: 'Returns', receivedAt: '16/12/2025 12:00', status: 'completed', failed: 0, rowCount: 450, fileSize: '1.1M', uploadId: 'UP-003', distinctDates: 1, fileName: 'returns.xlsx', endedAt: '16/12/2025 12:02', error: '' },
  { customer: 'Customer C', dataType: 'Sales', receivedAt: '16/12/2025 14:15', status: 'completed', failed: 0, rowCount: 18200, fileSize: '42.8M', uploadId: 'UP-004', distinctDates: 8, fileName: 'sales_data.csv', endedAt: '16/12/2025 14:22', error: '' },
  { customer: 'Customer B', dataType: 'Transactions', receivedAt: '16/12/2025 15:00', status: 'failed', failed: 1, rowCount: 3200, fileSize: '8.5M', uploadId: 'UP-005', distinctDates: 3, fileName: 'txns_1216.xlsx', endedAt: '16/12/2025 15:04', error: 'Field format' },
]
const FILE_VALIDATIONS_SUMMARY = [
  { label: 'UNIQUE COUNT', value: '1' },
  { label: 'UNIQUE COUNT', value: '10' },
  { label: 'TIME PERIOD', value: '16/12/2025...' },
  { label: 'UNIQUE COUNT', value: '2' },
  { label: 'TOTAL', value: '55' },
  { label: 'TOTAL', value: '139.58M' },
  { label: 'UNIQUE COUNT', value: '32' },
  { label: 'UNIQUE COUNT', value: '50' },
  { label: 'UNIQUE COUNT', value: '11' },
  { label: 'UNIQUE COUNT', value: '37' },
  { label: 'TIME PERIOD', value: '16/12/2025 12:...' },
]
const FAIL_VALIDATION_COLUMNS = ['Customer', 'Data type', 'Run datetime', 'Fields', 'Rule', 'Status', 'Failures', 'Run ID', 'Failures %', 'Row count']
const FAIL_VALIDATION_ROWS = [
  { customer: 'New Demo', dataType: 'inventory', runDatetime: '24/02/2026 21:41:37', fields: 'on_hand_qty', rule: 'Field is at least 0', status: 'fail', failures: '5.44K', runId: '1098113', failuresPct: '1.75%', rowCount: '311.28K' },
  { customer: 'New Demo', dataType: 'warehouse', runDatetime: '24/02/2026 21:38:12', fields: 'on_hand_value', rule: 'Data volume must be within expected range', status: 'fail', failures: '1', runId: '1098096', failuresPct: '0.00%', rowCount: '21.18K' },
  { customer: 'New Demo', dataType: 'product', runDatetime: '24/02/2026 20:15:22', fields: 'in_warehouse_value', rule: 'Field cannot be null', status: 'fail', failures: '105.25K', runId: '965362', failuresPct: '8.04%', rowCount: '5.8M' },
  { customer: 'New Demo', dataType: 'inventory', runDatetime: '24/02/2026 19:42:08', fields: '(Empty)', rule: 'Field is at least 0', status: 'fail', failures: '144', runId: '1098021', failuresPct: '15.06%', rowCount: '376.05K' },
  { customer: 'New Demo', dataType: 'product', runDatetime: '24/02/2026 18:30:15', fields: 'in_warehouse_qty', rule: 'Field cannot be null', status: 'fail', failures: '105', runId: '1097998', failuresPct: '10.88%', rowCount: '956' },
  { customer: 'New Demo', dataType: 'warehouse', runDatetime: '24/02/2026 17:22:44', fields: 'color_id', rule: 'Field is at least 0', status: 'fail', failures: '2.12K', runId: '1097850', failuresPct: '3.21%', rowCount: '66.02K' },
  { customer: 'New Demo', dataType: 'product', runDatetime: '24/02/2026 16:10:33', fields: 'material_desc', rule: 'Data volume must be within expected range', status: 'fail', failures: '45', runId: '965340', failuresPct: '0.12%', rowCount: '38.5K' },
]

const FILE_VALIDATIONS_SAMPLE_COLUMNS = ['Customer', 'Data type', 'Fields', 'Id', 'color_desc', 'color_id', 'Value', 'date']
const FILE_VALIDATIONS_SAMPLE_ROWS = [
  { id: 1, colorDesc: '', colorId: '', value: '', date: '2025-08-28' },
  { id: 2, colorDesc: '', colorId: '', value: '', date: '' },
  { id: 3, colorDesc: '', colorId: '', value: '', date: '' },
  { id: 4, colorDesc: '', colorId: '', value: '', date: '2025-11-04' },
  { id: 5, colorDesc: '', colorId: '', value: '', date: '' },
  { id: 6, colorDesc: '', colorId: '', value: '', date: '2025-08-08' },
  { id: 7, colorDesc: '', colorId: '', value: '', date: '' },
  { id: 8, colorDesc: '', colorId: '', value: '', date: '2025-07-15' },
  { id: 9, colorDesc: '', colorId: '', value: '', date: '' },
  { id: 10, colorDesc: '', colorId: '', value: '', date: '' },
  { id: 11, colorDesc: '', colorId: '', value: '', date: '' },
]

const OPTIMISER_STATUS_TABS = ['Trips', 'Locations', 'Products', 'Inventory', 'Logic', 'DC to DC', 'Network', 'All runs performance']
const OPTIMISER_STATUS_FILTERS = [
  'Customer (Select)', 'Run name (Select)', 'Location (Select)', 'Labels (Select)', 'Department (Select)', 'Sub department (Select)',
  'Product ID (Select)', 'Sku ID (Select)', 'Gender (Select)', 'Brand (Select)', 'Season (Select)', 'Event (Select)',
  'From location type (Select)', 'From location (Select)', 'Warehouse availability (Select)', 'From location region (Select)', 'To location region (Select)',
  'To location country (Select)', 'To location type (Select)', 'To location (Select)', 'Trip type (Select)', 'Trip type detailed (Select)',
]
const OPTIMISER_STATUS_ACTIVE_CHIPS = ['Trip parameter value transferred', 'From location attribute Location', 'To location attribute Location']
const TRIPS_OVERVIEW_KPIS = [
  { value: '1.15B', label: 'Value transferred' },
  { value: '4.78M', label: 'Units transferred' },
  { value: '5.7K', label: 'Trips required' },
  { value: '9.72K', label: 'Products' },
  { value: '19.94K', label: 'SKUs' },
  { value: '279.82K', label: 'Costs' },
]
const ESTIMATED_IMPACT_KPIS = [
  { value: '675.31M', label: 'Revenue increase' },
  { value: '3.44M', label: 'Stockouts addressed' },
  { value: '2.46%', label: '% Stockouts addressed' },
  { value: '1.46K', label: 'Consolidated products' },
  { value: '5.31K', label: 'Spread products' },
  { value: '87.57K', label: 'Additional SKU location reach...' },
]
const TRIP_TYPE_DONUT_DATA = [
  { label: 'WH to Store', value: 930.51, unit: 'M', pct: 81.02, color: '#0d9488' },
  { label: 'Store to Store', value: 181.53, unit: 'M', pct: 15.81, color: '#eab308' },
  { label: 'WH to WH', value: 36.5, unit: 'M', pct: 3.18, color: '#2563eb' },
]

const TRIPS_PERFORMANCE_VALUE_COLS = ['Units transferred', 'Value transferred', 'Revenue Increase', 'Costs', 'Stockouts addressed', 'Consolidated products', 'Spread products', 'Products', 'SKUs']
const TRIPS_PERFORMANCE_ROWS = [
  { level: 'total', tripType: 'Grand Total', fromLocation: '', toLocation: '', units: '4.78M', value: '1.15B', revenue: '675.31M', costs: '279.82K', stockouts: '3.44M', consolidated: '1.46K', spread: '5.31K', products: '9.72K', skus: '19.94K' },
  { level: 'group', tripType: 'Replenishment...', fromLocation: '', toLocation: '', units: '4.17M', value: '967.01M', revenue: '562.95M', costs: '243.12K', stockouts: '2.98M', consolidated: '1.21K', spread: '4.65K', products: '8.42K', skus: '17.28K' },
  { level: 'subgroup', tripType: '', fromLocation: 'DLO WAREHOUSE EUROPE LOUVRES total', toLocation: '', units: '2.71M', value: '895.22M', revenue: '502.66M', costs: '188.45K', stockouts: '2.12M', consolidated: '892', spread: '3.21K', products: '6.18K', skus: '12.45K' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '462 ZV INTERNET', units: '1.4M', value: '411.66M', revenue: '368.75M', costs: '10', stockouts: '1.4M', consolidated: '300', spread: '1.93K', products: '2.02K', skus: '4.12K' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '677 EL CORTE INGLES.COM', units: '892K', value: '268.42M', revenue: '245.18M', costs: '10', stockouts: '892K', consolidated: '185', spread: '1.24K', products: '1.38K', skus: '2.85K' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '395 FARFETCH.COM', units: '456K', value: '142.18M', revenue: '128.45M', costs: '10', stockouts: '456K', consolidated: '125', spread: '612', products: '698', skus: '1.42K' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '531 GL COM MP', units: '312K', value: '95.22M', revenue: '82.15M', costs: '10', stockouts: '312K', consolidated: '98', spread: '428', products: '512', skus: '1.02K' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '563 LYON HERRIOT', units: '218K', value: '68.45M', revenue: '58.32M', costs: '10', stockouts: '218K', consolidated: '72', spread: '298', products: '385', skus: '798' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '310 BORDEAUX VOLTAIRE', units: '185K', value: '55.82M', revenue: '48.12M', costs: '10', stockouts: '185K', consolidated: '58', spread: '245', products: '312', skus: '648' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '238 LAUSANNE PAIX', units: '142K', value: '42.18M', revenue: '36.85M', costs: '10', stockouts: '142K', consolidated: '45', spread: '188', products: '245', skus: '512' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '880 BARCELONE PASEO', units: '118K', value: '35.45M', revenue: '30.22M', costs: '10', stockouts: '118K', consolidated: '38', spread: '156', products: '198', skus: '428' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '395 ZURICH STORCHENGASSEN', units: '95K', value: '28.12M', revenue: '24.08M', costs: '10', stockouts: '95K', consolidated: '32', spread: '128', products: '165', skus: '352' },
  { level: 'detail', tripType: '', fromLocation: '', toLocation: '330 PARIS CAMBON', units: '78K', value: '22.85M', revenue: '19.42M', costs: '10', stockouts: '78K', consolidated: '28', spread: '98', products: '128', skus: '285' },
]

const TRIPS_COUNTRIES = [
  { name: 'Belgium', color: '#ef4444', filled: true },
  { name: 'Denmark', color: '#2563eb', filled: true },
  { name: 'France', color: '#22c55e', filled: true },
  { name: 'Germany', color: '#a855f7', filled: true },
  { name: 'Greece', color: '#f97316', filled: false },
  { name: 'Ireland', color: '#22c55e', filled: true },
  { name: 'Italy', color: '#2563eb', filled: false },
  { name: 'Luxembourg', color: '#a855f7', filled: false },
  { name: 'Monaco', color: '#f97316', filled: false },
  { name: 'Norway', color: '#ef4444', filled: false },
  { name: 'Portugal', color: '#ef4444', filled: true },
  { name: 'Spain', color: '#2563eb', filled: false },
  { name: 'Sweden', color: '#22c55e', filled: false },
  { name: 'Switzerland', color: '#f97316', filled: false },
  { name: 'The Netherlands', color: '#84cc16', filled: false },
  { name: 'United Kingdom', color: '#22c55e', filled: true },
]

const BUYING_REPORT_ROWS = [
  { loc: 'Europe Apparel', prod: 'Fragrance & Home', products: 428, locations: 42, salesUnits: '28.12K', salesValue: '0', availQty: '10.42K', availVal: '32.18M', sellThrough: '73%', assorted: 312, mixSales: '72.8%', mixAssort: 4.2, avgPrice: '0' },
  { loc: 'Europe Apparel', prod: 'Apparel', products: 412, locations: 42, salesUnits: '32.48K', salesValue: '0', availQty: '12.18K', availVal: '38.42M', sellThrough: '71%', assorted: 298, mixSales: '75.2%', mixAssort: 4.1, avgPrice: '0' },
  { loc: 'Europe Apparel', prod: 'Activewear', products: 356, locations: 38, salesUnits: '24.82K', salesValue: '0', availQty: '8.92K', availVal: '28.14M', sellThrough: '74%', assorted: 265, mixSales: '68.4%', mixAssort: 3.8, avgPrice: '0' },
  { loc: 'Europe Apparel', prod: 'Jewelry', products: 218, locations: 40, salesUnits: '14.22K', salesValue: '0', availQty: '5.42K', availVal: '16.82M', sellThrough: '54%', assorted: 172, mixSales: '70.1%', mixAssort: 4.0, avgPrice: '0' },
  { loc: 'Europe Handbags', prod: 'Handbags', products: 198, locations: 22, salesUnits: '8.42K', salesValue: '0', availQty: '3.18K', availVal: '12.48M', sellThrough: '71%', assorted: 145, mixSales: '71.2%', mixAssort: 4.5, avgPrice: '0' },
  { loc: 'Europe Handbags', prod: 'Watches', products: 124, locations: 18, salesUnits: '4.82K', salesValue: '0', availQty: '2.12K', availVal: '8.42M', sellThrough: '69%', assorted: 92, mixSales: '68.8%', mixAssort: 4.2, avgPrice: '0' },
  { loc: 'North America Apparel', prod: 'Fragrance & Home', products: 385, locations: 36, salesUnits: '22.18K', salesValue: '0', availQty: '9.42K', availVal: '29.18M', sellThrough: '70%', assorted: 278, mixSales: '71.5%', mixAssort: 4.0, avgPrice: '0' },
  { loc: 'North America Apparel', prod: 'Jewelry', products: 212, locations: 28, salesUnits: '12.48K', salesValue: '0', availQty: '4.82K', availVal: '15.42M', sellThrough: '72%', assorted: 168, mixSales: '69.2%', mixAssort: 4.1, avgPrice: '0' },
  { loc: 'Asia Handbags', prod: 'Handbags', products: 156, locations: 18, salesUnits: '6.42K', salesValue: '0', availQty: '2.82K', availVal: '11.28M', sellThrough: '100%', assorted: 118, mixSales: '75.6%', mixAssort: 4.4, avgPrice: '0' },
  { loc: 'Asia Watches', prod: 'Watches', products: 142, locations: 16, salesUnits: '5.82K', salesValue: '0', availQty: '2.42K', availVal: '9.68M', sellThrough: '100%', assorted: 108, mixSales: '72.4%', mixAssort: 4.3, avgPrice: '0' },
]
const SALES_PERFORMANCE_ROWS = [
  { dept: 'Fragrance & Home', wtd: 89, wtdLy: -62, wtdLyPct: -41.07, mtd: '1.98K', mtdLy: -198, mtdLyPct: -9.09, ytd: '4.12K', ytdLy: -402, ytdLyPct: -8.89 },
  { dept: 'Apparel', wtd: 156, wtdLy: -134, wtdLyPct: -46.21, mtd: '3.45K', mtdLy: -345, mtdLyPct: -9.09, ytd: '6.89K', ytdLy: -673, ytdLyPct: -8.90 },
  { dept: 'Activewear', wtd: 142, wtdLy: -98, wtdLyPct: -40.83, mtd: '2.78K', mtdLy: -278, mtdLyPct: -9.09, ytd: '5.21K', ytdLy: -509, ytdLyPct: -8.91 },
  { dept: 'Jewelry', wtd: 98, wtdLy: -76, wtdLyPct: -43.68, mtd: '1.89K', mtdLy: -189, mtdLyPct: -9.09, ytd: '4.15K', ytdLy: -405, ytdLyPct: -8.89 },
  { dept: 'Watches', wtd: 134, wtdLy: -187, wtdLyPct: -58.26, mtd: '1.45K', mtdLy: -145, mtdLyPct: -9.09, ytd: '2.98K', ytdLy: -291, ytdLyPct: -8.90 },
  { dept: 'Handbags', wtd: 94, wtdLy: -146, wtdLyPct: -60.83, mtd: '1.24K', mtdLy: -124, mtdLyPct: -9.09, ytd: '2.30K', ytdLy: -225, ytdLyPct: -8.91 },
]
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const SALES_BY_COUNTRY = {
  124: { name: 'Canada', value: 159000 },
  840: { name: 'United States', value: 13120 },
  250: { name: 'France', value: 175000 },
  724: { name: 'Spain', value: 729 },
  578: { name: 'Norway', value: 424 },
  826: { name: 'United Kingdom', value: 45000 },
  276: { name: 'Germany', value: 62000 },
  380: { name: 'Italy', value: 38000 },
  392: { name: 'Japan', value: 1296000 },
  702: { name: 'Singapore', value: 981 },
  156: { name: 'China', value: 85000 },
  410: { name: 'South Korea', value: 120000 },
  36: { name: 'Australia', value: 223 },
  554: { name: 'New Zealand', value: 13120 },
  152: { name: 'Chile', value: 12000 },
  170: { name: 'Colombia', value: 8000 },
}
const getSalesData = (id) => SALES_BY_COUNTRY[id] ?? SALES_BY_COUNTRY[String(id).replace(/^0+/, '')]
const getColor = (value) => {
  if (!value || value === 0) return '#e5e7eb'
  const max = 1296000
  const ratio = Math.min(value / max, 1)
  const r = Math.round(248 - ratio * 100)
  const g = Math.round(180 - ratio * 140)
  const b = Math.round(100 - ratio * 80)
  return `rgb(${r},${g},${b})`
}
function SalesYTDMap() {
  const [hovered, setHovered] = useState(null)
  const [zoom, setZoom] = useState(1)
  const center = [0, 20]

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.5, 8))
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 0.5))
  const handleMoveEnd = (pos) => {
    if (pos?.zoom != null) setZoom(pos.zoom)
  }

  const hoverData = hovered != null ? getSalesData(hovered) : null
  const formatValue = (v) => v >= 1000 ? `${(v / 1000).toFixed(v >= 100000 ? 0 : 2)}K` : String(v)

  return (
    <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
      <div className="flex items-start justify-between gap-4 p-6 pb-0">
        <h3 className="text-base font-medium text-[#0a0a0a]">Sales YTD</h3>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">Explore</button>
          <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
        </div>
      </div>
      <div className="relative" style={{ height: 420 }}>
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
          <button type="button" onClick={handleZoomIn} className="w-8 h-8 rounded bg-white border border-[#e5e7eb] flex items-center justify-center text-[#4a5565] hover:bg-[#f9fafb] text-lg leading-none">+</button>
          <button type="button" onClick={handleZoomOut} className="w-8 h-8 rounded bg-white border border-[#e5e7eb] flex items-center justify-center text-[#4a5565] hover:bg-[#f9fafb] text-lg leading-none">−</button>
        </div>
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 147 }} width={800} height={420}>
          <ZoomableGroup center={center} zoom={zoom} onMoveEnd={handleMoveEnd}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const id = geo.id
                  const data = getSalesData(id)
                  const value = data?.value ?? 0
                  const isHovered = hovered === id || hovered === String(id)
                  const fill = isHovered ? '#93c5fd' : getColor(value)
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="#fff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', cursor: 'pointer' },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {hoverData && (
          <div className="absolute bottom-4 left-4 px-3 py-2 rounded-lg bg-white/95 border border-[#e5e7eb] shadow-sm text-sm">
            <span className="font-medium text-[#0a0a0a]">{hoverData.name}</span>
            <span className="text-[#6a7282] ml-2">{formatValue(hoverData.value)}</span>
          </div>
        )}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/95 border border-[#e5e7eb] shadow-sm text-xs">
          <span className="text-[#6a7282]">0</span>
          <div className="w-24 h-2 rounded-full bg-gradient-to-r from-[#e5e7eb] via-[#fbbf24] to-[#dc2626]" />
          <span className="text-[#6a7282]">13.12K</span>
        </div>
      </div>
      <p className="text-[10px] text-[#9ca3af] px-6 py-2">© mapbox © Mapbox © OpenStreetMap Improve this map</p>
    </div>
  )
}

/* Pareto chart: blue bars + orange cumulative % line */
const PARETO_LOCATION_DATA = [
  { label: 'Store', value: 631120 },
  { label: 'STR', value: 421480 },
  { label: 'FIN', value: 0 },
]
const PARETO_DEPT_DATA = [
  { label: 'Fragrance & Home', value: 438990 },
  { label: 'Apparel', value: 386620 },
  { label: 'Activewear', value: 213270 },
  { label: 'Jewelry', value: 7720 },
  { label: 'Watches', value: 3810 },
  { label: 'Handbags', value: 2170 },
]

function TripTypeDonutChart({ data }) {
  const cx = 110
  const cy = 110
  const r = 85
  const ir = 55
  let startAngle = -90
  const segments = data.map((d) => {
    const angle = (d.pct / 100) * 360
    const endAngle = startAngle + angle
    const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180)
    const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180)
    const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180)
    const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180)
    const ix1 = cx + ir * Math.cos((startAngle * Math.PI) / 180)
    const iy1 = cy + ir * Math.sin((startAngle * Math.PI) / 180)
    const ix2 = cx + ir * Math.cos((endAngle * Math.PI) / 180)
    const iy2 = cy + ir * Math.sin((endAngle * Math.PI) / 180)
    const largeArc = angle > 180 ? 1 : 0
    const dPath = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${ir} ${ir} 0 ${largeArc} 0 ${ix1} ${iy1} Z`
    startAngle = endAngle
    return { ...d, dPath }
  })
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 220 220" className="w-[180px] h-[180px] shrink-0">
        {segments.map((s) => (
          <path key={s.label} d={s.dPath} fill={s.color} />
        ))}
      </svg>
      <ul className="space-y-1.5 text-sm shrink-0">
        {data.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[#0a0a0a]">{s.label} - {s.value}{s.unit} ({s.pct}%)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ParetoChart({ title, xAxisLabel, data, hasExplore = true }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const scaleMax = 1052600
  const formatVal = (v) => (v >= 1000 ? `${(v / 1000).toFixed(v >= 100000 ? 0 : 2)}K` : String(v))
  let cumul = 0
  const withCumul = data.map((d) => {
    cumul += d.value
    return { ...d, cumul, cumulPct: total ? (cumul / total) * 100 : 0 }
  })
  const w = 500
  const h = 240
  const pad = { L: 56, R: 56, T: 32, B: 44 }
  const chartW = w - pad.L - pad.R
  const chartH = h - pad.T - pad.B
  const barW = chartW / data.length
  const barGap = Math.max(0, barW * 0.15)

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-base font-medium text-[#0a0a0a]">{title}</h3>
        {hasExplore && (
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">Explore</button>
            <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="min-w-[400px] w-full" preserveAspectRatio="xMidYMid meet" style={{ height: 240 }}>
          {/* Horizontal grid (0–100% for right axis) */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <line key={i} x1={pad.L} y1={pad.T + (i / 10) * chartH} x2={w - pad.R} y2={pad.T + (i / 10) * chartH} stroke="#e5e7eb" strokeWidth="0.5" />
          ))}
          {/* Left Y-axis: Sales */}
          <text x="20" y={pad.T + chartH / 2} fill="#6a7282" fontSize="11" transform={`rotate(-90, 20, ${pad.T + chartH / 2})`} textAnchor="middle">Sales</text>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((r) => {
            const v = r * scaleMax
            const label = v >= 1000000 ? `${(v / 1000000).toFixed(2)}M` : v >= 1000 ? `${(v / 1000).toFixed(2)}K` : v
            return <text key={r} x={pad.L - 6} y={pad.T + chartH - r * chartH + 4} fill="#6a7282" fontSize="10" textAnchor="end">{label}</text>
          })}
          {/* Right Y-axis: Cumulative % */}
          <text x={w - 20} y={pad.T + chartH / 2} fill="#6a7282" fontSize="11" transform={`rotate(90, ${w - 20}, ${pad.T + chartH / 2})`} textAnchor="middle">Cumulative Percent Sales</text>
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((p) => (
            <text key={p} x={w - pad.R + 6} y={pad.T + chartH - (p / 100) * chartH + 4} fill="#6a7282" fontSize="10" textAnchor="start">{p}%</text>
          ))}
          {/* X-axis label with dropdown cue */}
          <g>
            <text x={pad.L + chartW / 2} y={h - 14} fill="#6a7282" fontSize="11" textAnchor="middle">{xAxisLabel}</text>
            <path d={`M${pad.L + chartW / 2 + 42} ${h - 14} l-4 4 4-4`} fill="none" stroke="#6a7282" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* Bars */}
          {withCumul.map((d, i) => {
            const x = pad.L + i * barW + barGap / 2
            const barWidth = barW - barGap
            const barH = scaleMax ? (d.value / scaleMax) * chartH : 0
            const labelY = barH > 12 ? pad.T + chartH - barH - 6 : pad.T + chartH + 14
            return (
              <g key={d.label}>
                <rect x={x} y={pad.T + chartH - barH} width={barWidth} height={barH} fill="#155dfc" />
                <text x={x + barWidth / 2} y={labelY} fill="#0a0a0a" fontSize="10" textAnchor="middle">{formatVal(d.value)}</text>
              </g>
            )
          })}
          {/* Cumulative line (orange) - starts at 0% left of first bar */}
          <polyline
            points={[
              `${pad.L},${pad.T + chartH}`,
              ...withCumul.map((d, i) => {
                const x = pad.L + (i + 0.5) * barW
                const y = pad.T + chartH - (d.cumulPct / 100) * chartH
                return `${x},${y}`
              }),
            ].join(' ')}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cumulative % labels on line */}
          {withCumul.map((d, i) => {
            const x = pad.L + (i + 0.5) * barW
            const y = pad.T + chartH - (d.cumulPct / 100) * chartH - 8
            return <text key={d.label} x={x} y={Math.max(y, pad.T + 12)} fill="#0a0a0a" fontSize="10" textAnchor="middle">{d.cumulPct.toFixed(2)}%</text>
          })}
          {/* X-axis category labels */}
          {withCumul.map((d, i) => {
            const x = pad.L + (i + 0.5) * barW
            return <text key={d.label} x={x} y={h - 20} fill="#6a7282" fontSize="10" textAnchor="middle">{d.label}</text>
          })}
        </svg>
      </div>
    </div>
  )
}

const SALES_PERFORMANCE_2_ROWS = [
  { dept: 'Fragrance & Home', wtd: 315, wtdLy: -385, wtdLyPct: -56, mtd: '7.2K', mtdLy: -681, mtdLyPct: -9, ytd: '14K', ytdLy: -337, ytdLyPct: -2 },
  { dept: 'Apparel', wtd: 255, wtdLy: -194, wtdLyPct: -48, mtd: '3.1K', mtdLy: -364, mtdLyPct: -10, ytd: '7.7K', ytdLy: -378, ytdLyPct: -5 },
  { dept: 'Activewear', wtd: 148, wtdLy: -120, wtdLyPct: -46, mtd: '2.4K', mtdLy: -89, mtdLyPct: -4, ytd: '3.7K', ytdLy: -1600, ytdLyPct: -31 },
  { dept: 'Jewelry', wtd: -3, wtdLy: 6, wtdLyPct: 200, mtd: '57', mtdLy: 96, mtdLyPct: 63, ytd: '17K', ytdLy: -100, ytdLyPct: -38 },
  { dept: 'Watches', wtd: -2, wtdLy: 2, wtdLyPct: -50, mtd: '38', mtdLy: 36, mtdLyPct: -48, ytd: '96', ytdLy: -34, ytdLyPct: -26 },
  { dept: 'Handbags', wtd: 0, wtdLy: 0, wtdLyPct: 0, mtd: '6', mtdLy: -16, mtdLyPct: -71, ytd: '20', ytdLy: -28, ytdLyPct: -68 },
  { dept: 'Total', wtd: 713, wtdLy: -703, wtdLyPct: -50, mtd: '12.8K', mtdLy: -1300, mtdLyPct: -9, ytd: '25.6K', ytdLy: -2500, ytdLyPct: -9, isTotal: true },
]
function LyCell({ val, display, suffix = '' }) {
  if (val < 0) return <span className="inline-block px-2 py-0.5 rounded-md bg-red-50 text-red-600">{display}{suffix}</span>
  return <span className="inline-block px-2 py-0.5 rounded-md bg-green-50 text-green-600">{display}{suffix}</span>
}

/* Sales trend chart with hover tooltip */
const SALES_TREND_DATA = [
  { date: '01/04', ly: 1800, ty: 2100 },
  { date: '01/11', ly: 3000, ty: 2160 },
  { date: '01/18', ly: 3300, ty: 2190 },
  { date: '01/25', ly: 2790, ty: 2010 },
  { date: '02/01', ly: 2190, ty: 1800 },
  { date: '02/08', ly: 3490, ty: 3415 },
  { date: '02/15', ly: 4110, ty: 5190 },
  { date: '02/22', ly: 5310, ty: 5490 },
  { date: '03/01', ly: 3600, ty: 750 },
]
function catmullRomToBezier(p0, p1, p2, p3, tension = 0.25) {
  const cp1x = p1.x + (p2.x - p0.x) * tension
  const cp1y = p1.y + (p2.y - p0.y) * tension
  const cp2x = p2.x - (p3.x - p1.x) * tension
  const cp2y = p2.y - (p3.y - p1.y) * tension
  return `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x},${p2.y}`
}
function smoothPath(pts, getY) {
  const getP = (i) => {
    const idx = Math.max(0, Math.min(i, pts.length - 1))
    const p = pts[idx]
    return { x: p.x, y: getY(p) }
  }
  let d = `M${getP(0).x},${getP(0).y}`
  for (let i = 0; i < pts.length - 1; i++) {
    d += ' ' + catmullRomToBezier(getP(i - 1), getP(i), getP(i + 1), getP(i + 2))
  }
  return d
}

function SalesTrendChart() {
  const [hoverIndex, setHoverIndex] = useState(null)
  const chartMax = 6000
  const pad = { L: 36, R: 12, T: 16, B: 28 }
  const svgW = 800
  const chartW = svgW - pad.L - pad.R
  const chartH = 180
  const pts = SALES_TREND_DATA.map((d, i) => ({
    ...d,
    x: pad.L + (i / (SALES_TREND_DATA.length - 1)) * chartW,
    yLy: pad.T + chartH - (d.ly / chartMax) * chartH,
    yTy: pad.T + chartH - (d.ty / chartMax) * chartH,
  }))
  const lyPath = smoothPath(pts, (p) => p.yLy)
  const tyPath = smoothPath(pts, (p) => p.yTy)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const idx = Math.round(ratio * (SALES_TREND_DATA.length - 1))
    const clamped = Math.max(0, Math.min(idx, SALES_TREND_DATA.length - 1))
    setHoverIndex(clamped)
  }
  const handleMouseLeave = () => setHoverIndex(null)

  const hovered = hoverIndex != null ? SALES_TREND_DATA[hoverIndex] : null
  const total = hovered ? hovered.ly + hovered.ty : 0
  const lyPct = total ? ((hovered.ly / total) * 100).toFixed(2) : '0'
  const tyPct = total ? ((hovered.ty / total) * 100).toFixed(2) : '0'

  return (
    <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-medium text-[#0a0a0a]">Sales trend</h3>
          <p className="text-sm text-[#6a7282] mt-0.5">Select the comparison period using &apos;Variance&apos; parameter</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-[#6a7282]">Metrics</span>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#7eb8ff]" />
            <span>LY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#155dfc]" />
            <span>TY</span>
          </div>
        </div>
      </div>
      <div className="h-[280px] w-full relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <svg viewBox={`0 0 ${svgW} 240`} className="w-full h-full" preserveAspectRatio="xMinYMid meet">
          {/* Horizontal grid lines */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <line key={i} x1={pad.L} y1={pad.T + chartH - (i / 10) * chartH} x2={svgW - pad.R} y2={pad.T + chartH - (i / 10) * chartH} stroke="#e5e7eb" strokeWidth="0.5" />
          ))}
          {/* Left Y-axis - stacked vertically, condensed */}
          <g>
            <text x="8" y={pad.T + chartH / 2} fill="#6a7282" fontSize="10" transform={`rotate(-90, 8, ${pad.T + chartH / 2})`} textAnchor="middle">Sales</text>
            {[0, 2, 4, 6].map((i) => (
              <text key={i} x={pad.L - 4} y={pad.T + chartH - (i / 6) * chartH + 4} fill="#6a7282" fontSize="9" textAnchor="end">{i === 0 ? '0' : `${i}K`}</text>
            ))}
          </g>
          <text x={pad.L + chartW / 2} y={230} fill="#6a7282" fontSize="12" textAnchor="middle">Date period</text>
          {SALES_TREND_DATA.map((d, i) => (
            <text key={d.date} x={pad.L + (i / (SALES_TREND_DATA.length - 1)) * chartW} y={236} fill="#6a7282" fontSize="10" textAnchor="middle">{d.date}</text>
          ))}
          <path d={lyPath} fill="none" stroke="#7eb8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={tyPath} fill="none" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Dashed vertical line + highlight circle at hovered point */}
          {hoverIndex != null && (
            <g>
              <line x1={pts[hoverIndex].x} y1={pad.T} x2={pts[hoverIndex].x} y2={pad.T + chartH} stroke="#6a7282" strokeWidth="1" strokeDasharray="4 2" opacity={0.6} />
              <circle cx={pts[hoverIndex].x} cy={pts[hoverIndex].yLy} r="4" fill="#7eb8ff" stroke="#fff" strokeWidth="2" />
              <circle cx={pts[hoverIndex].x} cy={pts[hoverIndex].yTy} r="4" fill="#155dfc" stroke="#fff" strokeWidth="2" />
            </g>
          )}
        </svg>
        {/* Hover tooltip modal - sits left or right of the dotted vertical line */}
        {hovered && (() => {
          const lineFrac = (pad.L + (hoverIndex / (SALES_TREND_DATA.length - 1)) * chartW) / svgW
          const linePercent = lineFrac * 100
          const toRight = linePercent < 50
          return (
          <div
            className="absolute rounded-xl shadow-lg px-4 py-3 text-sm text-white z-10 pointer-events-none"
            style={{
              backgroundColor: '#1f2937',
              left: toRight ? `calc(${linePercent}% + 12px)` : undefined,
              right: toRight ? undefined : `calc(${(1 - lineFrac) * 100}% + 12px)`,
              top: 24,
              transform: toRight ? 'none' : 'translateX(-100%)',
              minWidth: 200,
            }}
          >
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-[#9ca3af]">Date period:</span>
                <span className="ml-2 font-medium">{hovered.date}</span>
              </div>
              <div>
                <span className="text-[#9ca3af]">Total Sales:</span>
                <span className="ml-2 font-medium">{total.toLocaleString()}</span>
              </div>
              <div className="flex gap-3 mt-1">
                <div className="w-1 rounded-full bg-[#7eb8ff]" />
                <div>
                  <div><span className="text-[#9ca3af]">Metrics:</span> <span className="font-medium">LY</span></div>
                  <div><span className="text-[#9ca3af]">Sales:</span> <span className="font-medium">{hovered.ly.toLocaleString()} ({lyPct} %)</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1 rounded-full bg-[#155dfc]" />
                <div>
                  <div><span className="text-[#9ca3af]">Metrics:</span> <span className="font-medium">TY</span></div>
                  <div><span className="text-[#9ca3af]">Sales:</span> <span className="font-medium">{hovered.ty.toLocaleString()} ({tyPct} %)</span></div>
                </div>
              </div>
            </div>
          </div>
          )
        })()}
      </div>
    </div>
  )
}

const INSIGHTS_METRIC_CARDS = [
  { title: 'Daily sales', date: '24/02/2026', value: '551', comparison: 'Comparison point unavailable', comparisonDown: false, chartType: 'area', chartVariant: 'daily', hasExplore: false },
  { title: 'Sales WTD', date: 'Week of 23/02/2026', value: '713', comparison: '↓37.84%', comparisonSuffix: ' vs Week of 24/02/2025 (1.15K)', comparisonDown: true, chartType: 'area', chartVariant: 'wtd', hasExplore: false },
  { title: 'Sales MTD', date: 'Feb 2026', value: '12.79K', comparison: '↓9.09%', comparisonSuffix: ' vs Feb 2025 (14.07K)', comparisonDown: true, chartType: 'area', chartVariant: 'mtd', hasExplore: true },
  { title: 'Sales YTD', date: '2026', value: '25.65K', comparison: '↓8.93%', comparisonSuffix: ' vs 2025 (28.16K)', comparisonDown: true, chartType: 'area', chartVariant: 'ytd', hasExplore: false },
]

function DataHealthKpiChart({ color = '#155dfc', id }) {
  const pts = '0,70 40,55 80,65 120,45 160,50 200,55 240,60'
  const pathD = pts.split(' ').map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(' ')
  const areaD = `${pathD} L240,80 L0,80 Z`
  const gradId = `dataHealthGrad-${id ?? color.replace('#', '')}`
  return (
    <div className="h-[80px] w-full mt-4">
      <svg viewBox="0 0 240 80" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={color} stopOpacity="0.4" />
            <stop stopColor={color} stopOpacity="0" offset="1" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#${gradId})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

const CHART_VARIANTS = {
  daily: '0,55 40,45 80,65 120,30 160,50 200,35 240,55',
  wtd: '0,70 40,65 80,55 120,25 160,45 180,35 210,50 240,60',
  mtd: '0,65 40,50 80,55 120,55 160,50 200,48 240,52',
  ytd: '0,70 40,55 80,40 120,25 160,35 200,45 240,55',
}
function InsightsMiniChart({ variant = 'daily' }) {
  const pts = CHART_VARIANTS[variant] || CHART_VARIANTS.daily
  const pathD = pts.split(' ').map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(' ')
  const areaD = `${pathD} L240,80 L0,80 Z`
  const pairs = pts.split(' ')
  const lastPt = pairs[pairs.length - 1].split(',')
  const useDotted = variant === 'ytd'
  const solidPts = useDotted ? pairs.slice(0, 6) : pairs
  const solidPathD = solidPts.map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(' ')
  const dottedPathD = useDotted ? pairs.slice(5).map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(' ') : ''
  return (
    <div className="h-[100px] w-full mt-6">
      <svg viewBox="0 0 240 80" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`insightsGrad-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#155dfc" stopOpacity="0.4" />
            <stop stopColor="#155dfc" stopOpacity="0" offset="1" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#insightsGrad-${variant})`} />
        <path d={solidPathD} fill="none" stroke="#155dfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {useDotted && dottedPathD && (
          <>
            <path d={dottedPathD} fill="none" stroke="#155dfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
            <circle cx={lastPt[0]} cy={lastPt[1]} r="3" fill="#155dfc" />
          </>
        )}
      </svg>
    </div>
  )
}

const LIVEBOARD_RECENT_VIEWERS = [
  { name: 'David Le Corre', initial: 'D', color: 'bg-[#7c3aed]' },
  { name: 'Pierre-Alain Renou', initial: 'P', color: 'bg-[#ea580c]' },
  { name: 'Autone Internal', initial: 'A', color: 'bg-[#2563eb]' },
  { name: 'ines.sebbar', initial: 'I', color: 'bg-[#16a34a]' },
  { name: 'Sim Durgun', initial: 'S', color: 'bg-[#0d9488]' },
  { name: 'Ever Sasson', initial: 'E', color: 'bg-[#0d9488]' },
  { name: 'Bonaventura Pacileo', initial: 'B', color: 'bg-[#7c3aed]' },
  { name: 'Autone Internal', initial: 'A', color: 'bg-[#2563eb]' },
  { name: 'Adil', initial: 'A', color: 'bg-[#ea580c]' },
]

function InsightsPage({ activeTab: activeTabProp, onTabChange }) {
  const [internalTab, setInternalTab] = useState('Retail')
  const [liveboardModalOpen, setLiveboardModalOpen] = useState(false)
  const [dataHealthSubTab, setDataHealthSubTab] = useState('File validations')
  const [optimiserStatusSubTab, setOptimiserStatusSubTab] = useState('Trips')
  const [optimiserBannerDismissed, setOptimiserBannerDismissed] = useState(false)
  const [selectViewOpen, setSelectViewOpen] = useState(false)
  const activeTab = activeTabProp ?? internalTab
  const handleTabChange = onTabChange ?? setInternalTab

  return (
    <>
    <div className="flex flex-col gap-6">
      {/* Header: title + icons + tabs + actions */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-medium text-[#0a0a0a] flex items-center gap-2">
              {activeTab === 'Buying' ? 'Buying' : activeTab === 'Data health' ? (
                <>Data health<span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0" aria-hidden><svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-6" /></svg></span></>
              ) : activeTab === 'Optimiser status' ? (
                <>Optimiser status - BQ<span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0" aria-hidden><svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-6" /></svg></span></>
              ) : 'Insights'}
            </h1>
            <div className="flex items-center gap-2">
              <div className="relative group">
                <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5] hover:text-[#0a0a0a]" aria-label="Liveboard details" onClick={() => setLiveboardModalOpen(true)}>
                  <IconInfo />
                </button>
                <div className="absolute left-0 bottom-full mb-1 px-2 py-1.5 rounded-md bg-[#1f2937] text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  Liveboard details
                </div>
              </div>
              <div className="relative group">
                <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5] hover:text-[#0a0a0a]" aria-label="Add to favourites">
                  <IconStar />
                </button>
                <div className="absolute left-0 bottom-full mb-1 px-2 py-1.5 rounded-md bg-[#1f2937] text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  Add to favourites
                </div>
              </div>
              <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5] hover:text-[#0a0a0a]" aria-label="Permissions">
                <IconLock />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="h-10 px-4 rounded-lg bg-[#155dfc] text-white text-sm font-medium flex items-center gap-2">
              <IconAI />
              AI Highlights
            </button>
            <div className="relative group">
              <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]" aria-label="Share">
                <IconShare />
              </button>
              <div className="absolute left-0 bottom-full mb-1 px-2 py-1.5 rounded-md bg-[#1f2937] text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Share
              </div>
            </div>
            <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]" aria-label="More options">
              <IconEllipsisVertical />
            </button>
          </div>
        </div>
        <div className="flex gap-1 border-b border-[#e5e7eb] overflow-x-auto">
          {activeTab === 'Data health' ? (
            DATA_HEALTH_TABS.map((tab) => (
              <button key={tab} type="button" onClick={() => setDataHealthSubTab(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0 ${dataHealthSubTab === tab ? 'border-[#155dfc] text-[#155dfc]' : 'border-transparent text-[#4a5565] hover:text-[#0a0a0a]'}`}>
                {tab}
              </button>
            ))
          ) : activeTab === 'Optimiser status' ? (
            OPTIMISER_STATUS_TABS.map((tab) => (
              <button key={tab} type="button" onClick={() => setOptimiserStatusSubTab(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0 ${optimiserStatusSubTab === tab ? 'border-[#155dfc] text-[#155dfc]' : 'border-transparent text-[#4a5565] hover:text-[#0a0a0a]'}`}>
                {tab}
              </button>
            ))
          ) : (
            INSIGHTS_TABS.map((tab) => (
              <button key={tab} type="button" onClick={() => handleTabChange(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0 ${activeTab === tab ? 'border-[#155dfc] text-[#155dfc]' : 'border-transparent text-[#4a5565] hover:text-[#0a0a0a]'}`}>
                {tab}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main content: filters + cards + sidebar */}
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          {activeTab === 'Buying' ? (
            <>
              {/* Buying filters */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="h-9 px-3 rounded-lg text-sm bg-[#e5e7eb] text-[#0a0a0a]">Customer new demo</button>
                  <button type="button" className="h-9 px-3 rounded-lg text-sm bg-[#e5e7eb] text-[#0a0a0a]">Min date Last 4 Months (01/10/2025 &lt; 01/02/2026)</button>
                  {BUYING_FILTER_CHIPS_ROW1.slice(2).map((chip) => (
                    <button key={chip} type="button" className="h-9 px-3 rounded-lg text-sm bg-[#f3f3f5] text-[#4a5565] hover:bg-[#e5e7eb] flex items-center gap-1">
                      {chip}
                      <IconChevronDown className="size-4 opacity-60" />
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {BUYING_FILTER_CHIPS_ROW2.slice(0, 4).map((chip) => (
                    <button key={chip} type="button" className="h-9 px-3 rounded-lg text-sm bg-[#f3f3f5] text-[#4a5565] hover:bg-[#e5e7eb] flex items-center gap-1">
                      {chip}
                      <IconChevronDown className="size-4 opacity-60" />
                    </button>
                  ))}
                  <button type="button" className="h-9 px-3 rounded-lg text-sm bg-[#364153] text-white flex items-center gap-2">Location attributes Region<IconArrowRight className="size-4" /></button>
                  <button type="button" className="h-9 px-3 rounded-lg text-sm bg-[#364153] text-white flex items-center gap-2">Product attributes Department<IconArrowRight className="size-4" /></button>
                </div>
              </div>

              {/* Buying report */}
              <h2 className="text-xl font-semibold text-[#0a0a0a] mb-4">Buying report</h2>
              <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f9fafb]">
                        {BUYING_REPORT_COLUMNS.map((col, i) => (
                          <th key={col} className={`py-3 px-4 font-medium text-[#0a0a0a] ${i < 2 ? 'text-left' : 'text-right'}`}>
                            {i === 4 ? (
                              <span className="inline-flex items-center gap-1">
                                {col}
                                <IconChevronDown className="size-4" />
                              </span>
                            ) : (
                              col
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {BUYING_REPORT_ROWS.map((row, idx) => (
                        <tr key={`${row.loc}-${row.prod}-${idx}`} className={`border-t border-[#e5e7eb] ${['Asia Handbags', 'Asia Watches'].includes(row.loc) ? 'bg-[#e0f2fe]' : ''}`}>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.loc}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.prod}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.products}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.locations}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.salesUnits}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.salesValue}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.availQty}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.availVal}</td>
                          <td className={`py-3 px-4 text-right ${row.sellThrough === '100%' || row.sellThrough === '71%' || row.sellThrough === '54%' ? 'bg-amber-100 text-[#0a0a0a]' : 'text-[#0a0a0a]'}`}>{row.sellThrough}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.assorted}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.mixSales}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.mixAssort}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.avgPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#f9fafb] border-t-2 border-[#e5e7eb]">
                        <td className="py-3 px-4 text-[#6a7282] text-left">UNIQUE COUNT 6</td>
                        <td className="py-3 px-4 text-[#6a7282] text-left">UNIQUE COUNT 6</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 2.42K</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 232</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 164.17K</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 0</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 58.17K</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 180.58M</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">AVERAGE 0.53</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 1.83K</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TABLE AG... 100%</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 4.79</td>
                        <td className="py-3 px-4 text-right text-[#6a7282]">TOTAL 0</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="text-sm text-[#6a7282] px-4 py-3">Showing {BUYING_REPORT_ROWS.length} of {BUYING_REPORT_ROWS.length} rows</p>
              </div>
            </>
          ) : activeTab === 'Data health' ? (
            <>
              {/* Data health filter bar */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button type="button" className="h-9 px-3 rounded-lg text-sm bg-[#e5e7eb] text-[#0a0a0a]">Customer new demo</button>
                {DATA_HEALTH_FILTERS.slice(1).map((f) => (
                  <button key={f} type="button" className="h-9 px-3 rounded-lg text-sm bg-[#f3f3f5] text-[#4a5565] hover:bg-[#e5e7eb] flex items-center gap-1">
                    {f}
                    <IconChevronDown className="size-4 opacity-60" />
                  </button>
                ))}
                <button type="button" className="h-9 px-3 rounded-lg text-sm bg-[#f3f3f5] text-[#4a5565] hover:bg-[#e5e7eb] p-2"><IconArrowRight className="size-4" /></button>
              </div>
              {/* Two info cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm">
                  <h3 className="text-base font-medium text-[#0a0a0a] mb-2">File validations</h3>
                  <p className="text-sm text-[#6a7282] mb-4">This tab monitors the health of uploaded files across customers and file types. It highlights whether files are being processed successfully, if validation rules are failing, and provides drill-down details and samples for troubleshooting errors.</p>
                  <ul className="text-sm text-[#6a7282] space-y-2 list-disc list-inside">
                    <li>Start with <strong className="text-[#0a0a0a]">File validations</strong> to see if files are processed successfully.</li>
                    <li>Drill into <strong className="text-[#0a0a0a]">Fail validation details</strong> for failed files to see which rules and fields broke (filtering on Upload ID).</li>
                    <li>Drill into <strong className="text-[#0a0a0a]">File validation - sample</strong> to view example rows with errors for root cause analysis (filtering on Run ID).</li>
                  </ul>
                </div>
                <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm">
                  <h3 className="text-base font-medium text-[#0a0a0a] mb-2">Today uploads</h3>
                  <p className="text-sm text-[#6a7282] mb-2">Files ingested on the current day...</p>
                  <p className="text-3xl font-semibold text-[#0a0a0a]">0</p>
                </div>
              </div>
              {/* Main KPIs */}
              <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm">
                <h3 className="text-base font-medium text-[#0a0a0a] mb-6">Main KPIs - alerting notification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e5e7eb] gap-6">
                  {DATA_HEALTH_KPI_CARDS.map((card, i) => (
                    <div key={card.title} className="p-4 flex flex-col min-h-[240px]">
                      <h4 className="text-sm font-medium text-[#0a0a0a]">{card.title}</h4>
                      <p className="text-xs text-[#6a7282] mt-1">{card.desc}</p>
                      <p className="text-xs text-[#6a7282] mt-2">{card.date}</p>
                      <p className="text-2xl font-semibold text-[#0a0a0a] mt-2">{card.value}</p>
                      <p className="text-xs text-[#6a7282] mt-1">{card.comparison}</p>
                      <DataHealthKpiChart color={card.chartColor} id={i} />
                      <p className="text-xs text-[#6a7282] mt-2">As expected</p>
                      <button type="button" className="text-sm text-[#155dfc] mt-2 underline decoration-[#155dfc] hover:decoration-[#0252cc] w-fit">Analyse change</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* File validations table */}
              <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
                <div className="p-6 pb-4">
                  <h3 className="text-base font-medium text-[#0a0a0a]">File validations</h3>
                  <p className="text-sm text-[#6a7282] mt-1">Shows file upload validations by customer and data type. Each row represents a file uploaded and its validation outcome. Use this table to identify which files were processed, their size, when they were received, and whether they passed or failed validation checks.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f9fafb]">
                        {FILE_VALIDATIONS_COLUMNS.map((col) => (
                          <th key={col} className="text-left py-3 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FILE_VALIDATIONS_ROWS.map((row, idx) => (
                        <tr key={idx} className="border-t border-[#e5e7eb]">
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.customer}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.dataType}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.receivedAt}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${row.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{row.status}</span>
                          </td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.failed}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.rowCount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.fileSize}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.uploadId}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.distinctDates}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.fileName}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.endedAt}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.error}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-[#f9fafb] border-t border-[#e5e7eb] px-4 py-3 flex flex-wrap gap-6">
                  {FILE_VALIDATIONS_SUMMARY.map((s, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-[#6a7282]">{s.label}</span>
                      <span className="text-sm font-semibold text-[#0a0a0a]">{s.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#6a7282] px-4 py-3">Showing 50 of 50 rows</p>
              </div>

              {/* Fail validation details */}
              <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
                <div className="flex items-start justify-between gap-4 p-6 pb-4">
                  <div>
                    <h3 className="text-base font-medium text-[#0a0a0a]">Fail validation details</h3>
                    <p className="text-sm text-[#6a7282] mt-1">Lists detailed validation errors for each file run. Each row corresponds to a specific validation rule that failed for a given data type. Use this table to understand which fields and rules are causing issues.</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">Explore</button>
                    <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f9fafb]">
                        {FAIL_VALIDATION_COLUMNS.map((col) => (
                          <th key={col} className="text-left py-3 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">
                            {col === 'Run datetime' ? (
                              <span className="inline-flex items-center gap-1">
                                {col}
                                <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 12V4M4 8l4-4 4 4" /></svg>
                              </span>
                            ) : (
                              col
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FAIL_VALIDATION_ROWS.map((row, idx) => (
                        <tr key={idx} className={`border-t border-[#e5e7eb] ${idx % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white'}`}>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.customer}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.dataType}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.runDatetime}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.fields}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.rule}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-red-500 text-white">{row.status}</span>
                          </td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.failures}</td>
                          <td className="py-3 px-4 text-[#0a0a0a] bg-blue-50">{row.runId}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.failuresPct}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.rowCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-[#6a7282] px-4 py-3">Showing 55 of 55 rows</p>
              </div>

              {/* File validations - sample */}
              <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
                <div className="flex items-start justify-between gap-4 p-6 pb-4">
                  <div>
                    <h3 className="text-base font-medium text-[#0a0a0a]">File validations - sample</h3>
                    <p className="text-sm text-[#6a7282] mt-1">Shows a 10-row sample of actual records that failed validation checks for a specific run. This is used to view the raw data values that triggered the errors</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] bg-[#f3f3f5] text-[#9ca3af] text-sm cursor-not-allowed" disabled>Explore</button>
                    <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
                  </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[320px]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f9fafb]">
                        {FILE_VALIDATIONS_SAMPLE_COLUMNS.map((col) => (
                          <th key={col} className="text-left py-3 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FILE_VALIDATIONS_SAMPLE_ROWS.map((row, idx) => (
                        <tr key={row.id} className={`border-t border-[#e5e7eb] ${idx % 2 === 1 ? 'bg-[#f8f8f8]' : 'bg-white'}`}>
                          {idx === 0 ? (
                            <>
                              <td rowSpan={FILE_VALIDATIONS_SAMPLE_ROWS.length} className="py-3 px-4 text-[#0a0a0a] align-top">New Demo</td>
                              <td rowSpan={FILE_VALIDATIONS_SAMPLE_ROWS.length} className="py-3 px-4 text-[#0a0a0a] align-top">inventory</td>
                              <td rowSpan={FILE_VALIDATIONS_SAMPLE_ROWS.length} className="py-3 px-4 text-[#0a0a0a] align-top">on_hand_qty</td>
                            </>
                          ) : null}
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.id}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.colorDesc}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.colorId}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.value}</td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-[#e5e7eb]">
                  <div className="flex items-center gap-2 text-sm text-[#6a7282]">
                    <button type="button" className="p-1.5 rounded hover:bg-[#f3f3f5] disabled:opacity-50" aria-label="First page">«</button>
                    <button type="button" className="p-1.5 rounded hover:bg-[#f3f3f5] disabled:opacity-50" aria-label="Previous page">‹</button>
                    <span className="px-2">Page 1 of 1</span>
                    <button type="button" className="p-1.5 rounded hover:bg-[#f3f3f5] disabled:opacity-50" aria-label="Next page">›</button>
                    <button type="button" className="p-1.5 rounded hover:bg-[#f3f3f5] disabled:opacity-50" aria-label="Last page">»</button>
                  </div>
                  <p className="text-sm text-[#6a7282]">Showing 1-11 of 11 items</p>
                </div>
              </div>
            </>
          ) : activeTab === 'Optimiser status' ? (
            <>
              {/* Optimiser status: info banner */}
              {!optimiserBannerDismissed && (
                <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-[#eff6ff] text-[#1e40af]">
                  <IconInfo className="size-5 shrink-0" />
                  <span className="text-sm flex-1">Liveboard needs to be reverified. <button type="button" className="font-medium underline hover:no-underline">Request verification</button></span>
                  <button type="button" onClick={() => setOptimiserBannerDismissed(true)} className="p-1 rounded hover:bg-[#bfdbfe] text-[#1e40af] shrink-0" aria-label="Dismiss">
                    <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5L5 15M5 5l10 10" /></svg>
                  </button>
                </div>
              )}

              {/* Optimiser status: filters */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="relative">
                    <button type="button" onClick={() => setSelectViewOpen((o) => !o)} className="h-9 px-3 rounded-lg text-sm bg-transparent text-[#155dfc] hover:underline flex items-center gap-1">
                      Select view
                      <IconChevronDown className={`size-4 text-[#155dfc] transition-transform ${selectViewOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {selectViewOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setSelectViewOpen(false)} aria-hidden />
                        <div className="absolute left-0 top-full mt-1 z-50 min-w-[180px] bg-white rounded-lg shadow-lg py-2 border border-[#e5e7eb]">
                          <button type="button" onClick={() => setSelectViewOpen(false)} className="w-full px-4 py-2 text-left text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">
                            LPT DC to DC
                          </button>
                          <button type="button" onClick={() => setSelectViewOpen(false)} className="w-full px-4 py-2 text-left text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">
                            Zadig
                          </button>
                          <div className="border-t border-[#e5e7eb] my-2" />
                          <button type="button" onClick={() => setSelectViewOpen(false)} className="w-full px-4 py-2 text-left text-sm text-[#6366f1] hover:bg-[#f3f3f5]">
                            Save view
                          </button>
                          <button type="button" onClick={() => setSelectViewOpen(false)} className="w-full px-4 py-2 text-left text-sm text-[#6366f1] hover:bg-[#f3f3f5]">
                            Manage views
                          </button>
                          <button type="button" onClick={() => setSelectViewOpen(false)} className="w-full px-4 py-2 text-left text-sm text-[#6366f1] hover:bg-[#f3f3f5]">
                            Reset Liveboard
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  {OPTIMISER_STATUS_ACTIVE_CHIPS.map((chip) => (
                    <button key={chip} type="button" className="h-9 px-3 rounded-lg text-sm bg-[#364153] text-white">
                      {chip}
                    </button>
                  ))}
                  {OPTIMISER_STATUS_FILTERS.slice(0, 12).map((f) => (
                    <button key={f} type="button" className="h-9 px-3 rounded-lg text-sm bg-[#f3f3f5] text-[#4a5565] hover:bg-[#e5e7eb] flex items-center gap-1">
                      {f}
                      <IconChevronDown className="size-4 opacity-60" />
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {OPTIMISER_STATUS_FILTERS.slice(12).map((f) => (
                    <button key={f} type="button" className="h-9 px-3 rounded-lg text-sm bg-[#f3f3f5] text-[#4a5565] hover:bg-[#e5e7eb] flex items-center gap-1">
                      {f}
                      <IconChevronDown className="size-4 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Optimiser status: main content cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm">
                    <h3 className="text-base font-medium text-[#0a0a0a] mb-4">Trips overview</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {TRIPS_OVERVIEW_KPIS.map((kpi) => (
                        <div key={kpi.label}>
                          <p className="text-2xl font-semibold text-[#0a0a0a]">{kpi.value}</p>
                          <p className="text-sm text-[#6a7282] mt-1">{kpi.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm">
                    <h3 className="text-base font-medium text-[#0a0a0a] mb-4">Estimated impact</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {ESTIMATED_IMPACT_KPIS.map((kpi) => (
                        <div key={kpi.label}>
                          <p className="text-2xl font-semibold text-[#0a0a0a]">{kpi.value}</p>
                          <p className="text-sm text-[#6a7282] mt-1">{kpi.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm">
                  <h3 className="text-base font-medium text-[#0a0a0a] mb-4">Trip type by value transferred</h3>
                  <TripTypeDonutChart data={TRIP_TYPE_DONUT_DATA} />
                </div>
              </div>

              {/* Trips performance table */}
              <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
                <div className="flex items-start justify-between gap-4 p-6 pb-4">
                  <h3 className="text-base font-medium text-[#0a0a0a]">Trips performance</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">Explore</button>
                    <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
                  </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f9fafb]">
                        <th className="text-left py-3 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">Trip type</th>
                        <th className="text-left py-3 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">From location</th>
                        <th className="text-left py-3 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">To location</th>
                        <th colSpan={9} className="text-left py-3 px-4 font-medium text-[#0a0a0a]">Values</th>
                      </tr>
                      <tr className="bg-[#f9fafb]">
                        <th className="py-2 px-4" />
                        <th className="py-2 px-4" />
                        <th className="py-2 px-4" />
                        {TRIPS_PERFORMANCE_VALUE_COLS.map((col) => (
                          <th key={col} className="text-left py-2 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TRIPS_PERFORMANCE_ROWS.map((row, idx) => (
                        <tr
                          key={idx}
                          className={`border-t border-[#e5e7eb] ${
                            row.level === 'total' || row.level === 'group' || row.level === 'subgroup' ? 'bg-[#f8fafc]' : 'bg-white'
                          }`}
                        >
                          <td className="py-3 px-4 text-[#0a0a0a]">
                            {row.level === 'group' ? (
                              <span className="inline-flex items-center gap-1">
                                <IconChevronDown className="size-4" />
                                {row.tripType}
                              </span>
                            ) : (
                              row.tripType
                            )}
                          </td>
                          <td className="py-3 px-4 text-[#0a0a0a]">
                            {row.level === 'subgroup' ? (
                              <span className="inline-flex items-center gap-1">
                                <IconChevronDown className="size-4" />
                                {row.fromLocation}
                              </span>
                            ) : (
                              row.fromLocation
                            )}
                          </td>
                          <td className="py-3 px-4 text-[#0a0a0a]">{row.toLocation}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.units}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.value}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.revenue}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.costs}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.stockouts}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.consolidated}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.spread}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.products}</td>
                          <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.skus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trips network graph */}
              <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
                  <h3 className="text-base font-medium text-[#0a0a0a]">Trips</h3>
                  <div className="flex items-center gap-2">
                    <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">Explore</button>
                    <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
                  </div>
                </div>
                <div className="p-4">
                  <TripsNetworkGraph />
                </div>
              </div>
            </>
          ) : (
            <>
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {INSIGHTS_ACTIVE_CHIPS.map((chip, i) => (
              <button key={chip} type="button" className={`h-9 px-3 rounded-lg text-sm flex items-center gap-2 ${i === INSIGHTS_ACTIVE_CHIPS.length - 1 ? 'bg-[#364153] text-white' : 'bg-[#e5e7eb] text-[#0a0a0a]'}`}>
                {chip}
                {i === INSIGHTS_ACTIVE_CHIPS.length - 1 && <IconArrowRight className="size-4" />}
              </button>
            ))}
            {INSIGHTS_FILTER_CHIPS.map((chip) => (
              <button key={chip} type="button" className="h-9 px-3 rounded-lg text-sm bg-[#f3f3f5] text-[#4a5565] hover:bg-[#e5e7eb]">
                {chip}
              </button>
            ))}
          </div>

          {/* Metric and Currency titles */}
          <div className="flex items-center gap-6 mb-2">
            <div>
              <p className="text-xs text-[#6a7282]">Metric</p>
              <p className="text-sm font-medium text-[#0a0a0a]">Volume</p>
            </div>
            <div>
              <p className="text-xs text-[#6a7282]">Currency</p>
              <p className="text-sm font-medium text-[#0a0a0a]">EUR</p>
            </div>
          </div>

          {/* Metric cards - single full-width box with 4 sections */}
          <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e5e7eb]">
              {INSIGHTS_METRIC_CARDS.map((card, i) => (
                <div key={card.title} className="p-6 flex flex-col min-h-[280px]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-medium text-[#0a0a0a]">{card.title}</h3>
                      <p className="text-sm text-[#6a7282] mt-0.5">{card.date}</p>
                    </div>
                    {card.hasExplore && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button type="button" className="p-1.5 rounded text-[#4a5565] hover:bg-[#f3f3f5]" aria-label="Document"><IconDocument className="size-4" /></button>
                        <button type="button" className="h-8 px-3 rounded-lg border border-[#e5e7eb] bg-white text-[#155dfc] text-sm font-medium hover:bg-[#f8fafc]">Explore</button>
                        <button type="button" className="p-1.5 rounded text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
                      </div>
                    )}
                  </div>
                  <p className="text-3xl font-semibold text-[#0a0a0a] mt-3">{card.value}</p>
                  <p className="text-sm mt-1 text-[#6a7282]">
                    {card.comparisonDown ? (
                      <><span className="text-[#dc2626]">{card.comparison}</span><span className="text-[#6a7282]">{card.comparisonSuffix}</span></>
                    ) : (
                      card.comparison
                    )}
                  </p>
                  <div className="flex-1" />
                  <InsightsMiniChart variant={card.chartVariant} />
                  <button type="button" className="text-sm text-[#155dfc] mt-3 underline decoration-[#155dfc] hover:decoration-[#0252cc] w-fit">Analyse change</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sales trend chart */}
          <SalesTrendChart />

          {/* Sales performance table */}
          <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] p-6 overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-medium text-[#0a0a0a]">Sales performance</h3>
                <p className="text-sm text-[#6a7282] mt-0.5">Select the comparison period using &apos;Variance&apos; parameter and choose the breakdown selecting the &apos;Retail attribute&apos;</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">Explore</button>
                <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f9fafb]">
                    <th className="text-left py-3 px-4 font-medium text-[#0a0a0a]">Department</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">WTD</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">WTD vs LY</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">WTD vs LY %</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">MTD</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">MTD vs LY</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">MTD vs LY %</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">YTD ↓</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">YTD vs LY</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">YTD vs LY %</th>
                  </tr>
                </thead>
                <tbody>
                  {SALES_PERFORMANCE_ROWS.map((row) => (
                    <tr key={row.dept} className="border-t border-[#e5e7eb]">
                      <td className="py-3 px-4 text-[#0a0a0a]">{row.dept}</td>
                      <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.wtd}</td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.wtdLy} display={row.wtdLy} /></td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.wtdLyPct} display={row.wtdLyPct} suffix="%" /></td>
                      <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.mtd}</td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.mtdLy} display={row.mtdLy} /></td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.mtdLyPct} display={row.mtdLyPct} suffix="%" /></td>
                      <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.ytd}</td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.ytdLy} display={row.ytdLy} /></td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.ytdLyPct} display={row.ytdLyPct} suffix="%" /></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[#e5e7eb] bg-[#f9fafb]">
                    <td className="py-3 px-4 text-[#6a7282] font-medium">UNIQUE COUNT 6</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#0a0a0a]">TOTAL 713</td>
                    <td className="py-3 px-4 text-right"><LyCell val={-703} display={-703} /></td>
                    <td className="py-3 px-4 text-right"><LyCell val={-49.65} display="-49.65" suffix="%" /></td>
                    <td className="py-3 px-4 text-right font-semibold text-[#0a0a0a]">TOTAL 12.79K</td>
                    <td className="py-3 px-4 text-right"><LyCell val={-1280} display="-1.28K" /></td>
                    <td className="py-3 px-4 text-right"><LyCell val={-9.09} display="-9.09" suffix="%" /></td>
                    <td className="py-3 px-4 text-right font-semibold text-[#0a0a0a]">TOTAL 25.65K</td>
                    <td className="py-3 px-4 text-right"><LyCell val={-2510} display="-2.51K" /></td>
                    <td className="py-3 px-4 text-right"><LyCell val={-8.93} display="-8.93" suffix="%" /></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="text-xs text-[#6a7282] mt-3">Showing 6 of 6 rows</p>
          </div>

          {/* Sales performance table 2 - dimension breakdown */}
          <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] p-6 overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-medium text-[#0a0a0a]">Sales performance</h3>
                <p className="text-sm text-[#6a7282] mt-0.5">Select the comparison period using &apos;Variance&apos; parameter and choose the breakdown selecting the &apos;Retail attribute&apos;</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" className="h-9 px-3 rounded-lg border border-[#e5e7eb] text-sm text-[#0a0a0a] hover:bg-[#f3f3f5]">Explore</button>
                <button type="button" className="p-2 rounded-lg text-[#4a5565] hover:bg-[#f3f3f5]"><IconEllipsisVertical /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f9fafb]">
                    <th className="text-left py-3 px-4 font-medium text-[#0a0a0a]">DIMENSION</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">WTD</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">WTD VS LY</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">WTD VS LY%</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">MTD</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">MTD VS LY</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">MTD VS LY%</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">YTD</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">YTD VS LY</th>
                    <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">YTD VS LY%</th>
                  </tr>
                </thead>
                <tbody>
                  {SALES_PERFORMANCE_2_ROWS.map((row) => (
                    <tr key={row.dept} className={`border-t border-[#e5e7eb] ${row.isTotal ? 'bg-[#f9fafb] font-semibold' : ''}`}>
                      <td className="py-3 px-4 text-[#0a0a0a]">{row.dept}</td>
                      <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.wtd}</td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.wtdLy} display={row.wtdLy > 0 ? `+${row.wtdLy}` : row.wtdLy} /></td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.wtdLyPct} display={row.wtdLyPct > 0 ? `+${row.wtdLyPct}` : row.wtdLyPct} suffix="%" /></td>
                      <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.mtd}</td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.mtdLy} display={Math.abs(row.mtdLy) >= 1000 ? `${(row.mtdLy / 1000).toFixed(1)}K` : row.mtdLy > 0 ? `+${row.mtdLy}` : row.mtdLy} /></td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.mtdLyPct} display={row.mtdLyPct > 0 ? `+${row.mtdLyPct}` : row.mtdLyPct} suffix="%" /></td>
                      <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.ytd}</td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.ytdLy} display={Math.abs(row.ytdLy) >= 1000 ? `${(row.ytdLy / 1000).toFixed(1)}K` : row.ytdLy > 0 ? `+${row.ytdLy}` : row.ytdLy} /></td>
                      <td className="py-3 px-4 text-right"><LyCell val={row.ytdLyPct} display={row.ytdLyPct > 0 ? `+${row.ytdLyPct}` : row.ytdLyPct} suffix="%" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <SalesYTDMap />

          {/* Pareto charts: Sales by Location Type & Sales by Department */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ParetoChart title="Sales by Location Type" xAxisLabel="Location attribute" data={PARETO_LOCATION_DATA} hasExplore />
            <ParetoChart title="Sales by Department" xAxisLabel="Product attribute" data={PARETO_DEPT_DATA} hasExplore={false} />
          </div>
            </>
          )}
        </div>
      </div>
    </div>

      {/* Liveboard details modal */}
      {liveboardModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden onClick={() => setLiveboardModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden" role="dialog" aria-labelledby="liveboard-modal-title" aria-modal>
            <h2 id="liveboard-modal-title" className="text-xl font-semibold text-[#0a0a0a] px-6 pt-6 pb-4">Liveboard details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-2">Insights</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-sm font-medium shrink-0">E</span>
                    <span className="text-sm text-[#4a5565]">Created by Ever Sasson • 24 Feb, 2026</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3">Data sources</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9fafb] cursor-pointer">
                      <span className="w-8 h-8 rounded bg-[#e5e7eb] flex items-center justify-center shrink-0">
                        <IconDocument />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[#0a0a0a]">Insights</p>
                        <p className="text-xs text-[#6a7282]">by Ever Sasson • 26 Feb, 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9fafb] cursor-pointer">
                      <span className="w-8 h-8 rounded bg-[#e5e7eb] flex items-center justify-center shrink-0">
                        <IconDocument />
                      </span>
                      <p className="text-sm font-medium text-[#0a0a0a]">ROI for insights</p>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9fafb] cursor-pointer">
                      <span className="w-8 h-8 rounded bg-[#e5e7eb] flex items-center justify-center shrink-0">
                        <IconDocument />
                      </span>
                      <p className="text-sm font-medium text-[#0a0a0a]">Assortment for insights</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-2">Visibility</h3>
                  <p className="text-sm text-[#4a5565]">Discoverable</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-2">Verification status</h3>
                  <p className="text-sm text-[#4a5565]">Unverified</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3">Recent viewers</h3>
                <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                  {LIVEBOARD_RECENT_VIEWERS.map((v, i) => (
                    <div key={`${v.name}-${i}`} className={`flex items-center gap-3 px-3 py-2.5 ${i > 0 ? 'border-t border-[#e5e7eb]' : ''}`}>
                      <span className={`w-8 h-8 rounded-full ${v.color} text-white flex items-center justify-center text-sm font-medium shrink-0`}>{v.initial}</span>
                      <span className="text-sm text-[#0a0a0a]">{v.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 flex justify-end">
              <button type="button" onClick={() => setLiveboardModalOpen(false)} className="h-10 px-5 rounded-lg bg-[#155dfc] text-white text-sm font-medium hover:bg-[#0252cc]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* Optimiser page – Figma 174:2696 (Optimiser-Concepts) */
function OptimiserPage() {
  const [activeTypeFilter, setActiveTypeFilter] = useState('all')
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const typeFilters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'replenishment', label: 'Replenishment', icon: 'replenishment' },
    { id: 'reorder', label: 'Reorder', icon: 'reorder' },
    { id: 'rebalancing', label: 'Rebalancing', icon: 'rebalancing' },
  ]
  const [activeViewOption, setActiveViewOption] = useState('month')
  const viewOptions = [
    { id: 'list', label: 'List', icon: 'list' },
    { id: 'week', label: 'Week', icon: 'week' },
    { id: 'month', label: 'Month', icon: 'month' },
  ]
  const feb2026 = (() => {
    const weeks = []
    let d = new Date(2026, 0, 26)
    for (let w = 0; w < 5; w++) {
      const row = []
      for (let i = 0; i < 7; i++) {
        row.push(d.getDate())
        d.setDate(d.getDate() + 1)
      }
      weeks.push(row)
    }
    return weeks
  })()

  return (
    <div className="flex flex-col gap-6" data-name="Optimiser" data-node-id="174:2696">
      <div className="bg-white border border-[#ebf3ff] rounded-[14px] p-6 flex flex-col gap-5" data-name="Calendar container" data-node-id="174:2767">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <IconCalendarSidebar className="text-[#22272f] size-6 shrink-0" />
            <div>
              <p className="text-[16px] font-medium text-[#0a0a0a] leading-tight">Optimiser schedule</p>
              <p className="text-[14px] font-normal text-[#4b535c]">Perform all job and schedule actions for all your upcoming inventory</p>
            </div>
          </div>
          <button type="button" className="h-10 px-4 rounded-[4px] bg-[#0267ff] text-white text-[16px] font-medium flex items-center gap-2 shrink-0">
            <IconPlus />
            Add Schedule
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="bg-white border border-[#e9eaeb] flex gap-[var(--spacing-s,8px)] items-center p-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] shrink-0 h-12" data-name="segment-control" data-node-id="202:3165">
            {typeFilters.map((f) => {
              const isActive = activeTypeFilter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveTypeFilter(f.id)}
                  className={`flex gap-[var(--spacing-xs,6px)] items-center justify-center max-h-[32px] p-[var(--spacing-s,8px)] rounded-[2px] shrink-0 text-[14px] text-center whitespace-nowrap ${isActive ? 'bg-[#f8f8f8] font-medium text-[#0a0a0a]' : 'font-normal text-[#4b535c]'}`}
                  data-name="Segment element"
                >
                  {f.icon === 'replenishment' && <IconReplenishment className="text-[#22272f] size-4 shrink-0" aria-hidden />}
                  {f.icon === 'reorder' && <IconReorder className="text-[#22272f] size-4 shrink-0" aria-hidden />}
                  {f.icon === 'rebalancing' && <IconRebalancing className="text-[#22272f] size-4 shrink-0" aria-hidden />}
                  <span>{f.label}</span>
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="flex items-center gap-[var(--spacing-s,8px)] h-12 px-[var(--spacing-l,16px)] py-[var(--spacing-m,12px)] rounded-[var(--border-radius-s,4px)] bg-white border border-[#e9eaeb] text-[16px] font-medium text-[#0a0a0a] shrink-0" data-name="Button" data-node-id="202:3228">
              <IconCalendarSidebar className="text-[#22272f] size-4 shrink-0" aria-hidden data-name="icon" data-node-id="I202:3228;12027:34152" />
              <span data-node-id="I202:3228;12027:34153">Event Date</span>
            </button>
            <div className="bg-white border border-[#e9eaeb] flex gap-[var(--spacing-s,8px)] items-center p-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] shrink-0 h-12" data-name="segment-control" data-node-id="203:1343">
              {viewOptions.map((v) => {
                const isActive = activeViewOption === v.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveViewOption(v.id)}
                    className={`flex gap-[var(--spacing-xs,6px)] items-center justify-center max-h-[32px] p-[var(--spacing-s,8px)] rounded-[2px] shrink-0 text-[14px] text-center whitespace-nowrap ${isActive ? 'bg-[#f8f8f8] font-medium text-[#0a0a0a]' : 'font-normal text-[#4b535c]'}`}
                    data-name="Segment element"
                  >
                    {v.icon === 'list' && <IconList className="text-[#22272f] size-4 shrink-0" aria-hidden />}
                    {v.icon === 'week' && <IconCalendarNote className="text-[#22272f] size-4 shrink-0" aria-hidden />}
                    {v.icon === 'month' && <IconCalendarSidebar className="text-[#22272f] size-4 shrink-0" aria-hidden />}
                    <span>{v.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 h-7">
            <button type="button" className="rounded size-7 flex items-center justify-center text-[#0a0a0a] hover:bg-[#f3f4f6]" aria-label="Previous month">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <h2 className="text-[20px] font-semibold text-[#0a0a0a] tracking-tight">February 2026</h2>
            <button type="button" className="rounded size-7 flex items-center justify-center text-[#0a0a0a] hover:bg-[#f3f4f6]" aria-label="Next month">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="border border-[#e5e7eb] rounded-[10px] overflow-hidden">
            <div className="grid grid-cols-7 bg-[#f3f4f6] border-b border-[#e5e7eb]">
              {weekDays.map((day) => (
                <div key={day} className="py-3 text-center text-[14px] font-medium text-[#364153] border-r border-[#e5e7eb] last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {feb2026.map((row, ri) =>
                row.map((date, ci) => (
                  <div key={`${ri}-${ci}`} className={`min-h-[80px] p-2 border-b border-[#e5e7eb] bg-white text-[14px] text-[#0a0a0a] ${ci < 6 ? 'border-r' : ''}`}>
                    {date}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [assignee, setAssignee] = useState({})
  const [optimiserOpen, setOptimiserOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [activeView, setActiveView] = useState('control-panel')
  const [insightsTab, setInsightsTab] = useState('Retail')

  return (
    <div className="h-screen bg-[#f9fafb] flex text-[#0a0a0a] overflow-hidden">
      {/* App shell: fixed sidebar – Figma 14404:7242 OptimiserSidebar/Expanded/Default */}
      <aside className={`min-w-[220px] w-max h-full shrink-0 bg-[#12171e] flex flex-col px-[var(--spacing-l,16px)] py-[var(--spacing-2xl,32px)] overflow-y-auto overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`} data-name="OptimiserSidebar/Expanded/Default" data-node-id="14404:7242">
        <div className="flex flex-col gap-[var(--spacing-2xl,32px)] min-w-0 flex-1 min-h-0" data-name="Container" data-node-id="14404:7243">
        <div className="flex flex-row items-center justify-between gap-2 w-full px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] shrink-0" data-name="Logo container" data-node-id="14404:7244">
          <AutoneLogo />
          <button type="button" className="flex items-center justify-center size-8 rounded-[var(--border-radius-s,4px)] text-white hover:bg-white/10 shrink-0" aria-label="Collapse sidebar" data-name="Icon=Collapse" data-node-id="12206:42115">
            <IconCollapse />
          </button>
        </div>

        <nav className={`flex-1 flex flex-col gap-[var(--spacing-xs,6px)] items-start w-full min-h-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${optimiserOpen || insightsOpen ? 'overflow-visible' : 'overflow-y-auto'}`} data-name="Container" data-node-id="14404:7246">
          <button type="button" onClick={() => setActiveView('control-panel')} className={`h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-medium shrink-0 ${activeView === 'control-panel' ? 'bg-[#0267ff] text-white' : 'text-white hover:bg-white/5'}`} data-name="Sidebar element" data-node-id="14404:7247">
            <IconGrid className={`size-6 shrink-0 ${activeView === 'control-panel' ? 'text-white' : 'text-[#22272f]'}`} aria-hidden />
            <span>Overview</span>
          </button>
          <div className="flex flex-col gap-[var(--spacing-xs,6px)] w-full shrink-0">
            <button
              type="button"
              onClick={() => { setActiveView('insights'); setInsightsTab('Retail'); setInsightsOpen((o) => !o); }}
              className={`h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] shrink-0 ${activeView === 'insights' ? 'bg-[#0267ff] text-white font-medium' : 'font-normal text-white hover:bg-white/5'}`}
              aria-expanded={insightsOpen}
              aria-haspopup="true"
              aria-expanded={insightsOpen}
              aria-haspopup="true"
              data-name="Sidebar element"
              data-node-id="14404:7252"
            >
              <IconBars className={`size-6 shrink-0 ${activeView === 'insights' ? 'text-white' : 'text-[#22272f]'}`} aria-hidden />
              <span className="flex-1 min-w-0 text-left">Insights</span>
              <span className={`ml-auto inline-flex size-5 shrink-0 transition-transform duration-200 ${activeView === 'insights' ? 'text-white' : 'text-white'} ${insightsOpen ? 'rotate-180' : ''}`} aria-hidden data-name="icon" data-node-id="I14404:7252;12203:35389">
                <IconInsightsChevron />
              </span>
            </button>
            {insightsOpen && (
              <div className="flex flex-col gap-[4px] pl-4 pb-2 w-full shrink-0">
                <button type="button" onClick={() => { setActiveView('insights'); setInsightsTab('Buying'); }} className={`min-h-[36px] w-full flex items-center gap-[var(--spacing-s,8px)] px-[var(--spacing-s,8px)] py-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white shrink-0 ${activeView === 'insights' && insightsTab === 'Buying' ? 'bg-[#0267ff]/50' : 'hover:bg-white/5'}`} data-name="Sidebar element">
                  Buying
                </button>
                <button type="button" onClick={() => { setActiveView('insights'); setInsightsTab('Data health'); }} className={`min-h-[36px] w-full flex items-center gap-[var(--spacing-s,8px)] px-[var(--spacing-s,8px)] py-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white shrink-0 ${activeView === 'insights' && insightsTab === 'Data health' ? 'bg-[#0267ff]/50' : 'hover:bg-white/5'}`} data-name="Sidebar element">
                  Data health
                </button>
                <button type="button" onClick={() => { setActiveView('insights'); setInsightsTab('Optimiser status'); }} className={`min-h-[36px] w-full flex items-center gap-[var(--spacing-s,8px)] px-[var(--spacing-s,8px)] py-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white shrink-0 ${activeView === 'insights' && insightsTab === 'Optimiser status' ? 'bg-[#0267ff]/50' : 'hover:bg-white/5'}`} data-name="Sidebar element">
                  Optimiser status
                </button>
                <button type="button" onClick={() => setActiveView('insights')} className="min-h-[36px] w-full flex items-center gap-[var(--spacing-s,8px)] px-[var(--spacing-s,8px)] py-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element">
                  <span className="flex-1 min-w-0 text-left">Forecast inspector</span>
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded shrink-0">Premium</span>
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[var(--spacing-xs,6px)] w-full shrink-0">
            <button
              type="button"
              onClick={() => { setActiveView('optimiser'); setOptimiserOpen((o) => !o); }}
              className={`h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] shrink-0 ${activeView === 'optimiser' ? 'bg-[#0267ff] text-white font-medium' : 'font-normal text-white hover:bg-white/5'}`}
              aria-expanded={optimiserOpen}
              aria-haspopup="true"
              data-name="Sidebar element"
              data-node-id="14404:7825"
            >
              <span className="relative shrink-0 size-6" data-name="Icon=new reorder" data-node-id="I14404:7825;12203:35386">
                <IconOptimiser className={`size-full ${activeView === 'optimiser' ? 'text-white' : 'text-[#22272f]'}`} aria-hidden />
              </span>
              <span className="flex flex-1 min-w-0 flex-col justify-center text-left text-[14px] leading-[100%]" data-node-id="I14404:7825;12203:35387">Optimiser</span>
              <span className={`relative shrink-0 size-5 inline-flex transition-transform duration-200 ${activeView === 'optimiser' ? 'text-white' : 'text-white'} ${optimiserOpen ? 'rotate-180' : ''}`} aria-hidden data-name="icon" data-node-id="I14404:7825;12203:35389">
                <IconInsightsChevron />
              </span>
            </button>
            {optimiserOpen && (
              <div className="flex flex-col gap-[4px] pl-4 pb-2 w-full shrink-0">
                <button type="button" className="min-h-[36px] w-full flex items-center gap-[var(--spacing-s,8px)] px-[var(--spacing-s,8px)] py-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element" data-node-id="14404:7250">
                  Replenishment
                </button>
                <button type="button" className="min-h-[36px] w-full flex items-center gap-[var(--spacing-s,8px)] px-[var(--spacing-s,8px)] py-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element" data-node-id="14404:7790">
                  Reorder
                </button>
                <button type="button" className="min-h-[36px] w-full flex items-center gap-[var(--spacing-s,8px)] px-[var(--spacing-s,8px)] py-[var(--spacing-xxs,4px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element" data-node-id="14404:7793">
                  Rebalancing
                </button>
              </div>
            )}
          </div>
          <button type="button" onClick={() => { setActiveView('insights'); setInsightsTab('Buying'); setInsightsOpen(true); }} className="h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element" data-node-id="14404:7251">
            <IconBuy className="text-[#22272f] size-6 shrink-0" aria-hidden />
            <span>Buying</span>
          </button>
          <div className="h-px w-full bg-white/10 shrink-0 my-0" role="separator" data-name="divider" />
          {!optimiserOpen && !insightsOpen && (
            <>
              <button type="button" className="h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element" data-node-id="14404:7254">
                <IconGridDots className="text-[#22272f] size-6 shrink-0" aria-hidden />
                <span>Assortment</span>
              </button>
              <button type="button" className="h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element" data-node-id="14404:7255">
                <IconCalendarSidebar className="text-[#22272f] size-6 shrink-0" aria-hidden />
                <span>Events</span>
              </button>
              <button type="button" className="h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element">
                <IconGears className="text-[#22272f] size-6 shrink-0" aria-hidden />
                <span>Parameters</span>
              </button>
              <button type="button" className="h-10 w-full flex items-center gap-[var(--spacing-m,12px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] rounded-[var(--border-radius-s,4px)] text-left text-[14px] font-normal text-white hover:bg-white/5 shrink-0" data-name="Sidebar element">
                <IconTeam className="text-[#22272f] size-6 shrink-0" aria-hidden />
                <span>Team</span>
              </button>
            </>
          )}
        </nav>

        {/* Sidebar footer – Figma 145:935 */}
        <div className="flex flex-col gap-[var(--spacing-xs,6px)] items-start w-full shrink-0 mt-auto" data-name="Container" data-node-id="145:935">
          <button type="button" className="flex h-[40px] w-full shrink-0 items-center justify-center gap-[var(--spacing-m,12px)] rounded-[var(--border-radius-s,4px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] text-left text-[14px] font-normal text-white hover:bg-white/5" data-name="Sidebar element" data-node-id="145:936">
            <IconClockSidebar className="text-emerald-400 size-6 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1 text-white">Data age</span>
            <span className="shrink-0 text-[14px] font-medium text-emerald-400">12h</span>
            <IconChevronRight className="text-[#22272f] size-5 shrink-0" aria-hidden />
          </button>
          <div className="h-px w-full shrink-0 bg-white/10" role="separator" data-name="divider" />
          <button type="button" className="flex h-[40px] w-full shrink-0 items-center justify-center gap-[var(--spacing-m,12px)] rounded-[var(--border-radius-s,4px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] text-left text-[14px] font-normal text-white hover:bg-white/5" data-name="Sidebar element" data-node-id="145:938">
            <IconChat className="text-[#22272f] size-6 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1">Chat with us</span>
          </button>
          <button type="button" className="flex h-[40px] w-full shrink-0 items-center justify-center gap-[var(--spacing-m,12px)] rounded-[var(--border-radius-s,4px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] text-left text-[14px] font-normal text-white hover:bg-white/5" data-name="Sidebar element" data-node-id="145:939">
            <IconDollar className="text-[#22272f] size-6 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1">Currency</span>
          </button>
          <button type="button" className="flex h-[40px] w-full shrink-0 items-center justify-center gap-[var(--spacing-m,12px)] rounded-[var(--border-radius-s,4px)] px-[var(--spacing-l,16px)] py-[var(--spacing-s,8px)] text-left text-[14px] font-normal text-white hover:bg-white/5" data-name="Sidebar element" data-node-id="145:940">
            <IconFlagUK className="size-6 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1">English</span>
          </button>
          <button type="button" className="flex w-full shrink-0 items-center gap-[var(--spacing-s,8px)] rounded-[var(--border-radius-l,8px)] py-0 pl-0 pr-[var(--spacing-l,16px)] text-left shadow-[0px_8px_25px_0px_rgba(0,0,0,0.03)] hover:bg-white/5" data-name="user-avatar" data-node-id="145:941">
            <div className="relative size-[40px] shrink-0 overflow-hidden rounded-[var(--border-radius-l,8px)]" data-name="Avatar">
              <img src="/avatar-user.jpg" alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[2px] items-start text-left" data-node-id="I145:941;12206:42131">
              <p className="truncate w-full font-sans text-[16px] font-medium font-normal leading-normal tracking-[0] text-white" data-node-id="I145:941;12206:42132">Charles Morenno</p>
              <p className="truncate w-full font-sans text-[10px] font-normal leading-normal tracking-[0] text-[#878D94]" data-node-id="I145:941;12206:42133">charlesmorenno@gmail.com</p>
            </div>
            <IconChevronRight className="text-[#22272f] size-5 shrink-0" aria-hidden />
          </button>
        </div>
        </div>
      </aside>

      {/* App shell: fixed top bar + scrollable main */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0 w-full overflow-hidden">
        <div className="shrink-0">
          <TopBar
            title={activeView === 'optimiser' ? 'Optimiser' : activeView === 'insights' ? 'Insights' : 'Overview'}
            subtitle={activeView === 'optimiser' ? 'Automate replenishment, reordering, and rebalancing with scheduled inventory optimisation.' : activeView === 'insights' ? 'Analytics and reporting for your retail performance.' : "Overview area, your 'morning check-in' to prioritise and manage inventory, scheduling and more"}
          />
        </div>

        {/* Main: scrollable content panel */}
        <main className="flex-1 min-h-0 min-w-0 w-full pl-8 pr-8 pb-12 overflow-y-auto overflow-x-hidden">
        {activeView === 'optimiser' ? (
          <div className="pt-6">
            <OptimiserPage />
          </div>
        ) : activeView === 'insights' ? (
          <div className="pt-6">
            <InsightsPage activeTab={insightsTab} onTabChange={setInsightsTab} />
          </div>
        ) : (
        <>
        {/* Page header – welcome/date; filters, search, actions */}
        <header className="w-[calc(100%+4rem)] min-w-0 -ml-8 bg-white border-b border-[#e5e7eb] pt-6 pb-4 px-8">
          <div className="flex flex-wrap items-center gap-3 w-full min-w-0">
            <div className="shrink-0 mr-2 min-w-0">
              <h1 className="text-xl font-semibold text-[#0a0a0a] leading-tight">Welcome back, Tamir</h1>
              <p className="text-sm text-[#6a7282]">Monday, February 23, 2026</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 ml-auto min-w-0 justify-end">
              <span className="text-sm text-[#4a5565] shrink-0">Filter views by</span>
              {['All products', 'All locations', 'All user types'].map((label) => (
                <button key={label} type="button" className="h-10 shrink-0 bg-[#f3f3f5] rounded-lg pl-3 pr-3 flex items-center justify-between gap-2 text-sm text-[#0a0a0a] min-w-[100px]">
                  <span className="truncate">{label}</span>
                  <IconChevronDown className="shrink-0" />
                </button>
              ))}
              <div className="flex items-center w-[280px] sm:w-[325px] shrink-0 h-[42px] rounded-[10px] border border-[#d1d5dc] bg-white overflow-hidden">
                <span className="pl-3 flex items-center justify-center text-[#4a5565] shrink-0" aria-hidden>
                  <IconSearch />
                </span>
                <input type="text" placeholder="Search insights..." className="flex-1 min-w-0 h-full pl-2 pr-4 bg-transparent border-0 text-base text-[#0a0a0a] placeholder:text-[#0a0a0a]/50 tracking-[-0.01em] outline-none" />
              </div>
              <NotificationButton />
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#7c3aed] flex items-center justify-center text-white text-base font-medium">T</div>
            </div>
          </div>
        </header>

        <div className="pt-6 space-y-6">
          {/* Inventory schedule */}
          <section className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <IconCalendar className="text-[#4a5565]" />
                <div>
                  <h2 className="text-lg text-[#0a0a0a]">Inventory schedule</h2>
                  <p className="text-sm text-[#6a7282]">Time-critical inventory movements this week</p>
                </div>
              </div>
              <button type="button" className="shrink-0 h-10 px-4 rounded-lg bg-[#155dfc] text-white text-sm font-medium flex items-center gap-2">
                <IconPlus />
                Add schedule
              </button>
            </div>
            <div className="flex items-center gap-4 pb-3 mb-4 border-b border-[#e5e7eb] text-sm text-[#4a5565]">
              <span>Priority:</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ff6467]" /> Critical</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ff8904]" /> High</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#fdc700]" /> Medium</span>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {WEEK_DAYS.map((d) => (
                <div key={`${d.day}-${d.date}`} className={`rounded-lg border min-h-[200px] flex flex-col ${d.today ? 'bg-[#eff6ff] border-[#8ec5ff]' : 'bg-[#f9fafb] border-[#e5e7eb]'}`}>
                  <div className="p-3 border-b border-[#d1d5dc]">
                    <p className={`text-xs ${d.today ? 'text-[#155dfc]' : 'text-[#6a7282]'}`}>{d.day}</p>
                    <p className={`text-lg font-normal ${d.today ? 'text-[#1447e6]' : 'text-[#101828]'}`}>{d.date}</p>
                    {d.today && <p className="text-xs text-[#155dfc]">Today</p>}
                  </div>
                  <div className="p-2 flex flex-col gap-2 flex-1">
                    {d.events.map((ev, i) => (
                      <EventCard key={i} {...ev} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Two columns: Alerts + Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Needs your attention */}
            <section className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg text-[#0a0a0a]">Needs your attention / What happened while you were away</h2>
                  <span className="text-xs bg-red-100 text-[#c10007] px-2 py-1 rounded-full">4 items</span>
                </div>
                <button type="button" className="text-sm text-[#155dfc] flex items-center gap-1">See all - inbox? <IconArrowRight /></button>
              </div>
              <div className="space-y-3">
                {ALERTS.map((alert, i) => (
                  <div key={i} className={`rounded-lg border-2 p-4 flex gap-3 ${alert.type === 'critical' ? 'bg-red-50 border-red-500' : 'border-[#e5e7eb]'}`}>
                    <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${alert.type === 'critical' ? 'bg-red-600 text-white' : alert.type === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100'}`}>
                      <IconWarning />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="text-sm font-medium text-[#0a0a0a]">{alert.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${alert.type === 'critical' ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-800'}`}>{alert.badge}</span>
                      </div>
                      <p className="text-sm text-[#4a5565] mt-1">{alert.body}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <select value={assignee[i] ?? 'Unassigned'} onChange={(e) => setAssignee((s) => ({ ...s, [i]: e.target.value }))} className="text-sm rounded-lg border border-[#e5e7eb] bg-[#f3f3f5] px-3 py-1.5">
                          <option>Unassigned</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* autone recommendations */}
            <section className="rounded-[14px] border border-[#bedbff] bg-gradient-to-br from-[#eff6ff] to-[#eef2ff] p-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg text-[#0a0a0a]">autone recommendations</h2>
                  <span className="text-xs bg-[#155dfc] text-white px-2 py-1 rounded-full">AI-powered</span>
                </div>
                <button type="button" className="text-sm text-[#155dfc] flex items-center gap-1">See all <IconArrowRight /></button>
              </div>
              <div className="space-y-3">
                {RECOMMENDATIONS.map((rec, i) => (
                  <div key={i} className="bg-white border border-[#bedbff] rounded-lg p-4 flex gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-[#155dfc]">
                      {i === 0 && <IconTrendUp />}
                      {i === 1 && <IconLocation />}
                      {i === 2 && <IconTag />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-[#0a0a0a]">{rec.title}</h3>
                      <p className="text-sm text-[#4a5565] mt-1">{rec.body}</p>
                      <p className="text-sm text-[#1447e6] mt-1">{rec.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Surfacing autone value */}
          <section className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
              <div>
                <h2 className="text-lg text-[#0a0a0a]">Surfacing autone value</h2>
                <p className="text-sm text-[#6a7282]">Impact of using autone</p>
              </div>
              <button type="button" className="text-sm text-[#155dfc] flex items-center gap-1">See all <IconArrowRight /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUE_CARDS.map((card, i) => (
                <div key={i} className={`rounded-lg border border-[#e5e7eb] p-6 relative overflow-hidden ${card.bg}`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-[#0a0a0a] ${card.iconBg}`}>
                    <card.icon />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-normal tracking-tight text-[#0a0a0a]">{card.value}</span>
                    <span className="text-sm text-[#4a5565]">{card.unit}</span>
                  </div>
                  <h3 className="text-sm font-medium text-[#364153] mt-1">{card.title}</h3>
                  <p className="text-sm text-[#4a5565] mt-2">{card.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        </>
        )}
        </main>
      </div>
    </div>
  )
}
