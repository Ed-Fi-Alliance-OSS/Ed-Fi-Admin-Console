import { Flex } from "@chakra-ui/react"
import { AuthContextProps } from "react-oidc-context"
import { useLocation } from "react-router-dom"
import { EdxAppConfig, useRouteLayoutSelector } from "@edwire/edx-portal-shared"
import useScrollTop from "../../hooks/useScrollTop"
import DefaultLayoutWrapper from "./DefaultLayoutWrapper"
import useCheckPermissions from "../../hooks/useCheckPermissions"

interface LayoutProps {
    auth: AuthContextProps
    edxAppConfig: EdxAppConfig
    content: JSX.Element
    notificationBarMessage: string
    simpleLayoutRouteList: string[]
    isClosingSession: boolean
    onLogout: () => Promise<void>
}

const Layout = ({ auth, edxAppConfig, content, notificationBarMessage, simpleLayoutRouteList, isClosingSession, onLogout }: LayoutProps) => {
    const location = useLocation()
    useScrollTop()

    const { routeHasDefaultLayout } = useRouteLayoutSelector()

    return (
        <Flex w="full" minH='100vh' position='relative'>
            <Flex className="one" w='full' flexDirection='column' justifyContent='center'>
                {routeHasDefaultLayout(simpleLayoutRouteList, location.pathname)?  
                    <DefaultLayoutWrapper 
                        auth={auth}
                        edxAppConfig={edxAppConfig}
                        content={content}
                        notificationBarMessage={notificationBarMessage}
                        isClosingSession={isClosingSession}
                        onLogout={onLogout} />
                    :
                    content}
            </Flex>
        </Flex>
    )
}

export default Layout