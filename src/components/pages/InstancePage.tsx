import useOdsInstanceIdParam from '../../hooks/odsInstances/useOdsInstanceIdParam'
import useOdsInstanceDisplayYear from '../../hooks/odsInstances/useOdsInstanceYearName'
import InstancePageContent from './InstancePageContent'
import PageWrapper from './PageWrapper'

const InstancePage = () => {
  const { getInstanceIdFromPath } = useOdsInstanceIdParam()
  const { getDisplayYear } = useOdsInstanceDisplayYear()

  return (
    <PageWrapper pageName={`Instance Id ${getInstanceIdFromPath()}`}>
      <InstancePageContent instanceId={getInstanceIdFromPath()} />
    </PageWrapper>
  )
}

export default InstancePage