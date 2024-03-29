type BookHeartIconProps = {
  size?: number;
};

export default function BookHeartIcon({ size = 48 }: BookHeartIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38 46.6l-1.2-1c-4-3.8-6.8-6.2-6.8-9.2 0-2.4 2-4.4 4.4-4.4 1.4 0 2.8.6 3.6 1.6.8-1 2.2-1.6 3.6-1.6 2.4 0 4.4 1.8 4.4 4.4 0 3-2.8 5.4-6.8 9.2l-1.2 1z"
        fill="#50B2C0"
      />
      <path
        d="M36 4c2.2 0 4 1.8 4 4v18.16L38 26l-2 .16V8H26v16l-5-4.5-5 4.5V8h-4v32h14.16c.24 1.44.74 2.78 1.44 4H12c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4h24z"
        fill="#8381D9"
      />
    </svg>
  );
}
