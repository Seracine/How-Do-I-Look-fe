import { META_ROOT } from '@app/_meta'
import '@styles/css/vars.css'
import '@styles/base.scss'
import NexonLv1Gothic from 'public/fonts/localfonts'
import GlobalNavigationBar from '@libs/shared/navigation/GlobalNavigationBar'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="ko">
      <body className={NexonLv1Gothic.className}>
        <GlobalNavigationBar />
        {children}
      </body>
    </html>
  )
}

export const metadata = META_ROOT

export default RootLayout
