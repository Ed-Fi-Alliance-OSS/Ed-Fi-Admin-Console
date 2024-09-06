import { Flex, Skeleton } from "@chakra-ui/react"

interface AccordionItemSkeletonProps {
    itemsCount: number 
}

const AccordionItemSkeleton = ({ itemsCount }: AccordionItemSkeletonProps) => {
    return (
        <>
            { itemsCount === 0 && <Flex padding='16px' w='full'>
                <Skeleton h='40px' w='full' />
            </Flex>} 
        </>
    )
}

export default AccordionItemSkeleton