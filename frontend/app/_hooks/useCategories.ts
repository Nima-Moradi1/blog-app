import { getCategoriesApi } from "@/_services/categoryService";
import { useQuery } from "@tanstack/react-query";

interface CategoriesProps {
    title : string ,
    _id : string ,
    englishTitle? : string ,
    slug? : string,
    description? : string ,
    
}

export function useCategories() {
   const {data , isLoading} = useQuery({
        queryKey:['categories'],
        queryFn:getCategoriesApi
    })
    const { categories: rawCategories = [] } = data || { categories: [] };

    const categories = rawCategories.map((item: CategoriesProps)=> (
        {
            label : item.title,
            value : item._id
        }
    ))
    return {categories , isLoading} 
}
