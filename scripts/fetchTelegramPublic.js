// Scrape public Telegram channel without API credentials.
// Caveat: HTML structure may change; limited metadata; no rate-limit guarantees.
// Env vars: START_DATE=YYYY-MM-DD (optional)
// Usage: node scripts/fetchTelegramPublic.js

import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

dotenv.config()

const channel = process.env.TELEGRAM_CHANNEL || 'infoinfounibo'
const startDate = new Date(process.env.START_DATE || '2025-09-01')
const url = `https://t.me/s/${channel}`

function parseDate(raw) {
  // Telegram shows date parts; fallback to today if missing.
  try {
    return new Date(raw)
  } catch {
    return new Date()
  }
}

function classify(text) {
  const hashtags = Array.from(text.match(/#[\w]+/g) || []).map((h) => h.slice(1).toLowerCase())
  const category =
    hashtags.find((h) => ['didattica', 'opportunita', 'eventi'].includes(h)) ||
    Array.from(text.match(/Hello[\w]+/g) || []).map((h) => h.slice(1).toLowerCase()).length
      ? 'eventi'
      : 'didattica'
  const priority = hashtags.find((h) => ['high', 'medium', 'low'].includes(h)) || 'low'
  return { category, priority }
}

async function run() {
  console.log(`Fetching public channel: ${url}`)
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Telegram Scraper)' } })
  if (!res.ok) {
    console.error('Failed to fetch channel page', res.status)
    process.exit(1)
  }
  const html = await res.text()
  const $ = cheerio.load(html)

  const items = []
  $('.tgme_widget_message').each((_, el) => {
    const id = $(el).attr('data-post')?.split('/')?.pop()
    const rawText = $(el).find('.tgme_widget_message_text').html()?.trim() || ''
    // First convert to plain text to extract title
    const plainText = rawText.replace(/<br\s*\/?>/g, '\n')
    if (!plainText) return
    // Extract title: everything before first \n\n, in plain text
    const titleMatch = plainText.split('\n\n')[0]
    let title = titleMatch || plainText.split('\n')[0] || plainText.slice(0, 100)
    // Keep content as HTML (rawText already has HTML formatting from Telegram)
    // Remove emoji background-image style attributes
    const content = rawText.replace(/\s*style="background-image:url\([^)]+\)"/g, '')
    title = title.replace(/\s*style="background-image:url\([^)]+\)"/g, '')
    // Telegram shows a time element; pick it.
    const timeEl = $(el).find('time')
    const dateIso = timeEl.attr('datetime')
    const date = dateIso ? new Date(dateIso) : new Date()
    if (date < startDate) return
    const { category, priority } = classify(plainText)
    items.push({
      id: id || Date.now() + '_' + Math.random(),
      title: title,
      content: content,
      date: date.toISOString(),
      author: 'Telegram Channel',
      category,
      priority,
    })
  })

  items.sort((a, b) => new Date(b.date) - new Date(a.date))

  const outPath = path.join(process.cwd(), 'public', 'communications.json')
  let existing = []
  if (fs.existsSync(outPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(outPath, 'utf8'))
    } catch {
      existing = []
    }
  }
  // Merge by id (avoid duplicates)
  const byId = new Map()
  ;[...items, ...existing].forEach((m) => {
    byId.set(String(m.id), m)
  })
  const merged = Array.from(byId.values()).sort((a, b) => new Date(b.date) - new Date(a.date))

  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8')
  console.log(
    `Wrote ${merged.length} communications (added ${items.length} new) to public/communications.json`,
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
