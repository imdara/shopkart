import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../app/nameSlice";
import { setProducts } from "../app/productsSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name.value);
  const token = useSelector((state) => state.token.value);
  const products = useSelector((state) => state.products.value);
  var { id } = useParams();
  var offset = id == 3 ? 8 * id : 6 * id;
  var limit = 12 * id;
  const getProducts = async () => {
    if (offset && limit) {
      var { data } = await axios.get(
        `http://localhost:4000/api/products?offset=${offset}&limit=${limit}`
      );
    } else var { data } = await axios.get("http://localhost:4000/api/products");
    dispatch(setProducts(data));
  };
  const getName = async () => {
    const { data } = await axios.get("http://localhost:4000/api/auth", {
      headers: { authorization: token },
    });
    dispatch(setName(data));
  };
  useEffect(() => {
    getProducts();
    getName();
  }, [products]);
  return (
    <>
      {name && (
        <h3 className="p-2 font-medium text-indigo-600 text-center">
          Welcome {name}
        </h3>
      )}
      <div
        id="home"
        className="m-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
      >
        {products.map((product, idx) => (
          <ProductCard product={product} key={idx + 1} />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default Home;
