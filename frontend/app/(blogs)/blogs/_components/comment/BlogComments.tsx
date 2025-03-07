'use client'

import React from 'react'
import Comment from './Comment'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Button from '@/_components/_ui/Button'
import Modal from '@/_components/_ui/Modal'
import CommentForm from './CommentForm'
import classNames from 'classnames'
import { useAuth } from '@/_context/AuthContext'
import { useRouter } from 'next/navigation'

interface CommentProps {
    comments : 
   [ {
        title : string
        _id : string , 
        post : string
        content : {
            text : string
        } , 
        status : number , 
        openToComment : boolean , 
        createdAt : string ,
        updatedAt : string, 
        answers : [
            {
                _id : string , 
                content : {
                    text : string
                } , 
                status : number , 
                createdAt : string , 
                updatedAt : string
            }
        ]
    } , ]
    _id : string ,
   
}

const PostComments = ({post} : {post : CommentProps}) => {
  const router = useRouter()
    const [isOpen, setOpen] = React.useState(false);
    const [parent,setParent] = React.useState(null)
    const {comments , _id : postId} = post
    const {user} = useAuth()
const addNewCommentHandler = (parent : any) => {
  //? if there's no user, they should login first before commenting
  if(!user) {
    router.push('/signin')
    return ;
  }
    setParent(parent)
    setOpen(true)
}

    return (
        <div className="mb-10">
          <div className="flex flex-col items-center lg:flex-row justify-between gap-y-3 mb-8">
            <h2 className="text-2xl font-bold text-secondary-800">نظرات</h2>
            <Button
              onClick={()=>addNewCommentHandler(null)}
              variant="outline"
              className="flex items-center py-2"
            >
              <QuestionMarkCircleIcon className="w-4 ml-2" />
              <span>ثبت نظر جدید</span>
            </Button>
            <Modal
              title={parent ? "پاسخ به نظر" : "نظر جدید"}
              description={parent ? parent.user.name : "نظر خود را وارد کنید"}
              open={isOpen}
              onClose={() => setOpen(false)}
            >
              <CommentForm
                postId={postId}
                parentId={parent ? parent._id : null}
                onClose={() => setOpen(false)}
              />
            </Modal>
          </div>
          <div className="space-y-8 post-comments bg-secondary-0 rounded-xl py-6 px-3 lg:px-6 ">
            {comments.length > 0 ? (
              comments?.map((comment : any) => {
                return (
                  <div key={comment._id}>
                    <div className="border border-secondary-200 rounded-xl p-2 sm:p-4 mb-3">
                      <Comment
                        comment={comment}
                        onAddComment={() => addNewCommentHandler(comment)}
                      />
                    </div>
                    {/* section for the answers of comments */}
                    <div className="post-comments__answer mr-2 sm:mr-8 space-y-3">
                      {comment.answers.map((item:any, index:any) => {
                        return (
                          <div key={item._id} className="relative">
                            <div
                              className={classNames(
                                "answer-item border border-secondary-100 bg-secondary-50/80 rounded-xl p-2 sm:p-4",
                                {
                                  "last-item": index + 1 === comment.answers.length,
                                }
                              )}
                            >
                              <Comment comment={item} key={item._id} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
            )}
          </div>
        </div>
      );
}

export default PostComments