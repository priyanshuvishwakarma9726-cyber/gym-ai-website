
export default function handler(req, res) {
    // CORS headers for Vercel
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { goal, experience, time, equipment } = req.body;
        const plan = generateSmartPlan(goal, experience, time, equipment);
        res.status(200).json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Rule-based Logic Engine
function generateSmartPlan(goal, experience, time, equipment) {
    let intensity = "Moderate";
    let sets = 3;
    let strategy = "Balanced";

    // Logic Mapping
    if (goal.includes('Fat')) {
        intensity = "High (HIIT Focus)";
        sets = 4;
        strategy = "Metabolic Conditioning";
    } else if (goal.includes('Muscle')) {
        intensity = "Hypertrophy";
        sets = 4;
        strategy = "Progressive Overload";
    } else if (goal.includes('Strength')) {
        intensity = "Maximum Effort";
        sets = 5;
        strategy = "Heavy Compounds";
    }

    // Adjust for Equipment
    const isHome = equipment.includes('Home') || equipment.includes('Bodyweight');
    const isBodyweight = equipment.includes('Bodyweight');

    // Experience Tweak
    if (experience === 'Beginner') {
        strategy = `Foundational ${strategy}`;
        sets = 3;
    }

    // Time Tweak
    const timeVal = parseInt(time) || 45;
    if (timeVal <= 30) {
        strategy = `Express ${strategy}`;
    }

    // Schedule Generation
    const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
    const schedule = {};

    // Pattern: Push/Pull/Legs or Bodypart Split based on experience
    if (experience === 'Beginner' || timeVal <= 30) {
        // Full Body Split
        schedule["Day 1"] = { focus: "Full Body A", exercises: getEx("Full", isHome) };
        schedule["Day 2"] = { focus: "Active Recovery", exercises: ["Walk", "Stretch"] };
        schedule["Day 3"] = { focus: "Full Body B", exercises: getEx("Full", isHome) };
        schedule["Day 4"] = { focus: "Rest", exercises: ["Sleep"] };
        schedule["Day 5"] = { focus: "Full Body C", exercises: getEx("Full", isHome) };
        schedule["Day 6"] = { focus: "Mobility", exercises: ["Yoga"] };
        schedule["Day 7"] = { focus: "Rest", exercises: ["Sleep"] };
    } else {
        // PPL
        schedule["Day 1"] = { focus: "Push (Chest/Shoulders/Tri)", exercises: getEx("Push", isHome) };
        schedule["Day 2"] = { focus: "Pull (Back/Bi)", exercises: getEx("Pull", isHome) };
        schedule["Day 3"] = { focus: "Legs & Core", exercises: getEx("Legs", isHome) };
        schedule["Day 4"] = { focus: "Rest", exercises: ["Rest"] };
        schedule["Day 5"] = { focus: "Upper Body", exercises: getEx("Push", isHome) };
        schedule["Day 6"] = { focus: "Lower Body", exercises: getEx("Legs", isHome) };
        schedule["Day 7"] = { focus: "Rest", exercises: ["Rest"] };
    }

    return {
        overview: {
            strategy: strategy,
            intensity: intensity,
            equipmentAccess: equipment,
        },
        timeline: {
            visibleResults: "21 Days",
            programDuration: "8 Weeks",
            frequency: experience === 'Beginner' ? "3 Days/Week" : "5 Days/Week"
        },
        motivation: "Excuses don't burn calories.",
        schedule: schedule
    };
}

function getEx(type, isHome) {
    // Simplified exercise fetcher for demo
    if (type === 'Push') return isHome ? ["Push-ups", "Pike Push-ups", "Dips"] : ["Bench Press", "Overhead Press", "Incline DB Press"];
    if (type === 'Pull') return isHome ? ["Pull-ups", "Inverted Row", "Superman"] : ["Deadlift", "Lat Pulldown", "Cable Row"];
    if (type === 'Legs') return isHome ? ["Squats", "Bulgarian Split Squat", "Lunges"] : ["Squat", "Leg Press", "RDL"];
    return ["Burpees", "Squats", "Push-ups", "Plank"];
}
