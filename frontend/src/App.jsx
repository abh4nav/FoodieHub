
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  UserRound,
  MapPin,
  ArrowRight,
  Star,
  Clock,
  Plus,
  Minus,
  Trash2,
  X,
  Menu,
} from "lucide-react";

import API from "./services/api";
import Auth from "./components/Auth";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/MyOrders";
import AdminDashboard from "./components/AdminDashboard";
import ManageFoods from "./components/ManageFoods";
import AddFood from "./components/AddFood";
import EditFood from "./components/EditFood";
import ManageOrders from "./components/ManageOrders";

const categories = [
  "All",
  "Pizza",
  "Burgers",
  "Indian",
  "Biryani",
  "Chinese",
  "Snacks",
  "Desserts",
  "Beverages",
];

const categoryImages = {
  Pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700",
  Burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700",
  Indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700",
  Biryani: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=700",
  Chinese: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700",
  Snacks: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700",
  Desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700",
  Beverages: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700",
};

function App() {
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [showManageFoods, setShowManageFoods] = useState(false);
  const [showAddFood, setShowAddFood] = useState(false);
  const [showEditFood, setShowEditFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showManageOrders, setShowManageOrders] = useState(false);
  const [refreshFoods, setRefreshFoods] = useState(0);
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await API.get("/foods");
        setFoods(response.data.foods);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch && food.isAvailable;
  });

  // Total quantity of items in cart
const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

// Calculate cart subtotal
const cartSubtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

