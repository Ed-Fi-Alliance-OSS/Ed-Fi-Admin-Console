import { Flex, Text } from "@chakra-ui/react"
import { AppUserLicense } from "../../../core/AppUser.types"

interface AppUserLicensesProps {
    licenses: AppUserLicense[]
}

const licensesText = (licenses: AppUserLicense[]) => {
    return licenses.join(',')
}

const AppUserLicenses = ({ licenses }: AppUserLicensesProps) => {
    return (
        <Flex>
            <Text
                fontFamily='Open sans'
                fontWeight='400'
                size='md'
                w='auto'
                whiteSpace='initial'>
                    {licensesText(licenses)}
            </Text>
        </Flex>
    )
}

export default AppUserLicenses