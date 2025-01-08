import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
// import Snowfall from "./Snowfall";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  // console.log(
  //   crypto.randomUUID().slice(0, 6) + `>>>> RErendered the home page cache with ${products.length} products and ${categories.length} categories`
  // )
  return (
    <div>
        <BlackFridayBanner />
        {/* redner all the components */}
        {/* <Snowfall /> */}
        
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
          <ProductsView products={products} categories={categories}/>
        </div>
    </div>
  );
}
