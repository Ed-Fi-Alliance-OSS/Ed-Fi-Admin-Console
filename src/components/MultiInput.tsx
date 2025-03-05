// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, FormControl,
  FormLabel,
  Tag
} from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteList,
  AutoCompleteTag
} from '@choc-ui/chakra-autocomplete'
import {
  isArray,
  isFunction,
  sortedUniq
} from 'lodash-es'
import {
  KeyboardEventHandler,
  useEffect, useReducer
} from 'react'

interface MultiInputProps<T> {
  values: T[]
  onChange: (vals: T[]) => void
  transformText?: (text: string) => T
  filterInput?: KeyboardEventHandler<HTMLInputElement>
  label?: string
  fieldName?: string
}

function MultiInput<T extends string | number>({ filterInput, fieldName, label, values: initialVals, onChange, transformText }: MultiInputProps<T>) {
  const [ snapshot, setSnapshot ] = useReducer((state, action) => JSON.stringify(state) === JSON.stringify(action) ? state : action, {})

  const [ values, dispatch ] = useReducer((state, action: {type: 'set' | 'add' | 'rm', data: string | string[]}) => {
    let arr = [ ...state ]

    let data = isFunction(transformText) 
      ? isArray(action.data) 
        ? action.data.map(p => transformText(p)) 
        :  transformText(action.data)
      : action.data as T

    if(action.type === 'rm') {
      arr = arr.filter(e => e !== data)
      onChange(arr)
    }
    
    if(data === 0) {
      return arr
    }
  
    if(action.type === 'add') {
      arr.push(data)
      onChange(arr)
    }
  

    if(action.type === 'set') {
      arr = isArray(data) ? [ ...data ] : [ data ]
      onChange(arr)
    }
  
    arr = sortedUniq(arr)
    return arr
  }, [])

  function addVal(data: string) {
    dispatch({
      type: 'add',
      data 
    })

  }
  
  function rmVal(data: string) {
    dispatch({
      type: 'rm',
      data 
    })
  }

  useEffect(() => {
    console.log('🚘 BEFORE: setting initial vals', initialVals, snapshot)
    if(snapshot === JSON.stringify(initialVals)) {
      return
    }
    
    if(!isArray(initialVals)) {
      return
    }

    if(initialVals.length === 0) {
      return
    }

    console.log('🚘 setting initial vals', initialVals)


    dispatch({
      type: 'set',
      data: initialVals as string[]
    })

    setSnapshot(JSON.stringify(initialVals))

  }, [ initialVals ])

  return (
    <Flex
      align="center"
      direction="column"
      justify="center"
      w="full"
    >
      <FormControl
        id={fieldName}
        w="full"
      >
        <FormLabel
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='700'
          htmlFor={fieldName}
          lineHeight='20px'
        >{label}
        </FormLabel>

        <AutoComplete
          closeOnSelect
          creatable
          focusInputOnSelect
          multiple
          defaultValues={values}
          id={fieldName}
          openOnFocus={false}
          suggestWhenEmpty={false}
          onSelectOption={({ item }) => addVal(item.value)}
          onTagRemoved={rmVal}
        >
          <AutoCompleteInput
            enterKeyHint='enter'
            placeholder={label}
            size='xs'
            variant="filled"
            onKeyUp={filterInput}
          >
            {values.map((tag, tid) => <AutoCompleteTag
              key={tid}
              label={tag}
              variant='solid'
              onRemove={() => rmVal(tag)}
            />)}
          </AutoCompleteInput>


          <AutoCompleteList fontSize={10}>
            <AutoCompleteCreatable>
              {({ value }) => (<Flex gap={2}>Add <Tag
                paddingX={2}
                size="xs"
              >{isFunction(transformText)? transformText?.(value) : value}
              </Tag> as option...
              </Flex>)}
            </AutoCompleteCreatable>
          </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </Flex>
  )
}

export default MultiInput