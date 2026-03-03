import {
  IconChevronDown,
  IconSearch,
  NotificationButton,
  IconWarning,
  IconArrowRight,
  IconShield,
  IconPound,
  IconChart,
  IconTrendUp,
  IconLocation,
  IconTag,
} from '../components/icons'
import { OptimiserScheduleSection } from '../components/OptimiserScheduleSection'

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

export default function OverviewPage({ assignee = {}, setAssignee, onAddJob }) {
  return (
    <>
      <header className="w-[calc(100%+4rem)] min-w-0 -ml-8 bg-white border-b border-[#e5e7eb] pt-6 pb-4 px-8">
        <div className="flex flex-wrap items-center gap-3 w-full min-w-0">
          <div className="shrink-0 mr-2 min-w-0">
            <h1 className="text-xl font-medium text-[#0a0a0a] leading-tight">Welcome back, Tamir</h1>
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
          </div>
        </div>
      </header>

      <div className="pt-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <OptimiserScheduleSection onAddJob={onAddJob} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <section className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
            <div>
              <h2 className="text-lg text-[#0a0a0a]">Surfacing autone value</h2>
              <p className="text-sm text-[#6a7282]">Impact of using autone</p>
            </div>
            <button type="button" className="text-sm text-[#155dfc] flex items-center gap-1">See all <IconArrowRight /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_CARDS.map((card, i) => {
              const Icon = card.icon
              return (
                <div key={i} className={`rounded-lg border border-[#e5e7eb] p-6 relative overflow-hidden ${card.bg}`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-[#0a0a0a] ${card.iconBg}`}>
                    <Icon />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-normal tracking-tight text-[#0a0a0a]">{card.value}</span>
                    <span className="text-sm text-[#4a5565]">{card.unit}</span>
                  </div>
                  <h3 className="text-sm font-medium text-[#364153] mt-1">{card.title}</h3>
                  <p className="text-sm text-[#4a5565] mt-2">{card.body}</p>
                </div>
              )
            })}
          </div>
        </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
