import { PaginatedItemsViewModel } from '../../../core/apiResponses'
import { JobExecutionListResponse, JobExecutionLogEntry, JobListResponse, JobProfile } from '../../../core/UserSync/UserSync.types'
import { HttpServiceRequestError, HttpServiceResponse } from '../../HttpService/HttpService.response.types'
import { EdFiSyncProfileResponse, EdFiSyncUpdatedResponse, JobExecutionRequestedResponse } from './UserSyncService.responses'

export type GetEdFiSyncResult = Promise<HttpServiceResponse<JobListResponse> | HttpServiceRequestError>
export type GetEdFiSyncByIdResult = Promise<HttpServiceResponse<JobProfile> | HttpServiceRequestError>
export type GetEdFiSyncExecutionsResult = Promise<HttpServiceResponse<PaginatedItemsViewModel<JobExecutionListResponse>> | HttpServiceRequestError>
export type GetEdFiSyncExecutionLogsResult = Promise<HttpServiceResponse<PaginatedItemsViewModel<JobExecutionLogEntry>> | HttpServiceRequestError>
export type PostEdFiSyncResult = Promise<HttpServiceResponse<EdFiSyncProfileResponse> | HttpServiceRequestError>
export type PutEdFiSyncResult = Promise<HttpServiceResponse<EdFiSyncUpdatedResponse> | HttpServiceRequestError>
export type PostExecuteEdFiSyncResult = Promise<HttpServiceResponse<JobExecutionRequestedResponse> | HttpServiceRequestError>