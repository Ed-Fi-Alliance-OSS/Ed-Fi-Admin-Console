export interface HttpServiceRequestError {
    message: string 
    actionMessage: string
    statusCode: number | 'unknown'
    action: string
    type: 'Error'
}

export interface HttpServiceResponse<TResponse> {
    data: TResponse 
    type: 'Response'
}