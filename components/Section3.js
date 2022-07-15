import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/author";
import Spinner from "./_child/Spinner";
import Error from "./_child/error";
import fetcher from "../lib/fetcher";

export default function section3() {
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
  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      {/* swiper */}
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <Post data={value}  />
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, author, description } = data;
  return (
    <div className="grid">
      <div className="images">
        <Link href={"/"}>
          <a>
            <Image alt="image" src={img || "/"} width={600} height={400} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col p-4">
        <div className="cat">
          <Link href={"/"}>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </a>
          </Link>
          <Link href={"/"}>
            <a className="text-gray-800 hover:text-gray-600">- July 3, 2022</a>
          </Link>
        </div>
        <div className="title">
          <Link href={"/"}>
            <a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Title"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{description.substring(0, 250)}</p>
        {author ? <Author /> : <></>}
      </div>
    </div>
  );
}
