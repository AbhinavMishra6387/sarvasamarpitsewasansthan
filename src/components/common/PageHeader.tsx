import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
}

export function PageHeader({ title, subtitle, breadcrumbs, badge }: PageHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-ngo-dark-900 via-ngo-dark-800 to-ngo-dark-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-ngo-orange">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ngo-orange-400 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-ngo-orange-400 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ngo-orange font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title & Subtitle */}
        {badge && (
          <span className="inline-block bg-ngo-orange/20 border border-ngo-orange text-ngo-orange-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
