import {
  Flex, Link, Text
} from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { SISProviderInfo } from '../../../core/sisProviders/SISProviders.types'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'
import ConnectedSISProvidersTable from '../OnBoarding/ConnectedSISProvidersTable'
import DataHealthDetails from '../OnBoarding/DataHealthDetails'
import OnBoardingTabContentWrapper from '../OnBoarding/OnBoardingTabContentWrapper'

interface SetUpWizardFinalizeTabContentProps {
    instance: ODSInstance
    connectedSISProvidersList: SISProviderInfo[]
}

const SetUpWizardFinalizeTabContent = ({ connectedSISProvidersList, instance }: SetUpWizardFinalizeTabContentProps) => {
  const adminConfig = useContext(adminConsoleContext)
  const { getDisplayYear } = useOdsInstanceDisplayYear()

  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        w='730px'
      >
        You’re almost ready to complete the setup process for { getDisplayYear(instance) }! Review the information below and make sure everything is correct. 
        If not, go back and edit or 

        <Link 
          aria-label="contact support" 
          color='blue.500' 
          href="https://txedexchange.atlassian.net/servicedesk/customer/portals" 
          ml='2px' 
          referrerPolicy='no-referrer'
          target='_blank'
        >contact support
        </Link>. Once all the information appears correct, click the “Finalize” button and your Tech Console will be ready to use!
      </Text>

      <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontSize='20px'
          fontWeight='700'
        >
          Connected Source Provider(s)
        </Text>

        <Flex
          mt='16px'
          w='full'
        >
          <ConnectedSISProvidersTable connectedSISProvidersList={connectedSISProvidersList} />
        </Flex> 
      </Flex> 

      <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontSize='20px'
          fontWeight='700'
        >
          Data Preview
        </Text>

        <Flex
          mt='16px'
          w='full'
        >
          { adminConfig && adminConfig.showDataHealth? 
            <DataHealthDetails 
              isReview={true}
              showReload={true}
            /> : <Text
              fontFamily='Poppins'
              fontSize='24px'
              fontWeight='600'
              w='730px'
            >
              Coming Soon
            </Text> }
        </Flex> 
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default SetUpWizardFinalizeTabContent