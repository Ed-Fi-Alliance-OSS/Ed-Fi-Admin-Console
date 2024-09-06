import { TEEAuthDataContext } from '@edwire/edx-portal-shared'
import { useState, useEffect, useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import useODSService from '../../../services/AdminActions/Ods/ODSService'
import { EducationOrganization } from '../../../services/AdminActions/Ods/ODSService.results'

const useEducationsOrganizations = () => {
    const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
    const adminConfig = useContext(adminConsoleContext)
    const { getEducationOrganizations } = useODSService()
    const [educationOrganizationsList, setEducationOrganizationsList] = useState<EducationOrganization[]>([])
    const [isFetchingEducationOrganizations, setIsFetchingEducationOrganizations] = useState(false)

    const fetchEducationOrganizations = async () => {
        if (edxAppConfig && auth && auth.user && adminConfig) {
            setIsFetchingEducationOrganizations(true)
            const result = await getEducationOrganizations(adminConfig.edfiActionParams)
            setIsFetchingEducationOrganizations(false)

            if (result.type === 'Response') {
                setEducationOrganizationsList(result.data)
            }
        }
    }

    useEffect(() => {
        fetchEducationOrganizations()
    }, [])

    return {
        educationOrganizationsList,
        isFetchingEducationOrganizations
    }
}

export default useEducationsOrganizations