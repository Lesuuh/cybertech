"use client";

import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type BreadcrumbData = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbData[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList className="gap-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-[10px] tracking-[0.2em] uppercase font-medium text-gray-900">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="hover:text-gray-900 transition-colors"
                  >
                    <Link
                      href={item.href || "#"}
                      className="text-[10px] tracking-[0.2em] uppercase font-medium text-gray-400"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <span className="text-[10px] text-gray-300 mx-3 select-none">
                  /
                </span>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
