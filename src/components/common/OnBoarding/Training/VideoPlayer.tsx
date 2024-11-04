import { Flex, Progress, Text } from '@chakra-ui/react'
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
    <Flex flexDir='column' w='full'>
      <ReactPlayer    
        ref={playerRef}
        url={url}
        controls={true}
        playing={isPlaying}
        onProgress={onProgress}
        onReady={onReady} />
      <Text id="progressbar-label" mt='16px'>
        {progress < 99? `Progress: ${progress} %` : 'Completed'}
      </Text>
      <Progress 
        aria-labelledby="progressbar-label"
        hasStripe 
        color='blue.500' 
        bg='white' 
        value={progress} 
        mt='12px'
        w='full' />
    </Flex>
  )
}

export default VideoPlayer