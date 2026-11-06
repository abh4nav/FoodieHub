
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import API from "../services/api";

export default function EditFood({ food, onBack, onFoodUpdated }) {
  const [formData, setFormData] = useState({
    name: food.name,
    slug: food.slug,
    description: food.description,
    price: food.price,
    category: food.category,
    image: food.image,
    isAvailable: food.isAvailable,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/foods/${food._id}`, {
        ...formData,
        price: Number(formData.price),
      });

      alert("Food item updated successfully!");
      onFoodUpdated();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to update food item."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] p-6 md:p-10">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Manage Foods
        </button>

        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          <h1 className="text-3xl font-extrabold">Edit Food</h1>

          <p className="text-gray-500 mt-2 mb-8">
            Update the details of {food.name}.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block font-semibold mb-2">Food Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="1"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option>Indian</option>
                <option>Pizza</option>
                <option>Burgers</option>
                <option>Biryani</option>
                <option>Chinese</option>
                <option>Snacks</option>
                <option>Desserts</option>
                <option>Beverages</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              />
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="h-4 w-4 accent-orange-500"
              />
              <span className="font-semibold">Food is available</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 disabled:opacity-60"
            >
              <Save size={18} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
