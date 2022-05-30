import axios from "axios";
import Order from "./Order";
import { setOrders } from "../app/ordersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const MyOrders = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const orders = useSelector((state) => state.orders.value);
  const getOrders = async () => {
    const { data } = await axios.get("http://localhost:4000/api/orders/all", {
      headers: { authorization: token },
    });
    dispatch(setOrders(data));
  };
  useEffect(() => {
    getOrders();
  }, [orders]);
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      {orders.length === 0 && (
        <p className="font-medium text-indigo-600 text-center">
          No orders placed so far
        </p>
      )}
      {orders.map((order, i) => (
        <Order order={order} key={i + 1} />
      ))}
    </div>
  );
};

export default MyOrders;
