import { createContext } from 'react'
import { EdfiApplicationAuthData } from '../core/Edfi/EdfiApplications'
import { SISProviderConnectionState } from '../core/sisProviders/SISProviders.types'
import useSISProvidersForm from '../hooks/adminActions/edfi/useSISProvidersForm'
import { OptionalProvidersOption, SISProvidersOption } from '../hooks/adminActions/edfi/useSISProvidersForm.types'

export interface OnBoardigConnectSISContextData {
    sisProvidersOptionList: SISProvidersOption[]
    selectedProviderId: string
    selectedOptionalProviderId: string
    connectionState: SISProviderConnectionState
    optionalConnectionState: SISProviderConnectionState
    optionaEdfiApplicationAuthData: EdfiApplicationAuthData
    isLoadingOptionalCredentials: boolean 
    hasSelectedProvider: boolean 
    hasSelectedOptionalProvider: boolean
    optionalSource: string
    edfiApplicationAuthData: EdfiApplicationAuthData
    isLoadingCredentials: boolean 
    showOptionalForm: boolean 
    optionalSISSources: OptionalProvidersOption[]
    onChangeOptionalProvider: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onChangeOptionalSource: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onShowOptionalForm: () => void
    handleRegenerateOptionalCredentials: () => Promise<void>
    handleChangeOptionalCredentials: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeCredentials: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeEndpoints: () => void
    handleChangeSISprovider: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
    handleRegenerateCredentials: () => Promise<void>
    handleRemoveProvider: () => void
    handleRemoveOptionalProvider: () => void
}

export const onBoardingConnectSISContext = createContext<OnBoardigConnectSISContextData>({
  sisProvidersOptionList: [],
  selectedProviderId: '',
  selectedOptionalProviderId: '',
  connectionState: 'Awaiting Connection',
  optionalConnectionState: 'Awaiting Connection',
  optionaEdfiApplicationAuthData: {
    applicationId: 0
  },
  isLoadingOptionalCredentials: false,
  hasSelectedProvider: false,
  hasSelectedOptionalProvider: false,
  optionalSource: 'Select Provider Function',
  edfiApplicationAuthData: {
    applicationId: 0
  },
  isLoadingCredentials: false,
  optionalSISSources: [],
  showOptionalForm: false,
  onShowOptionalForm: () => null,
  onChangeOptionalProvider: () => null,
  onChangeOptionalSource: () => null,
  handleRegenerateOptionalCredentials: () => Promise.resolve(),
  handleChangeOptionalCredentials: () => null,
  handleChangeCredentials: () => null,
  handleChangeEndpoints: () => null,
  handleChangeSISprovider: () => Promise.resolve(),
  handleRegenerateCredentials: () => Promise.resolve(),
  handleRemoveProvider: () => null,
  handleRemoveOptionalProvider: () => null
})

interface OnBoardigConnectSISContextProps {
    children: JSX.Element
    schoolYear: number | null
    onSelectSISProvider: (sisProvider: string, source: string) => void
    onUnselectSISProvider: (sisProviderType: 'required' | 'optional') => void
}

const OnBoardingConnectSISContextProvider = ({ children, schoolYear, onSelectSISProvider, onUnselectSISProvider }: OnBoardigConnectSISContextProps) => {
  const connectSISProvidersForm = useSISProvidersForm({ schoolYear, onSelectSISProvider, onUnselectSISProvider })

  return (
    <onBoardingConnectSISContext.Provider value={connectSISProvidersForm}>
      {children}
    </onBoardingConnectSISContext.Provider>
  )
}

export default OnBoardingConnectSISContextProvider