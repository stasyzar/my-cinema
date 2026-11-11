const HALLS_DATA = [
  {
    id: 'imax',
    number: '01',
    title: 'IMAX Laser',
    badge: 'Найбільший екран',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    description: 'Флагманський зал для найочікуваніших блокбастерів. Максимальне занурення завдяки подвійній 4K лазерній проекції та унікальній геометрії залу.',
    specs: [
      { label: 'Екран', value: '22 × 12 метрів' },
      { label: 'Звук', value: '12-канальний IMAX Sound' },
      { label: 'Кількість місць', value: '320 крісел' },
      { label: 'Формати', value: 'IMAX 2D, IMAX 3D' },
    ],
  },
  {
    id: 'dolby',
    number: '02',
    title: 'Dolby Atmos',
    badge: 'Звук 360°',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    description: 'Ідеальний вибір для динамічних екшнів та пригодницьких стрічок. Звукові обʼєкти переміщуються у тривимірному просторі, включно зі стелею.',
    specs: [
      { label: 'Екран', value: '16 × 9 метрів RealD' },
      { label: 'Звук', value: 'Dolby Atmos (64 динаміки)' },
      { label: 'Кількість місць', value: '240 крісел' },
      { label: 'Формати', value: 'RealD 3D, 2D Digital' },
    ],
  },
  {
    id: 'vip',
    number: '03',
    title: 'VIP Lounge',
    badge: 'Преміум комфорт',
    image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&auto=format&fit=crop&q=80',
    description: 'Камерний зал підвищеного комфорту. Крісла трансформуються в напівлежаче положення одним натисканням кнопки, біля кожного місця є столик.',
    specs: [
      { label: 'Екран', value: '12 × 7 метрів Laser' },
      { label: 'Звук', value: 'Dolby Surround 7.1' },
      { label: 'Кількість місць', value: '48 диванів-реклайнерів' },
      { label: 'Сервіс', value: 'Кнопка виклику офіціанта' },
    ],
  },
];

function HallCard({ number, title, badge, image, description, specs }) {
  return (
    <article className="hall-card">
      <div className="hall-card-image-wrap">
        <img src={image} alt={title} className="hall-card-img" loading="lazy" />
        <span className="hall-badge">{badge}</span>
      </div>

      <div className="hall-card-content">
        <div className="hall-card-header">
          <span className="hall-number">Зал {number}</span>
          <h3 className="hall-title">{title}</h3>
        </div>

        <p className="hall-description">{description}</p>

        <div className="hall-specs-grid">
          {specs.map((item) => (
            <div key={item.label} className="hall-spec-item">
              <span className="spec-label">{item.label}</span>
              <strong className="spec-value">{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function HallsList() {
  return (
    <section className="halls-section">
      <div className="section-title-wrap">
        <span className="section-tag">ТЕХНОЛОГІЇ ТА КОМФОРТ</span>
        <h2>Наші кінозали</h2>
        <p>Кожен зал спроєктований так, щоб забезпечити бездоганну якість зображення з будь-якого ряду</p>
      </div>

      <div className="halls-cards-list">
        {HALLS_DATA.map((hall) => (
          <HallCard key={hall.id} {...hall} />
        ))}
      </div>
    </section>
  );
}