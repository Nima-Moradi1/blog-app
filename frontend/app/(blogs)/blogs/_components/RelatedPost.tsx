import Author from "./Author"
import CoverImage from "./CoverImage"

interface ItemProps {
    _id : string,
    title : string,
    author : {
        name : string,
        avatar : string
    }
}

const RelatedPost = ({posts}: {posts : ItemProps[]}) => {
  return (
    <div className="mb-10">
        <p className="text-xl mb-4">پست های مرتبط</p>
            <div className="grid gap-6 grid-cols-6">
                {posts?.map((item : any)=> {
                    return (
                        <div key={item._id} className="col-span-6 md:col-span-3 lg:col-span-2">
                            <CoverImage {...item} />
                            <div className="flex items-center justify-between">
                                <Author {...item.author} />
                                <p className="text-xs">{item.title}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
    </div>
  )
}

export default RelatedPost