// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Box, Button, Flex, Popover
} from '@chakra-ui/react'
import { useContext } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'

interface ApplicationDetailsControlProps {
    data: EdfiApplication
    isDeleting: boolean 
    onDelete: (applicationId: string) => void
}

const ApplicationDetailsControl = ({ data, isDeleting, onDelete }: ApplicationDetailsControlProps) => {
  const adminConfig = useContext(adminConsoleContext)

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          css={{
            minWidth: '24px',
            marginLeft: '1px',
            fontSize: 'xs',
            borderRadius: '0px 4px 4px 0px',
            bg: 'blue.600',
            color: 'white',
            _hover: { bg: 'blue.700', },
            _active: { bg: 'blue.800', }
          }}
          aria-labelledby={`show-options-${data.applicationName}`}
        >
          <span
            hidden
            id={`show-options-${data.applicationName}`}
          >Show Options
          </span>

          <Box
            aria-hidden="true"
            as={MdKeyboardArrowDown}
            css={{ fontSize: '18px' }}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body padding='0'>
            <Flex>
              {adminConfig && adminConfig.showEdfiApplicationDelete && (
                <Button
                  css={{
                    bg: 'red.600',
                    borderRadius: '4px',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    width: '100px',
                    _hover: { bg: 'red.700' }
                  }}
                  loading={isDeleting}
                  onClick={() => onDelete(data.id.toString())}
                >
                  Delete
                </Button>
              )}
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export default ApplicationDetailsControl
