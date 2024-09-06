import { TEEAuthDataContext } from '@edwire/edx-portal-shared'
import { useState, useEffect, useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import useODSService from '../../../services/AdminActions/Ods/ODSService'
import { Descriptor } from '../../../services/AdminActions/Ods/ODSService.results'

const useDescriptors = () => {
    const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
    const adminConfig = useContext(adminConsoleContext)
    const { getDescriptors } = useODSService()
    const [descriptorsList, setdescriptorsList] = useState<Descriptor[]>([])
    const [isFetchingdescriptors, setIsFetchingdescriptors] = useState(false)

    const fetchDescriptors = async () => {
        if (edxAppConfig && auth && auth.user && adminConfig) {
            setIsFetchingdescriptors(true)
            const result = await getDescriptors(adminConfig.edfiActionParams)
            setIsFetchingdescriptors(false)

            if (result.type === 'Response') {
                setdescriptorsList(result.data)
            }
        }
    }

    useEffect(() => {
        fetchDescriptors()
    }, [])

    return {
        descriptorsList,
        isFetchingdescriptors
    }
}

export default useDescriptors