
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const SUBSCRIPTION_PLANS = [
    { id: 'monthly', name: 'Monthly Membership', price: 500, description: 'Billed every month' },
    { id: 'yearly', name: 'Yearly Membership', price: 5400, description: 'Billed annually (Save ~10%)' }
];

const Pricing = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (plan) => {
        if (!user) {
            alert('Please login to subscribe.');
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order on Backend
            const res = await fetch('http://localhost:5000/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: plan.price })
            });
            const order = await res.json();

            // 2. Open Razorpay
            const options = {
                key: "rzp_test_1DP5mmOlF5G5ag", // Test Key
                amount: order.amount,
                currency: "INR",
                name: "Gym AI",
                description: plan.name,
                order_id: order.id,
                handler: async function (response) {
                    // 3. Verify Payment
                    const verifyRes = await fetch('http://localhost:5000/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response)
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.status === 'success') {
                        // 4. Save to Supabase
                        const { error } = await supabase.from('payments').insert([{
                            user_id: user.id,
                            order_id: response.razorpay_order_id,
                            payment_id: response.razorpay_payment_id,
                            amount: plan.price,
                            status: 'success'
                        }]);

                        if (error) {
                            console.error('Supabase Save Error:', error);
                            alert('Payment successful but failed to save record. Contact support.');
                        } else {
                            alert('Membership Activated successfully!');
                        }
                    } else {
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    name: "Gym User",
                    email: user.email,
                    contact: "9999999999"
                },
                theme: {
                    color: "#fca311"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
            });

            // If it's a mock order, skipping Rzp open might be needed or handling differently, 
            // but for now we try to open it. If key is invalid it will show error in modal.
            rzp.open();

        } catch (error) {
            console.error(error);
            alert('Failed to initiate payment.');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Membership Plans</h1>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {SUBSCRIPTION_PLANS.map(plan => (
                    <div key={plan.id} className="glass-panel" style={{ padding: '2rem', width: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--primary)' }}>{plan.name}</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{plan.price}</div>
                        <p style={{ color: '#ccc' }}>{plan.description}</p>
                        <ul style={{ listStyle: 'none', textAlign: 'left', padding: '1rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>✓ AI Workout Planner</li>
                            <li style={{ marginBottom: '0.5rem' }}>✓ Diet Recommendations</li>
                            <li style={{ marginBottom: '0.5rem' }}>✓ Progress Tracking</li>
                            <li style={{ marginBottom: '0.5rem' }}>✓ Premium Support</li>
                        </ul>
                        <button
                            className="btn-primary"
                            onClick={() => handlePayment(plan)}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Subscribe Now'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
