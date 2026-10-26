import { marked } from 'marked'
import { readRepo } from './repo'

// The markdown under a heading, up to the next heading of the same or higher level.
export const section = (path: string, heading: string) => {
  const lines = readRepo(path).split('\n')
  const start = lines.findIndex((l) => /^#{1,6} /.test(l) && l.replace(/^#+ /, '').trim() === heading)
  if (start < 0) throw new Error(`No heading "${heading}" in ${path}`)
  const level = lines[start].match(/^#+/)![0].length
  const end = lines.findIndex((l, i) => i > start && new RegExp(`^#{1,${level}} `).test(l))
  return lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim()
}

// Reports quote markup from the pages they reviewed. Raw HTML in markdown is
// shown as text, never rendered, so nothing a report quotes can run here.
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const safeHref = (href: string) => /^(https?:|mailto:|#|\/(?!\/))/i.test(href.trim())
let demoteBy = 0
marked.use({
  renderer: { html: ({ text }) => escape(text) },
  walkTokens: (t) => {
    if ((t.type === 'link' || t.type === 'image') && !safeHref(t.href)) t.href = '#'
    if (t.type === 'heading') t.depth = Math.min(6, t.depth + demoteBy)
  },
})

// Wide tables scroll inside their own box instead of widening the page.
// demote: push embedded headings down so a quoted report sits under the page's own h2.
export const html = (md: string, demote = 0) => {
  demoteBy = demote
  const out = marked.parse(md, { async: false }) as string
  demoteBy = 0
  return out
    .replace(/<table>/g, '<div class="table-wrap" tabindex="0"><table>')
    .replace(/<\/table>/g, '</table></div>')
}
