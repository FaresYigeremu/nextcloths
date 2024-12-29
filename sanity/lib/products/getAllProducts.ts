import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY = defineQuery(`
    *[
        _type == "product"
    ] | order(name asc) `
);

try {
    //use sanityfetch from live.ts to send the query 
    const products = await sanityFetch({
        query: ALL_PRODUCTS_QUERY,
    });

    //Return the list of products just like sql command 
    return products.data || [];
} catch (error) {
    console.log("Error fetching products:", error);
    return [];
}


}
