import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProduct } from "../app/productSlice";
import { setMessage } from "../app/messageSlice";
import { show, hide } from "../app/showSlice";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, CheckIcon } from "@heroicons/react/outline";
import { PlusSmIcon, ShoppingBagIcon } from "@heroicons/react/solid";

const AddProduct = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const product = useSelector((state) => state.product.value);
  const showStatus = useSelector((state) => state.showStatus.value);
  const message = useSelector((state) => state.message.value);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/products",
        product,
        { headers: { authorization: token } }
      );
      dispatch(setMessage(data));
      dispatch(show());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Transition.Root show={showStatus} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(hide())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {message === "Product added successfully" ? (
                          <CheckIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <ExclamationIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Add Product
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => dispatch(hide())}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <ShoppingBagIcon className="mx-auto h-12 w-auto text-indigo-600" />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Add a new product to the database
            </h2>
          </div>
          <form onSubmit={submitHandler} className="h-[43vh] mt-8 space-y-6">
            <div className="shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Product name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Product name"
                  onChange={(e) =>
                    dispatch(setProduct({ ...product, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="price" className="sr-only">
                  Product Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="price"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Product price"
                  onChange={(e) =>
                    dispatch(setProduct({ ...product, price: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="image" className="sr-only">
                  Product Image Url
                </label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Product image url"
                  onChange={(e) =>
                    dispatch(
                      setProduct({ ...product, imageUrl: e.target.value })
                    )
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlusSmIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
