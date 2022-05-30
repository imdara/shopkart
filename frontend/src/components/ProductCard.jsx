import { useDispatch, useSelector } from "react-redux";
import { setCartProducts } from "../app/cartProductsSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const quantity = 1;
  const cartProducts = useSelector((state) => state.cartProducts.value);
  if (product) {
    var { imageUrl, name, rating, ratingCount, price } = product;
    var starsArray = [];
    for (let i = 0; i < Math.round(rating); i++) {
      starsArray.push(
        <svg
          class="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
  }

  const addToCartHandler = () => {
    const productExist = cartProducts.find((product) => product.name === name);
    if (!productExist) {
      dispatch(
        setCartProducts([...cartProducts, { imageUrl, name, price, quantity }])
      );
    } else {
      const newQuantity = productExist.quantity + 1;
      const newCartProducts = cartProducts.filter(
        (product) => product.name !== name
      );
      dispatch(
        setCartProducts([
          ...newCartProducts,
          { imageUrl, name, price, quantity: newQuantity },
        ])
      );
    }
  };

  return (
    <>
      {product && (
        <div class="max-w-2xl mx-auto">
          <div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-lg p-8" src={imageUrl} alt="product" />
            <div class="px-5 pb-5">
              <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                {name}
              </h3>
              <div class="flex items-center mt-2.5 mb-5">
                {starsArray}
                <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-800 ml-3">
                  {rating}
                </span>
                <span class="text-indigo-600">{ratingCount} reviews</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹ {price}
                </span>
                <button
                  class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
