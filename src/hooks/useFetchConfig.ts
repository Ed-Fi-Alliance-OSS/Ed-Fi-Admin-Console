import { useEffect, useState } from "react"
import { EdxAppConfig } from "@edfi/admin-console-shared-sdk"

interface UseFetchAppAuthConfig {
    env: string | undefined
    serverMode: string | undefined
}

const configUri = `${import.meta.env.BASE_URL}config.json`

interface FetchConfigParams {
    env: string | undefined
    serverMode: string | undefined
}

const fetchConfig = async ({ env, serverMode }: FetchConfigParams) => {
    const serveMode = serverMode && serverMode[serverMode.length - 1] === ""? serverMode.substring(0, serverMode.length - 1) : serverMode

    let uri = ''

    if (env) {
        if (serveMode === 'node') 
            uri = configUri
        else 
            uri = '/local.config.json'
    }
    else {
        uri = configUri
    }

    const configData = await fetch(uri)
    const config = await configData.json()

    return config
}

export const mapEdxToAppConfig = (edxConfig): EdxAppConfig => {
    const authConfig: EdxAppConfig = {
        title: edxConfig.app.subtitle,
        appName: edxConfig.app.subtitle,
        api: edxConfig.api.baseUri,
        basePath: edxConfig.app.basePath,
        ...edxConfig.auth
    }

    return authConfig
}

const useFetchConfig = ({ env, serverMode }: UseFetchAppAuthConfig) => {
    const [appConfig, setAppConfig] = useState<EdxAppConfig | null>(null)

    const fetchAppConfig = async () => {
        const edxConfig = await fetchConfig({ env, serverMode })

        setAppConfig(mapEdxToAppConfig(edxConfig))
    }

    useEffect(() => {
        fetchAppConfig()
    }, [])

    return {
        appConfig
    }
}

export default useFetchConfig