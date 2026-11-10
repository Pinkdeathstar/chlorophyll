import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border p-10 pt-8 text-sm text-muted-foreground md:flex-row">
            <p>
                &copy; {new Date().getFullYear()} Chlorophyll. All rights reserved.
            </p>

            <div className="flex gap-6">
                <Link href="/terms">Terms</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/cookies">Cookies</Link>
            </div>
        </div>
    )
}
