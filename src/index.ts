import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { i18n, sound } from './lib'

admin.initializeApp(functions.config().firebase)

export const notify = functions.https.onRequest(async (request, response) => {
  const {
    body: { id, type }
  } = request

  await admin.messaging().send({
    android: {
      collapseKey: 'dota',
      notification: {
        sound: sound.get(type)
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
          sound: sound.get(type)
        }
      }
    },
    notification: {
      body: i18n.t(type)
    },
    topic: id
  })

  response.send()
})
