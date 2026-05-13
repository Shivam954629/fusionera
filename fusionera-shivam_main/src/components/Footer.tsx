'use client'

import React from 'react'

export default function Footer() {
    return (
        <footer className="relative mt-10 overflow-hidden border-t border-[#7cc7ff]/20 bg-[linear-gradient(120deg,#090f2d_0%,#0f1a4f_48%,#1a2f7f_100%)] py-10 text-white">
            <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#26d1ff]/20 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-[#ffb25a]/20 blur-3xl"></div>
            <div className="mx-auto grid w-[92%] max-w-7xl gap-8 md:grid-cols-4">
                <div>
                    <img src="./images/logo.jpeg" alt="Fusionera logo" className="h-12 w-auto rounded-md" />
                    <p className="mt-4 text-sm leading-6 text-[#d8e6ff]">
                        India&apos;s business-first platform for Houseware, HORECA, Stainless Steel and Home Appliances. India's premier B2B trade show for Houseware, HoReCa, Home Décor & Kitchen. Organized by V-Tech Innovation Services.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8cecff]">Quick Links</h3>
                    <div className="mt-4 grid gap-2 text-sm text-[#e7f0ff]">
                        <a href="#featured" className="transition hover:text-[#8cecff]">About The Show</a>
                        <a href="#houseware" className="transition hover:text-[#8cecff]">Product Portfolio</a>
                        <a href="#about" className="transition hover:text-[#8cecff]">Why Fusion The Era</a>
                        <a href="#contact" className="transition hover:text-[#8cecff]">Visitor Registration</a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8cecff]">Contact</h3>
                    <div className="mt-4 grid gap-2 text-sm text-[#e7f0ff]">
                        <p>Email: info@fusionera.in</p>
                        <p>Phone: +91 93157 00590</p>
                        <p>Support: +91 93157 00590</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8cecff]">Address</h3>
                    <p className="mt-4 text-sm leading-7 text-[#e7f0ff]">
                        V-Tech Innovation Services<br />
                        Bharat Mandapam, Pragati Maidan<br />
                        New Delhi, Delhi 110001<br />
                        India
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-8 w-[92%] max-w-7xl border-t border-white/20 pt-4 text-xs text-[#c8d9ff] md:flex md:items-center md:justify-between">
                <p>© 2026 Fusionera Home. All rights reserved.</p>
                <div className="mt-2 flex gap-5 md:mt-0">
                    <a href="#" className="transition hover:text-[#8cecff]">Privacy</a>
                    <a href="#" className="transition hover:text-[#8cecff]">Terms</a>
                    <a href="#" className="transition hover:text-[#8cecff]">Support</a>
                </div>
            </div>
        </footer>
    )
}
