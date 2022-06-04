import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteList from "../components/infinite-list";
import ProductItem from "../components/product-item";
import furnitureService from "../services/furnitures";

const Home: NextPage<{ onClick(): void }> = ({ onClick }) => {
  const [name, setName] = useState<string | undefined>();
  const [inStock, setInStock] = useState<boolean | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const {data,isLoading, isFetchingNextPage, fetchNextPage,hasNextPage } =useInfiniteQuery(["products",name,inStock,minPrice,maxPrice], ({pageParam, signal }) =>
    furnitureService.find({ filter: { name,inStock,minPrice,maxPrice },page:pageParam, signal }),
   {
    getNextPageParam: (lastPage,allPages)=>{
      console.log({lastPage})
      if(lastPage.length) return allPages.length+1;
      return undefined;
    }
   }
  );

  const products = data?.pages.map(page=>page.map(product=><ProductItem key={product.id} product={product} />))

  return (
    <div>
      <Head>
        <title>Alex @ Criya</title>
        <meta
          name="description"
          content="Home Assignment to enter criya engineering team!"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <InfiniteList isLoading={isLoading} fetchMore={fetchNextPage} isFetchingMore={isFetchingNextPage} hasMoreData={hasNextPage!}>
          {products}
        </InfiniteList>
      </main>
    </div>
  );
};

export default Home;
