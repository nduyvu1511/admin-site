import { Header, HeroSection, HeroSectionList, PlaceSlide, Switch } from "@/components"
import { Footer } from "@/components/footer"
import { NewsList } from "@/components/news"

const Home = () => {
  return (
    <>
      <section className="">
        <Header />

        <div className="container mt-[80px]">
          <div className="">
            <HeroSection />
          </div>
        </div>
        <div className="mt-[160px]">
          <div className="">
            <h1 className="home-heading text-[60px] leading-[73px] text-center">
              Chuyến đi cụ thể
            </h1>

            <div className="mt-[80px] max-w-[1440px] w-full mx-auto">
              <PlaceSlide />
            </div>
          </div>
        </div>

        <div className="container mt-[160px]">
          <div className="">
            <h1 className="home-heading text-[60px] leading-[73px] text-center">
              Hướng dẫn trải nghiệm{" "}
            </h1>

            <div className="mt-[80px]">
              <div className="flex-center">
                <Switch />
              </div>
            </div>

            <div className="mt-[120px]">
              <HeroSectionList />
            </div>
          </div>
        </div>

        <div className="mt-[120px] bg-bg-1 py-[160px]">
          <div className="container">
            <h1 className="home-heading text-[60px] leading-[73px] mb-[80px] text-center">
              Tin tức
            </h1>

            <div className="">
              <NewsList />

              <div className="mt-[80px] flex justify-center">
                <button className="btn-primary-outline">Xem thêm</button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-[160px]">
          <Footer />
        </div>
      </section>
    </>
  )
}

export default Home
