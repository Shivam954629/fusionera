import Link from 'next/link';
import React from 'react';
import { productList } from '../util';

const Divider = () => <div className="h-px w-20 bg-[#1a1464]/20 my-3" />;

export default function Section2() {
  return (
    <section className="w-full py-10 md:py-14 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1464]">
            Product Portfolio
          </h2>
          <Divider />
          <p className="text-sm leading-7 text-gray-500 max-w-2xl">
            Indian and international brands, manufacturers, importers and distributors
            across Houseware, HORECA Ware, Home Appliances and allied segments.
          </p>
        </div>

        {/* Category grid — image + name only */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {productList.slice(0, 8).map((p) => (
            <Link
              key={p.title}
              href="/gallery"
              className="group block overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow"
              style={{ border: '1px solid rgba(26,20,100,0.08)' }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                  src={p.src}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="px-3 py-2.5 border-t border-[#1a1464]/05">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a1464]">
                  {p.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse All */}
        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="inline-block rounded px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: '#1a1464' }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
