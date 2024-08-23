import { CartContextProvider } from '@/components/cartContext'
import '../styles/globals.css'

import { SessionProvider } from "next-auth/react"

export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <CartContextProvider>
      <SessionProvider session={session}>
        <Component {...pageProps}/>
      </SessionProvider>
    </CartContextProvider>

  )
}