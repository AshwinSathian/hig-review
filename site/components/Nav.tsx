'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nav } from '@/lib/site'

export function Nav() {
  const path = usePathname()
  return (
    <nav aria-label="Main">
      <ul>
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} aria-current={path?.startsWith(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
