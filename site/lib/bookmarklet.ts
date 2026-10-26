import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { readRepo } from './repo'

// Built from the skill's own measure.js at build time, so the bookmarklet
// measures exactly what a review measures.
const strip = (src: string) =>
  src
    .split('\n')
    .filter((l) => !/^\s*\/\//.test(l))
    .join('\n')
    .trim()
    .replace(/;$/, '')

export const bookmarklet = () => {
  const measure = strip(readRepo('scripts/measure.js'))
  const panel = strip(readFileSync(join(process.cwd(), 'bookmarklet/panel.js'), 'utf8'))
  const code = `(()=>{try{const r=(${measure})();(${panel})(r)}catch(e){alert('loupe could not measure this page: '+e.message)}})()`
  const href = 'javascript:' + encodeURIComponent(code)
  return { href, bytes: href.length }
}
