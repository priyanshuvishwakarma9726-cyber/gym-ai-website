
const foodDatabase = {
    breakfast: [
        { name: "Oatmeal with Blueberries & Almonds", type: "veg", goal: "any", calories: 350, protein: "12g" },
        { name: "Scrambled Eggs (3) with Spinach", type: "non-veg", goal: "muscle gain", calories: 400, protein: "25g" },
        { name: "Greek Yogurt Parfait", type: "veg", goal: "fat loss", calories: 250, protein: "15g" },
        { name: "Protein Pancakes", type: "veg", goal: "muscle gain", calories: 500, protein: "30g" },
        { name: "Omelette with Cheese", type: "non-veg", goal: "any", calories: 350, protein: "20g" }
    ],
    lunch: [
        { name: "Grilled Chicken Salad with Quinoa", type: "non-veg", goal: "fat loss", calories: 450, protein: "40g" },
        { name: "Lentil Soup (Dal) with Brown Rice", type: "veg", goal: "any", calories: 400, protein: "18g" },
        { name: "Paneer Tikka Masala with Roti", type: "veg", goal: "muscle gain", calories: 600, protein: "25g" },
        { name: "Turkey Wrap with Avocado", type: "non-veg", goal: "any", calories: 500, protein: "35g" },
        { name: "Chickpea Buddha Bowl", type: "veg", goal: "fat loss", calories: 350, protein: "15g" }
    ],
    snack: [
        { name: "Apple & Peanut Butter", type: "veg", goal: "any", calories: 200, protein: "5g" },
        { name: "Whey Protein Shake", type: "veg", goal: "muscle gain", calories: 120, protein: "24g" },
        { name: "Hard Boiled Eggs (2)", type: "non-veg", goal: "fat loss", calories: 140, protein: "12g" },
        { name: "Almonds & Walnuts (Handful)", type: "veg", goal: "any", calories: 180, protein: "6g" }
    ],
    dinner: [
        { name: "Baked Salmon with Asparagus", type: "non-veg", goal: "muscle gain", calories: 500, protein: "45g" },
        { name: "Stir-fry Tofu with Mixed Veggies", type: "veg", goal: "fat loss", calories: 300, protein: "20g" },
        { name: "Chicken Breast with Sweet Potato", type: "non-veg", goal: "any", calories: 450, protein: "40g" },
        { name: "Vegetable Curry using Coconut Milk", type: "veg", goal: "any", calories: 400, protein: "10g" }
    ]
};

const generateDietPlan = (data) => {
    const { goal, bmi, preference, mealsPerDay } = data;

    // BMI Analysis to adjust calories (simple multiplier logic)
    let calorieMultiplier = 1;
    if (bmi > 25 && goal === 'fat loss') calorieMultiplier = 0.8; // Deficit
    if (bmi < 18.5 && goal === 'muscle gain') calorieMultiplier = 1.2; // Surplus

    const filterFood = (category) => {
        let foods = foodDatabase[category];

        // Filter by type (veg/non-veg)
        // If preference is veg, remove non-veg. If non-veg, keep all (or prioritize non-veg? usually mixed is fine)
        if (preference === 'veg') {
            foods = foods.filter(f => f.type === 'veg');
        }

        // Filter by goal (prioritize specific goal matches, fallback to 'any')
        // Shuffle the array to get variety
        foods = foods.sort(() => 0.5 - Math.random());

        // Find best match
        const bestMatch = foods.find(f => f.goal === goal || f.goal === 'any');
        return bestMatch || foods[0];
    };

    const plan = {
        summary: `Diet plan for ${goal} (${preference}).`,
        meals: []
    };

    if (!mealsPerDay) mealsPerDay = 3;

    // Basic Structure
    plan.meals.push({ meal: "Breakfast", ...filterFood("breakfast") });
    plan.meals.push({ meal: "Lunch", ...filterFood("lunch") });

    if (mealsPerDay >= 4) {
        plan.meals.push({ meal: "Afternoon Snack", ...filterFood("snack") });
    }

    plan.meals.push({ meal: "Dinner", ...filterFood("dinner") });

    if (mealsPerDay >= 5) {
        plan.meals.push({ meal: "Evening Snack", ...filterFood("snack") }); // Reuse snack logic or added pre-sleep logic
    }

    return plan;
};

module.exports = { generateDietPlan };
