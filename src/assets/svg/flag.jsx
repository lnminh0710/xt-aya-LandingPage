export const EngFlag = ({ selected }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
  >
    <path d='M0 0H32V32H0V0Z' fill='#012169' />
    <path
      d='M32 0V4L20.125 16L32 27.6875V32H27.8125L15.875 20.25L4.25 32H0V27.75L11.625 16.0625L0 4.625V0H3.875L15.875 11.75L27.5 0H32Z'
      fill='white'
    />
    <path
      d='M11.5 20.25L12.1875 22.375L2.625 32H0V31.8125L11.5 20.25ZM19.25 19.5L22.625 20L32 29.1875V32L19.25 19.5ZM32 0L20 12.25L19.75 9.5L29.125 0H32ZM0 0.0625L12.0625 11.875L8.375 11.375L0 3.0625V0.0625Z'
      fill='#C8102E'
    />
    <path d='M11 0V32H21V0H11ZM0 11V21H32V11H0Z' fill='white' />
    <path d='M0 13V19H32V13H0ZM13 0V32H19V0H13Z' fill='#C8102E' />
    <rect
      x='1'
      y='1'
      width='30'
      height='30'
      rx='15'
      stroke='white'
      strokeWidth='2'
    />
    {!selected && (
      <circle
        cx='16'
        cy='16'
        r='16'
        fill='#D9D9D9'
        style={{ mixBlendMode: 'color' }}
      />
    )}
  </svg>
);

export const VniFlag = ({ selected }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
  >
    <g clipPath='url(#clip0_41_298)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M-8 0H40.0004V32.0018H-8V0Z'
        fill='#EC0015'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.8479 23.8196L16.2486 19.6382L10.681 23.8602L12.7536 16.9966L7.19043 12.761L14.0721 12.7023L16.2035 5.86121L18.3845 12.6887L25.2662 12.6978L19.7347 16.974L21.8479 23.8196Z'
        fill='#FFFF00'
      />
      {!selected && (
        <circle
          cx='16'
          cy='16'
          r='16'
          fill='#D9D9D9'
          style={{ mixBlendMode: 'color' }}
        />
      )}
    </g>
    <rect
      x='1'
      y='1'
      width='30'
      height='30'
      rx='15'
      stroke='white'
      strokeWidth='2'
    />
    <defs>
      <clipPath id='clip0_41_298'>
        <rect width='32' height='32' rx='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
