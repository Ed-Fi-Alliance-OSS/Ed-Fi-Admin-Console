import { Flex } from '@chakra-ui/react'

interface ModalFormProps {
    header: JSX.Element
    content: JSX.Element
    height: string 
    width: string 
}

const ModalForm = ({ header, content, height, width }: ModalFormProps) => {
  return (
    <form style={{
      display: 'flex',
      height,
      width 
    }}
    >
      <Flex 
        bg='white'
        flexDir='column'
        h='full'
        padding='32px 34px'
        w='full'
      >
        <Flex w='full'>
          {header}
        </Flex>

        <Flex
          mt='32px'
          w='full'
        >
          {content}
        </Flex>
      </Flex>
    </form>
  )
}

export default ModalForm