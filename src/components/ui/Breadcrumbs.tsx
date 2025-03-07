import Link from "next/link"
import React from "react"

type BreadcrumbsProps = { paths: { label: string | React.ReactNode, src: string }[] }
const Arrow = ({ show }: { show: boolean }) => {
  return (
    <>
      {show && <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="#ecedee80" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="1em"><path d="m9 18 6-6-6-6"></path></svg>}
    </>
  )
}
export const Breadcrumbs = ({ paths }: BreadcrumbsProps) => {
  const len = paths.length
  return (
    <div className="flex items-center gap-1">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center gap-1">
          <Link href={path.src} className={`${index != len-1 ? "text-[#ecedee80]":"text-white"}`}>{path.label}</Link>
          <Arrow show={index != len - 1} />
        </div>
      ))}
    </div>
  )
}
