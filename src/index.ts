import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

export const notify = functions.https.onRequest(async (request, response) => {
  const {
    body: { Id } // pascal case
  } = request

  await admin.messaging().send({
    android: {
      priority: 'high'
    },
    apns: {
      headers: {
        'apns-priority': '10'
      }
    },
    notification: {
      body: 'Dota 2 has come to the foreground!'
    },
    topic: Id
  })

  response.send()
})
