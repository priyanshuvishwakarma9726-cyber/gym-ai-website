
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
        const plan = generateWorkoutPlan(data);
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Logic Function (Rule-Based AI)
const generateWorkoutPlan = (data) => {
    const { age, gender, weight, height, goal, experience } = data;
    let plan = {
        summary: `Personalized ${goal} plan for ${gender}, ${age} years old.`,
        schedule: []
    };

    const exercises = {
        cardio: ["Treadmill Run", "Cycling", "Jump Rope", "HIIT Circuits", "Rowing"],
        compound: ["Squats", "Deadlifts", "Bench Press", "Overhead Press", "Pull-ups"],
        isolation: ["Bicep Curls", "Tricep Extensions", "Lateral Raises", "Leg Extensions", "Hamstring Curls"],
        core: ["Planks", "Crunches", "Leg Raises", "Russian Twists"]
    };

    let intensity = "Moderate";
    let sets = 3;
    let reps = "10-12";

    // Rule Inference Engine
    if (goal === "strength") {
        intensity = "High";
        sets = 5;
        reps = "5-8";
    } else if (goal === "fat loss") {
        intensity = "High Intensity Interval";
        sets = 4;
        reps = "15-20";
    }

    if (experience === "beginner") {
        intensity = "Low-Moderate";
        sets = 3;
        reps = "8-10";
    }

    const dailyStructure = {
        "Monday": { focus: "Full Body / Push", type: "compound" },
        "Tuesday": { focus: "Cardio & Core", type: "cardio" },
        "Wednesday": { focus: "Legs & Lower Body", type: "compound" },
        "Thursday": { focus: "Active Recovery", type: "light" },
        "Friday": { focus: "Upper Body / Pull", type: "isolation" },
        "Saturday": { focus: "High Intensity / Functional", type: "mixed" },
        "Sunday": { focus: "Rest", type: "rest" }
    };

    for (const [day, details] of Object.entries(dailyStructure)) {
        let dayPlan = {
            day: day,
            focus: details.focus,
            exercises: []
        };

        if (details.type === "rest") {
            dayPlan.exercises.push({ name: "Full Rest", sets: 0, reps: 0 });
        } else if (details.type === "light") {
            dayPlan.exercises.push({ name: "Light Yoga / Stretching", sets: 1, reps: "30 mins" });
        } else {
            if (details.type === "compound" || details.type === "mixed") {
                dayPlan.exercises.push({ name: exercises.compound[Math.floor(Math.random() * exercises.compound.length)], sets, reps });
                dayPlan.exercises.push({ name: exercises.compound[Math.floor(Math.random() * exercises.compound.length)], sets, reps });
            }

            if (details.type === "isolation" || details.type === "mixed") {
                dayPlan.exercises.push({ name: exercises.isolation[Math.floor(Math.random() * exercises.isolation.length)], sets, reps });
                dayPlan.exercises.push({ name: exercises.isolation[Math.floor(Math.random() * exercises.isolation.length)], sets, reps });
            }

            if (details.type === "cardio" || goal === "fat loss") {
                dayPlan.exercises.push({ name: exercises.cardio[Math.floor(Math.random() * exercises.cardio.length)], sets: 1, reps: "20-30 mins" });
            }

            if (day !== "Saturday") {
                dayPlan.exercises.push({ name: exercises.core[Math.floor(Math.random() * exercises.core.length)], sets: 3, reps: "15" });
            }
        }

        plan.schedule.push(dayPlan);
    }

    return plan;
};
