import Author from "../../components/_child/Author";
import Image from "next/image";
import Ralated from "../../components/_child/ralated";
import getPost from "../../lib/helper";
import fetcher from "../../lib/fetcher";
import Spinner from "../../components/_child/Spinner";
import Error from "../../components/_child/error";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

export default function Page({ fallback }) {
  const router = useRouter();
  const { postId } = router.query;

  const { data, isLoading, isError } = fetcher(`api/posts/${postId}`);

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
    <SWRConfig value={{ fallback }}>
      <Article {...data} />;
    </SWRConfig>
  );
}

export function Article({ title, img, subtitle, description, author }) {
  return (
    <>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">{author ? <Author /> : <></>}</div>

        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {title || "title"}
          </h1>

          <p className="text-gray-500 text-xl text-center">{subtitle}</p>

          <div className="py-10">
            <Image alt='image' src={img || "/"} width={900} height={600}></Image>
          </div>

          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <p>{description}</p>
            <p>{description}</p>
            <p>{description}</p>
            <p>{description}</p>
          </div>
        </div>

        <Ralated></Ralated>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const posts = await getPost(params.postId);

  return {
    props: {
      fallback: {
        "api/posts": posts,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPost();

  const paths = posts.map((value) => {
    return {
      params: {
        postId: value.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
