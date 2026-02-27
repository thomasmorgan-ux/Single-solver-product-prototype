import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'

// Icons used only by InsightsPage
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <rect x="3.5" y="8" width="13" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6 8V5a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const IconAI = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10 2v3M10 15v3M2 10h3M15 10h3M5.05 5.05l2.1 2.1M12.85 12.85l2.1 2.1M5.05 14.95l2.1-2.1M12.85 7.15l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const IconShare = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M15 10v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5M10 12V3M10 3l3 3M10 3L7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconDocument = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M4 2h8l4 4v12H4V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10h8M6 13h8M6 16h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const IconEllipsisVertical = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <circle cx="10" cy="4" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="10" cy="16" r="1.5" fill="currentColor" />
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

const TRIPS_DETAILS_VALUE_COLS = ['RRP', 'Stock before from', 'Stock after from', 'WOC before from', 'WOC after from', 'Sales rate from', 'Coverage h']
const TRIPS_DETAILS_ROWS = [
  { from: 'AEROPUERTO', to: 'ECI - DIAGONAL', productId: 'W26-0502-002-700', skuId: 'W26-0502-002-700...', units: '1', value: '79.9', revenue: '30.65', rrp: '79.9', stockBefore: '5', stockAfter: '4', wocBefore: '30.55', wocAfter: '24.44', salesRate: '0.18', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - DIAGONAL', productId: 'W26-0505-024-300', skuId: 'W26-0505-024-300..', units: '1', value: '25.9', revenue: '24.03', rrp: '25.9', stockBefore: '8', stockAfter: '7', wocBefore: '11.95', wocAfter: '10.46', salesRate: '0.67', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - PLAZA CATALUN', productId: 'W26-0502-002-700', skuId: 'W26-0502-002-700...', units: '1', value: '79.9', revenue: '38.37', rrp: '79.9', stockBefore: '5', stockAfter: '4', wocBefore: '30.55', wocAfter: '24.44', salesRate: '0.16', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - PLAZA CATALUN', productId: 'W26-0502-002-700', skuId: 'W26-0502-002-700...', units: '1', value: '79.9', revenue: '64.1', rrp: '79.9', stockBefore: '2', stockAfter: '1', wocBefore: '17.44', wocAfter: '8.72', salesRate: '0.11', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - ZARAGOZA', productId: 'S26-0502-001-500', skuId: 'S26-0502-001-500-01', units: '1', value: '139.9', revenue: '34.13', rrp: '139.9', stockBefore: '2', stockAfter: '1', wocBefore: '20.72', wocAfter: '10.36', salesRate: '0.1', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - ZARAGOZA', productId: 'S28-0602-001-500-...', skuId: 'S28-0602-001-500-...', units: '1', value: '139.9', revenue: '25.71', rrp: '139.9', stockBefore: '2', stockAfter: '1', wocBefore: '26.87', wocAfter: '13.44', salesRate: '0.07', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - ZARAGOZA', productId: 'W26-0480-011-700', skuId: 'W26-0480-011-700-', units: '1', value: '129.9', revenue: '27.07', rrp: '129.9', stockBefore: '3', stockAfter: '2', wocBefore: '63.91', wocAfter: '42.61', salesRate: '0.05', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - ZARAGOZA', productId: 'W26-0502-012-700', skuId: 'W26-0602-012-700...', units: '10', value: '799', revenue: '296.92', rrp: '79.9', stockBefore: '4', stockAfter: '2', wocBefore: '18.22', wocAfter: '9.11', salesRate: '0.22', coverage: '' },
  { from: 'AEROPUERTO', to: 'ECI - ZARAGOZA', productId: 'W26-0502-012-700...', skuId: 'W26-0502-012-700...', units: '10', value: '799', revenue: '344.83', rrp: '79.9', stockBefore: '4', stockAfter: '3', wocBefore: '17.64', wocAfter: '13.23', salesRate: '0.23', coverage: '' },
  { from: 'FRANCESC MACIA ILLA', to: 'STORES CATALUNYA', productId: 'W26-0502-002-700', skuId: 'W26-0502-002-700', units: '10', value: '799', revenue: '244.24', rrp: '79.9', stockBefore: '5', stockAfter: '4', wocBefore: '28.7', wocAfter: '22.96', salesRate: '0.17', coverage: '' },
  { from: 'FRANCESC MACIA ILLA', to: 'STORES CATALUNYA', productId: 'S26-0423-007-606-...', skuId: 'S26-0423-007-606-...', units: '2', value: '199.8', revenue: '106.07', rrp: '99.9', stockBefore: '2', stockAfter: '0', wocBefore: '12.32', wocAfter: '0', salesRate: '0.16', coverage: '' },
  { from: 'FRANCESC MACIA ILLA', to: 'STORES CATALUNYA', productId: 'S26-0423-007-505', skuId: 'S26-0423-007-505-', units: '1', value: '99.9', revenue: '37.89', rrp: '99.9', stockBefore: '3', stockAfter: '2', wocBefore: '17.96', wocAfter: '11.97', salesRate: '0.17', coverage: '' },
  { from: 'FRANCESC MACIA ILLA', to: 'STORES CATALUNYA', productId: 'W26-0502-002-700', skuId: 'W26-0502-002-700...', units: '1', value: '79.9', revenue: '24.17', rrp: '79.9', stockBefore: '2', stockAfter: '1', wocBefore: '21.63', wocAfter: '10.81', salesRate: '0.09', coverage: '' },
  { from: 'FRANCESC MACIA ILLA', to: 'STORES CATALUNYA', productId: 'W26-0502-002-700', skuId: 'W26-0502-002-700', units: '1', value: '79.9', revenue: '41.91', rrp: '79.9', stockBefore: '3', stockAfter: '1', wocBefore: '11.2', wocAfter: '5.6', salesRate: '0.18', coverage: '' },
  { from: 'PUERTO VENECIA RAMBLA NEW', to: 'ZARAGOZA CENTRE', productId: 'W26-0505-024-300', skuId: 'W26-0506-024-300..', units: '1', value: '25.9', revenue: '21.03', rrp: '25.9', stockBefore: '8', stockAfter: '7', wocBefore: '11.95', wocAfter: '10.46', salesRate: '0.67', coverage: '' },
  { from: 'SANT CUGAT', to: 'SANT CUGAT CENTRE', productId: 'W26', skuId: 'W26-0502-012-700.', units: '10', value: '799', revenue: '588.07', rrp: '79.9', stockBefore: '4', stockAfter: '2', wocBefore: '18.22', wocAfter: '9.11', salesRate: '0.22', coverage: '' },
  { from: 'SANT CUGAT', to: 'SANT CUGAT CENTRE', productId: 'W26-0502-012-700', skuId: 'W26-0502-012-700.', units: '2', value: '159.8', revenue: '57.03', rrp: '79.9', stockBefore: '5', stockAfter: '4', wocBefore: '29.13', wocAfter: '19.42', salesRate: '0.21', coverage: '' },
  { from: 'SANT CUGAT', to: 'SANT CUGAT STORE', productId: 'W26-0502-002-700', skuId: 'W26-0502-002-700...', units: '10', value: '799', revenue: '458.28', rrp: '79.9', stockBefore: '2', stockAfter: '1', wocBefore: '16.1', wocAfter: '8.05', salesRate: '0.12', coverage: '' },
  { from: 'Aix en Provence', to: 'B.HV Rivoli', productId: 'A1387810', skuId: 'A1397810TU', units: '2', value: '190', revenue: '84.45', rrp: '95', stockBefore: '3', stockAfter: '2', wocBefore: '27.97', wocAfter: '18.65', salesRate: '0.11', coverage: '' },
  { from: 'Aix en Provence', to: 'B.HV Rivoli', productId: 'A1387826', skuId: 'A1397826TU', units: '4', value: '380', revenue: '221.94', rrp: '95', stockBefore: '5', stockAfter: '2', wocBefore: '342.34', wocAfter: '138.94', salesRate: '0.01', coverage: '' },
  { from: 'Cap 3000', to: 'NICE CENTRE', productId: 'A1387810', skuId: 'A1397810TU', units: '2', value: '190', revenue: '179.06', rrp: '95', stockBefore: '3', stockAfter: '2', wocBefore: '24.21', wocAfter: '16.14', salesRate: '0.12', coverage: '' },
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

              {/* Trips details table */}
              <div className="mt-6 bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-sm">
                <div className="px-6 pt-6 pb-4">
                  <h3 className="text-base font-medium text-[#0a0a0a]">Trips details</h3>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f9fafb]">
                        <th className="text-left py-3 px-4 font-medium text-[#0a0a0a]">From location</th>
                        <th className="text-left py-3 px-4 font-medium text-[#0a0a0a]">To location</th>
                        <th className="text-left py-3 px-4 font-medium text-[#0a0a0a]">Product ID</th>
                        <th className="text-left py-3 px-4 font-medium text-[#0a0a0a]">Sku ID</th>
                        <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">Units transferred</th>
                        <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">Value transferred</th>
                        <th className="text-right py-3 px-4 font-medium text-[#0a0a0a]">
                          <span className="inline-flex items-center gap-1">Revenue increase<svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 4v8M4 10l4 4 4-4" /></svg></span>
                        </th>
                        <th colSpan={7} className="text-left py-3 px-4 font-medium text-[#0a0a0a]">Values</th>
                      </tr>
                      <tr className="bg-[#f9fafb]">
                        <th className="py-2 px-4" /><th className="py-2 px-4" /><th className="py-2 px-4" /><th className="py-2 px-4" /><th className="py-2 px-4" /><th className="py-2 px-4" /><th className="py-2 px-4" />
                        {TRIPS_DETAILS_VALUE_COLS.map((col) => (
                          <th key={col} className="text-right py-2 px-4 font-medium text-[#0a0a0a] whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const rows = TRIPS_DETAILS_ROWS
                        const fromSpans = rows.map((_, i) => {
                          let n = 1
                          while (i + n < rows.length && rows[i + n].from === rows[i].from) n++
                          return n
                        })
                        const toSpans = rows.map((_, i) => {
                          let n = 1
                          const from = rows[i].from
                          while (i + n < rows.length && rows[i + n].from === from && rows[i + n].to === rows[i].to) n++
                          return n
                        })
                        return rows.map((row, idx) => (
                          <tr key={idx} className={`border-t border-[#e5e7eb] ${idx % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white'}`}>
                            {(idx === 0 || row.from !== rows[idx - 1].from) && (
                              <td rowSpan={fromSpans[idx]} className="py-3 px-4 text-[#0a0a0a] align-top">{row.from}</td>
                            )}
                            {(idx === 0 || row.from !== rows[idx - 1].from || row.to !== rows[idx - 1].to) && (
                              <td rowSpan={toSpans[idx]} className="py-3 px-4 text-[#0a0a0a] align-top">{row.to}</td>
                            )}
                            <td className="py-3 px-4 text-[#0a0a0a]">{row.productId}</td>
                            <td className="py-3 px-4 text-[#0a0a0a]">{row.skuId}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.units}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.value}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.revenue}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.rrp}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.stockBefore}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.stockAfter}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.wocBefore}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.wocAfter}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.salesRate}</td>
                            <td className="py-3 px-4 text-right text-[#0a0a0a]">{row.coverage}</td>
                          </tr>
                        ))
                      })()}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-[#e5e7eb]">
                  <p className="text-sm text-[#6a7282]">Showing 1,000 of many rows</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[#e5e7eb] overflow-hidden">
                    <div className="h-full rounded-full bg-[#6b7280]" style={{ width: '8%' }} />
                  </div>
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

export default InsightsPage
