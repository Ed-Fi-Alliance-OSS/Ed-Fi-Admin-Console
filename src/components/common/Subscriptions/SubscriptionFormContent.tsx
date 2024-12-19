import {
  Flex, FormControl 
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSelect, CustomErrorField, CompleteFormErrorMessage, CustomSwitch, CustomNumberInput, SelectDateFromTo 
} from '@edfi/admin-console-shared-sdk'
import {
  Mode, SubscriptionApplicationOption, SubscriptionFormData 
} from '../../../hooks/adminActions/subscriptions/useSubscriptionsForm.types'
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
    <Flex
      flexDir='column'
      w='full'
    >
      {Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage />}

      <FormControl w='full'>
        <CustomFormLabel 
          htmlFor='subscriptionDuration' 
          text='License Duration (Start and End Date)'
        />

        {errors && errors['subscriptionDuration'] && <CustomErrorField errorMessage={errors['subscriptionDuration'].message} />}

        <SelectDateFromTo
          endDate={subscriptionData.endDateTime}
          startDate={subscriptionData.startDateTime}
          onUpdateEndDate={onChangeEndDate}
          onUpdateStartDate={onChangeStartDate}
        />
      </FormControl>

      <Flex mt='24px'>
        <FormControl>
          <CustomFormLabel 
            htmlFor='selectApplication' 
            text='Select Application'
          />

          <CustomSelect
            options={applicationOptions.map(app => ({
              value: app.applicationId,
              text: app.applicationName 
            }))}
            disabled={mode === 'Edit'}
            error={errors && errors['selectApplication'] && errors['selectApplication'].message}
            id='selectApplication'
            value={applicationOptions.find(option => option.applicationId === subscriptionData.applicationId)?.applicationId}  
            onChange={onSelectApplication}
          />
        </FormControl>
      </Flex>

      <Flex mt='24px'>
        <FormControl>
          <CustomFormLabel
            htmlFor='gracePeriod'
            text='Grace Period'
          />

          <CustomNumberInput
            defaultValue={0}
            error={errors && errors['gracePeriod'] && errors['gracePeriod'].message}
            id='gracePeriod'
            max={365}
            min={0}
            value={subscriptionData.gracePeriod}
            onChange={onChangeGracePeriod}
          />
        </FormControl>
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='24px'
        w='full'
      >
        <FormControl w='150px'>
          <CustomFormLabel
            htmlFor='numberOfLicenses'
            text='No. of Licenses'
          />

          <CustomNumberInput 
            defaultValue={0}
            disabled={subscriptionData.unlimitedLicenses}
            error={errors && errors['numberOfLicenses'] && errors['numberOfLicenses'].message}
            id='numberOfLicenses'
            max={100}
            min={-1}
            value={subscriptionData.numberOfLicenses}
            onChange={onChangeLicensesAmount}
          />
        </FormControl>

        <FormControl w='90px'>
          <CustomFormLabel
            htmlFor='unlimitedLicense'
            text='Unlimited'
          />

          <CustomSwitch 
            id='unlimitedLicense'
            isChecked={subscriptionData.unlimitedLicenses}
            onCheck={onToggleLicenseType}
          />
        </FormControl>

        <FormControl w='150px'>
          <CustomFormLabel
            htmlFor='autoAssignLicense'
            text='Auto Assign License'
          />

          <CustomSwitch 
            id="autoAssignLicense"
            isChecked={subscriptionData.autoAssign}
            onCheck={onToggleAutoAssign}
          />
        </FormControl>
      </Flex>
    </Flex>
  )
}

export default SubscriptionFormContent