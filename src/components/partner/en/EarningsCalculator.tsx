import { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import {
  PRICE_BASE,
  PRICE_PREMIUM,
  PRICE_PRO,
  RATE_HIGH,
  RATE_LOW,
  RATE_THRESHOLD,
  formatMoney,
} from './data'

const MAX_PER_TIER = 40

interface Row {
  key: 'base' | 'pro' | 'premium'
  name: string
  price: number
}

const ROWS: Row[] = [
  { key: 'base', name: 'Habibi', price: PRICE_BASE },
  { key: 'pro', name: 'Habibi Pro', price: PRICE_PRO },
  { key: 'premium', name: 'Habibi Premium', price: PRICE_PREMIUM },
]

/** Client counter for one plan: −/+ and a slider. */
function Counter({
  label,
  price,
  value,
  onChange,
}: {
  label: string
  price: number
  value: number
  onChange: (v: number) => void
}) {
  const clamp = (v: number) => Math.min(MAX_PER_TIER, Math.max(0, v))

  return (
    <div className="rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-300 hover:border-white/25">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="mt-0.5 text-xs text-white/45">{formatMoney(price)} per month</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Remove one ${label} client`}
            onClick={() => onChange(clamp(value - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/35 hover:text-white active:scale-95 disabled:opacity-30"
            disabled={value === 0}
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-lg font-semibold tabular-nums text-white">
            {value}
          </span>
          <button
            type="button"
            aria-label={`Add one ${label} client`}
            onClick={() => onChange(clamp(value + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/35 hover:text-white active:scale-95 disabled:opacity-30"
            disabled={value === MAX_PER_TIER}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={MAX_PER_TIER}
        value={value}
        aria-label={`${label} clients`}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-emerald-400"
      />
    </div>
  )
}

export default function EarningsCalculator() {
  // Starting point mirrors the copy: 5 clients on Habibi Pro.
  const [counts, setCounts] = useState({ base: 0, pro: 5, premium: 0 })

  const { total, rate, mrr, monthly, yearly, left } = useMemo(() => {
    const total = counts.base + counts.pro + counts.premium
    const rate = total >= RATE_THRESHOLD ? RATE_HIGH : RATE_LOW
    const mrr = counts.base * PRICE_BASE + counts.pro * PRICE_PRO + counts.premium * PRICE_PREMIUM
    const monthly = mrr * rate
    return {
      total,
      rate,
      mrr,
      monthly,
      yearly: monthly * 12,
      left: Math.max(0, RATE_THRESHOLD - total),
    }
  }, [counts])

  const top = rate === RATE_HIGH
  const progress = Math.min(100, (total / RATE_THRESHOLD) * 100)

  return (
    <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] via-black/40 to-black/50 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* Input */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            How many clients do you have
          </p>
          <div className="flex flex-col gap-3">
            {ROWS.map((row) => (
              <Counter
                key={row.key}
                label={row.name}
                price={row.price}
                value={counts[row.key]}
                onChange={(v) => setCounts((c) => ({ ...c, [row.key]: v }))}
              />
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-center">
          <div
            className={`rounded-2xl border p-6 transition-all duration-300 ${
              top
                ? 'border-emerald-400/40 bg-gradient-to-b from-emerald-400/[0.14] via-emerald-400/[0.05] to-transparent shadow-[0_0_36px_-12px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(52,211,153,0.3)]'
                : 'border-white/14 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-white/55">Your rate</span>
              <span
                key={rate}
                className={`text-2xl font-semibold [animation:priceIn_0.35s_cubic-bezier(0.16,1,0.3,1)] ${
                  top ? 'text-emerald-300' : 'text-white'
                }`}
              >
                {Math.round(rate * 100)}%
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm text-white/55">Your income per month</p>
              <p
                key={monthly}
                className="mt-1 text-4xl font-semibold tracking-tight text-white [animation:priceIn_0.4s_cubic-bezier(0.16,1,0.3,1)] sm:text-5xl"
              >
                {formatMoney(monthly)}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-xs text-white/45">Per year</p>
                <p className="mt-1 text-lg font-medium text-white">{formatMoney(yearly)}</p>
              </div>
              <div>
                <p className="text-xs text-white/45">Client revenue</p>
                <p className="mt-1 text-lg font-medium text-white">{formatMoney(mrr)} / mo</p>
              </div>
            </div>
          </div>

          {/* Progress to 30% */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-white/50">
              <span>
                {total} / {RATE_THRESHOLD} clients
              </span>
              <span className={top ? 'text-emerald-300' : ''}>
                {top
                  ? '30% across your whole active base'
                  : `${left} more ${left === 1 ? 'client' : 'clients'} to reach 30%`}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  top ? 'bg-emerald-400' : 'bg-white/45'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/40">
              Indicative estimate: commission is earned on subscriptions that are actually paid.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

