import { Flex, Text, Link } from "@chakra-ui/react"
import { useContext } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import DataHealthDetails from "./DataHealthDetails"
import OnBoardingTabContentWrapper from "./OnBoardingTabContentWrapper"

interface ReviewDataTabContentProps {
    setupWizard?: boolean 
}

const ReviewDataTabContent = ({ setupWizard }: ReviewDataTabContentProps) => {
    const adminConfig = useContext(adminConsoleContext)

    return (
        <OnBoardingTabContentWrapper>
            {adminConfig && adminConfig.showDataHealth? <>
                <Text
                fontFamily='Open sans'
                fontWeight='400'
                w='730px'>
                    Use the data preview to see whether the number of records submitted by your SIS landed in the ODS { setupWizard? 'for this school year' : '' }. The preview displays the total counts for each resource identified. Green tiles indicate that data exists and gray tiles indicate that data does not exist for that particular resource. If something here looks incorrect, you’ll need to troubleshoot within your SIS or access support resources.
                </Text>
                <Flex mt='32px' w='full'>
                    <DataHealthDetails 
                        showReload={true}
                        isReview={false} />
                </Flex>
            </> : 
                <Text
                    fontFamily='Open sans'
                    fontWeight='600'
                    fontSize='24px'
                    w='730px'>
                       Coming Soon
                    </Text>}
            <Flex justifyContent='space-between' mt='32px' w='full'>
                {false && <Link
                    color='blue.500'
                    fontFamily='Open sans'
                    fontWeight='700'
                    size='md'>
                        Not seeing what you were expecting? Get help here.
                </Link>}
            </Flex>
        </OnBoardingTabContentWrapper>
    )
}

export default ReviewDataTabContent