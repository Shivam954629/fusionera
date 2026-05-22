const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '918588892885';
const whatsappHref = rawPhone
  ? `https://wa.me/${rawPhone}?text=${encodeURIComponent('Hello FUSION THE ERA Team, I want more details about the show.')}`
  : 'https://www.whatsapp.com/';

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="whatsapp-float__icon"
      >
        <path
          fill="currentColor"
          d="M19.11 17.39c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06a6.85 6.85 0 0 1-2-1.23 7.64 7.64 0 0 1-1.4-1.75c-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.77-1.88-.2-.48-.4-.42-.57-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.85-.88 2.08s.9 2.42 1.02 2.58c.12.17 1.77 2.7 4.28 3.79.6.26 1.07.42 1.43.54.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z"
        />
        <path
          fill="currentColor"
          d="M16.03 5.33a10.62 10.62 0 0 0-9.08 16.13L5.5 26.67l5.35-1.4a10.63 10.63 0 1 0 5.18-19.94Zm0 19.35a8.73 8.73 0 0 1-4.45-1.22l-.32-.19-3.18.83.85-3.11-.21-.32a8.74 8.74 0 1 1 7.31 4.01Z"
        />
      </svg>
      <span className="whatsapp-float__label">WhatsApp</span>
    </a>
  );
}
