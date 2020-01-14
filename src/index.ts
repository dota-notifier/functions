import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

export const notify = functions.https.onRequest(async (request, response) => {
  const {
    body: { Id } // pascal case
  } = request

  await admin.messaging().send({
    android: {
      collapseKey: 'dota',
      notification: {
        sound: 'match_ready_no_focus.mp3'
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
          sound: 'match_ready_no_focus.caf'
        }
      }
    },
    notification: {
      body: 'Dota 2 has come to the foreground!'
    },
    topic: Id
  })

  response.send()
})
