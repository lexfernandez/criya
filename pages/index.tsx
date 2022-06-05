import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteList from "../components/infinite-list";
import ProductFilter from "../components/product-filter.form";
import ProductItem from "../components/product-item";
import { Filter } from "../services/Filter";
import furnitureService from "../services/furnitures";

const Home: NextPage = () => {
  const [filter, setFilter] = useState<Filter>();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["products", filter],
      ({ pageParam, signal }) =>
        furnitureService.find({
          filter,
          page: pageParam,
          signal,
        }),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.length) return allPages.length + 1;
          return undefined;
        },
      }
    );

  const products = data?.pages.map((page) =>
    page.map((product) => <ProductItem key={product.id} product={product} />)
  );

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
        <ProductFilter onSubmit={setFilter}/>
        <div className="flex justify-center">
          <div className="w-6/12">
            <InfiniteList
              isLoading={isLoading}
              fetchMore={fetchNextPage}
              isFetchingMore={isFetchingNextPage}
              hasMoreData={hasNextPage!}
            >
              {products}
            </InfiniteList>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Home;
