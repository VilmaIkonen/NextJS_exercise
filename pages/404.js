import Link from "next/link"
import utilsStyles from "../styles/utils.module.css"

export default function Custom404() {
    return (
        <>
        <h1 className={utilsStyles.headingXL}>404 - Page not found</h1>
        <Link href="/">Return to home page</Link>
        </>
    )
}