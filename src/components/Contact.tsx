import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, MessageSquare, Clock, Globe, Linkedin, Github } from 'lucide-react';

export const Contact: React.FC = () => {
  const { contact, personal } = portfolioData;

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botField: '' // Honeypot spam filter
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Checks to hide placeholders
  const isEmailValid = contact.email && contact.email !== 'ADD_EMAIL_HERE';
  const isPhoneValid = contact.phone && contact.phone !== 'ADD_PHONE_HERE';
  const isWhatsappValid = contact.whatsapp && contact.whatsapp !== 'ADD_WHATSAPP_HERE';

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check
    if (formData.botField) {
      console.warn('Bot submission detected.');
      setStatus('success');
      setStatusMessage('Message sent successfully! (Spam Filtered)');
      setFormData({ name: '', email: '', message: '', botField: '' });
      return;
    }

    if (!validate()) return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: JSON.stringify({
          service_id: 'service_zyj2u4t',
          template_id: 'template_kddmjhc',
          user_id: 'Ub3AD5i_uifc8eRU2',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '', botField: '' });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send message via EmailJS.');
      }
    } catch (error: any) {
      console.error('Contact Form error:', error);
      setStatus('error');
      setStatusMessage('Oops! There was a problem sending your message. Please contact me directly at kavin.rajendran1210@gmail.com.');
    }
  };

  return (
    <section id="contact" className="section bg-background py-20 select-none md:select-text">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Contact Me" subtitle="Get in Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-stretch">
          
          {/* Left Column: Contact Indicators & Info (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-6">
              {/* Availability details card */}
              <div className="glass-card rounded-xl p-6 flex flex-col gap-4 border border-border bg-surface/15 select-none">
                <h3 className="card-heading-custom text-text-primary mb-1">
                  Availability Details
                </h3>

                {/* Timezone */}
                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="p-2 bg-surface rounded-lg text-accent">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider opacity-60">Timezone</p>
                    <p className="text-sm font-semibold">{contact.timezone}</p>
                  </div>
                </div>

                {/* Response Rate */}
                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="p-2 bg-surface rounded-lg text-accent-secondary">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider opacity-60">Response Rate</p>
                    <p className="text-sm font-semibold">{contact.responseTime}</p>
                  </div>
                </div>
              </div>

              {/* Direct Actions Container */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono tracking-widest text-text-secondary uppercase select-none">
                  Direct Channels
                </span>

                {/* Mail button (if valid) */}
                {isEmailValid && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-accent text-text-secondary hover:text-accent transition-all duration-300 shadow-sm bg-surface/10 group"
                  >
                    <div className="p-2 bg-surface rounded-lg text-text-secondary group-hover:text-accent transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-wider opacity-60">Email</p>
                      <p className="text-sm font-medium">{contact.email}</p>
                    </div>
                  </a>
                )}

                {/* Phone button (if valid) */}
                {isPhoneValid && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-accent text-text-secondary hover:text-accent transition-all duration-300 shadow-sm bg-surface/10 group"
                  >
                    <div className="p-2 bg-surface rounded-lg text-text-secondary group-hover:text-accent transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-wider opacity-60">Phone</p>
                      <p className="text-sm font-medium">{contact.phone}</p>
                    </div>
                  </a>
                )}

                {/* Whatsapp button (if valid) */}
                {isWhatsappValid && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-accent text-text-secondary hover:text-accent transition-all duration-300 shadow-sm bg-surface/10 group"
                  >
                    <div className="p-2 bg-surface rounded-lg text-text-secondary group-hover:text-accent transition-colors">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-wider opacity-60">WhatsApp</p>
                      <p className="text-sm font-medium">Message on WhatsApp</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Social profiles */}
            <div className="flex items-center gap-3 select-none">
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent px-4 py-2.5 border border-border rounded-xl bg-surface/40 hover:bg-surface transition-all duration-300 shadow-sm"
                title="Kavin Rajendran's LinkedIn"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent px-4 py-2.5 border border-border rounded-xl bg-surface/40 hover:bg-surface transition-all duration-300 shadow-sm"
                title="Kavin Rajendran's GitHub"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-xl p-6 md:p-8 border border-border bg-surface/10 h-full">
              <h3 className="card-heading-custom text-text-primary mb-6 select-none">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Honeypot Spam Filter */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                {/* Name Field (Floating Label) */}
                <div className="relative z-0 w-full mb-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    disabled={status === 'loading'}
                    className={`block w-full bg-transparent border-b border-border/80 px-1 py-3 text-sm text-text-primary focus:outline-none transition-all duration-300 peer ${
                      errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-border/80 focus:border-accent'
                    }`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-xs text-text-secondary duration-300 transform -translate-y-4.5 scale-75 top-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4.5 peer-focus:text-accent peer-focus:font-semibold pointer-events-none"
                  >
                    Name
                  </label>
                  {errors.name && <span className="absolute left-0 top-[102%] text-[10px] text-red-500 font-mono select-none">{errors.name}</span>}
                </div>

                {/* Email Field (Floating Label) */}
                <div className="relative z-0 w-full mb-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    disabled={status === 'loading'}
                    className={`block w-full bg-transparent border-b border-border/80 px-1 py-3 text-sm text-text-primary focus:outline-none transition-all duration-300 peer ${
                      errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-border/80 focus:border-accent'
                    }`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-xs text-text-secondary duration-300 transform -translate-y-4.5 scale-75 top-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4.5 peer-focus:text-accent peer-focus:font-semibold pointer-events-none"
                  >
                    Email
                  </label>
                  {errors.email && <span className="absolute left-0 top-[102%] text-[10px] text-red-500 font-mono select-none">{errors.email}</span>}
                </div>

                {/* Message Field (Floating Label) */}
                <div className="relative z-0 w-full mb-1">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder=" "
                    rows={4}
                    disabled={status === 'loading'}
                    className={`block w-full bg-transparent border-b border-border/80 px-1 py-3 text-sm text-text-primary focus:outline-none transition-all duration-300 resize-none peer ${
                      errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-border/80 focus:border-accent'
                    }`}
                  />
                  <label
                    htmlFor="message"
                    className="absolute text-xs text-text-secondary duration-300 transform -translate-y-4.5 scale-75 top-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4.5 peer-focus:text-accent peer-focus:font-semibold pointer-events-none"
                  >
                    Message
                  </label>
                  {errors.message && <span className="absolute left-0 top-[102%] text-[10px] text-red-500 font-mono select-none">{errors.message}</span>}
                </div>

                {/* Submit button with 3D press effect */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileTap={{ y: 2, scale: 0.98 }}
                  className="btn btn-filled bg-text-primary text-background hover:bg-transparent hover:text-text-primary border border-text-primary font-mono text-xs font-bold py-3.5 px-6 rounded-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4 select-none"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </motion.button>

                {/* Feedback live alerts */}
                {statusMessage && (
                  <div
                    aria-live="polite"
                    className={`p-3 rounded-lg text-xs font-mono select-all ${
                      status === 'success'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/15'
                        : 'bg-red-500/10 text-red-500 border border-red-500/15'
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
