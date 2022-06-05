import { GetStaticPathsContext, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import furnitureService from "../../services/furnitures";

const FurnitureView = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery(
    ["product", id],
    ({ signal }) => furnitureService.findById({ id: id as string, signal }),
    {
      enabled: !!id,
    }
  );

  if(isLoading) return <div className="bg-outer-space text-white p-5 w-full h-full text-center">Loading details</div>

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
          <div className="mb-5"><Link href='/furnitures' ><a className="bg-outer-space text-white p-5 rounded-sm md:fixed">{'< GO BACK'}</a></Link></div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {data?.images[0]?.url && (
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={data?.images[0]?.url}
            />
          )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
            by{data?.vendors.map(vendor=><span key={vendor} className="pl-2 font-semibold">{vendor}</span>)}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data?.name}
            </h1>
   
            <p className="leading-relaxed">
              {data?.description}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              {data?.colors && (
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <div className="flex-nowrap space-x-2">
                    {data?.colors?.map((color) => (
                      <button
                        key={color}
                        className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <span>{data?.size}</span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                $ {data?.unitCost.toFixed(2)}
              </span>
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                Button
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureView;
