// Renders scripts/og.html to public/og.png at 1200x630.
import { chromium } from '../../node_modules/playwright/index.mjs'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
await p.goto(new URL('./og.html', import.meta.url).href, { waitUntil: 'networkidle' })
await p.screenshot({ path: new URL('../public/og.png', import.meta.url).pathname })
await b.close()
