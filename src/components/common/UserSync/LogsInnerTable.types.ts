import { MessageType } from "../../../core/UserSync/UserSync.types"

export type LogsInnerTableFilterMessageType = MessageType | "Any"

export interface LogFilterValues {
    messageType: LogsInnerTableFilterMessageType
    messageText: string 
}

export interface LogFilterTypeOption {
    value: LogsInnerTableFilterMessageType
    text: LogsInnerTableFilterMessageType
}