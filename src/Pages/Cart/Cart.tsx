import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import {
  FaPlus,
  FaMinus,
  FaTrashAlt,
  FaShoppingCart,
  FaCreditCard,
} from "react-icons/fa";


function Cart() {
  const { cartItems, IncreaseQuantity, DecreaseQuantity, DeleteItems } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden my-10 p-8">
      {/* العنوان */}
      <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 mb-8 border-b pb-4 gap-3">
        <FaShoppingCart className="text-blue-600" size={28} />
        Shopping Cart
      </h1>

      {/* لو السلة فاضية */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-600">
          <div className="bg-gray-100 p-6 rounded-full shadow-inner mb-6">
            <FaShoppingCart className="text-blue-500" size={60} />
          </div>
          <h2 className="text-3xl font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet. Start shopping now!
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all transform hover:-translate-y-0.5"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* جدول المنتجات */}
          <div className="overflow-y-auto max-h-[450px] border rounded-2xl">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="text-gray-700 text-sm uppercase">
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold text-center">Price</th>
                  <th className="py-3 px-4 font-semibold text-center">
                    Quantity
                  </th>
                  <th className="py-3 px-4 font-semibold text-center">Total</th>
                  <th className="py-3 px-4 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
                  >
                    {/* الصورة */}
                    <td className="py-3 px-4">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.thumbnail || item.image}
                          alt={item.title}
                          className="object-contain h-full w-full"
                        />
                      </div>
                    </td>

                    {/* العنوان */}
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {item.title}
                    </td>

                    {/* السعر */}
                    <td className="py-3 px-4 text-center text-blue-600 font-semibold">
                      ${item.price}
                    </td>

                    {/* الكمية */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => DecreaseQuantity(item.id)}
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="font-semibold text-gray-800">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => IncreaseQuantity(item.id)}
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </td>

                    {/* الإجمالي */}
                    <td className="py-3 px-4 text-center font-semibold text-gray-700">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </td>

                    {/* حذف */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => DeleteItems(item.id)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* المجموع الكلي */}
          <div className="flex justify-between items-center mt-8 px-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-blue-600">${total.toFixed(2)}</span>
            </h2>

            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all transform hover:-translate-y-0.5">
              <FaCreditCard />
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
