import { StarRating } from "@/models"
import ratingApi from "@/services/ratingApi"
import useSWR from "swr"

interface UseStatisticalRatingRes {
  data: {
    star_avg: number
    rating_total: number
    detail_star_rating: StarRating[]
  }
  isValidating: boolean
}

export const useStatisticalRating = (id: number): UseStatisticalRatingRes => {
  const { data, isValidating } = useSWR(
    "star_rating_count",
    () =>
      ratingApi
        .groupRatingStarCount(id)
        .then((res: any) => res?.result?.data || []),
    {
      dedupingInterval: 1000,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  return {
    data,
    isValidating,
  }
}
