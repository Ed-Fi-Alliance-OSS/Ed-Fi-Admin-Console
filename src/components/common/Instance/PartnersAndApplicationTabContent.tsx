// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import {
  useCallback, useContext, useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { DeletingState } from '../../../core/deletingState.types'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import { ODSInstance } from '../../../core/ODSInstance.types'
import usePartnersAndApplicationsAccordion from '../../../hooks/adminActions/edfi/usePartnersAndApplicationsAccordion'
import useEDXToast from '../../../hooks/common/useEDXToast'
import useEdfiApplicationsService from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationsService'
import useEdfiVendorsService from '../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService'
import ConsoleModal from '../ConsoleModal'
import ApplicationForm from './ApplicationForm'
import PartnerForm from './PartnerForm'
import PartnersAndApplicationAccordion from './PartnersAndApplicationAccordion'
import PartnersAndApplicationTabHeader from './PartnersAndApplicationTabHeader'

interface PartnersAndApplicationTabContentProps {
  instance: ODSInstance | null
  schoolYear: number
}

const PartnersAndApplicationTabContent = ({ instance, schoolYear }: PartnersAndApplicationTabContentProps) => {
  const [ elementToShow, setElementToShow ] = useState<'accordion' | 'edit vendor' | 'add vendor' | 'add application' | 'edit application'>('accordion')
  const [ selectedApplication, setSelectedApplication ] = useState<EdfiApplication | undefined>()
  const adminConfig = useContext(adminConsoleContext)
  const { deleteVendorForSchoolYear } = useEdfiVendorsService()
  const [ isLoading, setisLoading ] = useState(false)

  const [ isDeletingVendor, setIsDeletingVendor ] = useState<DeletingState>({
    deleting: false,
    id: ''
  })

  const { vendorsWithApplicationsList,
    onSelectPartner,
    isFetchingData,
    onRefreshVendorsWithApplications } = usePartnersAndApplicationsAccordion({ schoolYear })

  const [ , refreshComponent ] = useState(Date.now())
  const forceUpdate = useCallback(() => refreshComponent(Date.now() + Math.random()), [])
  const { deleteEdfiApplicationForSchoolYear } = useEdfiApplicationsService()

  const [ isDeletingApplication, setIsDeletingApplication ] = useState<DeletingState>({
    deleting: false,
    id: ''
  })

  const { successToast, errorToast } = useEDXToast()
  const onAddVendor = () => setElementToShow('add vendor')
  const [ selectedVendor, setSelectedVendor ] = useState<EdfiVendor | undefined>()

  const onEditVendor = (vendor: EdfiVendor) => {
    console.log('edit vendor', vendor)
    setSelectedVendor(vendor)
    setElementToShow('edit vendor')
  }

  const onAddApplication = () => setElementToShow('add application')

  const onEditApplication = (application: EdfiApplication) => {
    setSelectedApplication(application)
    setElementToShow('edit application')
  }

  const onDeleteVendor = async (vendorId: string) => {
    if (adminConfig) {
      console.log('vendor id', vendorId)

      setIsDeletingVendor({
        deleting: true,
        id: vendorId
      })

      const result = await deleteVendorForSchoolYear(adminConfig.edfiActionParams, { vendorId }, schoolYear)

      setIsDeletingVendor({
        deleting: false,
        id: vendorId
      })

      if (result.type === 'Response') {
        successToast(`Deleted vendor of id ${vendorId}.`)

        await onRefreshVendorsWithApplications()
        return
      }

      errorToast('Failed to delete vendor.')
    }
  }

  const handleDeleteApplication = async (applicationId: string) => {
    if (adminConfig) {
      setIsDeletingApplication({
        deleting: true,
        id: applicationId
      })

      const result = await deleteEdfiApplicationForSchoolYear(adminConfig.edfiActionParams, { applicationId }, schoolYear)

      setIsDeletingApplication({
        deleting: true,
        id: applicationId
      })

      if (result.type === 'Response') {
        successToast(`Deleted application of id ${applicationId}`)

        await onRefreshVendorsWithApplications()
        return
      }

      errorToast('Failed to delete Application.')
    }
  }

  const onReturnToAccordion = async () => {
    console.log('return to accordion')
    setElementToShow('accordion')
    setSelectedVendor(undefined)
    setisLoading(true)
    await onRefreshVendorsWithApplications()
    forceUpdate()
    setisLoading(false)
  }

  console.log('rendering...')


  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Flex
        flexDir='column'
        w='full'
      >
        <PartnersAndApplicationTabHeader
          onAddVendor={onAddVendor}
          onRefresh={onRefreshVendorsWithApplications}
        />

        <Flex
          mt='16px'
          w='full'
        >
          <PartnersAndApplicationAccordion
            isDeletingApplication={isDeletingApplication}
            isDeletingVendor={isDeletingVendor}
            loading={isFetchingData ?? false}
            vendorsWithApplicationsList={vendorsWithApplicationsList}
            onAddApplication={onAddApplication}
            onDeleteApplication={handleDeleteApplication}
            onDeleteVendor={onDeleteVendor}
            onEditApplication={onEditApplication}
            onEditVendor={onEditVendor}
            onSelectVendor={onSelectPartner}
          />
        </Flex>
      </Flex>

      <ConsoleModal
        content={<PartnerForm
          initialData={undefined}
          mode="add"
          schoolYear={schoolYear}
          onFinishSave={onReturnToAccordion}
        />}
        show={elementToShow === 'add vendor'}
        onClose={onReturnToAccordion}
      />

      <ConsoleModal
        content={<PartnerForm
          initialData={selectedVendor}
          mode="edit"
          schoolYear={schoolYear}
          onFinishSave={onReturnToAccordion}
        />}
        show={elementToShow === 'edit vendor'}
        onClose={onReturnToAccordion}
      />

      <ConsoleModal
        content={<ApplicationForm
          instance={instance}
          mode='add'
          onFinishSave={onReturnToAccordion}
        />}
        show={elementToShow === 'add application'}
        onClose={onReturnToAccordion}
      />

      <ConsoleModal
        content={<ApplicationForm
          editApplicationData={selectedApplication}
          instance={instance}
          mode='edit'
          onFinishSave={onReturnToAccordion}
        />}
        show={elementToShow === 'edit application'}
        onClose={onReturnToAccordion}
      />
    </Flex>
  )
}

export default PartnersAndApplicationTabContent