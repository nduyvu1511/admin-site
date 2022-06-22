import { setFCMToken } from "@/modules"
import chatApi from "@/services/chatApi"
import { onChildAdded, onValue, ref } from "firebase/database"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNotification } from "shared/hook/useNotification"
import { db, RootState } from "../core"

const App = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const { fcmToken, token } = useSelector((state: RootState) => state.user)
  const { setNotificationUserId } = useNotification(false)
  const messaging = getMessaging()

  useEffect(() => {
    if (!token) return

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          if (!fcmToken) {
            setNotificationUserId(currentToken)
            dispatch(setFCMToken(currentToken))
            return
          }
          if (currentToken !== fcmToken) {
            dispatch(setFCMToken(currentToken))
            setNotificationUserId(currentToken)
          }
          console.log("current token for client: ", currentToken)
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          )
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err)
        // catch error while creating client token
      })
  }, [])

  useEffect(() => {
    if (!token) return

    onMessage(messaging, (payload) => {
      // console.log(payload)
    })

    const fetchChat = ref(db, "messages")
    onChildAdded(fetchChat, async (snapshot) => {
      console.log(snapshot)
      const data = snapshot.val()

      // const res: any = await chatApi.getMessagesByIds({
      //   message_ids: [data.message_id],
      //   token,
      // })
      console.log(data)

      // console.log(res?.result?.data)
    })
  }, [])

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope)
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err)
        })
    }
  }, [])

  return <>{children}</>
}

export { App }
