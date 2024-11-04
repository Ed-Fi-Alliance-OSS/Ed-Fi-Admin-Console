import { Flex } from '@chakra-ui/react'
import { useCallback, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { TrainingModule } from '../../../../core/TrainingModule.types'
import TrainingModuleItem from './TrainingModuleItem'
import VideoModal from './VideoModal'
import VideoPlayer from './VideoPlayer'

const trainingModuleList: TrainingModule[] = [
  { name: '', description: '15 Minute Video', status: 'Start' }
]

interface TrainingModuleListProps {
    trainingCompleted?: boolean 
    onCompleteStep?: (stepIndex: number) => void
}

const TrainingModuleList = ({ trainingCompleted, onCompleteStep }: TrainingModuleListProps) => {
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([...trainingModuleList])
  const [showVideoModal, setShowVideModal] = useState(false)
  const url = 'https://youtu.be/ohxlNVg9iNg'

  const [progress, setProgress] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<ReactPlayer>()

  const handleShowVideoModal = () => setShowVideModal(true)
  const handleHideVideoModal = () => {
    setIsReady(false)
    setShowVideModal(false)
  } 

  const convertProgress = (progressValue: number) => Math.floor(progressValue * 100)

  const handleProgress = (state: OnProgressProps) => {
    setProgress(convertProgress(state.played))
    setElapsedTime(state.playedSeconds)

    if (convertProgress(state.played) >= 99) handleCompletedVideo()
  }

  const onReady = useCallback(() => {
    if (!isReady && playerRef.current) {
      playerRef.current.seekTo(elapsedTime, 'seconds')
      setIsReady(true)
    }
  }, [isReady])

  const handleCompletedVideo = () => {
    const ntrainingModules = [...trainingModules]

    ntrainingModules[0].status = 'Complete'

    if(onCompleteStep) 
      onCompleteStep(1)
            
    setTrainingModules(ntrainingModules)
  }

  return (
    <Flex flexDir='column' w='full'>
      <VideoModal
        show={showVideoModal}
        content={<VideoPlayer 
          playerRef={playerRef}
          url={url}
          progress={progress}
          isPlaying={isPlaying}
          onReady={onReady}
          onProgress={handleProgress} />}
        onClose={handleHideVideoModal} />
      {trainingModules.map((trainingModule, index) => 
        <TrainingModuleItem 
          key={index}
          data={{...trainingModule, name: `Training Module ${index + 1}` }}
          status={trainingCompleted? 'Complete' : trainingModule.status} 
          onAction={handleShowVideoModal} />
      )}
    </Flex>
  )
}

export default TrainingModuleList