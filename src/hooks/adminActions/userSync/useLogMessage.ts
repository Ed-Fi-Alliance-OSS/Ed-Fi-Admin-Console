import { MessageType } from "../../../core/UserSync/UserSync.types"

const useLogMessage = () => {
    const mapLogMessageType = (messageType: number): MessageType => {
        if (messageType === 0)
            return "Information"
    
        if (messageType === 1)
            return "Warning"
    
        if (messageType === 2)
            return "Sync Error"
    
        return "Fatal Error"
    }

    return {
        mapLogMessageType
    }
}

export default useLogMessage