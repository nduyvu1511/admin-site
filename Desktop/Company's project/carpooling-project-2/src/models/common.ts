import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactChild, ReactElement, ReactNode } from "react"
import { LocationType } from "./location"

export interface HasChildren {
  children: ReactChild
}

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface PayloadType<T> {
  payload: T
}

export interface UseParams<T, U> {
  params: T
  onSuccess: (params: U) => void
  onError?: Function
}

export interface HasChildren {
  children: ReactChild
}

export interface LayoutProps {
  children: ReactNode
}

export interface PayloadBoolean {
  payload: boolean
}

export interface PayloadString {
  payload: string
}

export interface PayloadNumber {
  payload: number
}

export interface CommonSlice {
  isOpenSearchModal: boolean | undefined
  isScreenLoading: boolean
  isOpenPromotionModal: boolean
  isOpenAlertModal: boolean
  isOpenLocationFormModal: LocationType | undefined
}

export interface OptionModel {
  label: string
  value: string | number
}

export interface NumberSeatOptionModel {
  label: string
  value: number
  number_seat: number
}

export interface UseParams<T, U> {
  params: T
  onSuccess: (params: U) => void
  onError?: Function
}

export type AttachmentRouteType = "common" | "avatar"
