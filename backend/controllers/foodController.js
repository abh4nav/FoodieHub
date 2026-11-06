const Food = require("../models/Food");

// Get all food items
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();

        res.status(200).json({
            success: true,
            count: foods.length,
            foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch food items"
        });
    }
};


// Add a new food item (Admin only)
const createFood = async (req, res) => {
    try {
        const { name, slug, description, price, category, image, isAvailable } = req.body;

        // Check required fields
        if (!name || !slug || !description || !price || !category || !image) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required food details."
            });
        }

        // Check whether food already exists
        const existingFood = await Food.findOne({ slug });

        if (existingFood) {
            return res.status(400).json({
                success: false,
                message: "Food item with this slug already exists."
            });
        }

        // Create food item
        const food = await Food.create({
            name,
            slug,
            description,
            price,
            category,
            image,
            isAvailable: isAvailable ?? true
        });

        res.status(201).json({
            success: true,
            message: "Food item added successfully!",
            food
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update an existing food item (Admin only)
const updateFood = async (req, res) => {
    try {
        const { name, slug, description, price, category, image, isAvailable } = req.body;

        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found."
            });
        }

        // Check if another food item already uses this slug
        if (slug && slug !== food.slug) {
            const existingFood = await Food.findOne({ slug });

            if (existingFood) {
                return res.status(400).json({
                    success: false,
                    message: "This slug is already being used."
                });
            }
        }

        // Update only the fields provided
        if (name !== undefined) food.name = name;
        if (slug !== undefined) food.slug = slug;
        if (description !== undefined) food.description = description;
        if (price !== undefined) food.price = price;
        if (category !== undefined) food.category = category;
        if (image !== undefined) food.image = image;
        if (isAvailable !== undefined) food.isAvailable = isAvailable;

        await food.save();

        res.status(200).json({
            success: true,
            message: "Food item updated successfully!",
            food
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete a food item (Admin only)
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found."
            });
        }

        await Food.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Food item deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





module.exports = { getFoods, createFood, updateFood, deleteFood };