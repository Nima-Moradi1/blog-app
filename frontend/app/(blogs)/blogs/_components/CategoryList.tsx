import Link from "next/link"

interface categoryProps {
    _id : string ,
    title : string ,
    slug : string 
}
//check every 24 hours if a new category was added
export const revalidate = 3600 ;
const CategoryList = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list` , {
        cache : 'force-cache'
    })
    //destructure the objects from the data response
    const {data : {categories}} = await response.json()
  return (
    <ul className="space-y-4">
        <Link href='/blogs'>همه</Link>
        {categories.map((category : categoryProps) => {
            return (
                <li key={category._id}>
                    <Link href={`/blogs/category/${category.slug}`}
                    >{category.title}</Link>
                </li>
            )
        })}
    </ul>
  )
}

export default CategoryList