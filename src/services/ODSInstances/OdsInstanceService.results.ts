import { HttpServiceRequestError, HttpServiceResponse } from '../HttpService/HttpService.response.types'
import { GetOdsInstancesListResponse, ODSInstanceUpdatedResponse, UpdateODSInstanceIsDefaultResponse } from './OdsInstanceService.responses'

export type GetOdsInstancesListResult = Promise<HttpServiceResponse<GetOdsInstancesListResponse> | HttpServiceRequestError>
export type PutOdsInstanceIsDefaultResult = Promise<HttpServiceResponse<UpdateODSInstanceIsDefaultResponse> | HttpServiceRequestError>

// Instance Onboarding
export type PostOdsInstanceOnboardingStepResult = Promise<HttpServiceResponse<ODSInstanceUpdatedResponse> | HttpServiceRequestError>
export type PutOdsInstanceOnboardingStepResult = Promise<HttpServiceResponse<ODSInstanceUpdatedResponse> | HttpServiceRequestError>