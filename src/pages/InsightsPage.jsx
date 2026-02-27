import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { IconChevronDown, IconArrowRight } from '../components/icons'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const TABS = [
  'Period',
  'Buying',
  'Sales Health',
  'Read makers',
  'Business KPIs',
  'Assessment APIs',
  'Data exploration',
]

const FILTER_CHIPS = [
  { label: 'Sales Volume (All)', active: false },
  { label: 'Product (All)', active: false },
  { label: 'Product attribute (Retail)', active: true },
]

const KPI_CARDS = [
  {
    title: 'Daily sales',
    value: '551',
    sub: 'Comparison vs previous period',
    period: 'Week of 23/02/2026',
    sparkline: [30, 45, 35, 55, 40, 60, 50],
  },
  {
    title: 'Sales WTD',
    value: '713',
    sub: 'Compared to last year same period',
    period: 'Week of 23/02/2026',
    sparkline: [20, 35, 50, 45, 55, 65, 70],
  },
  {
    title: 'Sales MTD',
    value: '12.79K',
    sub: 'Month to date performance',
    period: 'Feb 2026',
    sparkline: [10, 25, 40, 55, 70, 80, 85],
  },
  {
    title: 'Sales YTD',
    value: '25.65K',
    sub: 'Year to date summary',
    period: '2026',
    sparkline: [5, 15, 30, 45, 60, 75, 90],
  },
]

const SALES_TABLE_ROWS = [
  { dimension: 'Department', wtd: '2,150', wtdLy: '+162', wtdLyPct: '+0.22%', mtd: '28.5K', mtdLy: '-1,300', mtdLyPct: '-4.50%', ytd: '312K', ytdLy: '+8,200', ytdLyPct: '+2.70%' },
  { dimension: 'Product family', wtd: '1,890', wtdLy: '-189', wtdLyPct: '-10.00%', mtd: '24.2K', mtdLy: '+1,100', mtdLyPct: '+4.75%', ytd: '285K', ytdLy: '+12,400', ytdLyPct: '+4.55%' },
  { dimension: 'Apparel', wtd: '890', wtdLy: '+45', wtdLyPct: '+5.30%', mtd: '11.2K', mtdLy: '-220', mtdLyPct: '-1.93%', ytd: '134K', ytdLy: '+3,100', ytdLyPct: '+2.37%' },
  { dimension: 'Jewelry', wtd: '420', wtdLy: '-21', wtdLyPct: '-4.76%', mtd: '5.8K', mtdLy: '+180', mtdLyPct: '+3.21%', ytd: '72K', ytdLy: '+1,800', ytdLyPct: '+2.56%' },
  { dimension: 'Footwear', wtd: '580', wtdLy: '+12', wtdLyPct: '+2.11%', mtd: '6.9K', mtdLy: '-95', mtdLyPct: '-1.36%', ytd: '85K', ytdLy: '+2,200', ytdLyPct: '+2.66%' },
  { dimension: 'Homeware', wtd: '260', wtdLy: '+8', wtdLyPct: '+3.08%', mtd: '4.6K', mtdLy: '+120', mtdLyPct: '+2.67%', ytd: '21K', ytdLy: '+500', ytdLyPct: '+2.44%' },
]

const LINE_CHART_POINTS = [
  { ly: 40, ty: 35 },
  { ly: 55, ty: 60 },
  { ly: 45, ty: 50 },
  { ly: 70, ty: 75 },
  { ly: 60, ty: 65 },
  { ly: 80, ty: 85 },
  { ly: 75, ty: 90 },
]

const LOCATION_BARS = [
  { label: 'Store', value: 12.4, pct: 52 },
  { label: 'Online/Delivery', value: 11.5, pct: 48 },
]

const DEPARTMENT_BARS = [
  { label: 'Apparel', value: 8.2 },
  { label: 'Jewelry', value: 5.1 },
  { label: 'Footwear', value: 6.8 },
]

function Sparkline({ data }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120
  const h = 32
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline fill="none" stroke="#0267ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  )
}

function KPICard({ title, value, sub, period, sparkline }) {
  return (
    <div className="bg-white rounded-[4px] border border-neutral-200 p-4 flex flex-col gap-2">
      <div className="text-sm font-medium text-neutral-700">{title}</div>
      <div className="text-[28px] font-bold text-neutral-900">{value}</div>
      <div className="text-xs text-neutral-700">{sub}</div>
      <div className="text-xs text-neutral-700">{period}</div>
      <div className="mt-auto pt-2">
        <Sparkline data={sparkline} />
      </div>
    </div>
  )
}

function PctCell({ value }) {
  const isNeg = value.startsWith('-')
  const isPos = value.startsWith('+') && parseFloat(value) !== 0
  return (
    <span className={isNeg ? 'text-red-500' : isPos ? 'text-emerald-600' : 'text-neutral-900'}>
      {value}
    </span>
  )
}

