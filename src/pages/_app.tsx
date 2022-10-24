import { AppProps } from "next/dist/shared/lib/router/router"
import { globalStyles } from "../styles/global"

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}