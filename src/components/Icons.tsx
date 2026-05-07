import { SVGProps } from "react";

const baseProps: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.6,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ScrollIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 4v15a2 2 0 0 0 2 2h12a2 2 0 0 1-2-2V4" />
      <path d="M19 4H5" />
      <path d="M9 8h8M9 12h8M9 16h6" />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,17 5.5,21 7.5,13.5 2,9 9,9" />
    </svg>
  );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SwordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M14.5 6.5L20 12l-2 2-5.5-5.5z" />
      <path d="M12.5 8.5L4 17v3h3l8.5-8.5" />
    </svg>
  );
}

export function PotionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 4h6v3l3 6a5 5 0 0 1-12 0l3-6V4z" />
      <path d="M9 7h6" />
    </svg>
  );
}

export function ShardIcon({
  filled,
  ...props
}: SVGProps<SVGSVGElement> & { filled?: boolean }) {
  return (
    <svg {...baseProps} {...props} strokeWidth={2}>
      <polygon points="12,3 22,20 2,20" fill={filled ? "currentColor" : "none"} />
    </svg>
  );
}
