import Icon from '../common/Icon';

const CONTACTS_DATA = [
  {
    icon: 'pin',
    title: 'Наша адреса',
    value: 'м. Київ, вул. Хрещатик, 24',
    sub: 'ТРЦ «Cinema City», 4-й поверх',
  },
  {
    icon: 'clock',
    title: 'Графік роботи',
    value: 'Щодня: 10:00 – 23:00',
    sub: 'Каси зачиняються за 15 хв до останнього сеансу',
  },
  {
    icon: 'ticket',
    title: 'Телефони кас',
    value: '+380 (44) 123-45-67',
    href: 'tel:+380441234567',
    sub: '+380 (67) 890-12-34 (безкоштовно)',
    subHref: 'tel:+380678901234',
  },
  {
    icon: 'brand',
    title: 'Служба підтримки',
    value: 'support@mycinema.ua',
    href: 'mailto:support@mycinema.ua',
    sub: 'Відповідаємо протягом 30 хвилин',
  },
];

function ContactCardItem({ icon, title, value, href, sub, subHref }) {
  return (
    <div className="contact-card">
      <div className="contact-card-icon">
        <Icon name={icon} size={24} />
      </div>
      <h3>{title}</h3>
      <p>{href ? <a href={href}>{value}</a> : value}</p>
      <span className="contact-card-sub">
        {subHref ? <a href={subHref}>{sub}</a> : sub}
      </span>
    </div>
  );
}

export default function ContactCards() {
  return (
    <div className="contacts-cards-grid">
      {CONTACTS_DATA.map((item) => (
        <ContactCardItem key={item.title} {...item} />
      ))}
    </div>
  );
}