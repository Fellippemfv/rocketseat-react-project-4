import { AppProps } from "next/dist/shared/lib/router/router"
import { globalStyles } from "../styles/global"

import logoImg from "../assets/logo.svg"
import { Container, Header } from "../styles/pages/app";

import Image from 'next/future/image'

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>

       <Component {...pageProps} />
    </Container>
  )
}