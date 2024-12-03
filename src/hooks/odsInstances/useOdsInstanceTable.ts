import {
  useContext, useEffect, useState
} from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { useMockData } from '../../context/mockDataContext'
import {
  ExtendedODSInstance, ODSInstance
} from '../../core/ODSInstance.types'
import { MockPaginationData } from '../../helpers/constants'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'
import {
  GetOdsInstancesListRequest, UpdateOdsInstanceIsDefaultRequest
} from '../../services/ODSInstances/OdsInstanceService.requests'
import useEDXToast from '../common/useEDXToast'
import useControlTable from '../controlTable/useControlTable'
import useConfirmSetDefaultModal from './useConfirmSetDefaultModal'
import useExtendedOdsInstanceMapping from './useExtendedOdsInstanceMapping'
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
  } = useControlTable<ExtendedODSInstance, any>({
    initialOrder: 'year',
    initialPageSize: 100
  })

  const [ selectedInstance, setSelectedInstance ] = useState<ExtendedODSInstance | null>(null)

  const [ updatingIsDefault, setUpdatingIsDefault ] = useState<UpdatingIsDefaultStatus>({
    instanceId: null,
    loading: false
  })

  const {
    getOdsInstancesList,
    updateInstanceIsDefault
  } = useOdsInstanceService()

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
    mapToExtendedOdsInstance
  } = useExtendedOdsInstanceMapping()

  const {
    canSetAsDefault
  } = useValidateSetAsDefault()

  const {
    errorToast
  } = useEDXToast(7000)

  // const filterInstancesWithoutYear = (instancesList: ODSInstance[]): ODSInstance[] => {
  //   console.log('instanceList')
  //   console.log(instancesList)
  //   return instancesList.filter(instance => {
  //     if (!instance.schoolYears) {
  //       return false
  //     }

  //     if (instance.schoolYears.length == 0) {
  //       return false
  //     }

  //     return true
  //   })
  // }

  const fetchInstancesList = async () => {
    if (!adminConfig) {
      return
    } 

    const request: GetOdsInstancesListRequest = {
      pageIndex: paginatedData.pageIndex,
      pageSize: paginatedData.pageSize
    }

    setIsFetchingData(true)
    const response = await getOdsInstancesList(
      adminConfig.actionParams, 
      request
    )

    if (response.type == 'Error') {
      return
    } 
            
    // const filteredInstances = filterInstancesWithoutYear(response.data.data)
            
    const mappedInstances = await Promise.all(response.data.map(async (instance) =>
      await mapToExtendedOdsInstance(instance)))
        
    setIsFetchingData(false)
    console.log(mock.get('Instances'))
    if(mappedInstances.length > 0) {
      setPaginatedData({
        pageIndex: MockPaginationData.pageIndex,
        pageSize: MockPaginationData.maxPageSize,
        count: response.data.length,
        data: mappedInstances.concat((mock.get('Instances') ?? []).map(a => ({
          ...mappedInstances[0],
          ...a 
        } as ODSInstance)))
      })
    }
  }

  const onOpenSetDefaultModal = (instanceId: string) => {
    const instanceById = paginatedData.data.find(i => i.odsInstanceId == instanceId)

    if (!instanceById) {
      return
    } 
   
    setSelectedInstance({ ...instanceById })
    onShowConfirmSetDefaultModal()
  }

  const onOpenSetUpModal = (instanceId: string) => {
    const instanceById = paginatedData.data.find(i => i.odsInstanceId == instanceId)

    if (!instanceById) {
      return
    } 

    setSelectedInstance({ ...instanceById })
    onShowSetUpWizardModal()
  }

  const onSetIsDefault = async (instanceId: string, isDefault: boolean) => {
    if (!adminConfig) {
      return
    } 

    const instanceById = paginatedData.data
      .find(instance => instance.odsInstanceId == instanceId)

    if (!instanceById) {
      return
    } 

    const canSetAsDefaultResult = canSetAsDefault(instanceById, paginatedData.data)

    if (!canSetAsDefaultResult) {
      return
    } 

    const request: UpdateOdsInstanceIsDefaultRequest = {
      tenantId: adminConfig.actionParams.tenantId,
      instanceId,
      isDefault,
      validate: true
    }

    setUpdatingIsDefault({ 
      instanceId,
      loading: true
    })

    const response = await updateInstanceIsDefault(
      adminConfig.actionParams,
      request
    )

    if (response.type == 'Error') {
      setUpdatingIsDefault({
        instanceId,
        loading: false
      })

      onCloseConfirmSetDefaultModal()

      errorToast('Failed to set instance as default')

      return 
    }
            
    await fetchInstancesList()

    setUpdatingIsDefault({
      instanceId,
      loading: false
    })

    onCloseConfirmSetDefaultModal()
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