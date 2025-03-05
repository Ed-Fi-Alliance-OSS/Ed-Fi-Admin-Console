// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext, useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect, useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import { usePluginContext } from '../../../plugins/BasePlugin'
import { EdfiVendorWithApplications } from './usePartnersAndApplicationsAccordion.types'

interface UsePartnersAndApplicationsAccordionProps {

}

const usePartnersAndApplicationsAccordion = (props?: UsePartnersAndApplicationsAccordionProps) => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const [ vendorsWithApplicationsList, setVendorsWithApplicationsList ] = useState<EdfiVendorWithApplications[]>([])
  const [ selectedPartnerId, setSelectedPartnerId ] = useState<number | null>()
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const api = functionalities.ApiService?.(config, useApiService)
  
  const onSelectPartner = (partnerId: number) => {
    setSelectedPartnerId(partnerId)
  }

  const fetchVendorsWithApplicationsList = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      // const vendorsListData = await getVendorsListForSchoolYear(adminConfig.actionParams, schoolYear)
      const vendorsListData = await api?.vendors.getAll() ?? []

      console.log('vendors list', vendorsListData)

  
      const vendorswapplicationsList: EdfiVendorWithApplications[] = []

      for (const vendor of vendorsListData) {
        if (vendor.id) {
          const vendorApplications = await api?.applications.getByVendorId(vendor.id)
          console.log('vendor and applications ', vendor.id, vendorApplications)

          const vendorWithApplications: EdfiVendorWithApplications = {
            vendorId: vendor.id,
            contactName: vendor.contactName,
            contactEmailAddress: vendor.contactEmailAddress,
            company: vendor.company,
            namespacePrefixes: vendor.namespacePrefixes,
            applications: vendorApplications ?? []
          }
    
          vendorswapplicationsList.push(vendorWithApplications)
        }
      }

      if (vendorswapplicationsList.length > 0) {
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
      const vendorApplications = applicationList.filter(application => application.vendorId == vendor.id)

      const vendorWithApplications: EdfiVendorWithApplications = {
        vendorId: vendor.id,
        id: vendor.id,
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
    if (!adminConfig) {
      return
    } 

    const vendorsListResult = await api?.vendors.getAll()
    return vendorsListResult
  }

  const fetchAllApplications = async (): Promise<EdfiApplication[] | undefined> => {
    if (!adminConfig) {
      return
    } 
        
    return await api?.applications.getAll()
  }

  const fetchVendorsWithApplications = async () => {
    const vendorsList = await fetchAllVendors()
    const applicationsList = await fetchAllApplications()

    if (!vendorsList || !applicationsList) {
      return
    } 

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