import { TEEAuthDataContext } from '@edfi/admin-console-shared-sdk'
import { useState, ChangeEvent, useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import useEdfiVendorService from '../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService'
import { CreateEdfiVendorRequest } from '../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService.requests'
import useEDXToast from '../../common/useEDXToast'
import initialPartnerData from './initialPartnerData'
import usePartnerFormValidation from './usePartnerFormValidation'

interface UsePartnerFormProps {
    schoolYear: number 
    onFinishSave: () => void
}

const usePartnerForm = ({ schoolYear, onFinishSave }: UsePartnerFormProps) => {
    const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
    const adminConfig = useContext(adminConsoleContext)
    const { createVendorForSchoolYear, getVendorsListForSchoolYear } = useEdfiVendorService()
    const [partnerData, setPartnerData] = useState<CreateEdfiVendorRequest>({...initialPartnerData})
    const [isSaving, setIsSaving] = useState(false)
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
    const { errors, validPartnerData, validateInputChange } = usePartnerFormValidation()
    const { successToast, errorToast } = useEDXToast(7000)

    const onChangeParnerData = (e: ChangeEvent<HTMLInputElement>) => {
        const nparnerData = {...partnerData}

        if (e.target.id === 'partnerName') {
            nparnerData.company = e.target.value
            nparnerData.contactName = e.target.value
            nparnerData.contactEmailAddress = `${e.target.value}@gmail.com`
        }

        if (e.target.id === 'namespacePrefixes')
            nparnerData.namespacePrefixes = e.target.value

        if (hasTriedSubmit) {
            if (e.target.id === 'partnerName')
                validateInputChange("partnerName", nparnerData)
            else 
                validateInputChange("namespacePrefixes", nparnerData)
        }

        setPartnerData(nparnerData)
    }

    const onSave = async () => {
        if (edxAppConfig && auth && auth.user && adminConfig) {
            if (validPartnerData(partnerData)) {
                setIsSaving(true)
    
                const vendorList = await getVendorsListForSchoolYear(adminConfig.actionParams, schoolYear)
                if(vendorList.type === 'Response' && vendorList.data.some(vendor => 
                        vendor.contactName === partnerData.contactName)) {
                        errorToast('A Partner with this name already exists. Please choose a unique name and try again.')
                        setIsSaving(false)
                        return
                }

                const result = await createVendorForSchoolYear(adminConfig.actionParams, partnerData, schoolYear)
    
                setIsSaving(false)

                if (result.type === 'Response')
                    successToast("Added Partner")
                else 
                    errorToast("Failed to Add Partner")

                onFinishSave()
            }
            else 
                setHasTriedSubmit(true)
        }
    }

    return {
        partnerData,
        isSaving,
        errors,
        hasTriedSubmit,
        onChangeParnerData,
        onSave
    }
}

export default usePartnerForm