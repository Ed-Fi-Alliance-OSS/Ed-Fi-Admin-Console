import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect, useState
} from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { useMockData } from '../../context/mockDataContext'
import { ODSInstance } from '../../core/ODSInstance.types'
import { usePluginContext } from '../../plugins/BasePlugin'
import useEDXToast from '../common/useEDXToast'
import useControlTable from '../controlTable/useControlTable'
import useConfirmSetDefaultModal from './useConfirmSetDefaultModal'
import { UpdatingIsDefaultStatus } from './useOdsInstanceTable.types'
import useSetUpWizardModal from './useSetUpWizardModal'
import useValidateSetAsDefault from './useValidateSetAsDefault'

const useOdsInstanceTable = () => {
  const adminConfig = useContext(adminConsoleContext)
  const mock = useMockData()

  const {
    paginatedData,
    setPaginatedData,
    isFetchingData,
    setIsFetchingData,
    orderBy,
    onSortAsc,
    onSortDesc,
  } = useControlTable<ODSInstance, any>({
    initialOrder: 'year',
    initialPageSize: 100
  })

  const [ selectedInstance, setSelectedInstance ] = useState<ODSInstance | null>(null)

  const [ updatingIsDefault, setUpdatingIsDefault ] = useState<UpdatingIsDefaultStatus>({
    instanceId: null,
    loading: false
  })

  // const {
  //   getOdsInstancesList,
  //   updateInstanceIsDefault
  // } = useOdsInstanceService()

  const {
    showConfirmSetDefaultModal,
    onShowConfirmSetDefaultModal,
    onCloseConfirmSetDefaultModal
  } = useConfirmSetDefaultModal()

  const {
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal
  } = useSetUpWizardModal()


  const {
    canSetAsDefault
  } = useValidateSetAsDefault()

  const {
    errorToast
  } = useEDXToast(7000)

  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const apiService = functionalities.ApiService?.(config, useApiService)

  const fetchInstancesList = async () => {
    if (!adminConfig) {
      return
    }


    setIsFetchingData(true)
    const instancesResp = await apiService.instances.getAll()
    console.log('instances getAll resp', instancesResp)
    setPaginatedData({
      pageIndex: 0,
      pageSize: 100,
      count: 100,
      data: instancesResp
    })

    setIsFetchingData(false)
  }

  const onOpenSetDefaultModal = (instanceId: string) => {
    const instanceById = paginatedData.data.find(i => i.id == instanceId)

    if (!instanceById) {
      return
    }

    setSelectedInstance({ ...instanceById })
    onShowConfirmSetDefaultModal()
  }

  const onOpenSetUpModal = (instanceId: string) => {
    const instanceById = paginatedData.data.find(i => i.id == instanceId)

    if (!instanceById) {
      return
    }

    setSelectedInstance({ ...instanceById })
    onShowSetUpWizardModal()
  }

  const onSetIsDefault = async (instanceId: string, isDefault: boolean) => {
    // if (!adminConfig) {
    //   return
    // }

    // const instanceById = paginatedData.data
    //   .find(instance => instance.id == instanceId)

    // if (!instanceById) {
    //   return
    // }

    // const canSetAsDefaultResult = canSetAsDefault(instanceById, paginatedData.data)

    // if (!canSetAsDefaultResult) {
    //   return
    // }

    // const request: UpdateOdsInstanceIsDefaultRequest = {
    //   tenantId: adminConfig.actionParams.tenantId,
    //   instanceId,
    //   isDefault,
    //   validate: true
    // }

    // setUpdatingIsDefault({
    //   instanceId,
    //   loading: true
    // })

    // const response = await updateInstanceIsDefault(
    //   adminConfig.actionParams,
    //   request
    // )

    // if (response.type == 'Error') {
    //   setUpdatingIsDefault({
    //     instanceId,
    //     loading: false
    //   })

    //   onCloseConfirmSetDefaultModal()

    //   errorToast('Failed to set instance as default')

    //   return
    // }

    // await fetchInstancesList()

    // setUpdatingIsDefault({
    //   instanceId,
    //   loading: false
    // })

    // onCloseConfirmSetDefaultModal()
  }

  useEffect(() => {
    fetchInstancesList()
  }, [])

  return {
    paginatedData,
    selectedInstance,
    orderBy,
    onSortAsc,
    onSortDesc,
    isFetchingData,
    updatingIsDefault,
    showConfirmSetDefaultModal,
    onOpenSetDefaultModal,
    onCloseConfirmSetDefaultModal,
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal,
    onOpenSetUpModal,
    onSetIsDefault
  }
}

export default useOdsInstanceTable