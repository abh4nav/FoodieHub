
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import API from "../services/api";

export default function ManageFoods({ onBack,  onAddFood, onEditFood, refreshTrigger }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
const handleDelete = async (foodId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this food item?"
  );

  if (!confirmed) return;

  try {
    await API.delete(`/foods/${foodId}`);

    setFoods((currentFoods) =>
      currentFoods.filter((food) => food._id !== foodId)
    );

    alert("Food item deleted successfully!");
  } catch (error) {
    alert(
      error.response?.data?.message || "Failed to delete food item."
    );
  }
};


  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await API.get("/foods");
        setFoods(response.data.foods);
      } catch (err) {
        setError("Failed to load food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [refreshTrigger]);

  return (
    <div className="min-h-screen bg-[#FFFBF7] p-8">
      <div className="mx-auto max-w-7xl">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Manage Foods</h1>
            <p className="text-gray-500 mt-2">
              View and manage your restaurant menu.
            </p>
          </div>

          <button onClick={onAddFood} className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-white font-semibold">
            <Plus size={18} />
            Add Food
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading food items...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-gray-500 mb-5">
              Total food items: {foods.length}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foods.map((food) => (
                <div
                  key={food._id}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-5">
                    <p className="text-sm text-orange-600 font-semibold">
                      {food.category}
                    </p>

                    <h3 className="text-lg font-bold mt-1">
                      {food.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {food.description}
                    </p>

                    
                <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold">
                    ₹{food.price}
                </span>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    food.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                    {food.isAvailable ? "Available" : "Unavailable"}
                </span>
                </div>

                
                <div className="flex gap-3 mt-4">
                <button
                    onClick={() => onEditFood(food)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-orange-500 py-2 font-semibold text-orange-600 hover:bg-orange-50"
                >
                    <Pencil size={16} />
                    Edit
                </button>

                <button
                    onClick={() => handleDelete(food._id)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-500 py-2 font-semibold text-red-600 hover:bg-red-50"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
                </div>


                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
