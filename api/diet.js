
export default function handler(req, res) {
    // CORS implementation
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const data = req.body;
        const plan = generateDietPlan(data);
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Logic Function (Rule-Based AI Diet)
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
    // Note: In a real app we would adjust portion sizes here based on this multiplier
    let calorieMultiplier = 1;
    if (bmi > 25 && goal === 'fat loss') calorieMultiplier = 0.8; // Deficit
    if (bmi < 18.5 && goal === 'muscle gain') calorieMultiplier = 1.2; // Surplus

    const filterFood = (category) => {
        let foods = foodDatabase[category];

        // Filter by type (veg/non-veg)
        if (preference === 'veg') {
            foods = foods.filter(f => f.type === 'veg');
        }

        // Shuffle the array to get variety
        // Note: Math.random is not crypto-secure but fine for diet variety
        foods = foods.sort(() => 0.5 - Math.random());

        // Find best match for goal, fallback to 'any'
        const bestMatch = foods.find(f => f.goal === goal || f.goal === 'any');
        return bestMatch || foods[0];
    };

    const plan = {
        summary: `Diet plan for ${goal} (${preference}).`,
        meals: []
    };

    // Default to 3 meals if not specified
    const mealsCount = mealsPerDay ? parseInt(mealsPerDay) : 3;

    // Basic Structure
    plan.meals.push({ meal: "Breakfast", ...filterFood("breakfast") });
    plan.meals.push({ meal: "Lunch", ...filterFood("lunch") });

    if (mealsCount >= 4) {
        plan.meals.push({ meal: "Afternoon Snack", ...filterFood("snack") });
    }

    plan.meals.push({ meal: "Dinner", ...filterFood("dinner") });

    if (mealsCount >= 5) {
        plan.meals.push({ meal: "Evening Snack", ...filterFood("snack") });
    }

    return plan;
};
