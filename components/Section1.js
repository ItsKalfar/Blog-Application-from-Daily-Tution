import Image from "next/image";
import Link from "next/link";
import Author from "./_child/Author";
import fetcher from "../lib/fetcher";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "./_child/Spinner";
import Error from "./_child/error";

// Import Swiper styles
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";

export default function section1() {
  const { data, isLoading, isError } = fetcher("api/posts");

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  SwiperCore.use([Autoplay]);
  const bg = {
    background: "url('/images/banner.png')",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto xl:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
          }}
          loop={true}
        >
          {data.map((value, index) => (
            <SwiperSlide>
              <Slide data={value} key={index} />
            </SwiperSlide>
          ))}
          ...
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ data }) {
  const { id, title, category, img, published, author, description } = data;
  return (
    <div className="grid xl:grid-cols-2">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <a>
            <Image src={img || "/"} width={600} height={600} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className="text-gray-800 hover:text-gray-600">- {published}</a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${id}`}>
            <a className="text-3xl xl:text-6xl font-bold text-gray-800 hover:text-gray-600">
              {title || "title"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{description.substring(0, 300)}</p>
        {author ? <Author /> : <></>}
      </div>
    </div>
  );
}
