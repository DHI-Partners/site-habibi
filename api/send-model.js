// Vercel serverless function: письмо пользователю с финмоделью через Resend.
// Требуются переменные окружения (задаются в Vercel → Settings → Environment Variables):
//   RESEND_API_KEY — ключ API Resend (https://resend.com)
//   RESEND_FROM    — отправитель с подтверждённого домена, напр. 'Habibi <invest@ваш-домен>'
//                    (по умолчанию onboarding@resend.dev — работает только для теста на свою почту)

const FILES = {
  medical: {
    path: '/Habibi_Medical_Financial_Model.xlsx',
    name: 'Habibi_Medical_Financial_Model.xlsx',
    title: 'Habibi Medical',
  },
  tourism: {
    path: '/Habibi_Hajj_Umrah_Financial_Model.xlsx',
    name: 'Habibi_Hajj_Umrah_Financial_Model.xlsx',
    title: 'Habibi Hajj & Umrah',
  },
  realestate: {
    path: '/Habibi_PropTech_Financial_Model.xlsx',
    name: 'Habibi_PropTech_Financial_Model.xlsx',
    title: 'Habibi PropTech',
  },
  logistics: {
    path: '/Habibi_Logistics_Financial_Model.xlsx',
    name: 'Habibi_Logistics_Financial_Model.xlsx',
    title: 'Habibi Logistics',
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'not_configured' })
    return
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  const name = (body && body.name) || ''
  const email = (body && body.email) || ''
  const product = (body && body.product) || 'medical'

  const file = FILES[product]
  if (!file || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: 'invalid_input' })
    return
  }

  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const fileUrl = `${proto}://${host}${file.path}`
  const from = process.env.RESEND_FROM || 'Habibi <onboarding@resend.dev>'
  const safeName = escapeHtml(String(name).slice(0, 80))

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0a1b33;line-height:1.6;font-size:15px">
      <p>Здравствуйте${safeName ? ', ' + safeName : ''}!</p>
      <p>Спасибо за интерес к <b>${file.title}</b>. Финансовая модель в Excel прикреплена к этому письму.</p>
      <p>Если вложение не открывается, скачать можно по ссылке:<br>
        <a href="${fileUrl}" style="color:#0a152d">${file.name}</a>
      </p>
      <p>Бизнес-план и презентацию для инвесторов вышлем отдельно.</p>
      <p style="color:#64748b">С уважением, команда Habibi.</p>
    </div>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: `Финансовая модель — ${file.title}`,
        html,
        attachments: [{ filename: file.name, path: fileUrl }],
      }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      res.status(502).json({ ok: false, error: 'send_failed', detail: data })
      return
    }
    res.status(200).json({ ok: true, id: data.id })
  } catch {
    res.status(502).json({ ok: false, error: 'exception' })
  }
}
