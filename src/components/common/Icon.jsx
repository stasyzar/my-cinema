export default function Icon({ name, size = 18 }) {
    const paths = {
        brand: <><path d="M4 7h16v11H4z" /><path d="M8 7V4m8 3V4M4 11h16" /><circle cx="8" cy="4" r="2" /><circle cx="16" cy="4" r="2" /></>,
        search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
        chevron: <path d="m8 10 4 4 4-4" />,
        user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.7-4.2 3.4-6 8-6s7.3 1.8 8 6" /></>,
        ticket: <><path d="M3 8a2 2 0 0 0 0 4v5h18v-5a2 2 0 0 0 0-4V3H3z" /><path d="M13 7h4m-4 4h4m-4 4h4" /></>,
        clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
        star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
        play: <path d="m9 7 8 5-8 5z" />,
        close: <path d="m6 6 12 12M18 6 6 18" />,
        menu: <path d="M4 7h16M4 12h16M4 17h16" />,
        arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
        pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
        calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    }
    return <svg className={`icon icon-${name}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}