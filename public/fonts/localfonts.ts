import localFont from 'next/font/local'

const NexonLv1Gothic = localFont({
  src: [
    {
      path: './NEXONLv1Gothic-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './NEXONLv1Gothic-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})

export default NexonLv1Gothic
