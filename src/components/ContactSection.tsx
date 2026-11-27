import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import {
  CONTACT_CONFIG,
  INQUIRY_TYPES,
  PROFILE_CONFIG,
  SOCIAL_LINKS,
  type InquiryType,
  type SocialLink,
} from '../data/portfolioData';
import {
  validateContactForm,
  type ContactFormValues,
} from '../utils/portfolioLogic';

function SocialIcon({ id }: { id: SocialLink['id'] }) {
  switch (id) {
    case 'github':
      return <Github className="w-4 h-4" aria-hidden="true" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4" aria-hidden="true" />;
    case 'upwork':
      return <Briefcase className="w-4 h-4" aria-hidden="true" />;
  }
}

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    inquiryType: INQUIRY_TYPES[0],
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [submittedInquiry, setSubmittedInquiry] =
    useState<ContactFormValues | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CONFIG.email);
    } catch {
      // Fallback copy for restricted iframe clipboard permissions
      const input = document.createElement('textarea');
      input.value = PROFILE_CONFIG.email;
      input.setAttribute('readonly', '');
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  const handleFieldChange = <K extends keyof ContactFormValues>(
    field: K,
    nextValue: ContactFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContactForm(values);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setSubmittedInquiry({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setValues({
      name: '',
      email: '',
      inquiryType: INQUIRY_TYPES[0],
      message: '',
    });
    setErrors({});
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/90"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400">
            04. Contact &amp; Resume
          </p>
          <h2
            id="contact-heading"
            className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            Let&apos;s build something dependable
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column: Audience invitations, Copy Email, Resume, Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {CONTACT_CONFIG.recruiterTitle}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {CONTACT_CONFIG.recruiterBody}
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800">
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {CONTACT_CONFIG.clientTitle}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {CONTACT_CONFIG.clientBody}
                </p>
              </div>
            </div>

            {/* Direct Email Copy + Resume Download */}
            <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span className="text-emerald-700 dark:text-emerald-400">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={PROFILE_CONFIG.resumeUrl}
                  download={PROFILE_CONFIG.resumeFileName}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 text-xs sm:text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <a
                  href={`mailto:${PROFILE_CONFIG.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{PROFILE_CONFIG.email}</span>
                </a>
                <span aria-live="polite" className="text-emerald-700 dark:text-emerald-400">
                  {copied ? 'Email copied to clipboard' : ''}
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Elsewhere
              </p>
              <ul className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-800/80 border-t border-zinc-100 dark:border-zinc-800/80">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                    >
                      <span className="inline-flex items-center gap-2.5 font-medium">
                        <span className="text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          <SocialIcon id={link.id} />
                        </span>
                        <span>{link.label}</span>
                      </span>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        {link.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Minimalist interactive contact form */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-6 sm:p-7">
            <AnimatePresence mode="wait">
              {submittedInquiry ? (
                <motion.div
                  key="success"
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
                  }
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.22 }}
                  role="status"
                  aria-live="polite"
                  className="py-8 space-y-5"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                    <Check className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                      Inquiry received — thank you, {submittedInquiry.name}.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      Your <span className="font-medium text-zinc-900 dark:text-zinc-200">{submittedInquiry.inquiryType}</span> note has been validated and prepared. I typically reply to <span className="font-mono text-xs">{submittedInquiry.email}</span> within one business day.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                    <a
                      href={`mailto:${PROFILE_CONFIG.email}?subject=${encodeURIComponent(
                        `${submittedInquiry.inquiryType} — ${submittedInquiry.name}`
                      )}&body=${encodeURIComponent(submittedInquiry.message)}`}
                      className="text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      Open in default mail client
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }
                  }
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* Segmented Inquiry Type selector */}
                  <div>
                    <span
                      id="inquiry-type-label"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Inquiry Type
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby="inquiry-type-label"
                      className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70"
                    >
                      {INQUIRY_TYPES.map((type: InquiryType) => {
                        const isSelected = values.inquiryType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => handleFieldChange('inquiryType', type)}
                            className={`relative px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                              isSelected
                                ? 'text-zinc-950 dark:text-zinc-50'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                            }`}
                          >
                            {isSelected && (
                              <motion.span
                                layoutId="inquiryTypePill"
                                transition={
                                  prefersReducedMotion
                                    ? { duration: 0.05 }
                                    : { type: 'spring', stiffness: 450, damping: 34 }
                                }
                                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-xs"
                              />
                            )}
                            <span className="relative z-10">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? 'contact-name-error' : undefined
                        }
                        placeholder="Jordan Rivera"
                        className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm bg-transparent text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors ${
                          errors.name
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-600 dark:focus:border-emerald-400'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'contact-email-error' : undefined
                        }
                        placeholder="jordan@company.com"
                        className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm bg-transparent text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors ${
                          errors.email
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-600 dark:focus:border-emerald-400'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Project or Role Details
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? 'contact-message-error' : undefined
                      }
                      placeholder="Share your timeline, stack, or workflow bottleneck..."
                      className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm bg-transparent text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors resize-y ${
                        errors.message
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-600 dark:focus:border-emerald-400'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Direct reply within 24 hours · No automated spam.
                    </p>
                    <motion.button
                      type="submit"
                      whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Send Inquiry</span>
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
