import { Flex, FormControl} from '@chakra-ui/react'
import { CustomFormLabel, CustomSelect, CustomErrorField, CompleteFormErrorMessage, CustomSwitch, CustomNumberInput, SelectDateFromTo } from '@edfi/admin-console-shared-sdk'
import { Mode, SubscriptionApplicationOption, SubscriptionFormData } from '../../../hooks/adminActions/subscriptions/useSubscriptionsForm.types'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import 'react-datepicker/dist/react-datepicker.css'

interface SubscriptionFormContentProps {
    subscriptionData: SubscriptionFormData
    applicationOptions: SubscriptionApplicationOption[]
    mode: Mode
    hasTriedSubmit: boolean 
    errors: FormDataErrors
    onChangeStartDate: (date: Date) => null
    onChangeEndDate: (date: Date) => null
    onSelectApplication: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeGracePeriod: (valueString: string, value: number) => void
    onChangeLicensesAmount: (valueString: string, value: number) => void
    onToggleLicenseType: (e: ChangeEvent<HTMLInputElement>) => void
    onToggleAutoAssign: (e: ChangeEvent<HTMLInputElement>) => void
}

const SubscriptionFormContent = ({ subscriptionData, mode, applicationOptions, hasTriedSubmit, errors, onToggleAutoAssign, onToggleLicenseType, onChangeEndDate, onChangeStartDate, onSelectApplication, onChangeGracePeriod, onChangeLicensesAmount }: SubscriptionFormContentProps) => {
  console.log('errors in subscription form', errors)

  return (
    <Flex flexDir='column' w='full'>
      {Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage />}
      <FormControl w='full'>
        <CustomFormLabel 
          text='License Duration (Start and End Date)' 
          htmlFor='subscriptionDuration' />
        {errors && errors['subscriptionDuration'] && <CustomErrorField errorMessage={errors['subscriptionDuration'].message} />}
        <SelectDateFromTo
          startDate={subscriptionData.startDateTime}
          endDate={subscriptionData.endDateTime}
          onUpdateStartDate={onChangeStartDate}
          onUpdateEndDate={onChangeEndDate} />
      </FormControl>
      <Flex mt='24px'>
        <FormControl>
          <CustomFormLabel 
            text='Select Application' 
            htmlFor='selectApplication' />
          <CustomSelect
            disabled={mode === 'Edit'}
            id='selectApplication'
            error={errors && errors['selectApplication'] && errors['selectApplication'].message}
            value={applicationOptions.find(option => option.applicationId === subscriptionData.applicationId)?.applicationId}
            options={applicationOptions.map(app => ({ value: app.applicationId, text: app.applicationName }))}  
            onChange={onSelectApplication} />
        </FormControl>
      </Flex>
      <Flex mt='24px'>
        <FormControl>
          <CustomFormLabel
            text='Grace Period'
            htmlFor='gracePeriod' />
          <CustomNumberInput
            id='gracePeriod'
            defaultValue={0}
            min={0}
            max={365}
            error={errors && errors['gracePeriod'] && errors['gracePeriod'].message}
            value={subscriptionData.gracePeriod}
            onChange={onChangeGracePeriod} />
        </FormControl>
      </Flex>
      <Flex justifyContent='space-between' mt='24px' w='full'>
        <FormControl w='150px'>
          <CustomFormLabel
            text='No. of Licenses'
            htmlFor='numberOfLicenses' />
          <CustomNumberInput 
            id='numberOfLicenses'
            defaultValue={0}
            min={-1}
            max={100}
            error={errors && errors['numberOfLicenses'] && errors['numberOfLicenses'].message}
            disabled={subscriptionData.unlimitedLicenses}
            value={subscriptionData.numberOfLicenses}
            onChange={onChangeLicensesAmount} />
        </FormControl>
        <FormControl w='90px'>
          <CustomFormLabel
            text='Unlimited'
            htmlFor='unlimitedLicense' />
          <CustomSwitch 
            id='unlimitedLicense'
            onCheck={onToggleLicenseType}
            isChecked={subscriptionData.unlimitedLicenses} />
        </FormControl>
        <FormControl w='150px'>
          <CustomFormLabel
            text='Auto Assign License'
            htmlFor='autoAssignLicense' />
          <CustomSwitch 
            id="autoAssignLicense"
            onCheck={onToggleAutoAssign}
            isChecked={subscriptionData.autoAssign} />
        </FormControl>
      </Flex>
    </Flex>
  )
}

export default SubscriptionFormContent