import { Tenant } from "../../../core/Tenant.types";
import { HttpServiceRequestError, HttpServiceResponse } from "../../HttpService/HttpService.response.types";
import { UpdateTenantRespose } from "./TenantService.responses";

export type GetTenantResult = Promise<HttpServiceResponse<Tenant> | HttpServiceRequestError>
export type UpdateTenantResult = Promise<HttpServiceResponse<UpdateTenantRespose> | HttpServiceRequestError>