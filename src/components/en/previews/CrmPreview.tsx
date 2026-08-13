import {
  ChevronDown,
  ChevronRight,
  Printer,
  MoreHorizontal,
  Bell,
  Search,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'

/* CRM interface mockup in English (LTR) — a rich alternative to the crm-preview.png screenshot.
   Light theme matching the real product UI. */

const FIELDS_CLIENT: [string, string][] = [
  ['Name', 'Ahmed Mohammed Al-Sayed'],
  ['Country', '🇪🇬 Egypt'],
  ['Language', 'Arabic / English'],
  ['WhatsApp', '+20 100 123 4567'],
  ['Phone', '+20 100 123 4567'],
  ['Email', 'ahmed@email.com'],
  ['Marital status', 'Family'],
  ['Family members', '4'],
  ['City of residence', 'Cairo'],
  ['Account manager', 'Abdullah'],
]

const FIELDS_INTEREST: [string, string][] = [
  ['Purchase purpose', 'To live in'],
  ['City', 'Madinah'],
  ['District', 'Center / near the Haram'],
  ['Property type', 'Apartment'],
  ['Rooms', '3 rooms'],
  ['Budget', 'SAR 1,500,000 – 2,000,000'],
  ['Payment method', 'Cash'],
  ['Buying readiness', '1–3 months'],
  ['Property of interest', 'Madinah Residence #245'],
]

const QUALIFICATION: [string, string, string][] = [
  ['Budget confirmed', 'Yes', 'yes'],
  ['Funds available', 'Yes', 'yes'],
  ['Buyer is decision-maker', 'Yes', 'yes'],
  ['Ready to travel to Saudi Arabia', 'Maybe', 'maybe'],
  ['Needs financing', 'No', 'no'],
  ['Needs help with paperwork', 'Yes', 'yes'],
]

const SOURCE: [string, string][] = [
  ['Primary source', 'Instagram'],
  ['Campaign', 'Medina Property July 2026'],
  ['Ad', '3BR Apartment Near Haram'],
  ['UTM', 'medina_july_3br'],
  ['Cost per lead', '$18.50'],
  ['Cost per qualified lead', '$32.10'],
]

const FUNNEL: [string, 'done' | 'active' | 'todo'][] = [
  ['New lead', 'done'],
  ['Contacted', 'done'],
  ['Qualified', 'active'],
  ['Property selection', 'todo'],
  ['Viewing / visit', 'todo'],
  ['Negotiation', 'todo'],
  ['Reservation', 'todo'],
  ['Contract', 'todo'],
  ['Payment', 'todo'],
  ['Deal won', 'todo'],
]

const SIDEBAR: [string, string][] = [
  ['Source', 'Instagram Ads'],
  ['Priority', 'High'],
  ['Region', 'Madinah'],
  ['Next contact', '31.07.2026 15:00'],
  ['Last contact', '30.07.2026 12:30'],
  ['Created', '30.07.2026 10:15'],
  ['Modified', '30.07.2026 12:30'],
]

const HISTORY: { date: string; channel: string; text: string; by: string }[] = [
  {
    date: '30.07.2026 12:30',
    channel: 'WhatsApp',
    text: "Customer is interested in a 3-room apartment near the Prophet's Mosque. Budget up to SAR 2M. Sent 5 options.",
    by: 'Abdullah',
  },
  {
    date: '29.07.2026 16:45',
    channel: 'WhatsApp',
    text: 'Customer said they plan to travel to Madinah in August.',
    by: 'Abdullah',
  },
  {
    date: '28.07.2026 11:20',
    channel: 'Call',
    text: 'Clarified: buying for the family to live in. Needs a 3-room apartment.',
    by: 'Abdullah',
  },
]

const TABS = [
  'Overview',
  'Customer',
  'Request',
  'Properties',
  'Communication',
  'Deal',
  'Tasks',
  'Documents',
  'Notes',
]

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="shrink-0 text-[13px] text-slate-500">{label}</span>
      <span className="text-right text-[13px] font-medium text-slate-800">{value}</span>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="mb-2 text-sm font-semibold text-slate-900">{title}</h4>
      {children}
    </div>
  )
}

const yesNoColor = (t: string) =>
  t === 'yes'
    ? 'bg-emerald-50 text-emerald-600'
    : t === 'no'
      ? 'bg-rose-50 text-rose-600'
      : 'bg-amber-50 text-amber-600'