// Add food to cart
const addToCart = (food) => {
  setCartItems((currentItems) => {
    const existingItem = currentItems.find(
      (item) => item._id === food._id
    );

    if (existingItem) {
      return currentItems.map((item) =>
        item._id === food._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...currentItems, { ...food, quantity: 1 }];
  });
};

// Increase item quantity
const increaseQuantity = (foodId) => {
  setCartItems((currentItems) =>
    currentItems.map((item) =>
      item._id === foodId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

// Decrease item quantity
const decreaseQuantity = (foodId) => {
  setCartItems((currentItems) =>
    currentItems
      .map((item) =>
        item._id === foodId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

// Remove item completely
const removeFromCart = (foodId) => {
  setCartItems((currentItems) =>
    currentItems.filter((item) => item._id !== foodId)
  );
};

  return (
    <>
      
    {completedOrder ? (
        <OrderSuccess
          order={completedOrder}
          onHome={() => setCompletedOrder(null)}
        />
      
) : user?.role === "admin" ? (
    showManageOrders ? (
      <ManageOrders
        onBack={() => setShowManageOrders(false)}
      />
    ) : showManageFoods ? (
    showAddFood ? (
      <AddFood
        onBack={() => setShowAddFood(false)}
        onFoodAdded={() => {
          setShowAddFood(false);
          setRefreshFoods((prev) => prev + 1);
        }}
      />
    ) : showEditFood ? (
      <EditFood
        food={selectedFood}
        onBack={() => setShowEditFood(false)}
        onFoodUpdated={() => {
          setShowEditFood(false);
          setSelectedFood(null);
          setRefreshFoods((prev) => prev + 1);
        }}
      />
    ) : (
      <ManageFoods
        onBack={() => setShowManageFoods(false)}
        onAddFood={() => setShowAddFood(true)}
        onEditFood={(food) => {
          setSelectedFood(food);
          setShowEditFood(true);
        }}
        refreshTrigger={refreshFoods}
      />
    )
  ) : (
    <AdminDashboard
      onLogout={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }}
      onManageFoods={() => setShowManageFoods(true)}
      onManageOrders={() => setShowManageOrders(true)}
    />
  )
) : showMyOrders ? (

      <MyOrders
        onBack={() => setShowMyOrders(false)}
      />
    ) : showAuth ? (
      <Auth
        onBack={() => setShowAuth(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setShowAuth(false);
        }}
      />
    ) : showCheckout ? (
      <Checkout
        cartItems={cartItems}
        cartSubtotal={cartSubtotal}
        onBack={() => {
          setShowCheckout(false);
          setIsCartOpen(true);
        }}
        onPlaceOrder={async (details) => {
          try {
            const orderData = {
              items: cartItems.map((item) => ({
                foodId: item._id,
                quantity: item.quantity,
              })),
              phone: details.phone,
              deliveryAddress: details.deliveryAddress,
            };

            const response = await API.post("/orders", orderData);

            setCompletedOrder(response.data.order);
            setCartItems([]);
            setShowCheckout(false);

          } catch (error) {
            alert(
              error.response?.data?.message || "Failed to place order"
            );
          }
        }}
      />
    ) : (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-900">
      

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <a href="#" className="text-2xl font-extrabold tracking-tight text-orange-600">
            Foodie<span className="text-gray-900">Hub.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="font-semibold text-orange-600">Home</a>
            <a href="#menu" className="text-gray-600 hover:text-orange-600">Menu</a>
            <a href="#categories" className="text-gray-600 hover:text-orange-600">Categories</a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsCartOpen(true)} className="relative rounded-full border border-gray-200 p-3 hover:bg-orange-50">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
  <div className="flex items-center gap-3">
    <span className="font-semibold text-gray-800">
      Welcome, {user.name}
    </span>

    <button
      onClick={() => setShowMyOrders(true)}
      className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-orange-50"
    >
      My Orders
    </button>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }}
      className="rounded-full border border-orange-600 px-4 py-2 font-semibold text-orange-600 hover:bg-orange-50"
    >
      Logout
        </button>
      </div>
    ) : (
  <button
    onClick={() => setShowAuth(true)}
    className="hidden items-center gap-2 rounded-full bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700 sm:flex"
  >
    <UserRound size={18} />
    Sign in
  </button>
)}

            <button className="rounded-lg p-2 md:hidden">
              <Menu size={23} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">

        <div>
          <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            Delicious food, delivered fresh
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Good Food.
            <br />
            <span className="text-orange-600">Great Mood.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Craving something delicious? Explore our menu and get your
            favourite food delivered right to your doorstep.
          </p>

          <div className="mt-8 flex max-w-xl items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-orange-100/50">
            <Search className="ml-3 text-gray-400" size={22} />

            <input
              type="text"
              placeholder="Search your favourite food..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                document.getElementById("menu")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="w-full bg-transparent px-4 py-3 outline-none"
            />

            <button
              onClick={() =>
                document.getElementById("menu")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Search
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Clock size={18} className="text-orange-600" />
              Freshly prepared
            </span>
            <span className="flex items-center gap-2">
              <Star size={18} className="text-orange-600" />
              Quality food
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-orange-600" />
              Fast delivery
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-5 rounded-full bg-orange-200 blur-3xl opacity-50" />

          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000"
            alt="Delicious food spread"
            className="relative h-[350px] w-full rounded-[2rem] object-cover shadow-2xl md:h-[470px]"
          />

          <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl">
            <p className="text-sm text-gray-500">Your next favourite meal</p>
            <p className="font-bold text-gray-900">Just a click away!</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-semibold text-orange-600">EXPLORE</p>
            <h2 className="mt-2 text-3xl font-bold">Browse Categories</h2>
          </div>
          <span className="hidden text-sm text-gray-500 sm:block">
            Find something you love
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-3 font-semibold transition ${
                selectedCategory === category
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* FOOD MENU */}
      <section id="menu" className="mx-auto max-w-7xl px-5 py-14">

        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-semibold text-orange-600">OUR MENU</p>
            <h2 className="mt-2 text-3xl font-bold">Popular Dishes</h2>
            <p className="mt-2 text-gray-500">
              Discover something delicious today.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-500">
            {filteredFoods.length} items
          </span>
        </div>

        {loading ? (
          <p className="py-16 text-center text-gray-500">
            Loading delicious food...
          </p>
        ) : filteredFoods.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            No food items found. Try another search.
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFoods.map((food) => (
              <div
                key={food._id}
                className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 shadow">
                    {food.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold">{food.name}</h3>
                    <span className="whitespace-nowrap font-bold text-orange-600">
                      ₹{food.price}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {food.description}
                  </p>

                  <button
                    onClick={() => addToCart(food)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 py-3 font-semibold text-orange-600 transition hover:bg-orange-600 hover:text-white"
                  >
                    <Plus size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-12 bg-gray-950 px-5 py-10 text-center text-white">
        <h2 className="text-2xl font-extrabold">
          Foodie<span className="text-orange-500">Hub.</span>
        </h2>
        <p className="mt-3 text-sm text-gray-400">
          Good Food. Great Mood. Made with love.
        </p>
        <p className="mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} FoodieHub. All rights reserved.
        </p>
      </footer>

      {/* Cart Overlay */}
{isCartOpen && (
  <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
    {/* Cart Panel */}
    <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl">

      {/* Cart Header */}
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          <p className="text-sm text-gray-500">
            {cartCount} items in your cart
          </p>
        </div>

        <button
          onClick={() => setIsCartOpen(false)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <X size={22} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-5">
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <ShoppingCart size={55} className="mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="mt-2 text-sm text-gray-500">
              Add some delicious food to get started!
            </p>

            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-5 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 border-b pb-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 font-semibold text-orange-600">
                    ₹{item.price}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="rounded-lg border p-1 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="rounded-lg border p-1 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <div className="border-t p-5">
          <div className="mb-4 flex justify-between text-lg font-bold">
            <span>Subtotal</span>
            <span>₹{cartSubtotal}</span>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);

              if (!user) {
                setShowAuth(true);
              } else {
                setShowCheckout(true);
              }
            }}
            className="w-full rounded-full bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </div>
     )}
  </>
  );
}

export default App;
