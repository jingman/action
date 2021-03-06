import {GraphQLList, GraphQLObjectType} from 'graphql'
import Organization from './Organization'
import {resolveOrganization, resolveTeams} from '../resolvers'
import Team from './Team'
import StandardMutationError from './StandardMutationError'

const UpdateCreditCardPayload = new GraphQLObjectType({
  name: 'UpdateCreditCardPayload',
  fields: () => ({
    error: {
      type: StandardMutationError
    },
    organization: {
      type: Organization,
      description: 'The organization that received the updated credit card',
      resolve: resolveOrganization
    },
    teamsUpdated: {
      type: new GraphQLList(Team),
      description: 'The teams that are now paid up',
      resolve: resolveTeams
    }
  })
})

export default UpdateCreditCardPayload