export default function CrmPreview() {
  return (
    <div
      dir="ltr"
      className="w-[1180px] max-w-full overflow-hidden rounded-xl bg-slate-50 font-geist text-slate-800 shadow-2xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">Habibi</span>
          <span className="hidden items-center gap-1.5 text-[13px] text-slate-400 sm:flex">
            <span>CRM</span>
            <ChevronRight size={13} />
            <span>Lead</span>
            <ChevronRight size={13} />
            <span className="text-slate-600">LEAD-2026-0237</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-400 md:flex">
            <Search size={14} />
            <span>Search or type a command (⌘ + G)</span>
          </div>
          <span className="hidden text-[13px] text-slate-500 sm:inline">Help</span>
          <Bell size={16} className="text-slate-400" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            A
          </span>
        </div>
      </div>

      {/* Record header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-slate-900">Ahmed Mohammed Al-Sayed</h3>
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            Qualified <ChevronDown size={12} />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-medium text-slate-600">
            Create <ChevronDown size={12} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <Printer size={15} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={15} />
          </span>
          <span className="rounded-lg bg-blue-600 px-4 py-1.5 text-[13px] font-semibold text-white">
            Save
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-slate-200 bg-white px-5">
        {TABS.map((t, i) => (
          <span
            key={t}
            className={`border-b-2 py-2.5 text-[13px] ${
              i === 0
                ? 'border-blue-600 font-semibold text-blue-600'
                : 'border-transparent text-slate-500'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Body: 3 columns */}
      <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-[200px_1fr_220px]">
        {/* Side column */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">Assigned to</div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                AB
              </span>
              <span className="text-[13px] font-medium text-slate-800">Abdullah</span>
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">Status</div>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Qualified
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            {SIDEBAR.map(([l, v]) => (
              <div key={l} className="border-b border-slate-50 py-1.5 last:border-0">
                <div className="text-[11px] text-slate-400">{l}</div>
                <div className="text-[13px] font-medium text-slate-700">{v}</div>
              </div>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-3">
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Lead score</span>
                <span className="font-semibold text-slate-600">87 / 100</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 w-[87%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle column */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card title="Customer info">
            {FIELDS_CLIENT.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white">
                <MessageCircle size={13} /> WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Phone size={13} /> Call
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Mail size={13} /> Email
              </span>
            </div>
          </Card>

          <Card title="Property interest">
            {FIELDS_INTEREST.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
            <span className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
              View properties (5)
            </span>
          </Card>

          <Card title="Lead qualification">
            {QUALIFICATION.map(([l, v, t]) => (
              <div key={l} className="flex items-center justify-between py-1.5">
                <span className="text-[13px] text-slate-500">{l}</span>
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${yesNoColor(t)}`}>
                  {v}
                </span>
              </div>
            ))}
          </Card>

          <Card title="Lead source">
            {SOURCE.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card title="Pipeline stage">
            <div className="space-y-2">
              {FUNNEL.map(([label, state]) => (
                <div key={label} className="flex items-center gap-2 text-[13px]">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      state === 'active'
                        ? 'bg-blue-600'
                        : state === 'done'
                          ? 'bg-slate-300'
                          : 'border border-slate-300'
                    }`}
                  />
                  <span
                    className={
                      state === 'active'
                        ? 'font-semibold text-blue-600'
                        : state === 'done'
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    }
                  >
                    {label}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-2 text-[13px]">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-400">Lost</span>
              </div>
            </div>
          </Card>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="mb-2 text-[11px] text-slate-400">Deal probability</div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-amber-400 border-l-slate-100">
              <div>
                <div className="text-lg font-bold text-slate-800">65%</div>
                <div className="text-[10px] text-slate-400">Medium</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 text-[11px] text-slate-400">Expected deal value</div>
            <div className="text-lg font-bold text-emerald-600">SAR 1,750,000</div>
          </div>
        </div>
      </div>

      {/* Communication log + next action */}
      <div className="px-5 pb-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Communication log</h4>
          <div className="space-y-3">
            {HISTORY.map((h) => (
              <div key={h.date} className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-[11px] text-slate-400">{h.channel}</span>
                  <div>
                    <div className="text-[11px] text-slate-400">{h.date}</div>
                    <div className="text-[13px] text-slate-700">{h.text}</div>
                  </div>
                </div>
                <span className="shrink-0 text-[12px] text-slate-500">{h.by}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-amber-50 p-3">
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold text-slate-700">Next action:</span>
              <span className="text-slate-600">Call the customer — 31.07.2026 15:00</span>
            </div>
            <div className="flex items-center gap-3 text-[12px]">
              <span className="text-slate-500">Owner: Abdullah</span>
              <span className="rounded-md border border-blue-200 bg-white px-3 py-1 font-medium text-blue-600">
                Open task
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
