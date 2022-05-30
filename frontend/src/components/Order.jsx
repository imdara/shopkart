const Order = ({ order }) => {
  const { _id, products, orderPlacedBy, orderTotal, createdAt } = order;
  return (
    <>
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
          Order id: {_id}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600">
          Ordered on {createdAt.substr(0, 10)} {createdAt.substr(11, 5)} (GMT
          24H)
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Order Details
            </p>
            <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                {products.map((product, i) => (
                  <div key={i + 1}>
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-24 h-24 hidden md:block"
                        src={product.imgUrl}
                        alt="img not found"
                      />
                      <img
                        className="w-24 h-24 md:hidden"
                        src={product.imgUrl}
                        alt="img not found"
                      />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        Price: ₹{product.price}
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                        Total: ₹{product.price * product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">
                    ₹{orderTotal}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">₹200</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  ₹{orderTotal + 200}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div class="w-8 h-8">
                    <img
                      class="w-full h-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 font-semibold text-gray-800">
                      DPD Delivery
                      <br />
                      <span className="font-normal">
                        Delivery within 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 text-gray-800">
                  ₹600
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
            <p className="mt-2 text-center lg:text-left text-sm leading-5 text-gray-800">
              {orderPlacedBy}
            </p>
          </div>
          <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
              <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                  Shipping Address
                </p>
                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                  123 Main Street, WA, USA
                </p>
              </div>
              <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                  Billing Address
                </p>
                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                  123 Main Street, WA, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
