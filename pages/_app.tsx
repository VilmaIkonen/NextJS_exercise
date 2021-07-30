import '../styles/global.css' // !! Crucial import for styles!
import { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps}/>
}

// Global styles can be imported only to _app.js!