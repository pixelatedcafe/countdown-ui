

'use client'

import { useState } from 'react'


export default function ContactUsPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((s) => ({ ...s, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Dummy submit: simulate a network request and show a success message
        setStatus('Sending...')
        setTimeout(() => {
            setStatus('Thank you! This is a dummy contact page — no message was sent.')
            setForm({ name: '', email: '', message: '' })
        }, 800)
    }

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Contact Us</h1>
            <p style={styles.lead}>
                Have a question or feedback? Fill out the form below.
            </p>

            <form onSubmit={handleSubmit} style={styles.form} aria-label="Contact form">
                <label style={styles.label}>
                    Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Message
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message..."
                        rows="6"
                        style={{ ...styles.input, height: 120, resize: 'vertical' }}
                    />
                </label>

                <div style={styles.row}>
                    <button type="submit" style={styles.button}>Send Message</button>
                    <div aria-live="polite" style={styles.status}>{status}</div>
                </div>
            </form>
        </main>
    )
}

const styles = {
    container: {
        maxWidth: 700,
        margin: '48px auto',
        padding: '0 20px',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        color: '#111'
    },
    title: { margin: '0 0 8px', fontSize: 28 },
    lead: { margin: '0 0 24px', color: '#555' },
    form: { display: 'grid', gap: 12 },
    label: { display: 'flex', flexDirection: 'column', fontSize: 14, color: '#222' },
    input: {
        marginTop: 6,
        padding: '10px 12px',
        fontSize: 14,
        borderRadius: 6,
        border: '1px solid #d0d0d0',
        outline: 'none',
        boxSizing: 'border-box'
    },
    row: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 },
    button: {
        padding: '10px 16px',
        background: '#0366d6',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer'
    },
    status: { fontSize: 14, color: '#333' }
}