function SalesMap() {
  return (
    <div className="h-80 w-full">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
        <ZoomableGroup center={[0, 20]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties?.name || geo.properties?.admin || ''
                const highlight = ['United States of America', 'United States', 'Canada', 'China', 'Japan', 'United Kingdom', 'Germany', 'France', 'Brazil', 'Australia'].includes(name)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={highlight ? '#ea580c' : '#e5e7eb'}
                    stroke="#d1d5db"
                    strokeWidth={0.5}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState('Period')

  return (
    <div className="flex flex-col gap-6 bg-neutral-100 min-h-full pb-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-neutral-200 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm font-medium rounded-[4px] transition-colors ${
              activeTab === tab ? 'bg-blue-50 text-[#0267ff]' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip) => (
          <span
            key={chip.label}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-sm ${
              chip.active ? 'bg-neutral-200 text-neutral-900' : 'bg-white border border-neutral-200 text-neutral-700'
            }`}
          >
            {chip.label}
            {chip.active ? (
              <IconArrowRight className="size-4 text-neutral-600" />
            ) : (
              <span className="text-neutral-400 cursor-pointer hover:text-neutral-600">×</span>
            )}
          </span>
        ))}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card) => (
          <KPICard key={card.title} {...card} />
        ))}
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-[4px] border border-neutral-200 p-6">
        <p className="text-sm text-neutral-700 mb-4">
          Select the comparison period using &quot;Period&quot; and &quot;comparison&quot; menu.
        </p>
        <div className="flex justify-end gap-4 mb-4">
          <span className="flex items-center gap-2 text-sm">
            <span className="w-8 h-0.5 bg-[#0267ff]" />
            LY
          </span>
          <span className="flex items-center gap-2 text-sm">
            <span className="w-8 h-0.5 bg-blue-300" />
            TY
          </span>
        </div>
        <div className="h-48 w-full">
          <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#0267ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={LINE_CHART_POINTS.map((p, i) => `${(i / 6) * 380 + 10},${140 - (p.ly / 100) * 120}`).join(' ')}
            />
            <polyline
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={LINE_CHART_POINTS.map((p, i) => `${(i / 6) * 380 + 10},${140 - (p.ty / 100) * 120}`).join(' ')}
            />
          </svg>
        </div>
        <div className="flex gap-4 mt-2 text-xs text-neutral-600">
          <span>Today</span>
          <span>Category [All]</span>
          <span>Daily</span>
        </div>
      </div>

      {/* Sales performance tables */}
      {[1, 2].map((n) => (
        <div key={n} className="bg-white rounded-[4px] border border-neutral-200 overflow-hidden">
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">Sales performance</h3>
              <p className="text-sm text-neutral-700">Select the component comparison using &quot;Retail volume total&quot;</p>
            </div>
            <button type="button" className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900">
              Legend
              <IconChevronDown className="size-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Dimension</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">WTD</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">WTD VS LY</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">WTD VS LY %</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">MTD</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">MTD VS LY</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">MTD VS LY %</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">YTD</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">YTD VS LY</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-700">YTD VS LY %</th>
                </tr>
              </thead>
              <tbody>
                {SALES_TABLE_ROWS.map((row) => (
                  <tr key={row.dimension} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-2.5 px-4 text-neutral-900">{row.dimension}</td>
                    <td className="py-2.5 px-4 text-right text-neutral-900">{row.wtd}</td>
                    <td className="py-2.5 px-4 text-right">{row.wtdLy}</td>
                    <td className="py-2.5 px-4 text-right"><PctCell value={row.wtdLyPct} /></td>
                    <td className="py-2.5 px-4 text-right text-neutral-900">{row.mtd}</td>
                    <td className="py-2.5 px-4 text-right">{row.mtdLy}</td>
                    <td className="py-2.5 px-4 text-right"><PctCell value={row.mtdLyPct} /></td>
                    <td className="py-2.5 px-4 text-right text-neutral-900">{row.ytd}</td>
                    <td className="py-2.5 px-4 text-right">{row.ytdLy}</td>
                    <td className="py-2.5 px-4 text-right"><PctCell value={row.ytdLyPct} /></td>
                  </tr>
                ))}
                <tr className="bg-neutral-50 font-semibold">
                  <td className="py-3 px-4 text-neutral-900">TOTAL SALES</td>
                  <td className="py-3 px-4 text-right">4,210</td>
                  <td className="py-3 px-4 text-right">+215</td>
                  <td className="py-3 px-4 text-right"><PctCell value="+5.38%" /></td>
                  <td className="py-3 px-4 text-right">52.1K</td>
                  <td className="py-3 px-4 text-right">+2,100</td>
                  <td className="py-3 px-4 text-right"><PctCell value="+4.20%" /></td>
                  <td className="py-3 px-4 text-right">608K</td>
                  <td className="py-3 px-4 text-right">+28,400</td>
                  <td className="py-3 px-4 text-right"><PctCell value="+4.90%" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* World map */}
      <div className="bg-white rounded-[4px] border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-base font-semibold text-neutral-900">Sales YTD</h3>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
            <button type="button" className="size-8 rounded-[4px] bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50">+</button>
            <button type="button" className="size-8 rounded-[4px] bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50">−</button>
          </div>
          <SalesMap />
          <div className="absolute right-4 bottom-4 flex items-center gap-2 text-xs text-neutral-600">
            <span>Low</span>
            <div className="w-24 h-2 rounded-full bg-gradient-to-r from-orange-200 via-orange-400 to-orange-700" />
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Bar charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[4px] border border-neutral-200 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">Sales by Location Type</h3>
          <div className="flex gap-8 items-end h-40">
            {LOCATION_BARS.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-neutral-900">{bar.pct}%</span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-12 bg-[#0267ff] rounded-[4px]"
                    style={{ height: `${(bar.value / 14) * 120}px` }}
                  />
                </div>
                <span className="text-sm text-neutral-700">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-[4px] border border-neutral-200 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">Sales by Department</h3>
          <div className="flex gap-6 items-end h-40">
            {DEPARTMENT_BARS.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-neutral-900">{bar.value}K</span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-12 bg-[#0267ff] rounded-[4px]"
                    style={{ height: `${(bar.value / 9) * 120}px` }}
                  />
                </div>
                <span className="text-sm text-neutral-700 truncate max-w-full">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
