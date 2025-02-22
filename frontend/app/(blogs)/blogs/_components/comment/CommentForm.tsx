"use client";

import Loading from "@/_components/_ui/Loading";
import SubmitButton from "@/_components/_ui/SubmitButton";
import TextArea from "@/_components/_ui/TextArea";
import { createComment } from "@/_lib/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const initialState = {
  error: "",
  message: "",
};

const CommentForm = ({ postId, parentId, onClose } :{postId:string , parentId : string , onClose : ()=> void}) => {
  //?We actually don't need this because we're handling it with action Servers, but just because we wanted to use our Reusable TextArea component, we need to use it.
  const [text, setText] = useState("");
  //? useActionState is useFormState in React.19 (they changed the name!)
  const [state, formAction] = useActionState(createComment, initialState);
  const ref = useRef<HTMLFormElement>(null);
  let isLoading = false;

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form
            ref={ref}
            className="space-y-7"
            action={ (formData) => {
               formAction({ formData, postId, parentId });
              ref?.current?.reset();
            }}
          >
            <TextArea
            //? The name is for server action which we logged to see "text"
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-8">
              {isLoading ? (
                <div>
                  <Loading />
                </div>
              ) : (
                <SubmitButton className="w-full">
                  {parentId ? "ثبت پاسخ" : "ثبت نظر"}
                </SubmitButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CommentForm;
