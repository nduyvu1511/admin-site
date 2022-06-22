/** @type {import('next').NextConfig} */
const withImages = require("next-images")
const { i18n } = require("./i18n.config")

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: [process.env.NEXT_PUBLIC_IMAGE_URL, "cf.shopee.vn"],
  },
  i18n,
})
