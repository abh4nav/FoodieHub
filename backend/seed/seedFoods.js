
const mongoose = require("mongoose");
require("dotenv").config();

const Food = require("../models/Food");

const foods = [
  // PIZZA
  { name: "Margherita Pizza", slug: "margherita-pizza", description: "Classic pizza with mozzarella cheese and tomato sauce.", price: 199, category: "Pizza", image: "https://images.pexels.com/photos/18437684/pexels-photo-18437684.jpeg" },
  { name: "Farmhouse Pizza", slug: "farmhouse-pizza", description: "Loaded with onion, capsicum, tomato and mushrooms.", price: 299, category: "Pizza", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssIYBFCqa7zCpPQ1PilG8oWNzepEf2SnA7Uy1L31ZeQ&s=10" },
  { name: "Paneer Tikka Pizza", slug: "paneer-tikka-pizza", description: "Pizza topped with spicy paneer tikka and vegetables.", price: 279, category: "Pizza", image: "https://cdn.grofers.com/assets/search/usecase/banner/paneer_tikka_pizza_01.png" },
  { name: "Cheese Burst Pizza", slug: "cheese-burst-pizza", description: "Delicious pizza with a rich cheese-filled crust.", price: 349, category: "Pizza", image: "https://hirasweets.com/wp-content/uploads/2019/08/Dominos-Cheeseburst-Pizza-600x450-1-1.jpg" },
  { name: "Veg Supreme Pizza", slug: "veg-supreme-pizza", description: "Loaded with assorted vegetables and extra cheese.", price: 329, category: "Pizza", image: "https://www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven-720x480.png" },
  { name: "Double Cheese Pizza", slug: "double-cheese-pizza", description: "A cheesy delight with double mozzarella.", price: 249, category: "Pizza", image: "https://cdn.zepio.io/teaspirit/product/40bfb966-1952-4e45-afd4-fbc72d16008a.webp" },

  // BURGERS
  { name: "Classic Veg Burger", slug: "classic-veg-burger", description: "Crispy vegetable patty with fresh lettuce and sauce.", price: 99, category: "Burgers", image: "https://i.pinimg.com/736x/d0/f5/0c/d0f50c3996e0eb474f799e3069f0a1a7.jpg" },
  { name: "Cheese Burger", slug: "cheese-burger", description: "Veg burger with a melted cheese slice.", price: 129, category: "Burgers", image: "https://burgerrepublic.com/wp-content/uploads/2023/09/big-cheeseburger-600x400.jpeg" },
  { name: "Paneer Burger", slug: "paneer-burger", description: "Spiced paneer patty with creamy burger sauce.", price: 159, category: "Burgers", image: "https://img.magnific.com/free-photo/side-view-chicken-burger-with-sliced-tomato-lettuce-board_141793-4817.jpg" },
  { name: "Double Patty Burger", slug: "double-patty-burger", description: "Two crispy vegetable patties stacked together.", price: 179, category: "Burgers", image: "https://smashburger.com/cdn-cgi/image/format=auto,width=1920,quality=75/https://sbprod-web-assets.s3.us-west-2.amazonaws.com/double_beef_modifier_551e2da585.webp" },
  { name: "Peri Peri Burger", slug: "peri-peri-burger", description: "Spicy burger with peri peri seasoning.", price: 149, category: "Burgers", image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/5b76ca9f9b0a8355a9dd0f3f90badf09" },
  { name: "Maharaja Burger", slug: "maharaja-burger", description: "Large burger with a crispy patty and special sauce.", price: 199, category: "Burgers", image: "https://b.zmtcdn.com/data/pictures/chains/1/10571/845371d36755499388bcc7ee4d14e3a9.png?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp" },

  // INDIAN
  { name: "Paneer Butter Masala", slug: "paneer-butter-masala", description: "Paneer cubes in a rich buttery tomato gravy.", price: 249, category: "Indian", image: "https://st3.depositphotos.com/5653638/14982/i/450/depositphotos_149828604-stock-photo-paneer-butter-masala-or-cheese.jpg" },
  { name: "Dal Makhani", slug: "dal-makhani", description: "Slow-cooked black lentils in a creamy gravy.", price: 199, category: "Indian", image: "https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2015/01/dal-makhani-recipe-restaurant-style21.jpg" },
  { name: "Shahi Paneer", slug: "shahi-paneer", description: "Soft paneer in a rich cashew-based gravy.", price: 259, category: "Indian", image: "https://media.istockphoto.com/id/1665320059/photo/indian-paneer-butter-masala-directly-above-photo-on-white-background.jpg?s=612x612&w=0&k=20&c=j93V2k5YgeGYeVQCvsm-hTmC2vGJX1Rj32AmqxTnAzw=" },
  { name: "Chole Bhature", slug: "chole-bhature", description: "Spicy chickpea curry served with fluffy bhature.", price: 149, category: "Indian", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScllSjwJi-2NCx4T85694SyvTmnNeuz6H2nQi7x5dVGYWQJl5cSc9aV8k&s=10" },
  { name: "Kadai Paneer", slug: "kadai-paneer", description: "Paneer cooked with capsicum and kadai spices.", price: 239, category: "Indian", image: "https://t3.ftcdn.net/jpg/20/76/27/94/360_F_2076279484_ti3WLGjehSeFPqZkJW1F72tCuBYIYqpG.jpg" },
  { name: "Malai Kofta", slug: "malai-kofta", description: "Soft vegetable dumplings in creamy gravy.", price: 249, category: "Indian", image: "https://carveyourcraving.com/wp-content/uploads/2021/09/Best-Malai-Kofta-recipe-500x375.jpg" },
  { name: "Mix Veg", slug: "mix-veg", description: "Seasonal vegetables cooked with Indian spices.", price: 179, category: "Indian", image: "https://www.kanzabiryani.com/wp-content/uploads/2021/08/MIX-VEG-KADAI-600x400.jpg" },

  // BIRYANI
  { name: "Veg Biryani", slug: "veg-biryani", description: "Aromatic basmati rice cooked with vegetables and spices.", price: 179, category: "Biryani", image: "https://t4.ftcdn.net/jpg/05/70/58/65/360_F_570586537_TnIgWdCnaTYpgg9gsTyloz5bnvfCtdLl.jpg" },
  { name: "Paneer Biryani", slug: "paneer-biryani", description: "Fragrant rice layered with spiced paneer.", price: 219, category: "Biryani", image: "https://www.ranioil.com/wp-content/uploads/2022/01/panner-biriyani.png" },
  { name: "Hyderabadi Veg Biryani", slug: "hyderabadi-veg-biryani", description: "Traditional-style dum biryani with vegetables.", price: 199, category: "Biryani", image: "https://content.jdmagicbox.com/comp/def_content_category/biryani-blues/biryani-blues-453-l6ldk.jpg" },
  { name: "Mushroom Biryani", slug: "mushroom-biryani", description: "Basmati rice cooked with mushrooms and spices.", price: 209, category: "Biryani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0D9MDbjM23pcdQVxYMEILElEAfSBMidUrhJXnnLGfYuYGLyDVTvK-09Q&s=10" },
  { name: "Jeera Rice", slug: "jeera-rice", description: "Fluffy basmati rice tempered with cumin.", price: 119, category: "Biryani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZRwe3wBtPNiCk5dJLoXpi1hSKAhp6G-tEfWZqtCGR_Dx_-19psC8cugc&s=10" },
  { name: "Veg Pulao", slug: "veg-pulao", description: "Mildly spiced rice cooked with fresh vegetables.", price: 149, category: "Biryani", image: "https://stahlkitchens.com/cdn/shop/articles/vegpulao_step29_2ccec688-06dd-4e67-82ee-c02a0a96e03c_600x.jpg?v=1762858341" },

  // CHINESE
  { name: "Veg Hakka Noodles", slug: "veg-hakka-noodles", description: "Stir-fried noodles with crunchy vegetables.", price: 149, category: "Chinese", image: "https://thevillagedehradun.com/wp-content/uploads/2024/10/chicken-hakka-noodles-schezwan-szechwan-600nw-2081149771.webp" },
  { name: "Veg Fried Rice", slug: "veg-fried-rice", description: "Chinese-style fried rice with fresh vegetables.", price: 139, category: "Chinese", image: "https://i0.wp.com/flavoursonplate.com/wp-content/uploads/2019/05/veg-fried-rice.png?resize=600%2C400&ssl=1" },
  { name: "Chilli Paneer", slug: "chilli-paneer", description: "Crispy paneer tossed in spicy Chinese sauce.", price: 199, category: "Chinese", image: "https://i0.wp.com/spiceindiaonline.com/wp-content/uploads/2018/06/Chilli-Paneer-1.jpg?fit=600%2C400&ssl=1" },
  { name: "Veg Manchurian", slug: "veg-manchurian", description: "Vegetable balls tossed in tangy Manchurian sauce.", price: 169, category: "Chinese", image: "https://bfoodale.com/uploads/2022/01/Veg-Manchurian.webp" },
  { name: "Schezwan Noodles", slug: "schezwan-noodles", description: "Spicy noodles tossed in Schezwan sauce.", price: 159, category: "Chinese", image: "https://currynwok.com/wp-content/uploads/2023/09/schezwan-chicken-noodles-600x400.webp" },
  { name: "Spring Rolls", slug: "spring-rolls", description: "Crispy rolls stuffed with seasoned vegetables.", price: 129, category: "Chinese", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRScFtT61PTdOas487s6JfLNI7skHCyEnAbJVNLq42b9h5Dk6jaVmGlEHea&s=10" },

  // SNACKS
  { name: "French Fries", slug: "french-fries", description: "Golden and crispy salted potato fries.", price: 89, category: "Snacks", image: "https://irepo.primecp.com/2015/06/223354/Baked-Cheddar-Fries_Large600_ID-1029879.jpg?v=1029879" },
  { name: "Peri Peri Fries", slug: "peri-peri-fries", description: "Crispy fries tossed in peri peri seasoning.", price: 109, category: "Snacks", image: "https://dinetable.com/wp-content/uploads/2018/05/Peri-Peri-French-Fries-Recipe6.jpg" },
  { name: "Veg Momos", slug: "veg-momos", description: "Steamed dumplings filled with seasoned vegetables.", price: 99, category: "Snacks", image: "https://st3.depositphotos.com/1491432/16181/i/450/depositphotos_161818062-stock-photo-traditional-dumpling-momos-and-tomato.jpg" },
  { name: "Paneer Momos", slug: "paneer-momos", description: "Soft dumplings stuffed with spiced paneer.", price: 129, category: "Snacks", image: "https://cdn.zepio.io/teaspirit/product/8b64f87c-babf-4ecd-9f45-dd1833fa99da.webp" },
  { name: "Samosa", slug: "samosa", description: "Crispy pastry filled with spiced potatoes.", price: 25, category: "Snacks", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLL7LPacV5RC2WjRsX84jDz-HtRDoq-Yqgf7NI2RVKLrc-Gaf7P3Xj80&s=10" },
  { name: "Aloo Tikki", slug: "aloo-tikki", description: "Crispy potato patties served with chutney.", price: 69, category: "Snacks", image: "https://recipes.timesofindia.com/photo/62902260.cms" },
  { name: "Cheese Garlic Bread", slug: "cheese-garlic-bread", description: "Toasted garlic bread topped with melted cheese.", price: 139, category: "Snacks", image: "https://t4.ftcdn.net/jpg/03/19/22/35/360_F_319223572_ILWIWBuhaeyTzGPLQ0rJCVtBSGOqw864.jpg" },

  // DESSERTS
  { name: "Gulab Jamun", slug: "gulab-jamun", description: "Soft milk dumplings soaked in sugar syrup.", price: 69, category: "Desserts", image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" },
  { name: "Chocolate Brownie", slug: "chocolate-brownie", description: "Rich chocolate brownie with a fudgy centre.", price: 119, category: "Desserts", image: "https://funcakes.com/content/uploads/2020/03/Triple_Chocolate_Brownies-600x400.webp" },
  { name: "Chocolate Lava Cake", slug: "chocolate-lava-cake", description: "Warm chocolate cake with a molten centre.", price: 149, category: "Desserts", image: "https://irepo.primecp.com/2015/07/228384/Chocolate-Lava-Cakes_Large600_ID-1090748.jpg?v=1090748" },
  { name: "Rasgulla", slug: "rasgulla", description: "Soft cottage cheese balls in light sugar syrup.", price: 59, category: "Desserts", image: "https://cdn.create.vista.com/api/media/small/407763300/stock-photo-indian-sweet-rasgulla-also-know-rosogolla-roshogolla-rasagola-ras-gulla" },
  { name: "Ice Cream", slug: "ice-cream", description: "Creamy vanilla ice cream.", price: 79, category: "Desserts", image: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/54a09b2d-b52d-4972-8da0-575921c6ba43.jpg" },
  { name: "Kheer", slug: "kheer", description: "Traditional Indian rice pudding with cardamom.", price: 89, category: "Desserts", image: "https://st2.depositphotos.com/5653638/11440/i/450/depositphotos_114403718-stock-photo-sweet-kheer-or-khir-payasa.jpg" },

  // BEVERAGES
  { name: "Cold Coffee", slug: "cold-coffee", description: "Chilled coffee blended with milk and ice cream.", price: 119, category: "Beverages", image: "https://st2.depositphotos.com/1773130/10978/i/450/depositphotos_109781282-stock-photo-iced-coffee-with-milk-in.jpg" },
  { name: "Mango Shake", slug: "mango-shake", description: "Thick and refreshing mango milkshake.", price: 109, category: "Beverages", image: "https://www.sharmispassions.com/wp-content/uploads/2022/05/mango-milkshake-step7.jpg" },
  { name: "Masala Chai", slug: "masala-chai", description: "Indian tea brewed with aromatic spices.", price: 30, category: "Beverages", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbYTiygyyhqaiuDzojbkHM39Qeu4QU28vUPIWenYtDJcQ-Zt5WXGGSE_V&s=10" },
  { name: "Fresh Lime Soda", slug: "fresh-lime-soda", description: "Refreshing lime drink served chilled.", price: 69, category: "Beverages", image: "https://www.kanzabiryani.com/wp-content/uploads/2021/03/istockphoto-537228258-612x612-1-600x400.jpg" },
  { name: "Oreo Shake", slug: "oreo-shake", description: "Creamy milkshake blended with chocolate cookies.", price: 139, category: "Beverages", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyH6ZzsDNvxunAWTt4h-MaKv6psnp58Onmhxy4-dEYC-ewvfuzomzhnho&s=10" },
  { name: "Sweet Lassi", slug: "sweet-lassi", description: "Traditional chilled yogurt drink.", price: 79, category: "Beverages", image: "https://cdn.tasteatlas.com/images/ingredients/917cd26f4db3437da3a6acbb1c9f48d9.jpg?w=600" },
];

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding.");

    for (const food of foods) {
      await Food.findOneAndUpdate(
        { slug: food.slug },
        { $set: food },
        { upsert: true, new: true, runValidators: true }
      );
    }

    console.log(`${foods.length} food items seeded successfully.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedFoods();
