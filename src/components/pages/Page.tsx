import { Helmet } from "react-helmet-async"

interface PageProps {
    appName: string
    title: string
    htmlTags?: JSX.Element[]
    children: JSX.Element
}

const Page = ({ appName, title, children, htmlTags }: PageProps) => {
    return (
        <>
            <Helmet>
                <title>{ `${appName} | ${ title }` }</title>
                {htmlTags}
            </Helmet>
            { children }
        </>
    )
}

export default Page