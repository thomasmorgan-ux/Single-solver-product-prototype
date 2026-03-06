import { useState } from 'react'
import { IconSearch, IconChevronDown, IconGears, IconShare, IconDocument } from '../components/icons'

export default function ScheduleDetailPage() {
  const [activeTab, setActiveTab] = useState('trips')
  const [tripType, setTripType] = useState('rebalancing')
  const [includeZeroTransfers, setIncludeZeroTransfers] = useState(true)

  return (
    <div className="pt-6 flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[20px] md:text-[24px] font-medium text-[#0a0a0a]">
              Europe monthly rebal
            </h1>
            <span className="text-[13px] text-[#4b535c]">
              Created: 24/02/2026
            </span>
            <button
              type="button"
              className="text-[13px] font-medium text-[#0267ff] hover:underline"
            >
              View scope
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="h-9 w-9 flex items-center justify-center rounded-[4px] border border-[#e5e7eb] bg-white text-[#4b535c] hover:bg-[#f3f4f6]"
            aria-label="Share"
          >
            <IconShare />
          </button>
          <button
            type="button"
            className="h-9 w-9 flex items-center justify-center rounded-[4px] border border-[#e5e7eb] bg-white text-[#4b535c] hover:bg-[#f3f4f6]"
            aria-label="Download"
          >
            <IconDocument />
          </button>
          <button
            type="button"
            className="h-10 px-4 rounded-[4px] bg-[#0267ff] text-white text-[14px] font-medium flex items-center gap-2 hover:bg-[#0252cc]"
          >
            Submit recommendations
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <div className="border-b border-[#e5e7eb]">
          <nav className="flex items-center gap-6 h-11">
            {[
              { id: 'products', label: 'Products' },
              { id: 'locations', label: 'Locations' },
              { id: 'trips', label: 'Trips' },
            ].map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 text-[14px] font-medium border-b-2 ${
                    isActive
                      ? 'text-[#0a0a0a] border-[#0267ff]'
                      : 'text-[#4b535c] border-transparent hover:text-[#0a0a0a]'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {activeTab === 'trips' ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#4b535c]">Trip type:</span>
                  <div className="flex rounded-[4px] border border-[#e5e7eb] bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setTripType('rebalancing')}
                      className={`px-3 py-2 text-[14px] font-medium border-r border-[#e5e7eb] ${
                        tripType === 'rebalancing'
                          ? 'bg-[#f7f7f7] text-[#0a0a0a]'
                          : 'text-[#4b535c] hover:bg-[#f0f0f0] bg-white'
                      }`}
                    >
                      Rebalancing
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('replenishment')}
                      className={`px-3 py-2 text-[14px] font-medium ${
                        tripType === 'replenishment'
                          ? 'bg-[#f7f7f7] text-[#0a0a0a]'
                          : 'text-[#4b535c] hover:bg-[#f0f0f0] bg-white'
                      }`}
                    >
                      Replenishment
                    </button>
                  </div>
                </div>
                <div className="w-px h-6 bg-[#e5e7eb]" aria-hidden />
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#4b535c]">Include zero transfers</span>
                  <button
                    type="button"
                    onClick={() => setIncludeZeroTransfers((v) => !v)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex items-center shrink-0 ${
                      includeZeroTransfers ? 'bg-[#0267ff]' : 'bg-[#e5e7eb]'
                    }`}
                    aria-pressed={includeZeroTransfers}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        includeZeroTransfers ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center h-10 w-[240px] rounded-[4px] border border-[#e9eaeb] bg-white pl-3 pr-3">
                  <IconSearch className="text-[#4b535c] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 min-w-0 pl-2 border-0 bg-transparent text-[14px] text-[#0a0a0a] outline-none placeholder:text-[#4b535c]"
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-10 px-4 rounded-[4px] border border-[#e9eaeb] bg-white text-[14px] text-[#22272f] shrink-0"
                >
                  Revenue increase
                  <IconChevronDown className="shrink-0 text-[#22272f] size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  className="h-10 w-10 flex items-center justify-center rounded-[4px] border border-[#e9eaeb] bg-white text-[#22272f] hover:bg-[#f3f4f6] shrink-0"
                  aria-label="Filters"
                >
                  <IconSearch className="size-4" />
                </button>
                <button
                  type="button"
                  className="h-10 w-10 flex items-center justify-center rounded-[4px] border border-[#e9eaeb] bg-white text-[#22272f] hover:bg-[#f3f4f6] shrink-0"
                  aria-label="Settings"
                >
                  <IconGears className="size-5 shrink-0" />
                </button>
              </div>
            </div>

            <div className="border border-dashed border-[#e5e7eb] rounded-[8px] p-6 text-[14px] text-[#4b535c]">
              Trip-level details will appear here.
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-[#e5e7eb] rounded-[8px] p-6 text-[14px] text-[#4b535c]">
            {activeTab === 'products' ? 'Products view coming soon.' : 'Locations view coming soon.'}
          </div>
        )}
      </div>
    </div>
  )
}

