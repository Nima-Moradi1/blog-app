import Image from "next/image";

function Avatar({ src, width = 24, height = 24 } : {src : string , width?:number , height?: number
}) {
  return (
    <Image
      src={src || "/images/avatar.png"}
      width={width}
      height={height}
      
      className="rounded-full ring-1 ring-secondary-300 ml-2 aspect-square object-cover"
      alt={src || "avatar"}
    />
  );
}
export default Avatar;
