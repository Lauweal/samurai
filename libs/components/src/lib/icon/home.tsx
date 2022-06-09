import { forwardRef } from "react"
import { IconProps } from "./icon"



export const HomeLineIcon = forwardRef<SVGSVGElement, IconProps>(function HomeLineIcon({ color = 'currentColor', ...props }, forwardedRef) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={forwardedRef}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.6666667 93.8666667a4.2666667 4.2666667 0 0 1-4.2666667 4.2666666H14.9205333A10.6538667 10.6538667 0 0 1 4.2666667 87.4517333v-36.2666666c0-4.7744 2.7328-10.6816 6.3786666-13.7792L48.4352 5.2821333a4.2666667 4.2666667 0 0 1 5.5253333 0L91.7546667 37.4058667c3.648 3.1061333 6.3786667 8.9984 6.3786666 13.7813333v36.2666667A10.6624 10.6624 0 0 1 87.4645333 98.1333333H640a4.2666667 4.2666667 0 0 1-4.2666667-4.2666666V68.2666667h-17.0666666v256z m44.7978666-4.2666667A2.1290667 2.1290667 0 0 0 896 87.4517333v-36.2666666c0-2.2784-1.6277333-5.7941333-3.3706667-7.2768L512 14.1333333 16.1706667 43.9082667C14.4341333 45.3845333 12.8 48.9152 12.8 51.1850667v36.2666666A2.1205333 2.1205333 0 0 0 14.9205333 896H34.1333333V640a4.2666667 4.2666667 0 0 1 4.2666667-4.2666667h256a4.2666667 4.2666667 0 0 1 4.2666667 4.2666667v256h19.1978666z" fill={color} p-id="3388" />
    </svg>
  );
})