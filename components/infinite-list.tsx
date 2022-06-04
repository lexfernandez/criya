import { PropsWithChildren, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = PropsWithChildren<{
  isLoading?: boolean;
  fetchMore(): void;
  isFetchingMore: boolean;
  hasMoreData: boolean;
}>;

const InfiniteList = ({
  children,
  isLoading,
  fetchMore,
  isFetchingMore,
  hasMoreData
}: Props) => {
  const { ref, inView } = useInView();

  useEffect(()=>{
    if(inView && hasMoreData) {
      fetchMore()
    }
  },[inView])

  if (isLoading) return <div className="text-center">Retrieving data</div>;

  if (!children) return <div className="text-center">Not data found</div>;

  return (
    <div className="flex flex-col justify-center">
      {children}
      {hasMoreData && <div className="h-5 bg-outer-space" ref={ref}  data-testid="anchor">{isFetchingMore ? "fetching more" : null}</div>}
      {!hasMoreData && <div className="bg-pale-silver text-center p-5">You just browsed through all our results!</div>}
    </div>
  );
};

export default InfiniteList;
