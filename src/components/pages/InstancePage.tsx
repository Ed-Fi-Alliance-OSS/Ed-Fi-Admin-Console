import useOdsInstanceParamYear from '../../hooks/odsInstances/useOdsInstanceParamYear'
import useOdsInstanceDisplayYear from '../../hooks/odsInstances/useOdsInstanceYearName'
import InstancePageContent from './InstancePageContent'
import PageWrapper from './PageWrapper'

const InstancePage = () => {
  const { getInstanceYearFromPathName } = useOdsInstanceParamYear()
  const { getDisplayYearFromString } = useOdsInstanceDisplayYear()

  return (
    <PageWrapper 
      pageName={`School Year ${getDisplayYearFromString(getInstanceYearFromPathName())}`}>
      <InstancePageContent 
        instanceYear={getInstanceYearFromPathName()} />
    </PageWrapper>
  )
}

export default InstancePage