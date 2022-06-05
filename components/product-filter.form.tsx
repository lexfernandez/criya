import { useFormik } from "formik";
import { useState } from "react";
import { Filter } from "../services/Filter";
import CurrencyInput from "react-currency-input-field";
type Props = {
  onSubmit(values: Filter): void;
};

const ProductFilter = ({ onSubmit }: Props) => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const formik = useFormik<Filter>({
    initialValues: {
      name: undefined,
      inStock: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    },
    onSubmit:(values)=>onSubmit(values),
  });
  return (
    <div className="bg-cultured h-50">
      <form onSubmit={formik.handleSubmit}>
        <div className="md:flex md:flex-nowrap w-full md:justify-center">
          <div className="p-2">
            <label htmlFor="name">
              <span className="hidden md:visible">Name:</span>
              <input
                type="search"
                id="name"
                name="name"
                data-testId="name"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                placeholder="search by name"
                className=" mt-0 block w-full md:w-80 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              />
            </label>
          </div>
          {!showAdvanceOptions && (
            <a
              data-testid="showAdvanceFilter"
              onClick={() => setShowAdvanceOptions(true)}
              className="p-2"
            >
              Show advance filters
            </a>
          )}
          <div
            className={
              showAdvanceOptions ? "md:flex md:flex-nowrap " : "hidden"
            }
          >
            <div className="p-2 flex flex-nowrap items-center">
              <input
                id="inStock"
                name="inStock"
                data-testId="inStock"
                type="checkbox"
                checked={formik.values.inStock!}
                className="
                text-outer-space
                focus:ring-2 focus:ring-outer-space
                "
                onChange={() =>
                  formik.setFieldValue("inStock", !formik.values.inStock)
                }
              />
              <label htmlFor="inStock" className="whitespace-nowrap pl-2">
                In Stock Only
              </label>
            </div>
            <div className="p-2 md:w-100 flex flex-nowrap">
              <label className="hidden lg:block pr-2">Price</label>
              <div data-testid="priceRange" className="flex flex-nowrap">
                <CurrencyInput
                  id="minPrice"
                  name="minPrice"
                  data-testId="minPrice"
                  prefix="$"
                  allowNegativeValue={false}
                  defaultValue={formik.values.minPrice}
                  decimalsLimit={2}
                  onValueChange={(value) =>
                    formik.setFieldValue("minPrice", value)
                  }
                  className="text-right w-5/12 mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                />
                <span className="w-1/12 text-center">-</span>
                <CurrencyInput
                  id="maxPrice"
                  name="maxPrice"
                  data-testid="maxPrice"
                  prefix="$"
                  allowNegativeValue={false}
                  defaultValue={formik.values.minPrice}
                  decimalsLimit={2}
                  onValueChange={(value) =>
                    formik.setFieldValue("maxPrice", value)
                  }
                  className=" text-right w-5/12 mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                />
              </div>
            </div>
            <a
              data-testid="hideAdvanceFilter"
              onClick={() => setShowAdvanceOptions(false)}
              className="whitespace-nowrap p-2"
            >
              Hide filters
            </a>
          </div>
          <div className="p-2  md:hidden">
            <button
              data-testid="submit"
              className="form-input w-full bg-outer-space text-white"
              type="submit"
            >
              Filter{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
