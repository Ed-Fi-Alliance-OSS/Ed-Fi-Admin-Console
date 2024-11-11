import { EdfiClaimSet } from '../../../../core/Edfi/EdfiClaimsets'
import { HttpServiceRequestError, HttpServiceResponse } from '../../../HttpService/HttpService.response.types'

export type GetClaimsetsListResult = Promise<HttpServiceResponse<EdfiClaimSet[]> | HttpServiceRequestError>