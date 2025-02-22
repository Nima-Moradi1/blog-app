"use client";

import { toPersianDigits } from "@/_utils/NumberFormatter";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as SolidHearIcon,
  BookmarkIcon as SolideBookmarkIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import ButtonIcon from "@/_components/_ui/ButtonIcon";
import { usePathname, useRouter } from "next/navigation";
import { bookmarkPostAPi, likePostApi } from "@/_services/postServices";
// import { bookmarkPostApi, likePostApi } from "@/services/postService";

interface ErrorProps {
  response?: {
    data? : {
      message : string
    }
  }
}

const BlogInteraction = ({ post } : any) => {
  const router = useRouter();

  const likeHandler = async (postId : string) => {
    try {
      const { message } = await likePostApi(postId);
      router.refresh();
      toast.success(message);
    } catch (err:ErrorProps | any) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  const bookmarkHandler = async (postId : string) => {
    try {
      const { message } = await bookmarkPostAPi(postId);
      router.refresh();
      toast.success(message);
    } catch (err:ErrorProps | any) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="flex items-center gap-x-4">
      <ButtonIcon variant="secondary">
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(post.commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant="red" onClick={()=> likeHandler(post._id)}>
        {post.isLiked ? <SolidHearIcon /> : <HeartIcon />}
        <span>{toPersianDigits(post.likesCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant="primary" onClick={()=> bookmarkHandler(post._id)}>
        {post.isBookmarked ? <SolideBookmarkIcon /> : <BookmarkIcon />}
      </ButtonIcon>
    </div>
  );
};

export default BlogInteraction;
