import Image from "next/image";
import Link from "next/link";
//since we passed all the properties of post with rest operator , we can only destructure the ones we need here
export default function CoverImage({ slug, coverImageUrl }:{slug : string , coverImageUrl : string}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
      <Link href={`/blogs/${slug}`}>
        <Image
        alt=""
          className="object-cover object-center hover:scale-110 transition-all ease-out duration-300"
          fill
          src={coverImageUrl}
        />
      </Link>
    </div>
  );
}
