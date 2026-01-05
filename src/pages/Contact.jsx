
import React from 'react';

const Contact = () => {
    return (
        <div style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Contact Us</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                {/* Contact Info */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Get in Touch</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <h4 style={{ marginBottom: '0.5rem' }}>Address</h4>
                            <p style={{ color: '#ccc' }}>123 Fitness Street, Muscle City, GYM 400001</p>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.5rem' }}>Phone</h4>
                            <p style={{ color: '#ccc' }}>+91 99999 99999</p>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.5rem' }}>Email</h4>
                            <p style={{ color: '#ccc' }}>support@gymai.com</p>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.5rem' }}>Hours</h4>
                            <p style={{ color: '#ccc' }}>Mon - Sat: 5:00 AM - 11:00 PM</p>
                            <p style={{ color: '#ccc' }}>Sun: 6:00 AM - 8:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="glass-panel" style={{ padding: '1rem', height: '400px' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.966033481486!2d77.0266383150821!3d28.42826248249875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sCyber%20Hub!5e0!3m2!1sen!2sin!4v1625292723321!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: '8px' }}
                        allowFullScreen=""
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
