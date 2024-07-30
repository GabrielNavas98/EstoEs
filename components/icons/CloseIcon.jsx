import * as React from "react"
export const CloseIcon = ({
  size,
  height,
  width,
  ...props
}) =>{
  return(
    <svg
    width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 32 32"
      fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    {...props}
    >
    <g fill="#121313" fillRule="evenodd" clipRule="evenodd">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 8.836 7.163 16 16 16 8.836 0 16-7.163 16-16S24.836 0 16 0zm0 30C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z" />
      <path d="m22.729 21.271-5.268-5.269 5.238-5.195a.992.992 0 0 0 0-1.414 1.018 1.018 0 0 0-1.428 0l-5.231 5.188-5.309-5.31a1.007 1.007 0 0 0-1.428 0 1.015 1.015 0 0 0 0 1.432l5.301 5.302-5.331 5.287a.994.994 0 0 0 0 1.414 1.017 1.017 0 0 0 1.429 0l5.324-5.28 5.276 5.276a1.007 1.007 0 0 0 1.428 0 1.015 1.015 0 0 0-.001-1.431z" />
    </g>
  </svg>
  )
  }

