import { TEEAuthDataContext } from '@edfi/admin-console-shared-sdk'
import { useContext, useEffect, useState } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import useEdfiApplicationsService from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationsService'
import useEdfiVendorsService from '../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService'
import { EdfiVendorWithApplications } from './usePartnersAndApplicationsAccordion.types'

interface UsePartnersAndApplicationsAccordionProps {
    schoolYear: number    
}

const usePartnersAndApplicationsAccordion = ({ schoolYear }: UsePartnersAndApplicationsAccordionProps) => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const { getVendorApplicationsForSchoolYear, getVendorsListForSchoolYear } = useEdfiVendorsService()
  const { getEdfiApplicationsListForSchoolYear } = useEdfiApplicationsService()
  const adminConfig = useContext(adminConsoleContext)
  const [vendorsWithApplicationsList, setVendorsWithApplicationsList] = useState<EdfiVendorWithApplications[]>([])
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>()

  const onSelectPartner = (partnerId: number) => {
    setSelectedPartnerId(partnerId)
  }

  const fetchVendorsWithApplicationsList = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      const vendorsListData = await getVendorsListForSchoolYear(adminConfig.actionParams, schoolYear)

      console.log('vendors list', vendorsListData)

      if (vendorsListData.type === 'Response') {
        const vendorswapplicationsList: EdfiVendorWithApplications[] = []

        for (const vendor of vendorsListData.data) {
          if (vendor.vendorId) {
            const vendorApplications = await getVendorApplicationsForSchoolYear(adminConfig.actionParams, vendor.vendorId+'', schoolYear)
            console.log('vendor and applications ', vendor.vendorId, vendorApplications)

            if (vendorApplications.type === 'Response') {
              const vendorWithApplications: EdfiVendorWithApplications = {
                vendorId: vendor.vendorId,
                contactName: vendor.contactName,
                contactEmailAddress: vendor.contactEmailAddress,
                company: vendor.company,
                namespacePrefixes: vendor.namespacePrefixes,
                applications: vendorApplications.data? vendorApplications.data : []
              }
    
              vendorswapplicationsList.push(vendorWithApplications)
            }
          }
        }

        if (vendorswapplicationsList.length > 0)
          setVendorsWithApplicationsList(vendorswapplicationsList)
      }
    }   
  }

  const onRefreshVendorsWithApplications = async () => {
    setVendorsWithApplicationsList([])

    await fetchVendorsWithApplications()
  }

  const mergeVendorsAndApplications = (vendorList: EdfiVendor[], applicationList: EdfiApplication[]): EdfiVendorWithApplications[] => {
    const result: EdfiVendorWithApplications[] = []

    for (const vendor of vendorList) {
      const vendorApplications = applicationList.filter(application => application.vendorId == vendor.vendorId)
      const vendorWithApplications: EdfiVendorWithApplications = {
        vendorId: vendor.vendorId,
        company: vendor.company,
        namespacePrefixes: vendor.namespacePrefixes,
        contactName: vendor.contactName,
        contactEmailAddress: vendor.contactEmailAddress,
        applications: vendorApplications
      }

      result.push(vendorWithApplications)
    }

    return result
  }

  const fetchAllVendors = async (): Promise<EdfiVendor[] | undefined> => {
    if (!adminConfig)
      return 

    const vendorsListResult = await getVendorsListForSchoolYear(adminConfig.actionParams, schoolYear)

    if (vendorsListResult.type === 'Response') {
      console.log('Hammad', vendorsListResult.data)
      return vendorsListResult.data
    }
  }

  const fetchAllApplications = async (): Promise<EdfiApplication[] | undefined> => {
    if (!adminConfig)
      return 
        
    const applicationsListResult = await getEdfiApplicationsListForSchoolYear(adminConfig.actionParams, schoolYear)

    if (applicationsListResult.type === 'Response')
      return applicationsListResult.data
  }

  const fetchVendorsWithApplications = async () => {
    const vendorsList = await fetchAllVendors()
    const applicationsList = await fetchAllApplications()

    if (!vendorsList || !applicationsList) 
      return 

    const vendorsWithApplications = mergeVendorsAndApplications(vendorsList, applicationsList)
    setVendorsWithApplicationsList(vendorsWithApplications)
  }

  useEffect(() => {
    // fetchVendorsWithApplicationsList()
    fetchVendorsWithApplications()
  }, [])

  return {
    vendorsWithApplicationsList,
    fetchVendorsWithApplications,
    selectedPartnerId,
    onSelectPartner,
    onRefreshVendorsWithApplications
  }
}

export default usePartnersAndApplicationsAccordion