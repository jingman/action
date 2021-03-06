import e from 'express'
import sseClients from '../sseClients'
import {getUserId} from '../utils/authorization'
import sendToSentry from '../utils/sendToSentry'
import handleGraphQLTrebuchetRequest from './handleGraphQLTrebuchetRequest'

const SSE_PROBLEM_USERS = [] as string[]

const httpGraphQLHandler = async (req: e.Request, res: e.Response) => {
  const connectionId = req.headers['x-correlation-id']
  const authToken = (req as any).user || {}
  const connectionContext = connectionId ? sseClients.get(connectionId) : {authToken, ip: req.ip}
  if (!connectionContext) {
    const viewerId = getUserId(authToken)
    if (!SSE_PROBLEM_USERS.includes(viewerId)) {
      SSE_PROBLEM_USERS.push(viewerId)
      sendToSentry(new Error('SSE response not found'), {userId: viewerId})
    }
    res.send('SSE Response not found')
    return
  }
  if (connectionId && connectionContext.authToken.sub !== authToken.sub) {
    const viewerId = getUserId(authToken)
    sendToSentry(new Error('Security: Spoofed SSE connectionId'), {userId: viewerId})
    // quietly fail for cheaters
    res.sendStatus(200)
  }

  if (req.body?.type === 'WRTC_SIGNAL') return
  const response = await handleGraphQLTrebuchetRequest(req.body, connectionContext)
  if (response) {
    res.send(response)
  } else {
    res.sendStatus(200)
  }
}

export default httpGraphQLHandler
