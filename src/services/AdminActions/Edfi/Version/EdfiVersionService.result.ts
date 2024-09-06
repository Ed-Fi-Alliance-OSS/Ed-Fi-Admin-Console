import { HttpServiceRequestError, HttpServiceResponse } from "../../../HttpService/HttpService.response.types";
import { GetEdfiVersionResponse } from "./EdfiVersionService.response";

export type GetVersionResult = Promise<HttpServiceResponse<GetEdfiVersionResponse> | HttpServiceRequestError>