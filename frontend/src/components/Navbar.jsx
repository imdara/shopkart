import axios from "axios";
import { Fragment } from "react";
import { Disclosure, Menu, Dialog, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../app/currentPageSlice";
import { showCart, hideCart } from "../app/openSlice";
import { setCartProducts } from "../app/cartProductsSlice";
import { setToken } from "../app/tokenSlice";
import { setName } from "../app/nameSlice";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name.value);
  const token = useSelector((state) => state.token.value);
  const open = useSelector((state) => state.open.value);
  const cartProducts = useSelector((state) => state.cartProducts.value);
  const cartProductPrices = cartProducts.map(
    (product) => product.price * product.quantity
  );
  const cartTotal = cartProductPrices.reduce((a, b) => a + b, 0);
  const navigation = [
    { name: "Home", path: "/", current: false },
    { name: "Dashboard", path: "/dashboard", current: false },
    { name: "My orders", path: "/my-orders", current: false },
  ];

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  const removeProductHandler = (name) =>
    cartProducts.filter((item) => item.name !== name);

  const initPayment = (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            "https://imdaras-shopkart.herokuapp.com/api/payments/verify",
            response,
            {
              headers: { authorization: token },
            }
          );
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const checkoutHandler = async () => {
    if (!name) {
      navigate("/login", { replace: true });
      dispatch(hideCart());
    } else {
      const { data } = await axios.post(
        "https://imdaras-shopkart.herokuapp.com/api/payments",
        {
          amount: cartTotal,
          products: cartProducts.map((product) => ({
            name: product.name,
            imgUrl: product.imageUrl,
            price: product.price,
            quantity: product.quantity,
          })),
        },
        {
          headers: { authorization: token },
        }
      );
      initPayment(data);
    }
  };

  const signoutHandler = () => {
    cookies.remove("token");
    dispatch(setToken(null));
    dispatch(setName(null));
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(hideCart())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => dispatch(hideCart())}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartProducts.map((product, idx) => (
                                <li key={idx + 1} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.imageUrl}
                                      alt="img not found"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.name}</h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            dispatch(
                                              setCartProducts(
                                                removeProductHandler(
                                                  product.name
                                                )
                                              )
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹ {cartTotal}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            onClick={checkoutHandler}
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className=" ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => dispatch(hideCart())}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Disclosure as="nav" className="bg-indigo-600" id="navBar">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-indigo-50 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center text-lg font-medium text-indigo-50">
                    Shopkart
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => dispatch(setCurrentPage(1))}
                          className={classNames(
                            item.current
                              ? "bg-indigo-900 text-white"
                              : "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button onClick={() => dispatch(showCart())}>
                    <ShoppingCartIcon className="w-8 h-8 text-white hover:text-slate-300" />
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-indigo-600 flex ">
                        <UserIcon className="w-8 h-8 text-white hover:text-slate-300" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {token ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                onClick={signoutHandler}
                                className={classNames(
                                  active ? "bg-indigo-100" : "",
                                  "block px-4 py-2 text-sm text-indigo-700"
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-indigo-100" : "",
                                  "block px-4 py-2 text-sm text-indigo-700"
                                )}
                              >
                                Sign in
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link to={item.path}>
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={() => dispatch(setCurrentPage(1))}
                      className={classNames(
                        item.current
                          ? "bg-indigo-900 text-white"
                          : "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
