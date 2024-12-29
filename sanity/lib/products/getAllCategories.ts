import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
    const ALL_CATEGORIES_QUERY = defineQuery(`
    *[
        _type == "category"
    ] | order(name asc)
    
`);

try {
    //use sanityfetch from live.ts to send the query 
    const categories = await sanityFetch({
        query: ALL_CATEGORIES_QUERY,
    });

    //Return the list of products just like sql command 
    return categories.data || [];
} catch (error) {
    console.log("Error fetching products:", error);
    return [];
}

};