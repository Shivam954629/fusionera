'use client'
import React from 'react'

export default function AboutUs() {
    return (
        <section id="about" className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
            data-reveal-delay="50">
            <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
                <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80"
                    alt="Furniture background in modern living room"
                    className="absolute inset-0 h-full w-full object-cover opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
                <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
                    <div>
                        <p
                            className="inline-flex rounded-md border border-brand-cyan/40 bg-transparent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-cyan">
                            About Us
                        </p>
                        <h2 className="mt-4 text-2xl font-bold md:text-3xl">Fusionera</h2>
                        <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                            V-Tech Innovation Services provides efficient Business to Business networking platforms
                            and solutions for Indian Market through - Trade Shows, Virtual Exhibitions, Market
                            Research, Brand Management and Publications.
                        </p>
                        <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                            V-Tech Innovation Services is a powerhouse of people with vast experience in diversified
                            business-to-business market segments including B2B Services through intense and thorough
                            exploration. We conducted market research programs for many global brands in India and
                            overseas.
                        </p>
                        <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                            And thus, gained expertise in creating an ideal working platform to understand the
                            Indian market by providing a resourceful and accessible solutions for Indian and global
                            enterprises to launch brands and products in the Indian Market.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
