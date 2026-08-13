import {
  BarChart3,
  Factory,
  Globe,
  Package,
  ShoppingCart,
  Target,
  Users,
  Wallet,
  Warehouse,
  Wrench,
} from 'lucide-react'
import CrmPreview from '../../en/previews/CrmPreview'
import PurchasesPreview from '../../en/previews/PurchasesPreview'
import WarehousePreview from '../../en/previews/WarehousePreview'
import ProductionPreview from '../../en/previews/ProductionPreview'
import FinancePreview from '../../en/previews/FinancePreview'
import HrPreview from '../../en/previews/HrPreview'
import ProjectsPreview from '../../en/previews/ProjectsPreview'
import ServicePreview from '../../en/previews/ServicePreview'
import PosPreview from '../../en/previews/PosPreview'
import SiteLeadsPreview from '../../en/previews/SiteLeadsPreview'
import type { ModulePageData } from '../types'

/* English module pages registry (/en/modules/:slug).
   Content mirrors the Russian pages; interface sections embed live HTML previews. */

export const EN_MODULE_PAGES: Record<string, ModulePageData> = {
  crm: {
    slug: 'crm',
    icon: Target,
    title: 'CRM & sales',
    lead: 'All leads, customers and deals in one system. Nothing gets lost, and every step of the customer journey is visible in real time.',
    pills: ['Single customer base', 'Sales pipeline', 'Ad spend control', 'Team performance'],
    pains: [
      {
        icon: '💬',
        title: 'Leads live in WhatsApp and DMs',
        text: 'Enquiries arrive in messengers, personal phones and comments. Some of them simply get lost in the chats.',
      },
      {
        icon: '🗂️',
        title: 'The customer base is in people’s heads',
        text: 'Every manager keeps “their” customers in notes and Excel. When a manager leaves, the customers leave with them.',
      },
      {
        icon: '❓',
        title: 'Deals without statuses',
        text: 'Nobody knows what stage a customer is at, who should call them back, or why a deal has stalled.',
      },
      {
        icon: '📞',
        title: 'Calls are never logged',
        text: 'Phone agreements are recorded nowhere. “But I told him” is the only argument left.',
      },
      {
        icon: '📣',
        title: 'Advertising flies blind',
        text: 'Money goes into Instagram and Google Ads, but how many leads turned into sales — nobody knows.',
      },
      {
        icon: '⏰',
        title: 'Slow replies',
        text: 'By the time a manager “gets to” the enquiry, the customer has already bought from a competitor who answered first.',
      },
    ],
    chaos: {
      lead: 'Chaos in sales is not an “inconvenience”. It is a direct loss of money every month.',
      stats: [
        { value: '~30%', text: 'of leads are lost when enquiries are not captured in a single system' },
        { value: '×2', text: 'longer to process an order when it is handed over manually between people' },
        { value: 'up to 20%', text: 'of profit is eaten by process chaos, mistakes and lost customers' },
        { value: '1st', text: 'whoever replies to the customer first makes the sale. Speed decides' },
      ],
      example: {
        before:
          'Do the maths: if you receive 100 leads a month with an average ticket of $500, losing 30% of them means ',
        accent: 'up to $15,000 of missed revenue every month',
        after: '.',
      },
    },
    about: {
      lead: 'One place where all of the company’s leads, customers and deals live. Every enquiry is captured automatically, and every deal has a stage, an owner and a next action.',
      cards: [
        {
          title: '🎯 No lead ever gets lost',
          text: 'Enquiries from the website, messengers and ads land in the system instantly and are assigned to a manager.',
        },
        {
          title: '👤 The whole customer at a glance',
          text: 'The full history: contacts, interests, conversations, calls, invoices and purchases — in one card.',
        },
        {
          title: '📊 Sales under control',
          text: 'The pipeline shows how many deals are at each stage, where they get stuck and who owns them.',
        },
        {
          title: '💰 Advertising measured in money',
          text: 'Every lead shows its source and cost — you know exactly which ads bring sales.',
        },
      ],
    },
    capabilities: [
      {
        title: '360° customer card',
        lead: 'Everything about the customer on one screen. Any manager can pick up a deal in a minute.',
        cards: [
          {
            title: 'Contacts and profile',
            text: 'Name, country and language, WhatsApp, phone, email, city, marital status — and the account manager.',
          },
          {
            title: 'Customer interest',
            text: 'What exactly they want to buy: purchase purpose, city and district, property or product type, budget, payment method, buying readiness.',
          },
          {
            title: 'Communication log',
            text: 'A journal of every touchpoint: calls, messages, meetings. Plus a “next action” — for example, “Call the customer”.',
          },
        ],
        note: 'The result: the customer base belongs to the company, not to individual managers. A staff change no longer means losing customers.',
      },
      {
        title: 'Sales pipeline',
        lead: 'Every deal moves through clear stages — from new lead to payment. You can see exactly where deals get stuck.',
        flow: ['New lead', 'Contacted', 'Qualified', 'Proposal / selection', 'Viewing / meeting', 'Deal won'],
        cards: [
          {
            title: 'Deal probability',
            text: 'Every deal has a probability score and an expected value. The sales forecast is built on numbers, not gut feeling.',
          },
          {
            title: 'Next action',
            text: 'Every deal always has a next step and an owner. “I forgot to call back” never happens again.',
          },
          {
            title: 'Loss reasons',
            text: 'Lost deals are recorded with a reason. You see why customers walk away — and fix exactly that.',
          },
        ],
      },
      {
        title: 'Lead qualification',
        lead: 'Managers spend their time on hot customers, not on everyone at once.',
        cards: [
          {
            title: 'Qualification checklist',
            text: 'Budget confirmed, funds available, the buyer is the decision-maker, ready to buy, needs financing or help with paperwork.',
          },
          {
            title: 'Lead score',
            text: 'The system shows the “temperature” of every lead. Hot ones go to work first, cold ones go into nurturing.',
          },
          {
            title: 'Clear priorities',
            text: 'A manager always knows who to call right now. The team’s effort goes where the chance of a sale is highest.',
          },
        ],
      },
      {
        title: 'Sources and ad ROI',
        lead: 'Every lead shows where it came from and what it cost. Your ad budget stops being a black box.',
        cards: [
          {
            title: 'Source of every lead',
            text: 'Instagram, Google Ads, website, WhatsApp, referrals. Campaign, ad and UTM tags are captured — down to the exact creative.',
          },
          {
            title: 'Cost in real money',
            text: 'The system calculates cost per lead (e.g. $18.50) and cost per qualified lead ($32.10). You see which channel brings customers.',
          },
          {
            title: 'A budget that works',
            text: 'Switch off channels that don’t sell and double down on those that do — the same budget starts bringing more customers.',
          },
        ],
      },
    ],
    Preview: CrmPreview,
    previewTitle: 'This is what CRM looks like in Habibi',
    solve: [
      {
        was: 'Leads get lost in WhatsApp, DMs and sticky notes',
        now: 'Every enquiry automatically becomes a lead with an owner',
      },
      {
        was: 'The customer base lives in managers’ phones',
        now: 'A single base belongs to the company, with full history preserved',
      },
      {
        was: 'No one knows what stage deals are at or why they stall',
        now: 'A pipeline with stages, probability and a next action for every deal',
      },
      {
        was: 'Ad money is spent blindly',
        now: 'Cost per lead and sales per channel — in hard numbers',
      },
      {
        was: 'The owner learns about problems after the fact',
        now: 'Every manager’s and the whole team’s sales are visible in real time',
      },
    ],
    money: [
      {
        title: 'More leads reach the sale',
        text: 'Recovering even part of the ~30% of lost leads means revenue growth with zero extra ad spend.',
      },
      {
        title: 'Higher conversion to deals',
        text: 'A fast first reply, stage control and a next action on every deal — more enquiries turn into money.',
      },
      {
        title: 'Repeat sales from your base',
        text: 'Customer segments, purchase history and interests — the foundation for repeat sales and upsells, the cheapest money in business.',
      },
      {
        title: 'A more efficient ad budget',
        text: 'Money is reallocated to channels that actually sell. Your cost per customer goes down.',
      },
    ],
    ai: {
      title: 'AI agents will take over the manager’s routine',
      lead: 'AI agents are coming to Habibi soon — automating the entire routine of a sales manager, from lead intake to sending a commercial proposal.',
      flow: ['Lead intake', 'Qualification', 'Customer replies', 'Offer selection', 'Commercial proposal'],
      cards: [
        {
          title: '🤖 Instant lead processing',
          text: 'The AI agent takes the enquiry, fills in the customer card and asks qualifying questions — around the clock, no days off.',
        },
        {
          title: '📝 A ready proposal in minutes',
          text: 'The agent assembles a commercial proposal matched to the customer’s request and budget — the manager just reviews and sends.',
        },
        {
          title: '🎯 Managers only sell',
          text: 'The routine goes to AI; the team keeps negotiations and closing. One manager handles several times more customers.',
        },
      ],
    },
    together: [
      {
        title: 'CRM + Website & leads',
        text: 'Every website enquiry instantly becomes a lead in CRM — no manual copying.',
      },
      {
        title: 'CRM + Inventory',
        text: 'Managers see real stock levels and never sell what isn’t there.',
      },
      {
        title: 'CRM + Finance',
        text: 'Invoices, payments and customer debt — right in the customer card. Receivables under control.',
      },
      {
        title: 'CRM + Service & support',
        text: 'The customer’s support history is visible to sales — a happy customer buys again.',
      },
    ],
    industries: {
      list: [
        'Services & agencies',
        'Retail',
        'Wholesale',
        'Manufacturing',
        'Real estate',
        'Medicine & clinics',
        'Beauty salons',
        'Auto services',
        'Education',
        'IT companies',
        'Tourism & hotels',
        'E-commerce',
      ],
      note: 'Habibi’s recommendation: start with CRM, sales and finance — then add inventory, purchasing, manufacturing and HR as you grow.',
    },
    tariff: { headline: 'CRM is available on the free plan', freeIncludes: true },
    cta: {
      title: 'Start for free today',
      text: 'Set up CRM in a single day — and within a week you will see every lead, every deal and every advertising dollar.',
    },
  },

  purchases: {
    slug: 'purchases',
    icon: Package,
    title: 'Purchases',
    lead: 'Transparent supplier selection and control over prices and deadlines — without manual reconciliations.',
    pills: ['Purchase orders', 'Price comparison', 'Delivery control', 'Purchasing analytics'],
    pains: [
      {
        icon: '💬',
        title: 'Orders live in WhatsApp and Excel',
        text: 'Supplier orders are placed in chats and spreadsheets. What was ordered, by whom and when it arrives — only one person knows.',
      },
      {
        icon: '💸',
        title: 'Prices are never compared',
        text: 'You buy from the “usual” supplier. Nobody checks whether they raised prices or whether the market has cheaper options.',
      },
      {
        icon: '📦',
        title: 'Overbuying — or forgetting to buy',
        text: 'Goods are ordered “by eye”: the warehouse is either full of dead stock, or the key item is missing in high season.',
      },
      {
        icon: '🕐',
        title: 'Delays slip through unnoticed',
        text: 'The supplier held up the shipment — you find out when the goods were needed yesterday.',
      },
      {
        icon: '🧾',
        title: 'Manual delivery reconciliations',
        text: 'Ordered 100, received 87, paid for 100. Discrepancies surface months later — or never.',
      },
      {
        icon: '🕶️',
        title: 'Opaque purchasing',
        text: 'The owner can’t see at what prices and from whom the company buys. Checking a buyer’s honesty is impossible.',
      },
    ],
    chaos: {
      lead: 'Every purchasing mistake is either an overpayment, frozen cash or a missed sale.',
      stats: [
        { value: '5–15%', text: 'overpayment to suppliers when prices are not compared or renegotiated' },
        { value: 'up to 15%', text: 'mis-shipments and discrepancies at goods receipt without order-vs-received checks' },
        { value: 'up to 20%', text: 'of profit is eaten by process chaos, mistakes and cash frozen in dead stock' },
        { value: '×2', text: 'longer to process an order when purchases are approved manually' },
      ],
      example: {
        before:
          'Do the maths: with $20,000 of monthly purchases, saving even 7% on prices and discrepancies means ',
        accent: '$16,800 a year that stays in the company',
        after: '.',
      },
    },
    about: {
      lead: 'The whole purchasing cycle in one system: from request and supplier selection to goods receipt and payment reconciliation. Every order has a status, an owner and a delivery date.',
      cards: [
        {
          title: '📋 Every order under control',
          text: 'Each supplier order is a document with a status: submitted, awaiting delivery, partially received, completed.',
        },
        {
          title: '⚖️ A fair supplier choice',
          text: 'Quotations from several suppliers are compared side by side — by price, timing and terms.',
        },
        {
          title: '📦 Receipt with reconciliation',
          text: 'The system checks “ordered — received — paid” by itself and highlights discrepancies.',
        },
        {
          title: '📊 Purchasing in numbers',
          text: 'Volumes, amounts, payables and supplier reliability — on one executive screen.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Purchase orders',
        lead: 'Every order follows a clear path — and you can always see what stage it is at.',
        flow: ['Request', 'Order submitted', 'Awaiting delivery', 'Partially received', 'Completed'],
        cards: [
          {
            title: 'Order and delivery dates',
            text: 'Every order has a submission date and an expected delivery date. Delays are visible in advance — not when the shelf is empty.',
          },
          {
            title: 'Partial deliveries',
            text: 'The supplier brought half? The system records what was received and what is still in transit — nothing gets lost.',
          },
          {
            title: 'History per supplier',
            text: 'All orders, amounts and delays for every supplier — in their card. You see who is reliable and who lets you down.',
          },
        ],
      },
      {
        title: 'Suppliers and price comparison',
        lead: 'A supplier base with quotations — purchasing decisions are made on numbers, not habit.',
        cards: [
          {
            title: 'Request for quotations',
            text: 'Ask several suppliers to quote on one request and compare offers side by side: price, lead time, payment terms.',
          },
          {
            title: 'Supplier card',
            text: 'Contacts, terms, the full history of orders and prices. If your regular supplier raises prices — you notice immediately.',
          },
          {
            title: 'Transparency for the owner',
            text: 'All purchases, prices and chosen suppliers in plain sight. Purchasing stops being a black box.',
          },
        ],
      },
      {
        title: 'Goods receipt and reconciliation',
        lead: 'The system reconciles the order, the delivery and the invoice — no more manual Excel checks.',
        cards: [
          {
            title: 'Ordered',
            text: 'What was ordered and in what quantity — locked in the order with prices and dates.',
          },
          {
            title: 'Received',
            text: 'At receipt, quantities are checked against the order. Short deliveries and defects are recorded on the spot.',
          },
          {
            title: 'Paid',
            text: 'The supplier’s invoice is reconciled with what actually arrived. You never pay for what wasn’t delivered.',
          },
        ],
        note: 'The result: discrepancies are visible at the moment of receipt, not months later. Every item and every dollar is accounted for.',
      },
      {
        title: 'Purchasing analytics',
        lead: 'The executive screen: volumes, amounts and purchasing dynamics in real time.',
        cards: [
          {
            title: 'All orders and amounts',
            text: 'How many orders are in progress, how much has been ordered and what is due for delivery — at a glance.',
          },
          {
            title: 'Supplier base',
            text: 'Dozens or hundreds of suppliers — with price, volume and reliability history for each.',
          },
          {
            title: 'Reports in two clicks',
            text: 'Reports by purchases, suppliers and items — instead of a day of spreadsheet work.',
          },
        ],
      },
    ],
    Preview: PurchasesPreview,
    previewTitle: 'This is what Purchases looks like in Habibi',
    solve: [
      {
        was: 'Supplier orders live in WhatsApp and Excel',
        now: 'Every order is a document with a status, amount and delivery date',
      },
      {
        was: 'Prices are never compared — buying “out of habit”',
        now: 'Supplier quotations compared side by side — the best offer wins',
      },
      {
        was: 'Receipt discrepancies surface months later',
        now: '“Ordered — received — paid” is reconciled automatically',
      },
      {
        was: 'Delivery delays discovered at the last minute',
        now: 'Dates and statuses of all deliveries visible in advance',
      },
      {
        was: 'Purchasing is a black box for the owner',
        now: 'All prices, suppliers and amounts transparent in reports',
      },
    ],
    money: [
      {
        title: 'Lower purchase prices',
        text: 'Comparing quotations and tracking price history saves 5–15% on every purchase — that is pure profit.',
      },
      {
        title: 'Cash stops freezing',
        text: 'You buy what is actually needed. Less dead stock in the warehouse — more free cash working for growth.',
      },
      {
        title: 'No missed sales',
        text: 'The right goods are ordered on time — shelves are never empty in season, customers don’t go to competitors.',
      },
      {
        title: 'You never pay for short deliveries',
        text: 'Automatic reconciliation catches every discrepancy between the order, the delivery and the supplier’s invoice.',
      },
    ],
    ai: {
      title: 'AI agents will take over the buyer’s routine',
      lead: 'AI agents are coming to Habibi soon — automating the routine purchasing process, from request to a ready supplier order.',
      flow: ['Stock need', 'Request quotations', 'Compare prices', 'Order to supplier'],
      cards: [
        {
          title: '🤖 Spots what is running out',
          text: 'The AI agent tracks stock and sales and drafts a purchase request before the goods run out.',
        },
        {
          title: '⚖️ Compares suppliers itself',
          text: 'The agent requests quotations, compares prices and terms and suggests the best option.',
        },
        {
          title: '📝 A ready order in minutes',
          text: 'The buyer just reviews and confirms — instead of hours of chats and spreadsheets.',
        },
      ],
    },
    together: [
      {
        title: 'Purchases + Inventory',
        text: 'Minimum stock levels automatically turn into purchase requests.',
      },
      {
        title: 'Purchases + Finance',
        text: 'Supplier payments and payables are visible in finance without double entry.',
      },
      {
        title: 'Purchases + Manufacturing',
        text: 'Materials are ordered against the production plan — workshops never wait for raw materials.',
      },
      {
        title: 'Purchases + Sales',
        text: 'Purchasing follows real demand: what sells is what gets ordered.',
      },
    ],
    industries: {
      list: [
        'Retail',
        'Wholesale',
        'Manufacturing',
        'Construction',
        'Restaurants & cafes',
        'Pharmacies',
        'Auto services',
        'Hotels',
        'Logistics',
        'E-commerce',
        'Medicine & clinics',
        'Beauty salons',
      ],
      note: 'The Purchases module is strongest together with Inventory and Finance — together they cover the full cycle of goods and money.',
    },
    tariff: { headline: 'Purchases is included in Habibi Pro', freeIncludes: false },
    cta: {
      title: 'Take purchasing under control',
      text: 'Start for free with CRM and finance — and add Purchases when you are ready to bring order to your supplier workflow.',
    },
  },

  inventory: {
    slug: 'inventory',
    icon: Warehouse,
    title: 'Inventory',
    lead: 'Accurate stock in real time and a clear history of every item’s movement.',
    pills: ['Real-time stock', 'Movement history', 'Multiple warehouses', 'Stock in money'],
    pains: [
      {
        icon: '📄',
        title: 'Stock lives in Excel, “roughly”',
        text: 'The spreadsheet is updated once a week, and only the storekeeper knows the real stock — approximately.',
      },
      {
        icon: '🚫',
        title: 'Selling what isn’t there',
        text: 'A manager promises goods to a customer that ran out long ago. The customer waits, gets angry and leaves.',
      },
      {
        icon: '🔀',
        title: 'Mis-shipments and shortages',
        text: 'Stocktaking turns into a surprise: something is missing, something is extra, and nobody knows why.',
      },
      {
        icon: '🏢',
        title: 'Goods lost between locations',
        text: 'Transfers between warehouses are recorded nowhere — the goods are “somewhere”, but exactly where is unknown.',
      },
      {
        icon: '⌛',
        title: 'Expired goods on the shelf',
        text: 'Nobody tracks expiry dates — losses are discovered together with the expired goods.',
      },
      {
        icon: '🧊',
        title: 'Dead stock piles up for years',
        text: 'Money lies frozen in goods nobody buys — and nobody sees it happening.',
      },
    ],
    chaos: {
      lead: 'A warehouse without proper records means frozen cash, shortages and missed sales every day.',
      stats: [
        { value: 'up to 15%', text: 'mis-shipments and shortages when goods movement is not recorded' },
        { value: 'up to 20%', text: 'of profit is eaten by process chaos, write-offs and lost goods' },
        { value: '~30%', text: 'of enquiries are lost when a manager can’t confirm availability on the spot' },
        { value: '×2', text: 'longer to assemble an order when goods have to be hunted down in the warehouse' },
      ],
      example: {
        before:
          'Do the maths: if your warehouse holds $50,000 of goods and even 20% of it is dead stock, that is ',
        accent: '$10,000 of frozen cash',
        after: ' that could be working in your business.',
      },
    },
    about: {
      lead: 'Precise records for every unit of goods: how much there is, where it sits, what it costs and where it moves. Stock updates automatically with every sale, purchase and transfer.',
      cards: [
        {
          title: '📦 Stock is always accurate',
          text: 'A sale, receipt, transfer or write-off changes stock instantly — no manual recounting.',
        },
        {
          title: '🧾 Every movement recorded',
          text: 'Who moved goods, when and where — all in the journal. Shortages stop being a mystery.',
        },
        {
          title: '🏬 As many warehouses as you need',
          text: 'Main warehouse, shops, pickup points — stock per location and for the company as a whole.',
        },
        {
          title: '💰 Stock in money',
          text: 'Inventory value, dead stock and turnover — the owner sees the warehouse as an asset, not as “boxes”.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Real-time stock',
        lead: 'One screen — and you know what is in every warehouse right now.',
        cards: [
          {
            title: 'The full catalogue',
            text: 'Thousands of items with SKUs, categories and units of measure — from pieces and boxes to kilograms and litres.',
          },
          {
            title: 'A status for every item',
            text: '“In stock”, “Low stock”, “Out of stock” — colour-coded statuses show problem items at a glance.',
          },
          {
            title: 'Per-warehouse view',
            text: 'Stock for each warehouse and shop separately: see where goods are available and where to transfer them from.',
          },
        ],
        note: 'The result: a manager confirms availability to a customer in seconds — not “let me check and call you back”.',
      },
      {
        title: 'Goods movement history',
        lead: 'The journal records every movement — from receipt to sale. “Where did the goods go?” always has an answer.',
        flow: ['Receipt from supplier', 'Storage', 'Transfer', 'Sale / write-off'],
        cards: [
          {
            title: 'Who and when',
            text: 'Every operation has an author, a date and a source document. Responsibility stops being collective.',
          },
          {
            title: 'Serial numbers and batches',
            text: 'Tracking by serial numbers and batches — essential for equipment, electronics and goods under warranty.',
          },
          {
            title: 'Expiry dates',
            text: 'The system shows in advance which batches are about to expire — you discount and sell instead of writing off.',
          },
        ],
      },
      {
        title: 'Problem-item control',
        lead: 'The system highlights what needs attention — before it becomes a loss.',
        cards: [
          {
            title: 'Minimum stock levels',
            text: 'A minimum is set for every item. Stock drops below it — a replenishment request goes to purchasing on time.',
          },
          {
            title: 'Dead stock under control',
            text: 'The no-movement report shows where money is frozen. A clearance sale brings it back into circulation.',
          },
          {
            title: 'Stocktaking without surprises',
            text: 'Physical counts reconcile quickly with the records, and discrepancies are traced through the movement journal.',
          },
        ],
      },
      {
        title: 'Stock in money',
        lead: 'The executive screen: what your warehouse is worth and what is happening to it.',
        cards: [
          {
            title: 'Inventory value',
            text: 'The total value of stock and its month-to-month dynamics — company-wide and per location.',
          },
          {
            title: 'Problem items',
            text: 'How many items are running low and how many sit without movement — visible instantly, with amounts.',
          },
          {
            title: 'Accurate cost of goods',
            text: 'Stock valuation and item cost — the basis for correct prices and honest profit.',
          },
        ],
      },
    ],
    Preview: WarehousePreview,
    previewTitle: 'This is what Inventory looks like in Habibi',
    solve: [
      {
        was: 'Stock “roughly” in Excel, updated once a week',
        now: 'Accurate real-time stock for every warehouse',
      },
      {
        was: 'Managers sell goods that aren’t in stock',
        now: 'Availability is visible at the moment of sale — promises are kept',
      },
      {
        was: 'Shortages and mix-ups surface at stocktaking',
        now: 'Every movement recorded: who, when, where and on what basis',
      },
      {
        was: 'Dead stock and expiry creep up unnoticed',
        now: 'No-movement items and near-expiry batches highlighted in advance',
      },
      {
        was: 'The warehouse’s value is a mystery',
        now: 'Inventory valued in money: you see the capital on your shelves',
      },
    ],
    money: [
      {
        title: 'No missed sales',
        text: 'Best-sellers are always in stock thanks to minimum levels — customers don’t leave over “out of stock”.',
      },
      {
        title: 'Cash returns to circulation',
        text: 'Dead stock is found and sold off, excess purchasing stops — the freed-up money works for growth.',
      },
      {
        title: 'Fewer losses and shortages',
        text: 'Transparent records with an owner for every movement cut shortages, mix-ups and “shrinkage”.',
      },
      {
        title: 'Correct prices',
        text: 'An accurate cost for every item — you see the real margin and never sell at a loss.',
      },
    ],
    ai: {
      title: 'AI agents will take over the warehouse routine',
      lead: 'AI agents are coming to Habibi soon — automating the routine warehouse process, from stock control to a ready replenishment request.',
      flow: ['Stock control', 'Demand forecast', 'Replenishment request', 'Risk alerts'],
      cards: [
        {
          title: '🤖 Watches stock 24/7',
          text: 'The AI agent tracks every item and spots anomalies: sudden consumption, suspicious write-offs, stalled goods.',
        },
        {
          title: '📈 Forecasts demand',
          text: 'The agent accounts for seasonality and sales dynamics — and suggests what and how much to buy without freezing extra cash.',
        },
        {
          title: '⚠️ Warns in advance',
          text: 'Expiry, dead stock, a shortage before high season — the agent reports risks before they become losses.',
        },
      ],
    },
    together: [
      {
        title: 'Inventory + Purchases',
        text: 'Minimum stock levels automatically become supplier requests — replenishment without manual control.',
      },
      {
        title: 'Inventory + CRM & sales',
        text: 'Managers see real stock at the moment of sale and never promise what isn’t there.',
      },
      {
        title: 'Inventory + Retail (POS)',
        text: 'Every receipt at the till writes goods off instantly — shop stock is always current.',
      },
      {
        title: 'Inventory + Finance',
        text: 'Inventory value and cost of goods sold flow into financial reports automatically.',
      },
    ],
    industries: {
      list: [
        'Retail',
        'Wholesale',
        'Manufacturing',
        'E-commerce',
        'Restaurants & cafes',
        'Pharmacies',
        'Auto services',
        'Construction',
        'Logistics',
        'Hotels',
        'Service centres',
        'Agriculture',
      ],
      note: 'The Inventory module is strongest together with Purchases and Retail (POS) — together they cover the goods’ full journey from supplier to customer.',
    },
    tariff: { headline: 'Inventory is included in Habibi Pro', freeIncludes: false },
    cta: {
      title: 'Know your exact stock this week',
      text: 'Start for free — and add Inventory when you are ready to bring order to your stock and return frozen cash to circulation.',
    },
  },

  manufacturing: {
    slug: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    lead: 'Clear cost of goods, planning and quality control at every stage.',
    pills: ['Work orders', 'Planning', 'Workshop load', 'Cost of goods'],
    pains: [
      {
        icon: '🧮',
        title: 'Cost of goods “by eye”',
        text: 'What a product really costs — nobody knows. Prices are set by intuition, and margin is a lottery.',
      },
      {
        icon: '📓',
        title: 'The plan lives in the foreman’s notebook',
        text: 'What is produced, when and in which workshop — one person knows. When he’s on holiday, production flies blind.',
      },
      {
        icon: '🏭',
        title: 'Workshop load is unknown',
        text: 'One workshop is overloaded and misses deadlines, another sits idle — but you only see it “after the fact”.',
      },
      {
        icon: '📦',
        title: 'Raw materials run out suddenly',
        text: 'Materials end mid-order. The workshop stops, deadlines burn, purchasing goes into panic mode.',
      },
      {
        icon: '⏰',
        title: 'Order deadlines slip',
        text: 'The customer was promised two weeks; it took six. They found out about the delay themselves — when they called.',
      },
      {
        icon: '🧯',
        title: 'Waste and defects are invisible',
        text: 'How much material was used over the norm and where quality was lost — nobody counts.',
      },
    ],
    chaos: {
      lead: 'Every idle hour, missed deadline and “blind” cost estimate is money production loses silently.',
      stats: [
        { value: 'up to 20%', text: 'of profit is eaten by downtime, material overuse and planning chaos' },
        { value: '×2', text: 'longer to complete an order with manual planning and handovers between workshops' },
        { value: 'up to 15%', text: 'of materials are lost to overuse and mix-ups without write-off records' },
        { value: '−1', text: 'customer for every missed deadline — and they will tell others about it' },
      ],
      example: {
        before:
          'Do the maths: if a workshop with a $10,000 monthly payroll sits idle just 10% of the time, you lose ',
        accent: '$12,000 a year on wages alone',
        after: ' — not counting the missed orders.',
      },
    },
    about: {
      lead: 'The full production cycle in one system: orders, plan, materials, workshop load and cost of goods. Every order has a route, deadlines, an owner and progress in percent.',
      cards: [
        {
          title: '🏭 Orders under control',
          text: 'Every work order has a status, progress, a workshop and a planned completion date.',
        },
        {
          title: '📅 A plan instead of a notebook',
          text: 'The production plan is visible to everyone: what we make today, tomorrow, and whether we are on schedule.',
        },
        {
          title: '🧾 Materials calculated',
          text: 'The product’s bill of materials calculates raw-material needs, and write-offs go against specific orders.',
        },
        {
          title: '💰 A clear cost of goods',
          text: 'Materials, labour and overheads add up to the exact cost of every product.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Work orders',
        lead: 'Every order follows a clear path — and you always see what stage it is at and whether it is on schedule.',
        flow: ['Scheduled', 'In progress', 'Quality control', 'Completed'],
        cards: [
          {
            title: 'Progress in percent',
            text: 'For every order: the product, quantity, planned date and how many percent complete it is.',
          },
          {
            title: 'Workshop and owner',
            text: 'Every order has a workshop and a responsible foreman. “Who owns this?” is a question nobody asks anymore.',
          },
          {
            title: 'Delays visible instantly',
            text: 'Orders at risk of missing the deadline are highlighted early — you shift capacity instead of apologising to the customer.',
          },
        ],
      },
      {
        title: 'Planning and workshop load',
        lead: 'See what every workshop is doing, where the bottleneck is and where a new order can fit.',
        cards: [
          {
            title: 'Production routes',
            text: 'Every product follows its route through workshops and operations: assembly, painting, packing. Deadlines are calculated before launch.',
          },
          {
            title: 'Load per workshop',
            text: 'Output and load for every workshop on a chart. An overloaded section is visible before it wrecks the schedule.',
          },
          {
            title: 'Honest promises to customers',
            text: 'Managers quote deadlines based on real production load, not on “we’ll probably make it”.',
          },
        ],
      },
      {
        title: 'Materials and cost of goods',
        lead: 'The system calculates how much raw material is needed and what every product really costs.',
        cards: [
          {
            title: 'Bill of materials',
            text: 'The composition of every product: materials, quantities, usage norms. Raw-material needs are calculated automatically against the plan.',
          },
          {
            title: 'Write-offs per order',
            text: 'Materials are written off against a specific order. Overuse and defects are visible per product, not “on average across the workshop”.',
          },
          {
            title: 'An exact cost of goods',
            text: 'Raw materials, labour and overheads add up to the product’s cost — the basis for the right price.',
          },
        ],
        note: 'The result: you know the margin of every product — and stop producing what sells at a loss.',
      },
      {
        title: 'Production analytics',
        lead: 'The executive screen: orders, output and efficiency in real time.',
        cards: [
          {
            title: 'Orders and statuses',
            text: 'How many orders are in progress, completed and at risk of delay — at a glance.',
          },
          {
            title: 'Production efficiency',
            text: 'Output and efficiency in percent — with month-to-month dynamics.',
          },
          {
            title: 'Output per workshop',
            text: 'Charts by order status and each workshop’s output — capacity and hiring decisions made on numbers.',
          },
        ],
      },
    ],
    Preview: ProductionPreview,
    previewTitle: 'This is what Manufacturing looks like in Habibi',
    solve: [
      {
        was: 'Cost of goods estimated “by eye”',
        now: 'An exact cost per product: materials, labour, overheads',
      },
      {
        was: 'The production plan lives in the foreman’s notebook',
        now: 'A single plan: orders, deadlines, workshops and progress visible to all',
      },
      {
        was: 'Workshop load unknown, bottlenecks a surprise',
        now: 'Load and output of every workshop on a real-time chart',
      },
      {
        was: 'Raw materials end mid-order, the workshop stops',
        now: 'Material needs calculated in advance against the production plan',
      },
      {
        was: 'Deadlines slip, customers leave',
        now: 'Delay risk visible early — capacity is rebalanced in time',
      },
    ],
    money: [
      {
        title: 'Right prices and margin',
        text: 'An exact cost of goods shows what makes money and what is produced at a loss. Prices are set on numbers.',
      },
      {
        title: 'Less downtime',
        text: 'Materials are ordered against the plan and workshop load is balanced — machines and people work instead of waiting.',
      },
      {
        title: 'Deadlines are met',
        text: 'Customers who get their orders on time come back and recommend you. A reliable producer’s reputation sells by itself.',
      },
      {
        title: 'Less waste and defects',
        text: 'Per-order write-offs and usage norms make losses visible — and visible losses shrink fast.',
      },
    ],
    ai: {
      title: 'AI agents will take over the planning routine',
      lead: 'AI agents are coming to Habibi soon — automating the production-planning routine, from order to deadline control.',
      flow: ['Customer orders', 'Production plan', 'Material needs', 'Deadline control'],
      cards: [
        {
          title: '🤖 Builds the plan itself',
          text: 'The AI agent drafts the production plan for current orders, accounting for workshop load and priorities.',
        },
        {
          title: '📦 Calculates materials itself',
          text: 'The agent computes raw-material needs against the plan and drafts purchase requests — workshops never stop.',
        },
        {
          title: '⚠️ Warns about slippage',
          text: 'An order falls behind schedule — the agent reports early and suggests how to rebalance capacity.',
        },
      ],
    },
    together: [
      {
        title: 'Manufacturing + Purchases',
        text: 'Material needs become supplier orders — raw materials arrive against the plan, not “when someone remembered”.',
      },
      {
        title: 'Manufacturing + Inventory',
        text: 'Raw materials are written off, finished goods are received — stock is accurate at every stage.',
      },
      {
        title: 'Manufacturing + CRM & sales',
        text: 'Managers see the real production load and quote honest deadlines to customers.',
      },
      {
        title: 'Manufacturing + Finance',
        text: 'Production costs flow into financial reports — profit is calculated correctly.',
      },
    ],
    industries: {
      list: [
        'Furniture production',
        'Food production',
        'Garment production',
        'Metalworking',
        'Electronics & assembly',
        'Building materials',
        'Printing',
        'Confectionery workshops',
        'Cosmetics & household chemicals',
        'Packaging',
      ],
      note: 'The Manufacturing module is strongest together with Inventory and Purchases — together they cover the full cycle: raw materials → production → finished goods.',
    },
    tariff: { headline: 'Manufacturing is included in Habibi Pro', freeIncludes: false },
    cta: {
      title: 'Learn the real cost of your products',
      text: 'Start for free — and add Manufacturing when you are ready to plan workshops and calculate costs on numbers.',
    },
  },

  finance: {
    slug: 'finance',
    icon: Wallet,
    title: 'Finance',
    lead: 'A live picture of your money: reports, receivables, cash-flow forecast — without waiting for month-end.',
    pills: ['Money in real time', 'Profit and expenses', 'Receivables', 'Reports and taxes'],
    pains: [
      {
        icon: '📓',
        title: 'Money lives in notebooks and Excel',
        text: 'Income goes into one spreadsheet, expenses into another, cash into a notebook. Nobody has the full picture.',
      },
      {
        icon: '🌫️',
        title: 'Profit — once a month',
        text: 'How much you earned becomes clear at month-end — if the accountant made it. Managing “after the fact” is too late.',
      },
      {
        icon: '🕳️',
        title: 'Cash gaps out of nowhere',
        text: 'The money “should arrive”, but suppliers and payroll must be paid today. Every month is a surprise.',
      },
      {
        icon: '🧾',
        title: 'Receivables untracked',
        text: 'Customers owe you, but who, how much and since when — you have to dig through chats. Some debts are simply forgotten.',
      },
      {
        icon: '🛒',
        title: 'Expenses leak unnoticed',
        text: 'Subscriptions, “small stuff”, excess purchases — pennies one by one, a real share of profit together.',
      },
      {
        icon: '⏳',
        title: 'Taxes at the last minute',
        text: 'Documents are gathered in a panic before the deadline. Mistakes, fines and stress come free of charge.',
      },
    ],
    chaos: {
      lead: 'A business without a financial picture is run on gut feeling — and pays for it in money.',
      stats: [
        { value: 'up to 20%', text: 'of profit is eaten by untracked expenses, mistakes and money chaos' },
        { value: '30+', text: 'days late — the typical overdue receivable nobody reminds about' },
        { value: '×2', text: 'more expensive are emergency loans when a cash gap hits unexpectedly' },
        { value: '30', text: 'days — how long you are “blind” if profit is only visible at month-end' },
      ],
      example: {
        before:
          'Do the maths: if customers owe you $50,000 and just 10% of receivables turns into bad debt for lack of control, that is ',
        accent: '$5,000 given away',
        after: '.',
      },
    },
    about: {
      lead: 'All of the company’s money in one system: accounts, cash registers, payments, debts and reports. The picture updates with every transaction — you see the business in money right now, not at month-end.',
      cards: [
        {
          title: '💳 All accounts together',
          text: 'Bank accounts, cash registers and e-wallets — a combined balance and the movement on each.',
        },
        {
          title: '📈 Profit in real time',
          text: 'Revenue, expenses and profit are calculated automatically with every transaction.',
        },
        {
          title: '🧾 Debts under control',
          text: 'Who owes you and whom you owe — with amounts and due dates. Overdue items highlighted instantly.',
        },
        {
          title: '📊 Reports without an accountant',
          text: 'Clear reports on profit, cash flow and expenses — in two clicks, without waiting for month-end.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Money in real time',
        lead: 'One screen — and you know how much money the company has right now and where it sits.',
        cards: [
          {
            title: 'Account balances',
            text: 'Bank accounts, cash registers, wallets — the balance of each and the company total. Nothing to consolidate by hand.',
          },
          {
            title: 'Payment feed',
            text: 'All incoming and outgoing payments — with counterparty, purpose and account. Any payment found in seconds.',
          },
          {
            title: 'Payment calendar',
            text: 'Upcoming payments and expected receipts — you see in advance whether there is enough for payroll and suppliers.',
          },
        ],
        note: 'The result: “how much money do we have?” takes one glance, and a cash gap is visible weeks before it happens.',
      },
      {
        title: 'Income, expenses and profit',
        lead: 'The system calculates profit itself and sorts expenses onto shelves.',
        cards: [
          {
            title: 'Revenue and profit',
            text: 'Monthly income, expenses and profit with dynamics — updated with every transaction, not at month-end.',
          },
          {
            title: 'Expenses by category',
            text: 'Payroll, rent, purchases, marketing, utilities — the expense structure on a chart.',
          },
          {
            title: 'Where to find savings',
            text: 'You instantly see which category has ballooned month over month — a found leak is direct savings.',
          },
        ],
      },
      {
        title: 'Receivables under control',
        lead: 'Every customer debt in plain sight, with amount and due date. Money comes back instead of being forgotten.',
        cards: [
          {
            title: 'Overdue invoices in view',
            text: 'A list of all unpaid invoices: customer, amount, due date. Overdue ones highlighted on the main screen.',
          },
          {
            title: 'Reminders on time',
            text: 'The system shows who to remind about payment. A polite reminder on day 3 works better than a call a month later.',
          },
          {
            title: 'Customer settlement history',
            text: 'All invoices, payments and debt in the customer card. Whether to ship on credit again — a decision made on numbers.',
          },
        ],
      },
      {
        title: 'Reports and cash-flow forecast',
        lead: 'The reports that used to take an accountant days — always ready.',
        cards: [
          {
            title: 'Profit report',
            text: 'Income, expenses and profit for any period — by company, business line and project.',
          },
          {
            title: 'Cash flow',
            text: 'Where money came from and where it went — by account, category and counterparty.',
          },
          {
            title: 'Cash-flow forecast',
            text: 'Expected receipts and mandatory payments — a balance forecast weeks ahead.',
          },
        ],
        note: 'Plus tax accounting: documents and amounts accumulate during the month by themselves — reporting stops being a fire drill.',
      },
    ],
    Preview: FinancePreview,
    previewTitle: 'This is what Finance looks like in Habibi',
    solve: [
      {
        was: 'Money in notebooks, Excel and “in the head”',
        now: 'All accounts, registers and payments in one system with a total balance',
      },
      {
        was: 'Profit visible once a month, with luck',
        now: 'Revenue, expenses and profit update with every transaction',
      },
      {
        was: 'Cash gaps strike unexpectedly',
        now: 'The payment calendar and forecast show the gap in advance',
      },
      {
        was: 'Customer debts get forgotten',
        now: 'Overdue invoices on the main screen, reminders on time',
      },
      {
        was: 'Reporting assembled in a panic',
        now: 'Reports and tax data ready at any moment',
      },
    ],
    money: [
      {
        title: 'Receivables come back faster',
        text: 'Due-date control and reminders cut overdue debt — money returns to circulation instead of sitting with customers.',
      },
      {
        title: 'Expenses stop leaking',
        text: 'The expense structure by category shows which line has ballooned. A found leak is direct savings.',
      },
      {
        title: 'No expensive cash gaps',
        text: 'The gap is visible weeks ahead — you arrange a deferral in advance instead of taking an urgent high-interest loan.',
      },
      {
        title: 'Decisions on numbers',
        text: 'You see which business lines and customers bring profit. Resources go where they earn the most.',
      },
    ],
    ai: {
      title: 'AI agents will take over the finance routine',
      lead: 'AI agents are coming to Habibi soon — automating the finance routine, from payment categorisation to cash-gap forecasting.',
      flow: ['Payments', 'Categories and records', 'Debtor reminders', 'Forecast and alerts'],
      cards: [
        {
          title: '🤖 Categorises payments itself',
          text: 'The AI agent recognises payments and sorts them by category and counterparty — no manual entry.',
        },
        {
          title: '✉️ Sends payment reminders',
          text: 'The agent tracks invoice due dates and prepares polite reminders for debtor customers on time.',
        },
        {
          title: '⚠️ Warns about cash gaps',
          text: 'The agent watches the cash-flow forecast and reports in advance if a gap is coming.',
        },
      ],
    },
    together: [
      {
        title: 'Finance + CRM & sales',
        text: 'Invoices, payments and customer debt in the customer card. Managers see who shouldn’t get goods on credit.',
      },
      {
        title: 'Finance + Purchases',
        text: 'Supplier payments and payables under control, without double entry.',
      },
      {
        title: 'Finance + Inventory & Manufacturing',
        text: 'Cost of goods and production flows into reports automatically — profit is honest.',
      },
      {
        title: 'Finance + HR & payroll',
        text: 'Accrued salaries appear in expenses immediately — the biggest cost line is always current.',
      },
    ],
    industries: {
      list: [
        'Services & agencies',
        'Retail',
        'Wholesale',
        'Manufacturing',
        'Construction',
        'IT companies',
        'Restaurants & cafes',
        'Medicine & clinics',
        'Real estate',
        'Logistics',
        'Hotels',
        'Education',
      ],
      note: 'Habibi’s recommendation: start with CRM, sales and finance — then add inventory, purchasing, manufacturing and HR as you grow.',
    },
    tariff: { headline: 'Finance is available on the free plan', freeIncludes: true },
    cta: {
      title: 'Know your profit today',
      text: 'The Finance module is free — connect it together with CRM and start seeing your business’s money in real time.',
    },
  },

  hr: {
    slug: 'hr',
    icon: Users,
    title: 'HR & payroll',
    lead: 'Employee records, payroll calculation and clear team KPIs.',
    pills: ['Employee base', 'Attendance and leave', 'Payroll', 'Team KPIs'],
    pains: [
      {
        icon: '🧮',
        title: 'Payroll by hand in Excel',
        text: 'Salaries, shifts, bonuses and deductions are compiled manually. Every month brings mistakes, recalculations and hurt feelings.',
      },
      {
        icon: '🏖️',
        title: 'Leave requests live in chats',
        text: 'Who is on holiday, who is on sick leave, who returns tomorrow — settled by messaging. Sometimes after the person didn’t show up.',
      },
      {
        icon: '🕐',
        title: 'Attendance untracked',
        text: 'Late arrivals and absences are recorded nowhere. The diligent work hard; the rest work “as it goes”.',
      },
      {
        icon: '🎲',
        title: 'Bonuses “by feel”',
        text: 'No KPIs, nobody’s contribution is measured. Bonuses are handed out on intuition — demotivating the best people.',
      },
      {
        icon: '🗂️',
        title: 'HR data scattered in folders',
        text: 'Contracts, hire dates, salaries and employee history are spread across folders and email.',
      },
      {
        icon: '🚪',
        title: 'Turnover is a mystery',
        text: 'People leave, but why and from which departments — nobody analyses. Every new hire costs money again.',
      },
    ],
    chaos: {
      lead: 'Payroll is usually the biggest expense line. And most often — the least controlled one.',
      stats: [
        { value: '30–40%', text: 'of company expenses is payroll. Mistakes here cost the most' },
        { value: '×2', text: 'longer to calculate payroll by hand — and still with mistakes' },
        { value: 'up to 20%', text: 'of profit is eaten by overpayments, idle time and a demotivated team' },
        { value: '3–6', text: 'salaries — the cost of replacing an employee: search, hiring, training' },
      ],
      example: {
        before:
          'Do the maths: with a $25,000 monthly payroll, mistakes, overpayments and untracked absences of just 3% add up to ',
        accent: '$9,000 a year',
        after: ' — not counting the cost of demotivating your best people.',
      },
    },
    about: {
      lead: 'The whole team in one system: employee cards, attendance, leave, payroll calculation and performance. Transparent for the owner — and fair for the employees.',
      cards: [
        {
          title: '👥 The team on one screen',
          text: 'Who is working, who is on holiday, who is on sick leave — every employee’s status at a glance.',
        },
        {
          title: '🕐 Attendance recorded',
          text: 'Working hours, shifts, late arrivals and absences are tracked automatically.',
        },
        {
          title: '💵 Payroll calculates itself',
          text: 'Salaries, shifts, bonuses and deductions — the system builds the calculation without manual spreadsheets.',
        },
        {
          title: '📊 KPIs instead of feelings',
          text: 'Employee and department performance — the basis for fair bonuses and decisions.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Employee base',
        lead: 'Every employee’s card — their entire history with the company in one place.',
        cards: [
          {
            title: 'Profile and terms',
            text: 'Position, department, hire date, salary, work schedule — full-time or shifts. Everything on record.',
          },
          {
            title: 'Statuses in real time',
            text: 'Active, on holiday, on sick leave, terminated — per employee and for the company as a whole.',
          },
          {
            title: 'Documents and history',
            text: 'Contracts, promotions, transfers between departments and salary changes — the full history at hand.',
          },
        ],
        note: 'The result: any question about an employee — salary, tenure, department, schedule — takes seconds, not a folder hunt.',
      },
      {
        title: 'Attendance, holidays and sick leave',
        lead: 'Who is in, who is out and why — visible every day, not “by rumour”.',
        flow: ['Timesheet', 'Holidays', 'Sick leave', 'Shifts and schedules'],
        cards: [
          {
            title: 'Present today',
            text: 'How many employees are in and who is absent — with the reason: holiday, sick leave, no-show.',
          },
          {
            title: 'Holiday planner',
            text: 'Holidays are planned ahead and never overlap within a department. “Everyone left at once” stops happening.',
          },
          {
            title: 'Data feeds payroll',
            text: 'Worked hours and shifts flow into the payroll calculation automatically — no manual timesheet.',
          },
        ],
      },
      {
        title: 'Payroll calculation',
        lead: 'The system assembles the calculation from salaries, shifts, bonuses and deductions — fast and error-free.',
        cards: [
          {
            title: 'Everything counted automatically',
            text: 'Salaries and rates, worked hours and overtime, bonuses, allowances, deductions, holiday and sick pay.',
          },
          {
            title: 'Transparent for employees',
            text: 'Everyone sees what their pay is made of. Fewer questions, grudges and “why is mine less?”.',
          },
          {
            title: 'Payroll under control',
            text: 'The total fund, paid this month, average salary, payroll by department — the biggest expense line in numbers.',
          },
        ],
      },
      {
        title: 'KPIs and team analytics',
        lead: 'The executive screen: the team in numbers, not in feelings.',
        cards: [
          {
            title: 'Team and statuses',
            text: 'Headcount, who is present, new hires for the period — by department and schedule.',
          },
          {
            title: 'Payroll by department',
            text: 'The payroll fund, average salary and dynamics — on charts, per department.',
          },
          {
            title: 'Performance indicators',
            text: 'Attendance, output and turnover by department — you see where the team is strong and where to step in.',
          },
        ],
      },
    ],
    Preview: HrPreview,
    previewTitle: 'This is what HR looks like in Habibi',
    solve: [
      {
        was: 'Payroll calculated by hand, with mistakes and recalculations',
        now: 'The calculation assembles automatically from salaries, shifts and bonuses',
      },
      {
        was: 'Holidays and sick leave in chats and word of mouth',
        now: 'Every employee’s status and the holiday planner in the system',
      },
      {
        was: 'Nobody records attendance',
        now: 'Working time and absences are tracked and feed into payroll',
      },
      {
        was: 'Bonuses handed out “by feel”',
        now: 'Employee and department KPIs — the basis for fair decisions',
      },
      {
        was: 'Payroll — the biggest expense with no control',
        now: 'The payroll fund visible by department, month and employee',
      },
    ],
    money: [
      {
        title: 'Payroll works harder',
        text: 'The biggest expense line becomes transparent: you see which departments and people deliver results.',
      },
      {
        title: 'Motivation drives revenue',
        text: 'Fair KPI-based bonuses keep your best people — and the best people sell and produce more.',
      },
      {
        title: 'Fewer losses to mistakes',
        text: 'Automatic calculation eliminates overpayments and untracked absences — percentages of payroll return to the business.',
      },
      {
        title: 'Lower turnover — cheaper hiring',
        text: 'Transparent terms and honest pay keep people. Every retained employee saves 3–6 salaries on replacement.',
      },
    ],
    ai: {
      title: 'AI agents will take over the HR routine',
      lead: 'AI agents are coming to Habibi soon — automating the HR routine, from the timesheet to a ready payroll calculation.',
      flow: ['Timesheet and attendance', 'Accruals and bonuses', 'Payslips', 'Answers for employees'],
      cards: [
        {
          title: '🤖 Assembles payroll itself',
          text: 'The AI agent merges the timesheet, shifts, bonuses and deductions into a ready calculation — HR just reviews it.',
        },
        {
          title: '💬 Answers the team itself',
          text: '“How many holiday days do I have?”, “What is my pay made of?” — the agent answers employees without distracting HR.',
        },
        {
          title: '⚠️ Spots the risks',
          text: 'Rising lateness, a spike in sick leave, an overloaded department — the agent flags problems before people start leaving.',
        },
      ],
    },
    together: [
      {
        title: 'HR + Finance',
        text: 'Accrued salaries land in expenses immediately — the financial picture is always current.',
      },
      {
        title: 'HR + CRM & sales',
        text: 'Managers’ KPIs are calculated from real deals — bonuses are tied to results.',
      },
      {
        title: 'HR + Manufacturing',
        text: 'Workshop shifts and output feed into workers’ pay automatically.',
      },
      {
        title: 'HR + Projects & tasks',
        text: 'Workload and completed tasks show everyone’s real contribution to a project.',
      },
    ],
    industries: {
      list: [
        'Services & agencies',
        'Retail chains',
        'Manufacturing',
        'Construction',
        'Restaurants & cafes',
        'Medicine & clinics',
        'Logistics',
        'Hotels',
        'Beauty salons',
        'Education',
        'Cleaning',
        'Security & services',
      ],
      note: 'The HR & payroll module is strongest together with Finance — payroll flows into expenses automatically, and profit is calculated honestly.',
    },
    tariff: { headline: 'HR & payroll is included in Habibi Pro', freeIncludes: false },
    cta: {
      title: 'Bring order to your team and payroll',
      text: 'Start for free — and add HR & payroll when you are ready to run your biggest expense line on numbers.',
    },
  },

  projects: {
    slug: 'projects',
    icon: BarChart3,
    title: 'Projects & tasks',
    lead: 'Deadlines, owners and statuses — all on one screen.',
    pills: ['Projects', 'Tasks and priorities', 'Gantt chart', 'Time and budget'],
    pains: [
      {
        icon: '💬',
        title: 'Tasks live in chats and sticky notes',
        text: 'Assignments are handed out verbally and in messengers. A week later nobody remembers who promised what.',
      },
      {
        icon: '🤷',
        title: '“I thought he was doing it”',
        text: 'A task without an owner is a task nobody does. You find out on deadline day.',
      },
      {
        icon: '⏰',
        title: 'Deadlines slip silently',
        text: 'You learn about the delay after the date has passed. The client is unhappy; the team says “nobody told us”.',
      },
      {
        icon: '🗣️',
        title: 'Status only at stand-ups',
        text: 'To learn how a project is going, you gather everyone and burn an hour. Every single week.',
      },
      {
        icon: '💸',
        title: 'Project budgets uncounted',
        text: 'How many hours and dollars are already spent — unknown. Whether the project is profitable becomes clear after delivery.',
      },
      {
        icon: '📞',
        title: 'The client asks — no answer',
        text: '“How is our project going?” — and the manager goes to poll the team instead of glancing at one screen.',
      },
    ],
    chaos: {
      lead: 'Every missed deadline and unlogged hour costs money, reputation and nerves.',
      stats: [
        { value: 'up to 20%', text: 'of profit is eaten by missed deadlines, rework and unlogged work' },
        { value: '×2', text: 'longer projects run when tasks are passed verbally and get lost' },
        { value: '5–10', text: 'hours a week the owner spends asking “where are we on the project?”' },
        { value: '−1', text: 'client for every missed deadline — plus their referrals' },
      ],
      example: {
        before:
          'Do the maths: if chaos makes a team of 5 lose just 1 hour a day figuring out who does what, that is ',
        accent: 'over 100 paid working hours a month',
        after: ' spent on nothing.',
      },
    },
    about: {
      lead: 'All of the company’s projects and tasks in one system. Every task has an owner, a deadline and a priority; every project has a status, a budget and progress — visible without stand-ups.',
      cards: [
        {
          title: '📋 Nothing gets lost',
          text: 'Every assignment is a task with an owner and a deadline, not a message in a chat.',
        },
        {
          title: '👤 There is always an owner',
          text: '“I thought he was doing it” is impossible: a task has one owner, and everyone sees who.',
        },
        {
          title: '📊 Status without stand-ups',
          text: 'The progress of all projects and tasks is visible on one screen at any moment.',
        },
        {
          title: '💰 Budget under control',
          text: 'Time and costs per project — you see whether you are staying inside the budget.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Projects under control',
        lead: 'For every project — the full picture: from client and budget to progress in percent.',
        cards: [
          {
            title: 'Project card',
            text: 'Client, owner, start and finish dates, budget and status — all in one place.',
          },
          {
            title: 'Progress in percent',
            text: 'Completion is calculated from tasks — say, 28 of 40 done. Honest numbers instead of “almost ready”.',
          },
          {
            title: 'Delays visible instantly',
            text: 'Projects at risk are highlighted — you reinforce the team before the deadline burns.',
          },
        ],
        note: 'The result: when a client asks “how is our project?”, the manager answers in 10 seconds — with numbers, not “let me check”.',
      },
      {
        title: 'Tasks with priorities',
        lead: 'Every task follows a clear path — and it is always obvious what to do first.',
        flow: ['Planned', 'In progress', 'Waiting', 'Done'],
        cards: [
          {
            title: 'Priorities',
            text: 'High, medium, low — the team works on what matters, not on what is shouted loudest.',
          },
          {
            title: 'Deadline and owner',
            text: 'Every task has one owner and a due date. Overdue tasks are highlighted automatically.',
          },
          {
            title: 'The whole story inside',
            text: 'Comments, files and decisions live in the task — no digging through chats for agreements.',
          },
        ],
      },
      {
        title: 'Gantt chart, time and costs',
        lead: 'The project plan on a visual timeline; the costs in numbers.',
        cards: [
          {
            title: 'Gantt chart',
            text: 'All project stages on one timeline. Dependencies are visible, and shifting one stage instantly shows the impact on delivery.',
          },
          {
            title: 'Time tracking',
            text: 'Hours are logged per task and project — you see where the team’s time actually goes.',
          },
          {
            title: 'Budget vs actuals',
            text: 'Planned budget against actual costs per project. Overruns show up during the work, not after delivery.',
          },
        ],
      },
      {
        title: 'Project and task reports',
        lead: 'The executive screen: all of the company’s projects in numbers.',
        cards: [
          {
            title: 'All projects and tasks',
            text: 'How many projects are active, completed and at risk of delay — at a glance.',
          },
          {
            title: 'Team workload',
            text: 'Who is overloaded and who is free — tasks are distributed evenly, without burnout or idling.',
          },
          {
            title: 'Project profitability',
            text: 'Time and money per project show which clients and jobs actually make money.',
          },
        ],
      },
    ],
    Preview: ProjectsPreview,
    previewTitle: 'This is what Projects looks like in Habibi',
    solve: [
      {
        was: 'Tasks in chats, sticky notes and “in the head”',
        now: 'Every assignment is a task with an owner, deadline and priority',
      },
      {
        was: '“I thought he was doing it” — and the task isn’t done',
        now: 'Every task has one owner, visible to the whole team',
      },
      {
        was: 'Missed deadlines discovered after the fact',
        now: 'Overdue tasks and projects highlighted in advance',
      },
      {
        was: 'Project status takes an hour-long stand-up',
        now: 'The progress of all projects on one screen at any moment',
      },
      {
        was: 'Project profitability — a surprise after delivery',
        now: 'Time and costs against the budget visible during the work',
      },
    ],
    money: [
      {
        title: 'Projects delivered on time',
        text: 'Clients who get their work on time come back and refer others. A reliable contractor’s reputation brings new orders.',
      },
      {
        title: 'Profitability of every project',
        text: 'Time and costs against the budget show which projects and clients make money — and which to walk away from.',
      },
      {
        title: 'The team gets more done',
        text: 'Fewer stand-ups, clarifications and lost tasks — the same people close more projects without new hires.',
      },
      {
        title: 'The owner works on growth',
        text: 'The 5–10 weekly hours that went into “where are we on the project?” go back into growing the business.',
      },
    ],
    ai: {
      title: 'AI agents will take over the project routine',
      lead: 'AI agents are coming to Habibi soon — automating the project manager’s routine, from task creation to status reports.',
      flow: ['Agreements', 'Tasks and deadlines', 'Reminders', 'Status report'],
      cards: [
        {
          title: '🤖 Creates tasks itself',
          text: 'The AI agent turns agreements from emails and meetings into tasks with owners and deadlines.',
        },
        {
          title: '🔔 Watches the deadlines',
          text: 'The agent reminds assignees about due dates and escalates when a task risks stalling.',
        },
        {
          title: '📄 Ready status reports',
          text: 'The agent assembles a project report for the client or the owner by itself — from real data, in minutes.',
        },
      ],
    },
    together: [
      {
        title: 'Projects + CRM & sales',
        text: 'A won deal turns into a project — the client, budget and deadlines carry over automatically.',
      },
      {
        title: 'Projects + Finance',
        text: 'Project costs and payments flow into financial reports. Profitability is calculated honestly.',
      },
      {
        title: 'Projects + HR & payroll',
        text: 'Everyone’s workload and contribution to projects — the basis for fair bonuses.',
      },
      {
        title: 'Projects + Service & support',
        text: 'Customer requests become tasks for the team — nothing is lost between departments.',
      },
    ],
    industries: {
      list: [
        'Agencies & marketing',
        'IT & development',
        'Construction & renovation',
        'Design studios',
        'Legal services',
        'Consulting',
        'Engineering',
        'Architecture',
        'Event management',
        'Made-to-order production',
      ],
      note: 'Projects & tasks is included in the free plan — one of the first modules teams start with in Habibi.',
    },
    tariff: { headline: 'Projects & tasks is already on the free plan', freeIncludes: true },
    cta: {
      title: 'Bring order to your projects for free',
      text: 'Projects & tasks is available on the free plan — start your first project today and run your next stand-up in 10 minutes instead of an hour.',
    },
  },

  service: {
    slug: 'service',
    icon: Wrench,
    title: 'Service & support',
    lead: 'Warranty requests, repeat sales and customer reviews under control.',
    pills: ['Tickets from every channel', 'SLA and deadlines', 'Knowledge base', 'Service analytics'],
    pains: [
      {
        icon: '📥',
        title: 'Requests everywhere and nowhere',
        text: 'Customers write on WhatsApp, call, leave comments. Some requests simply get lost.',
      },
      {
        icon: '⏳',
        title: 'Customers wait for days',
        text: 'The question landed with the wrong person and stalled. The customer follows up themselves — already irritated.',
      },
      {
        icon: '🤷',
        title: 'No one is responsible',
        text: 'Who handles the request — unclear. “Not my job” is the most common internal answer.',
      },
      {
        icon: '🔧',
        title: 'Warranty chaos',
        text: 'Warranty cases are recorded nowhere: what came in, what was fixed, what was returned — reconstructed from memory.',
      },
      {
        icon: '🔁',
        title: 'Repeat sales missed',
        text: 'A customer you helped is ready to buy again — but nobody offers.',
      },
      {
        icon: '⭐',
        title: 'Nobody collects reviews',
        text: 'Happy customers stay silent; unhappy ones write online. Your reputation forms by itself — not in your favour.',
      },
    ],
    chaos: {
      lead: 'Bad service loses more than one customer — it loses everyone that customer talks to.',
      stats: [
        { value: '×5', text: 'more expensive to acquire a new customer than to keep an existing one' },
        { value: '~10', text: 'people hear about bad service from one unhappy customer' },
        { value: '~30%', text: 'of requests are lost when they arrive through untracked channels' },
        { value: 'up to 20%', text: 'of profit is eaten by lost customers and missed repeat sales' },
      ],
      example: {
        before:
          'Do the maths: if a customer brings $1,000 a year and poor service loses you just 10 customers a year, that is ',
        accent: '$10,000 of lost revenue',
        after: ' — not counting the damaged reputation.',
      },
    },
    about: {
      lead: 'All customer requests — from email, chats, portal and phone — become tickets with an owner, a priority and a deadline. No request is lost; no customer is left without an answer.',
      cards: [
        {
          title: '🎫 Every request is a ticket',
          text: 'From any channel — into a single queue with a number, status and owner.',
        },
        {
          title: '⏱️ Deadlines under control',
          text: 'An SLA timer on every ticket: you see how much time is left before the response deadline.',
        },
        {
          title: '📚 Knowledge base',
          text: 'Standard solutions at the team’s fingertips — and in self-service for customers.',
        },
        {
          title: '📊 Service in numbers',
          text: 'Response speed, staff workload and customer satisfaction — on one screen.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Tickets from every channel',
        lead: 'Email, portal, chat, phone — every request lands in one queue.',
        flow: ['New request', 'Owner assigned', 'In progress', 'Awaiting customer', 'Resolved'],
        cards: [
          {
            title: 'Priorities',
            text: 'Urgent first: every ticket has a priority, and the team sees what to handle right now.',
          },
          {
            title: 'An owner for every ticket',
            text: 'A ticket is assigned to a specific person. “Not my job” stops working.',
          },
          {
            title: 'The whole thread inside',
            text: 'The conversation history lives in the ticket — any colleague can pick it up and help.',
          },
        ],
      },
      {
        title: 'SLA: promised deadlines are kept',
        lead: 'A response and resolution time is set for every request type — the system enforces it.',
        cards: [
          {
            title: 'SLA scale per ticket',
            text: 'How much time is left before the deadline — visible on every request. Risky tickets highlighted early.',
          },
          {
            title: 'Overdue escalation',
            text: 'Overdue tickets are raised to the manager automatically — none of them stalls silently.',
          },
          {
            title: 'Warranty requests',
            text: 'Received, diagnosed, repaired, returned — every stage of a warranty case is on record.',
          },
        ],
      },
      {
        title: 'Knowledge base and customer history',
        lead: 'Standard questions are solved in minutes, and every customer’s history is at hand.',
        cards: [
          {
            title: 'Knowledge base',
            text: 'Ready answers and how-tos for common questions. A new hire answers like a veteran — from day one.',
          },
          {
            title: 'Self-service',
            text: 'Customers find answers themselves on the portal. Fewer repetitive requests, more time for the complex ones.',
          },
          {
            title: 'Customer request history',
            text: 'All of a customer’s tickets in their card. You see what they bought, what they asked about and how happy they are.',
          },
        ],
        note: 'The result: customers never have to repeat their story to every new employee — the thing that annoys them most.',
      },
      {
        title: 'Service analytics',
        lead: 'The executive screen: support quality in numbers, not in complaints.',
        cards: [
          {
            title: 'Request flow',
            text: 'How many tickets are open, resolved and overdue — at a glance, with daily dynamics.',
          },
          {
            title: 'Resolution speed',
            text: 'Average response and resolution time — for the team and every employee.',
          },
          {
            title: 'Channels and performers',
            text: 'Breakdowns by channel, priority and top performers — you see who carries support and who needs coaching.',
          },
        ],
      },
    ],
    Preview: ServicePreview,
    previewTitle: 'This is what Service looks like in Habibi',
    solve: [
      {
        was: 'Requests lost between WhatsApp, email and calls',
        now: 'Every channel flows into a single ticket queue',
      },
      {
        was: 'Customers wait days and chase you themselves',
        now: 'SLA deadlines on every ticket, overdue ones escalate',
      },
      {
        was: '“Not my job” — and the request stalls',
        now: 'Every ticket has an owner and a deadline',
      },
      {
        was: 'Warranty cases reconstructed from memory',
        now: 'Every stage of a warranty request is on record',
      },
      {
        was: 'Repeat sales and reviews slip away',
        now: 'Customer history suggests who to offer what',
      },
    ],
    money: [
      {
        title: 'Customers stay with you',
        text: 'Fast answers and solved problems retain customers — and retention is 5× cheaper than acquisition.',
      },
      {
        title: 'Repeat sales grow',
        text: 'A happy customer with a known history is the best candidate for the next purchase. The system suggests the moment.',
      },
      {
        title: 'Reputation brings new customers',
        text: 'Good service turns customers into referrers — the cheapest acquisition channel there is.',
      },
      {
        title: 'Support handles more',
        text: 'The knowledge base and self-service absorb routine questions — the same team serves more customers.',
      },
    ],
    ai: {
      title: 'AI agents will take over the support routine',
      lead: 'AI agents are coming to Habibi soon — automating the support routine, from request intake to deadline control.',
      flow: ['Request intake', 'Answer from knowledge base', 'Route to specialist', 'SLA control'],
      cards: [
        {
          title: '🤖 Replies instantly, 24/7',
          text: 'The AI agent answers standard questions from the knowledge base — at night, on weekends, with no queue.',
        },
        {
          title: '🧭 Routes the complex to people',
          text: 'A non-standard request is classified and handed to the right specialist with full context.',
        },
        {
          title: '⚠️ Watches the deadlines',
          text: 'The agent tracks the SLA on every ticket and nudges assignees before the clock runs out.',
        },
      ],
    },
    together: [
      {
        title: 'Service + CRM & sales',
        text: 'Request history in the customer card. Sales sees who is happy and ready to buy again.',
      },
      {
        title: 'Service + Inventory',
        text: 'Spare parts and materials for repairs with real stock levels. Warranty work never waits for “delivery someday”.',
      },
      {
        title: 'Service + Projects & tasks',
        text: 'Complex requests become tasks for the team — with an owner and a deadline.',
      },
      {
        title: 'Service + Website & leads',
        text: 'The website form and chat are one more channel that lands straight in the ticket queue.',
      },
    ],
    industries: {
      list: [
        'Service centres',
        'Auto services',
        'Electronics & appliances',
        'IT & development',
        'E-commerce',
        'Medicine & clinics',
        'Property management',
        'B2B services',
        'Furniture & interiors',
        'Equipment',
      ],
      note: 'The Service & support module is strongest together with CRM — together they cover the customer’s full journey, from first enquiry to repeat purchase.',
    },
    tariff: { headline: 'Service & support is included in Habibi Pro', freeIncludes: false },
    cta: {
      title: 'Turn service into a sales channel',
      text: 'Start for free with CRM — and add Service & support when you are ready to answer every customer on time.',
    },
  },

  pos: {
    slug: 'pos',
    icon: ShoppingCart,
    title: 'Retail (POS)',
    lead: 'Checkout, inventory and finance work as a single whole.',
    pills: ['Checkout and receipts', 'Register shifts', 'Multiple stores', 'Sales analytics'],
    pains: [
      {
        icon: '🧾',
        title: 'The till lives apart from stock',
        text: 'The sale is rung up, but stock never changes. What is actually in the store — nobody knows.',
      },
      {
        icon: '🌙',
        title: 'Revenue tallied in the evening',
        text: 'How much was sold becomes clear after closing — by hand, with a calculator and mistakes.',
      },
      {
        icon: '💸',
        title: 'Shortages at the till',
        text: 'Cash doesn’t match receipts, and nobody is to blame. Every stocktake is an unpleasant surprise.',
      },
      {
        icon: '↩️',
        title: 'Refunds without control',
        text: 'Refunds and voided receipts go untracked — the favourite “grey zone” of dishonest cashiers.',
      },
      {
        icon: '🏪',
        title: 'Stores are separate worlds',
        text: 'Every location keeps its own spreadsheet and its own truth. Comparing stores is impossible.',
      },
      {
        icon: '📉',
        title: 'What sells — unknown',
        text: 'Best-sellers run out; dead stock hogs the shelves. Purchasing runs on gut feeling.',
      },
    ],
    chaos: {
      lead: 'In retail, money leaks quietly — at the till, on the shelf and in the back room.',
      stats: [
        { value: 'up to 15%', text: 'of goods lost to shortages and mix-ups without proper records' },
        { value: 'up to 20%', text: 'of profit eaten by empty shelves, dead stock and “grey” refunds' },
        { value: '2–3', text: 'hours a day spent manually tallying revenue and stock' },
        { value: '×2', text: 'longer queues when the till doesn’t help the cashier — customers walk out' },
      ],
      example: {
        before:
          'Do the maths: with a $30,000 monthly turnover, shortages and mix-ups of just 5% add up to ',
        accent: '$18,000 a year',
        after: ' vanishing into thin air.',
      },
    },
    about: {
      lead: 'A full-featured point of sale connected to inventory and finance. Every receipt writes goods off stock and lands in revenue — instantly, with no manual tallying.',
      cards: [
        {
          title: '🛒 A fast checkout',
          text: 'A sale takes seconds: product search, discounts, any payment method.',
        },
        {
          title: '📦 Stock updates itself',
          text: 'Receipt rung up — goods written off. The store always knows what is on the shelves.',
        },
        {
          title: '💰 Revenue in finance instantly',
          text: 'Every register’s sales flow into financial reports in real time.',
        },
        {
          title: '🏬 All stores in one system',
          text: 'Locations, registers and cashiers under unified control, with side-by-side comparison.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Checkout and receipts',
        lead: 'Every receipt is a document that updates stock and finance at once.',
        flow: ['Item in the receipt', 'Payment: card / cash', 'Stock write-off', 'Revenue in finance'],
        cards: [
          {
            title: 'Any payment method',
            text: 'Card, cash, split payment — recorded on every receipt and reconciled at the end of the shift.',
          },
          {
            title: 'Refunds under control',
            text: 'Every refund is a document with a reason and a cashier. “Grey” schemes at the till stop working.',
          },
          {
            title: 'Discounts and promotions',
            text: 'Discounts apply by rules, not “by eye” — and you see how they affect revenue.',
          },
        ],
      },
      {
        title: 'Register shifts and cashiers',
        lead: 'Every shift opens and closes with a cash count — discrepancies show up immediately.',
        cards: [
          {
            title: 'Shift control',
            text: 'Opening with a cash balance, every receipt tied to a cashier, closing with a count — discrepancies visible at close.',
          },
          {
            title: 'Sales per cashier',
            text: 'Revenue, average receipt and refunds per cashier — the basis for motivation and control.',
          },
          {
            title: 'All registers in sight',
            text: 'How many registers are open right now and the takings on each — visible from the office.',
          },
        ],
      },
      {
        title: 'Multiple stores — one system',
        lead: 'The chain is managed as a whole, not as a set of disconnected locations.',
        cards: [
          {
            title: 'Sales per store',
            text: 'Revenue, receipts and profit for every location side by side. You instantly see which store pulls the chain and which lags.',
          },
          {
            title: 'Stock per location',
            text: 'Goods available in one store and gone in another? A transfer between locations is one document.',
          },
          {
            title: 'Unified prices and catalogue',
            text: 'Products and prices are managed centrally — no more “it’s different at our branch”.',
          },
        ],
        note: 'The result: opening a new location means connecting to the system, not building records from scratch.',
      },
      {
        title: 'Retail analytics',
        lead: 'The executive screen: the whole chain in numbers, updated with every receipt.',
        cards: [
          {
            title: 'Sales and average receipt',
            text: 'Turnover, receipt count and average ticket — chain-wide and per store, with dynamics.',
          },
          {
            title: 'Gross profit',
            text: 'Not just revenue but margin — you see how much the chain actually earns.',
          },
          {
            title: 'Top sellers and peak hours',
            text: 'What sells best and at what hours — you know what to shelve and when to strengthen shifts.',
          },
        ],
      },
    ],
    Preview: PosPreview,
    previewTitle: 'This is what Retail looks like in Habibi',
    solve: [
      {
        was: 'Till, stock and finance live separately',
        now: 'A receipt writes goods off and lands in revenue instantly',
      },
      {
        was: 'Revenue tallied by hand in the evening',
        now: 'Every register’s sales visible in real time from the office',
      },
      {
        was: 'Shortages and “grey” refunds surface late',
        now: 'Shifts close with a count; refunds are documents with reasons',
      },
      {
        was: 'Every store is its own separate world',
        now: 'The chain is managed centrally; locations compared side by side',
      },
      {
        was: 'Purchasing on gut feeling',
        now: 'Top sellers and stock levels dictate what to buy',
      },
    ],
    money: [
      {
        title: 'Best-sellers always on the shelf',
        text: 'Sales analytics and the inventory link keep top items in stock — an empty shelf sells nothing.',
      },
      {
        title: 'Shortages shrink',
        text: 'A count on every shift and refund documents close the “grey zones” — percentages of turnover return to the till.',
      },
      {
        title: 'The average receipt grows',
        text: 'Top sellers, promotions and hourly data suggest what to offer and when to reinforce shifts.',
      },
      {
        title: 'The chain grows without chaos',
        text: 'New locations plug into a ready system — scaling doesn’t multiply the mess.',
      },
    ],
    ai: {
      title: 'AI agents will take over the retail routine',
      lead: 'AI agents are coming to Habibi soon — automating the store manager’s routine, from sales analysis to replenishment requests.',
      flow: ['Sales by receipts', 'Demand forecast', 'Shelf replenishment', 'Anomaly control'],
      cards: [
        {
          title: '🤖 Watches the shelves itself',
          text: 'The AI agent forecasts demand per location and drafts replenishment requests — seasonality and promotions included.',
        },
        {
          title: '📈 Suggests what to sell',
          text: 'The agent notices which products are gaining or losing demand and proposes promotions and re-shelving.',
        },
        {
          title: '🚨 Catches anomalies at the till',
          text: 'Suspicious refunds, voids and discrepancies — the agent flags them to the manager immediately.',
        },
      ],
    },
    together: [
      {
        title: 'POS + Inventory',
        text: 'Every receipt writes goods off in real time — store stock is always accurate.',
      },
      {
        title: 'POS + Purchases',
        text: 'Sales and stock levels turn into supplier requests — shelves are refilled on time.',
      },
      {
        title: 'POS + Finance',
        text: 'Every register’s revenue lands in financial reports instantly — no evening tally.',
      },
      {
        title: 'POS + CRM & sales',
        text: 'Shoppers and their history power loyalty programmes and repeat sales.',
      },
    ],
    industries: {
      list: [
        'Grocery stores',
        'Retail chains',
        'Pharmacies',
        'Cafes & bakeries',
        'Clothing stores',
        'Cosmetics',
        'Pet shops',
        'Building materials',
        'Electronics',
        'Flower shops',
      ],
      note: 'The Retail (POS) module is strongest together with Inventory and Purchases — together they cover the full cycle: supplier → shelf → customer.',
    },
    tariff: { headline: 'Retail (POS) is included in Habibi Pro', freeIncludes: false },
    cta: {
      title: 'Connect the till, stock and finance',
      text: 'Start for free — and add Retail (POS) when you are ready to see every register and every receipt from the office.',
    },
  },

  'website-leads': {
    slug: 'website-leads',
    icon: Globe,
    title: 'Website & leads',
    lead: 'Every request from your website instantly becomes a task in progress.',
    pills: ['Requests from every channel', 'Statuses and owners', 'Convert to CRM', 'Source analytics'],
    pains: [
      {
        icon: '📧',
        title: 'Requests fall into the inbox',
        text: 'The website form sends an email to a shared mailbox. It drowns among newsletters — forever.',
      },
      {
        icon: '🐢',
        title: 'Replies come a day later',
        text: 'By the time the request was noticed and forwarded “to the right person”, the customer had already bought from a competitor.',
      },
      {
        icon: '🧩',
        title: 'Channels are scattered',
        text: 'The form goes to email, the chat lives in one window, WhatsApp and Instagram in personal phones. No single picture.',
      },
      {
        icon: '🤷',
        title: 'Nobody owns the request',
        text: 'Everyone saw the enquiry — nobody took it. A week later: “who was handling this customer?”',
      },
      {
        icon: '🎯',
        title: 'Sources unknown',
        text: 'Where the request came from — ads, search or Instagram — nobody records. The budget pours blindly.',
      },
      {
        icon: '📉',
        title: 'Site conversion is a mystery',
        text: 'How many visitors, how many requests, how many became sales — no numbers, only feelings.',
      },
    ],
    chaos: {
      lead: 'You pay for every click and every visitor — then lose ready customers at the last step.',
      stats: [
        { value: '~30%', text: 'of requests are lost on the way from the website to a manager' },
        { value: '5 min', text: '— the response time after which the chance to close a lead drops sharply' },
        { value: '1st', text: 'whoever replies to the customer first makes the sale. Speed decides' },
        { value: '×2', text: 'more expensive per lead when a third of requests evaporate unanswered' },
      ],
      example: {
        before:
          'Do the maths: with a $2,000 monthly ad budget, losing 30% of requests means ',
        accent: '$600 a month going straight into the bin',
        after: ' — together with the customers it brought.',
      },
    },
    about: {
      lead: 'All enquiries from the website and social media — forms, chat, messengers, ads — gather in one queue. Every request has a status, a source and an owner.',
      cards: [
        {
          title: '📥 No request ever gets lost',
          text: 'Every enquiry is captured in the system the moment it is sent — not in an inbox or a manager’s phone.',
        },
        {
          title: '⚡ Into work instantly',
          text: 'A new request is assigned to an owner right away — the customer gets a reply while still “hot”.',
        },
        {
          title: '🔗 One click — a lead in CRM',
          text: 'A request converts into a lead with its full history: name, source, conversation.',
        },
        {
          title: '📊 Sources in numbers',
          text: 'You see which channel brings requests and which only brings ad costs.',
        },
      ],
    },
    capabilities: [
      {
        title: 'Every enquiry in one place',
        lead: 'Wherever the customer writes from — the request lands in one queue.',
        flow: ['Website form', 'Website chat', 'WhatsApp', 'Telegram', 'Instagram', 'Ads'],
        cards: [
          {
            title: 'Different forms, different requests',
            text: 'Contact, consultation, demo request — the form type is recorded, so the team knows instantly what the customer wants.',
          },
          {
            title: 'A source on every request',
            text: 'Site, campaign and channel are saved automatically — the basis for honest ad analytics.',
          },
          {
            title: 'Time of enquiry',
            text: 'You see when the request arrived and how long it has been waiting — response speed becomes measurable.',
          },
        ],
      },
      {
        title: 'Statuses and owners',
        lead: 'Every request follows a clear path — and it is always visible who is handling it.',
        flow: ['New', 'In progress', 'Converted to lead', 'Rejected'],
        cards: [
          {
            title: 'A queue of new requests',
            text: 'All unhandled enquiries in plain sight, not in a mailbox. Nothing hangs unnoticed.',
          },
          {
            title: 'An owner for each',
            text: 'The request is assigned to a specific person — “everyone saw it, nobody took it” stops working.',
          },
          {
            title: 'Team comments',
            text: 'The discussion lives inside the request — agreements and details never get lost in chats.',
          },
        ],
      },
      {
        title: 'Request → lead → deal',
        lead: 'The customer journey never breaks: a website request becomes a CRM lead in one action.',
        cards: [
          {
            title: 'One-click conversion',
            text: 'Request checked — the manager converts it into a lead. Name, contacts, source and conversation carry over automatically.',
          },
          {
            title: 'Nothing entered twice',
            text: 'No copying from email to spreadsheet to CRM — the data moves by itself.',
          },
          {
            title: 'End-to-end history',
            text: 'From the first website visit to payment — the customer’s whole journey in one system.',
          },
        ],
      },
      {
        title: 'Website and source analytics',
        lead: 'The executive screen: what happens to requests and which channels work.',
        cards: [
          {
            title: 'Request flow',
            text: 'How many requests came in, how many are in progress and how many converted to leads — at a glance.',
          },
          {
            title: 'Filtering the noise',
            text: 'Spam and off-target enquiries are rejected with a reason — the statistics stay honest.',
          },
          {
            title: 'Page conversion',
            text: 'Visitors, pages and requests — you see which pages sell and which just burn the ad budget.',
          },
        ],
      },
    ],
    Preview: SiteLeadsPreview,
    previewTitle: 'This is what Requests looks like in Habibi',
    solve: [
      {
        was: 'Website requests drown in a shared inbox',
        now: 'Every enquiry in a single queue with a number and status',
      },
      {
        was: 'Customers wait a day and go to competitors',
        now: 'The request is assigned instantly — a reply in minutes',
      },
      {
        was: 'Forms, chats and messengers live separately',
        now: 'All channels gathered in one place',
      },
      {
        was: 'Sources unknown — advertising flies blind',
        now: 'Channel and campaign recorded on every request',
      },
      {
        was: 'Requests copied into CRM by hand, with losses',
        now: 'One-click conversion to a lead, with the full history',
      },
    ],
    money: [
      {
        title: 'Advertising pays off in full',
        text: 'Every paid-for request reaches a manager — the ad budget stops pouring into a leaky bucket.',
      },
      {
        title: 'Response speed sells',
        text: 'A reply in minutes instead of a day multiplies conversion — customers buy from whoever answers first.',
      },
      {
        title: 'Budget flows to working channels',
        text: 'You see which source brings leads and deals — money moves to where it sells.',
      },
      {
        title: 'The website becomes measurable',
        text: 'Page and form conversion in numbers — the site improves on data, not guesses.',
      },
    ],
    ai: {
      title: 'AI agents will take over request handling',
      lead: 'AI agents are coming to Habibi soon — automating the request’s whole journey, from an instant reply to handing a hot lead to a manager.',
      flow: ['Website request', 'Instant reply', 'Qualifying questions', 'Hot lead to manager'],
      cards: [
        {
          title: '🤖 Replies in seconds, 24/7',
          text: 'The AI agent greets the customer right after the form is sent — at night, on weekends, on holidays.',
        },
        {
          title: '💬 Qualifies by itself',
          text: 'The agent asks clarifying questions, filters spam and fills in the card — the manager receives a ready lead.',
        },
        {
          title: '🎯 Hands over at the right moment',
          text: 'A hot customer goes straight to a manager with full context. A warm one goes into nurturing. Nothing is lost.',
        },
      ],
    },
    together: [
      {
        title: 'Website + CRM & sales',
        text: 'The request becomes a lead in the pipeline — and is taken to the deal with its full history.',
      },
      {
        title: 'Website + Service & support',
        text: 'Existing customers’ enquiries go into support tickets — every channel has its own queue.',
      },
      {
        title: 'Website + Finance',
        text: 'End-to-end analytics: from a website visit to money in the account — every channel’s contribution visible.',
      },
      {
        title: 'Website + Projects & tasks',
        text: 'A quote or survey request becomes a task for the team — with an owner and a deadline.',
      },
    ],
    industries: {
      list: [
        'Services & agencies',
        'E-commerce',
        'Real estate',
        'Medicine & clinics',
        'Education',
        'Beauty salons',
        'Tourism',
        'Auto services',
        'IT companies',
        'Construction & renovation',
      ],
      note: 'Website & leads is included in the free plan and is strongest together with CRM — together they cover the customer journey from click to deal.',
    },
    tariff: { headline: 'Website & leads is already on the free plan', freeIncludes: true },
    cta: {
      title: 'Stop losing requests today',
      text: 'Website & leads is free — connect the module together with CRM, and every advertising dollar will start reaching the sale.',
    },
  },
}
