import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setStatistics } from "../app/statisticsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const statistics = useSelector((state) => state.statistics.value);
  const getStatistics = async () => {
    const { data } = await axios.get(
      "https://imdaras-shopkart.herokuapp.com/api/statistics",
      {
        headers: { authorization: token },
      }
    );
    data === "You dont have access to this"
      ? dispatch(setStatistics(null))
      : dispatch(setStatistics(data));
  };

  useEffect(() => {
    getStatistics();
  }, [statistics]);
  return (
    <section class="text-gray-600 body-font">
      {statistics ? (
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              ADMIN DASHBOARD
            </h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Site Statistics
            </h1>
          </div>
          <div class="flex flex-wrap">
            <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                No. of users signed up
              </h2>
              <p class="text-indigo-500 inline-flex items-center">
                {statistics.users}
              </p>
            </div>
            <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                No. of orders placed
              </h2>
              <p class="text-indigo-500 inline-flex items-center">
                {statistics.orders}
              </p>
            </div>
            <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Total revenue generated
              </h2>
              <p class="text-indigo-500 inline-flex items-center">
                ₹{statistics.revenue}
              </p>
            </div>
            <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                No. of products
              </h2>
              <p class="text-indigo-500 inline-flex items-center">
                {statistics.products}
              </p>
            </div>
          </div>
          <div class="flex flex-row">
            <Link
              to="/all-orders"
              class="mb-8 flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              All Orders
            </Link>
            <Link
              to="/add-product"
              class="mb-8 flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Add Product
            </Link>
          </div>
        </div>
      ) : (
        <div class="h-[67vh] text-center w-full mb-20">
          <h2 class="mt-2 text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            ADMIN DASHBOARD
          </h2>
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            You dont have access to this page
          </h1>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
