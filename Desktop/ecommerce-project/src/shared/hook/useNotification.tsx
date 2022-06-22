import { RootState } from "@/core/store"
import { Notification, NotificationItem } from "@/models"
import notificationApi from "@/services/notificationApi"
import { useSelector } from "react-redux"
import useSWR from "swr"

interface NotificationRes {
  data: Notification[]
  error: any
  isValidating: boolean
  setNotificationUserId: (id: string) => void
  clearNotificationUserId: (id: string) => void
  setViewedNotification: (id: number) => void
  setViewedAllNotification: () => void
}

const useNotification = (shouldFetch = true): NotificationRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const { data, isValidating, mutate, error } = useSWR(
    "notification",
    token && shouldFetch
      ? () =>
          notificationApi.getNotifications(token).then(
            (res: any) =>
              res?.result?.data || {
                notification_counts: 0,
                notifications: [],
              }
          )
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 10,
      revalidateOnFocus: false,
    }
  )

  const setNotificationUserId = (player_id: string) => {
    if (!token) return
    if (!player_id) return

    notificationApi.setNotiUserId({ player_id, token }).then((res: any) => {
      if (res?.result?.success) {
        console.log(res?.result?.message)
      } else {
        console.log(res?.result?.message)
      }
    })
  }

  const clearNotificationUserId = (player_id: string) => {
    notificationApi.setNotiUserId({ player_id, token, status: "logout" })
  }

  const setViewedNotification = (notification_id: number) => {
    if (!token) return
    if ((data?.notifications?.length || 0) === 0) return

    notificationApi
      .setViewedNotification({ notification_id, token })
      .then((res: any) => {
        if (res?.result?.success) {
          const { id = 0 } = res?.result?.data
          const newData: Notification = { ...data }
          mutate(
            {
              notification_counts: (newData.notification_counts -= 1),
              notifications: [...newData.notifications].map((item) =>
                item.id === id ? { ...item, is_view: true } : item
              ),
            },
            false
          )
        }
      })
  }

  const setViewedAllNotification = () => {
    if (!token) return
    notificationApi.setViewedAllNotification(token).then((res: any) => {
      if (res?.result?.success) {
        mutate(
          {
            notification_counts: 0,
            notifications: [...data.notifications].map(
              (item: NotificationItem) => (item.is_view = true)
            ),
          },
          false
        )
      }
    })
  }

  return {
    data,
    error,
    isValidating,
    clearNotificationUserId,
    setNotificationUserId,
    setViewedAllNotification,
    setViewedNotification,
  }
}

export { useNotification }
