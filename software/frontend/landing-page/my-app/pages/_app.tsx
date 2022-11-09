import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  //aqui pueden entrar las variables globales (en caso de necesitarlas)
  //las pasariamos como un props dentro de pageProps
  const [counter,setCounter] = useState(0);
  //kinda algo así
  return <Component {...pageProps} counter={counter} />
}

export default MyApp
