import {
  TEEAuthDataContext, useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  ChangeEvent, useContext,
  useEffect,
  useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import { usePluginContext } from '../../../plugins/BasePlugin'
import useEDXToast from '../../common/useEDXToast'
import initialPartnerData from './initialPartnerData'
import usePartnerFormValidation from './usePartnerFormValidation'

interface UsePartnerFormProps {
    schoolYear: number 
    onFinishSave: () => void
    mode?: 'add' | 'edit' | undefined
    initialData?: EdfiVendor | undefined
}

const usePartnerForm = ({ schoolYear, onFinishSave, initialData, mode }: UsePartnerFormProps) => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  // const { createVendorForSchoolYear, getVendorsListForSchoolYear } = useEdfiVendorService()
  const [ partnerData, setPartnerData ] = useState<EdfiVendor>({ ...initialPartnerData })
  const [ isSaving, setIsSaving ] = useState(false)
  const [ hasTriedSubmit, setHasTriedSubmit ] = useState(false)
  const { errors, validPartnerData, validateInputChange } = usePartnerFormValidation()
  const { successToast, errorToast } = useEDXToast(7000)
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const api = functionalities.ApiService?.(config, useApiService)
  const [ isEditing, setIsEditing ] = useState(false)

  // check if initialData is passed and set it to partnerData
  useEffect(() => {
    if (mode === 'edit') {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }

    if (initialData) {
      setPartnerData({
        ...partnerData, 
        id: initialData.id ?? undefined,
        company: initialData.company ?? '',
        namespacePrefixes: initialData.namespacePrefixes ?? '',
      })
    }
  }, [ initialData, mode ])

  const onChangeParnerData = (e: ChangeEvent<HTMLInputElement>) => {
    const nparnerData = { ...partnerData }

    if (e.target.id === 'partnerName') {
      nparnerData.company = e.target.value
      nparnerData.contactName = e.target.value
      nparnerData.contactEmailAddress = `${e.target.value}@gmail.com`
    }

    if (e.target.id === 'namespacePrefixes') {
      nparnerData.namespacePrefixes = e.target.value
    }

    if (hasTriedSubmit) {
      if (e.target.id === 'partnerName') {
        validateInputChange('partnerName', nparnerData)
      } else {
        validateInputChange('namespacePrefixes', nparnerData)
      }
    }

    if(partnerData.id) {
      nparnerData.id = partnerData.id
    }

    setPartnerData(nparnerData)
  }

  const onSave = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      if (validPartnerData(partnerData)) {
        setIsSaving(true)
    
        // const vendorList = await getVendorsListForSchoolYear(adminConfig.actionParams, schoolYear)
        const vendorList = await api?.vendors.getAll() ?? []

        if(isEditing) {
          if(!partnerData.id) {
            console.log('Vendor ID is missing', partnerData)
            errorToast('Failed to Update Vendor')
            return
          }

          try {
            await api?.vendors.update(partnerData.id, partnerData)
            successToast('Updated Vendor')
          } catch (e) {
            errorToast('Failed to Update Vendor')
          } finally {
            setIsSaving(false)
            onFinishSave()
          }

          return
        }

        if(vendorList.some(vendor => vendor.contactName === partnerData.contactName)) {
          errorToast('A Vendor with this name already exists. Please choose a unique name and try again.')
          setIsSaving(false)
          return
        }

        try {
          await api?.vendors.create(partnerData)
          successToast('Added Vendor')
        } catch (e) {
          errorToast('Failed to Add Vendor')
        } finally {
          setIsSaving(false)
          onFinishSave()
        }
    
      } else {
        setHasTriedSubmit(true)
      }
    }
  }

  return {
    partnerData,
    isSaving,
    setIsSaving,
    errors,
    hasTriedSubmit,
    onChangeParnerData,
    onSave
  }
}

export default usePartnerForm