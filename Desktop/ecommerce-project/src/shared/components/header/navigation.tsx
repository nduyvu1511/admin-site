import Link from "next/link"
import { useRouter } from "next/router"
import { RiRefreshLine } from "react-icons/ri"
import { navs } from "./data"

export interface IHandleClickModal {
  handleClickModal?: Function
}

const Navigation = ({ handleClickModal }: IHandleClickModal) => {
  const router = useRouter()

  const handleItemClick = (id: number) => {
    if (id === 8) {
      // language === "vni"
      //   ? dispatch(switchToEnglish())
      //   : dispatch(switchToVietnamese())
    } else {
      handleClickModal && handleClickModal()
    }
  }

  return (
    <ul className="navigation-list">
      {navs.map((nav) => (
        <li
          className={`navigation-list-item ${
            nav.id === 8 ? "hide-on-desktop navigation-list-item-toggle" : ""
          } ${
            router.pathname === nav.path ? "navigation-list-item-active" : ""
          }`}
          key={nav.id}
        >
          <Link href={nav.path} passHref>
            <a onClick={() => handleItemClick(nav.id)}>
              {nav.icon}
              {nav.vniName}
              {nav.id === 8 && (
                <>
                  <span style={{ marginLeft: "3px" }}>Tiếng Việt</span>
                  <RiRefreshLine />
                </>
              )}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export { Navigation }
