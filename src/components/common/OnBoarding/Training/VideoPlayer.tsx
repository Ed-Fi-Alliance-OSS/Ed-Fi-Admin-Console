import {
  Flex, Progress, Text 
} from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'

interface VideoPlayerProps {
    url: string
    playerRef: React.MutableRefObject<any>
    progress: number
    isPlaying: boolean 
    onReady: () => void
    onProgress: (state: OnProgressProps) => void
}

const VideoPlayer = ({ url, progress, playerRef, isPlaying, onProgress, onReady }: VideoPlayerProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <ReactPlayer    
        ref={playerRef}
        controls={true}
        playing={isPlaying}
        url={url}
        onProgress={onProgress}
        onReady={onReady}
      />

      <Text
        id="progressbar-label"
        mt='16px'
      >
        {progress < 99? `Progress: ${progress} %` : 'Completed'}
      </Text>

      <Progress 
        hasStripe
        aria-labelledby="progressbar-label" 
        bg='white' 
        color='blue.500' 
        mt='12px' 
        value={progress}
        w='full'
      />
    </Flex>
  )
}

export default VideoPlayer