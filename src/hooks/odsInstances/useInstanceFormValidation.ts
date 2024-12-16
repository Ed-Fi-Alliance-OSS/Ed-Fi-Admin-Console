import { ODSInstance } from '@edfi/admin-console-shared-sdk'

export interface InstanceFormErrors {
  name: string
  instanceType: string
  connectionString: string
}

export function useInstanceFormValidation() {

  const validateField = <T extends keyof ODSInstance>(field: T) => (value: ODSInstance[T]) => {


    if (field == 'name' && !value) {
      return 'Name is required'
    }

    if (field == 'instanceType' && !value) {
      return 'Instance Type is required'
    }

    if (field == 'connectionString') {
      return 'Connection String is required'
    }

  }

  return { validateField, }

}