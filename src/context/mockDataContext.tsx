import { hasIn } from 'lodash-es'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type MockDataType = 'Instances' | 'Tenants' | 'Users' | 'Roles' | 'Permissions' | `Vendors:${string}`;

// Define the type for our context data structure
interface MockDataContextType {
  data: Record<string, any>;
  set: (key: MockDataType, value: any) => void;
  get: (key: MockDataType) => any;
  addElement: (key: MockDataType, value: any) => void;
  removeElement: (key: MockDataType, value: any) => void;
}

// Create a context with a default value of undefined
const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

// Define props for the provider component
interface MockDataProviderProps {
  children: ReactNode;
}

// Create the provider component
export const MockDataProvider: React.FC<MockDataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Record<string, any>>(getPrimaryObject())

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mockData', JSON.stringify(data))
  }, [data])

  function getPrimaryObject(): object {
    const obj = localStorage.getItem('mockData')
    try {
      return obj ? JSON.parse(obj) : {}
    } catch(e) {
      return {}
    }
  }

  // Function to set key-value pairs
  const set = (key: MockDataType, value: any) => {
    const ls = {
      ...getPrimaryObject(),
      [key]: value,
    }
    // localStorage.setItem('mockData', JSON.stringify(ls))
    setData(() => ls)
  }

  // Function to get value by key
  const get = (key: MockDataType) => {
    const doExist = hasIn(getPrimaryObject(), key)
    return doExist ? getPrimaryObject()[key] : null
  }

  // Function to add an element to an array
  const addElement = (key: MockDataType, value: any) => {
    // check if the data is already an array
    if (!Array.isArray(getPrimaryObject()[key])) {
      setData(() => ({
        ...getPrimaryObject(),
        [key]: [value],
      }))
      return
    }
    setData(() => ({
      ...getPrimaryObject(),
      [key]: [...getPrimaryObject()[key], value],
    }))
  }

  // Function to remove an element from an array
  const removeElement = (key: MockDataType, value: any) => {
    setData(() => ({
      ...getPrimaryObject(),
      [key]: getPrimaryObject()[key].filter((item: any) => item !== value),
    }))
  }

  // Context value with both data and utility functions
  const contextValue: MockDataContextType = {
    data,
    set,
    get,
    addElement,
    removeElement,
  }

  return (
    <MockDataContext.Provider value={contextValue}>
      {children}
    </MockDataContext.Provider>
  )
}

// Custom hook to use the mock data context
export const useMockData = (): MockDataContextType => {
  const context = useContext(MockDataContext)
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider')
  }
  return context
}
