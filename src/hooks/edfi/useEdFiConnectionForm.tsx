// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ChangeEvent, useContext, useEffect, useState 
} from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import useEdFiAdminConnectionsService from '../../services/AdminActions/EdFiAdmin/Connections/EdFiAdminConnectionsService'
import {
  CreateEdfiAdminConnectionRequest, UpdateEdfiAdminConnectionRequest, VerifyEdFiAdminConnectionRequest 
} from '../../services/AdminActions/EdFiAdmin/Connections/EdfiAdminConnectionsService.requests'
import { UpdatedEdFiAdminConnectionResponse } from '../../services/AdminActions/EdFiAdmin/Connections/EdfiAdminConnectionsService.response'
import useEDXToast from '../common/useEDXToast'
import { getInitialConnectionFormData } from './edFiConnection.helper'
import {
  EdFiConnectionFormData, EdFiConnectionFormMode, EdFiConnectionVerificationStatus 
} from './useEdFiConnectionForm.types'
import useEdFiConnectionFormValidation from './useEdFiConnectionFormValidation'

interface UseEdFiConnectionFormProps {
    initialData?: EdFiConnectionFormData
    mode: EdFiConnectionFormMode
    inOnboarding: boolean 
    onAfterSave?: () => void
}

const useEdFiConnectionForm = ({ initialData, inOnboarding, mode, onAfterSave }: UseEdFiConnectionFormProps) => {
  const adminConfig = useContext(adminConsoleContext)
  const [ formData, setFormData ] = useState<EdFiConnectionFormData>(getInitialConnectionFormData(initialData))
  const [ isSaving, setIsSaving ] = useState(false)
  const [ isVerifying, setIsverifying ] = useState(false)

  const {
    errors,
    validateInputChange,
    validFormData,
    isValidFormData
  } =  useEdFiConnectionFormValidation()

  const [ hasTriedSubmit, setHasTriedSubmit ] = useState(false)
  const [ verificationStatus, setVerificationStatus ] = useState<EdFiConnectionVerificationStatus>('Not Connected')
  const { successToast, errorToast } = useEDXToast()
  const { createConnection, updateConnection, verifyConnection } = useEdFiAdminConnectionsService()

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nConnectionData = { ...formData }

    if (e.target.id === 'key') {
      nConnectionData.key = e.target.value

      validateInputChange('key', nConnectionData)
    } else if (e.target.id === 'secret') {
      nConnectionData.secret = e.target.value

      validateInputChange('secret', nConnectionData)
    } else if (e.target.id === 'baseUrl') {
      console.log('target value', e.target.value)
      nConnectionData.baseUrl = e.target.value

      validateInputChange('baseUrl', nConnectionData)
    }

    if (initialData) {
      if (nConnectionData.key !== initialData.key || nConnectionData.secret !== initialData.secret) {
        setVerificationStatus('Unknown')
      }
    }

    return setFormData(nConnectionData)
  }

  const createEdFiAdminConnection = async (connectionName: string): Promise<UpdatedEdFiAdminConnectionResponse | null> => {
    console.log('create edfi admin connection')
    if (!adminConfig) {
      return null
    }

    const createConnectionRequest: CreateEdfiAdminConnectionRequest = {
      tenantId: adminConfig.actionParams.tenantId,
      connectionName,
      connectionType: '',
      edFiExtension: '',
      edFiVersion: '',
      metadataUrl: formData.baseUrl,
      clientId: formData.key,
      clientSecret: formData.secret,
    }

    const createConnectionResponse = await createConnection(adminConfig.actionParams, createConnectionRequest)

    if (createConnectionResponse.type === 'Error') {
      errorToast('Request failed')
      return null
    }

    return createConnectionResponse.data
  }

  const updateEdFiAdminConnection = async (connectionId: string): Promise<UpdatedEdFiAdminConnectionResponse | null> => {
    console.log('update edfi admin connection')
    if (!adminConfig) {
      return null
    }

    const request: UpdateEdfiAdminConnectionRequest = {
      connectionId,
      tenantId: adminConfig.actionParams.tenantId,
      connectionName: formData.connectionName ?? 'Connection Name',
      connectionType: '',
      edFiExtension: '',
      edFiVersion: '',
      metadataUrl: formData.baseUrl,
      clientId: formData.key,
      clientSecret: formData.secret,
      tokenUrl: ''
    }

    console.log('update connection request', request)

    const updateResponse = await updateConnection(adminConfig.actionParams, request)

    if (updateResponse.type === 'Error') {
      errorToast('Request failed')
      return null
    }

    return updateResponse.data
  }

  const saveConnection = async () => {
    console.log('save connection')
    if (mode === 'Add') {
      const createDataHealthConnection = await createEdFiAdminConnection('Data Health Check')
      const createDataWarehouseConnection = await createEdFiAdminConnection('Data Warehouse')

      return 
    }

    if (formData.connectionId) {
      return await updateEdFiAdminConnection(formData.connectionId)
    }
  }

  const scrollToErrorSection = () => {
    if (inOnboarding) {
      document
        .getElementById('connectionVerificationStatus')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const createTestConnection = async () => {
    if (!adminConfig) {
      return
    } 

    if (formData.key == initialData?.key && formData.secret == initialData.secret) {
      return {
        tenantId: adminConfig.actionParams.tenantId,
        connectionId: initialData.connectionId as string 
      }
    }

    return await createEdFiAdminConnection('Test Connection')
  }

  const onVerifyConnection = async () => {
    console.log('on verify connection')
    if (!adminConfig) {
      return
    } 

    setIsverifying(true)

    const connection = await createTestConnection()

    if (!connection) {
      setIsverifying(false)
      return 
    }

    const verifyConnectionRequest: VerifyEdFiAdminConnectionRequest = {
      tenantId: adminConfig.actionParams.tenantId,
      connectionId: connection.connectionId,
      deleteConnection: connection.connectionId == initialData?.connectionId? false : true
    }

    const verifyConnectionResponse = await verifyConnection(adminConfig.actionParams, verifyConnectionRequest)

    setIsverifying(false)
    if (verifyConnectionResponse.type === 'Error') {
      setVerificationStatus('URL Error')

      scrollToErrorSection()

      return errorToast('Failed to verify connection')
    }

    if (verifyConnectionResponse.data.status === 'failure') {
      setVerificationStatus('Credential Error')

      scrollToErrorSection()
            
      return errorToast('Failed to verify connection')
    }

    if (verifyConnectionResponse.data.status === 'success') {
      setVerificationStatus('Connected')

      successToast('Successfully verified connection')
    }
  }

  const onSimpleVerifyConnection = async () => {
    if (!adminConfig) {
      return
    } 

    if (!initialData || !initialData.connectionId) {
      return
    } 

    setIsverifying(true)
    console.log('connection id to check', initialData.connectionId)

    const verifyConnectionRequest: VerifyEdFiAdminConnectionRequest = {
      tenantId: adminConfig.actionParams.tenantId,
      connectionId: initialData.connectionId,
      deleteConnection: false
    }

    const verifyConnectionResponse = await verifyConnection(adminConfig.actionParams, verifyConnectionRequest)

    setIsverifying(false)
    if (verifyConnectionResponse.type === 'Error') {
      setVerificationStatus('URL Error')

      scrollToErrorSection()

      return errorToast('Failed to verify connection')
    }

    if (verifyConnectionResponse.data.status === 'failure') {
      setVerificationStatus('Credential Error')

      scrollToErrorSection()
            
      return errorToast('Failed to verify connection')
    }

    if (verifyConnectionResponse.data.status === 'success') {
      setVerificationStatus('Connected')

      successToast('Successfully verified connection')
    }
  }

  const isDisabledVerification = () => isValidFormData(formData)

  const isDisabledSave = () => {
    if (verificationStatus !== 'Connected') {
      return true
    }

    if (mode == 'Edit' && initialData) {
      if (formData.key == initialData.key && formData.secret == initialData.secret) {
        return true
      }
    }

    return false
  }

  const onSave = async () => {
    if (!validFormData(formData)) {
      setHasTriedSubmit(true)
      return 
    }

    await saveConnection()

    if (onAfterSave) {
      onAfterSave()
    }
  }

  useEffect(() => {
    if (mode === 'Edit') {
      onSimpleVerifyConnection()
    }
  }, [ mode ])

  return {
    formData,
    isSaving,
    errors,
    validFormData,
    hasTriedSubmit,
    verificationStatus,
    isVerifying,
    isDisabledVerification,
    isDisabledSave,
    onInputChange,
    onVerifyConnection,
    onSave
  }
}

export default useEdFiConnectionForm