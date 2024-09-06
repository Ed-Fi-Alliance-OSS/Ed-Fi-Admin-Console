import { useContext } from "react"
import { externalODSContext } from "../context/externalODSContext"

const useExternalODSData = () => {
    const externalODS = useContext(externalODSContext)

    return {
        externalODS
    }
}

export default useExternalODSData