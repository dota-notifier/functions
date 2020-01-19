import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

export const notify = functions.https.onRequest(async (request, response) => {
  const {
    body: { Id, Type } // pascal case
  } = request

  const body =
    Type === 'READY_CHECK'
      ? 'A ready check has been requested'
      : 'Your game is ready'
  const channelId = Type === 'READY_CHECK' ? 'ready_check' : 'match_ready'
  const sound =
    Type === 'READY_CHECK'
      ? 'ready_check_no_focus.wav'
      : 'match_ready_no_focus.wav'

  await admin.messaging().send({
    android: {
      collapseKey: 'dota',
      notification: {
        channelId,
        sound
      },
      priority: 'high'
    },
    apns: {
      headers: {
        'apns-collapse-id': 'dota',
        'apns-priority': '10'
      },
      payload: {
        aps: {
          sound
        }
      }
    },
    notification: {
      body
    },
    topic: Id
  })

  response.send()
})
