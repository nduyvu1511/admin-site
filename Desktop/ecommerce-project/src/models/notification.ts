export interface SetNotificationUserId {
  token: string
  player_id: string
  status?: "logout"
}

export interface NotificationItem {
  id: number
  name: string
  content: string
  is_view: boolean
  create_date: string
}

export interface Notification {
  notification_counts: number
  notifications: NotificationItem[]
}

export interface SetNotificationViewedParams {
  token: string
  notification_id: number
}
