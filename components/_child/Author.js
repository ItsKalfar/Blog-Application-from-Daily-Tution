import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
export default function Author() {
  return (
    <div className="author flex py-5">
      <Image
        src={"/images/author/author1.jpg"}
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="flex flex-col justify-center px-4">
        <Link href={"/"}>
          <a className="text-md font-bold text-gray-800 ">Andrew Potter</a>
        </Link>
        <span className="text-sm text-gray-500">CEO and Founder</span>
      </div>
    </div>
  );
}
