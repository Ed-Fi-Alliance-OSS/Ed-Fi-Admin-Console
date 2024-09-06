import { EdFiConnectionFormData } from "./useEdFiConnectionForm.types"

const initialFormData: EdFiConnectionFormData = {
    connectionId: null,
    baseUrl: "",
    key: "",
    secret: ""
}

export const getInitialConnectionFormData = (initialData?: EdFiConnectionFormData) => {
    if (!initialData)
        return { ...initialFormData }

    const connectionData: EdFiConnectionFormData = {
        connectionId: initialData.connectionId,
        baseUrl: initialData.baseUrl,
        key: initialData.key,
        secret: initialData.secret,
        connectionName: initialData.connectionName
    }

    return connectionData
}