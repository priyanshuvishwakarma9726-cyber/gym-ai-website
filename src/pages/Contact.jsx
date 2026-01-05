
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="app-shell" style={{ padding: '24px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Get in Touch</h1>
                <p style={{ marginBottom: '40px' }}>We're here to help you crush your fitness goals.</p>

                <div className="stack-gap">
                    <div className="card-premium">
                        <h3 style={{ marginBottom: '8px' }}>Chat Support</h3>
                        <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Instant AI answers or talk to a human.</p>
                        <button className="btn-ghost" style={{ border: '1px solid var(--primary)', color: 'white' }}>Start Live Chat</button>
                    </div>

                    <div className="card-premium">
                        <h3 style={{ marginBottom: '8px' }}>Visit Our Studio</h3>
                        <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Come train with us in person.</p>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '200px', background: '#222' }}>
                            <iframe
                                title="map"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0, opacity: 0.8 }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5927552591607!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1647849284242!5m2!1sen!2sin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="card-premium">
                        <h3 style={{ marginBottom: '8px' }}>Email Us</h3>
                        <a href="mailto:support@gymai.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>support@gymai.com</a>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default Contact;
