// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Box, Flex, Field,
  Spinner
} from '@chakra-ui/react'
import {
  CompleteFormErrorMessage, CustomFormLabel, CustomInput
} from '@edfi/admin-console-shared-sdk'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import usePartnerForm from '../../../hooks/adminActions/edfi/usePartnerForm'
import MultiInput from '../../MultiInput'
import EdFiModalForm from './EdFiModalForm'

interface PartnerFormProps {
  schoolYear: number
  mode: 'add' | 'edit'
  onFinishSave: () => void
  initialData: EdfiVendor | undefined
}

const PartnerForm = ({ initialData, schoolYear, mode, onFinishSave }: PartnerFormProps) => {
  const {
    partnerData,
    isSaving,
    setIsSaving,
    errors,
    hasTriedSubmit,
    onChangePartnerData,
    onChangeNamespacePrefixes,
    onSave
  } = usePartnerForm({
    mode,
    schoolYear,
    onFinishSave,
    initialData
  })

  function onPClose() {
    setIsSaving(true)
    onFinishSave()
  }

  function onPSave() {
    onSave()
  }

  return (isSaving ? <Spinner /> : <EdFiModalForm
    content={<Flex w='full'>
      <Flex
        flexDir='column'
        w='full'
      >
        {Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage />}

        <Flex
          flexDir='column'
          w='full'
        >
          <Field.Root>
            <CustomFormLabel
              htmlFor="partnerName"
              text="Vendor Name"
            />

            <CustomInput
              error={errors && errors['partnerName'] && errors['partnerName'].message}
              id="partnerName"
              value={partnerData.contactName}
              onChange={onChangePartnerData}
            />
          </Field.Root>

          <Field.Root mt="24px">
            <CustomFormLabel
              htmlFor="company"
              text="Company"
            />
            <CustomInput
              error={errors && errors['company'] && errors['company'].message}
              id="company"
              value={partnerData.company}
              onChange={onChangePartnerData}
            />
          </Field.Root>

          <Field.Root mt="24px">
            <CustomFormLabel
              htmlFor="contactEmail"
              text="Contact Email"
            />
            <CustomInput
              error={errors && errors['contactEmailAddress'] && errors['contactEmailAddress'].message}
              id="contactEmailAddress"
              value={partnerData.contactEmailAddress}
              onChange={onChangePartnerData}
            />
          </Field.Root>

          <Field.Root mt="24px">
            <Flex
              direction="column"
              maxW="100%"
              w="full"
            >
              <Box
                maxW="100%"
                w="100%"
              >
                <MultiInput
                  values={
                    partnerData.namespacePrefixes
                      ? partnerData.namespacePrefixes.trim().split(',')
                      : []
                  }
                  label="Add Namespace Prefixes"
                  onChange={onChangeNamespacePrefixes}
                />
              </Box>
            </Flex>

            {/* <Flex
              flexDir='column'
              w='full'
            >
              <CustomInput 
                error={errors && errors['namespacePrefixes'] && errors['namespacePrefixes'].message}
                id="namespacePrefixes"
                value={partnerData.namespacePrefixes} 
                onChange={onChangePartnerData}
              />
            </Flex> */}
          </Field.Root>
        </Flex>
      </Flex>
    </Flex>}
    actionText="Save"
    headerText={mode === 'add' ? 'Add Vendor' : 'Edit Vendor'}
    isSaving={isSaving}
    onClose={onPClose}
    onSave={onPSave}
  />
  )
}

export default PartnerForm