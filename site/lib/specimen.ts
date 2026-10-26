import type { Spot } from '@/components/Loupe'

// Screenshot: evals/heldout/fixtures/web-sloppy at 390 px (top 1,500 px, ticker
// paused for the capture). Findings quoted from evals/heldout/runs/opus/web-sloppy/skill.md;
// coordinates measured on the same page.
export const specimen: { src: string; alt: string; width: number; height: number; spots: Spot[]; caption: string } = {
  src: '/specimen/lendwell-390.png',
  alt: 'The Lendwell tool-library page on a phone: a green gradient hero reading “Share more. Own less.”, a scrolling news ticker, and tool cards with grey notes.',
  width: 390,
  height: 1500,
  spots: [
    {
      x: 120,
      y: 1099,
      impact: 'Blocker',
      apple: 'Web',
      title: 'Card notes measure 2.21:1',
      evidence:
        '#a9b0ab on white, 14 px, on all six cards, including “Back 14 Nov”, the only reason given for a disabled Reserve. WCAG 1.4.3 needs 4.5:1. Fix: use the page’s own --muted, which measures 5.56:1.',
    },
    {
      x: 195,
      y: 69,
      impact: 'Blocker',
      apple: 'Web',
      title: 'The ticker never stops',
      evidence:
        'It loops forever with no pause, and still reports “running” with reduced motion on. It also carries the bank-holiday closure notice. WCAG 2.2.2 (Level A). Fix: a static notice line, closures first.',
    },
    {
      x: 259,
      y: 26,
      impact: 'Blocker',
      apple: 'Web',
      title: 'Focus is invisible everywhere',
      evidence:
        '“button, input, select, a { outline: none }” with nothing in its place. A Tab walk found no outline and no shadow at any of 16 stops, including this focused link. WCAG 2.4.7.',
    },
    {
      x: 195,
      y: 470,
      impact: 'Major',
      apple: 'SHOULD',
      title: 'The first screen sells; it doesn’t lend',
      evidence:
        'An 88vh hero puts “Browse tools” at y = 933 on a 900 px screen, at 390, 820 and 1440 wide. No tool, search or reservation is visible on arrival. Apple’s Purpose principle; the review proposes opening on the tools, booked by date.',
    },
    {
      x: 86,
      y: 1173,
      impact: 'Major',
      apple: 'Taste',
      title: 'Reserving never changes “3 available”',
      evidence:
        'After reserving a Cordless drill the card still says 3 available, and the same tool can be booked again with no warning. Reviewer judgement, so Taste: no Apple or WCAG rule covers stock.',
    },
  ],
  caption:
    'Five of the 25 findings Claude Opus returned with loupe, in the blind round. The full report, and the review the same model wrote without loupe, are on the Lendwell case page.',
}
