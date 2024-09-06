import { Heading } from "@chakra-ui/react"

interface TabHeadingProps {
    text: string
}

const TabHeading = ({ text }: TabHeadingProps) => {
    return (
        <Heading
            fontFamily='Poppins'
            fontWeight='700'
            fontSize='32px'
            lineHeight='42px'>
                {text}
        </Heading>
    )
}

export default TabHeading