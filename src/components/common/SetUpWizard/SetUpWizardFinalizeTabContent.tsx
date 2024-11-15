import { Flex, Link, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { SISProviderInfo } from '../../../core/sisProviders/SISProviders.types'
import ConnectedSISProvidersTable from '../OnBoarding/ConnectedSISProvidersTable'
import DataHealthDetails from '../OnBoarding/DataHealthDetails'
import OnBoardingTabContentWrapper from '../OnBoarding/OnBoardingTabContentWrapper'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'
import { ODSInstance } from '../../../core/ODSInstance.types'

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
        fontFamily='Open sans'
        fontWeight='400'
        w='730px'>
                    You’re almost ready to complete the setup process for { getDisplayYear(instance) }! Review the information below and make sure everything is correct. 
                    If not, go back and edit or 
        <Link 
          color='blue.500' 
          href="https://txedexchange.atlassian.net/servicedesk/customer/portals" 
          target='_blank' 
          referrerPolicy='no-referrer' 
          ml='2px'
          aria-label="contact support">contact support</Link>. Once all the information appears correct, click the “Finalize” button and your Tech Console will be ready to use!
      </Text>
      <Flex flexDir='column' alignItems='baseline' mt='42px' w='full'>
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontWeight='700'
          fontSize='20px'>
                        Connected Source Provider(s)
        </Text>
        <Flex mt='16px' w='full'>
          <ConnectedSISProvidersTable 
            connectedSISProvidersList={connectedSISProvidersList} />
        </Flex> 
      </Flex> 
      <Flex flexDir='column' alignItems='baseline' mt='42px' w='full'>
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontWeight='700'
          fontSize='20px'>
                        Data Preview
        </Text>
        <Flex mt='16px' w='full'>
          { adminConfig && adminConfig.showDataHealth? 
            <DataHealthDetails 
              isReview={true}
              showReload={true} /> : <Text
              fontFamily='Open sans'
              fontWeight='600'
              fontSize='24px'
              w='730px'>
                        Coming Soon
            </Text> }
        </Flex> 
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default SetUpWizardFinalizeTabContent