import { Flex, Text } from '@chakra-ui/react'
import ApplicationAPIEndpointsTabContent from './ApplicationAPIEndpointsTabContent'
import ApplicationAPIFormClientTabContent from './ApplicationAPIFormClientTabContent'
import { EdfiApplicationAuthData } from '../../../core/Edfi/EdfiApplications'
import { AnimatePresence, motion } from 'framer-motion'
import { ODSInstance } from '../../../core/ODSInstance.types'

interface ApplicationAPIFormSectionProps {
    instance: ODSInstance | null
    applicationClientData: EdfiApplicationAuthData
    mode: 'add' | 'edit'
    isRegeneratingCredentials: boolean 
    onRegenerateCredentials: () => void
}

const ApplicationAPIFormSection = ({ instance, applicationClientData, mode, isRegeneratingCredentials, onRegenerateCredentials }: ApplicationAPIFormSectionProps) => {
  const showTabs = () => {
    if (mode === 'add') {
      if (applicationClientData.key && applicationClientData.secret)
        return true

      return false
    }

    if (mode === 'edit')
      return true
  }

  return (
    <Flex flexDir='column' w='full'> 
      <AnimatePresence>
        { showTabs() && <motion.div 
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', marginTop: mode === 'edit'? '16px' : '0' }}>
          <Flex flexDir='column'>
            <Text fontWeight='bold'>API Client</Text>
            <ApplicationAPIFormClientTabContent 
              clientData={ applicationClientData }
              mode={mode}
              isRegeneratingCredentials={isRegeneratingCredentials}
              onRegenerateCredentials={onRegenerateCredentials} />
            <Text 
              fontWeight='bold'
              mt='32px'>API Endpoints</Text>
            <ApplicationAPIEndpointsTabContent
              instance={instance} />
          </Flex>
        </motion.div>}
      </AnimatePresence>
    </Flex>
  )
}

export default ApplicationAPIFormSection