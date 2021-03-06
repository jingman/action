import {GraphQLObjectType, GraphQLList, GraphQLNonNull} from 'graphql'
import {makeResolve, resolveNewMeeting, resolveUnlockedStages} from '../resolvers'
import StandardMutationError from './StandardMutationError'
import NewMeeting from './NewMeeting'
import RetroReflection from './RetroReflection'
import NewMeetingStage from './NewMeetingStage'

const RemoveReflectionPayload = new GraphQLObjectType({
  name: 'RemoveReflectionPayload',
  fields: () => ({
    error: {
      type: StandardMutationError
    },
    meeting: {
      type: NewMeeting,
      resolve: resolveNewMeeting
    },
    reflection: {
      type: RetroReflection,
      resolve: makeResolve('reflectionId', 'reflection', 'retroReflections')
    },
    unlockedStages: {
      type: new GraphQLList(new GraphQLNonNull(NewMeetingStage)),
      description: 'The stages that were unlocked by navigating',
      resolve: resolveUnlockedStages
    }
  })
})

export default RemoveReflectionPayload
