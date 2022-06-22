import { DOMAIN_URL } from "@/services"
import { BsMessenger, BsTwitter } from "react-icons/bs"
import { FaFacebookF, FaPinterestP } from "react-icons/fa"
import { RiWhatsappLine } from "react-icons/ri"
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"

interface IButtonShare {
  name: string
  description: string
  imageUrl: string
  product_id: number
}

const ButtonShare = ({
  name,
  description,
  imageUrl,
  product_id,
}: IButtonShare) => {
  const url = `${DOMAIN_URL}/product/${product_id}`

  return (
    <div className="button-share">
      <FacebookShareButton
        className="button-share-facebook"
        quote={name}
        title={name}
        hashtag={`#${name}`}
        url={url}
      >
        <FaFacebookF />
      </FacebookShareButton>

      <FacebookMessengerShareButton
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ""}
        className="button-share-messenger"
        title={name}
        url={url}
      >
        <BsMessenger />
      </FacebookMessengerShareButton>

      <TwitterShareButton
        className="button-share-twitter"
        title={name}
        url={url}
      >
        <BsTwitter />
      </TwitterShareButton>

      <WhatsappShareButton
        className="button-share-whatsapp"
        title={name}
        url={url}
      >
        <RiWhatsappLine />
      </WhatsappShareButton>

      <PinterestShareButton
        className="button-share-pinterest"
        title={name}
        media={imageUrl}
        description={description}
        url={url}
      >
        <FaPinterestP />
      </PinterestShareButton>
    </div>
  )
}

export default ButtonShare
