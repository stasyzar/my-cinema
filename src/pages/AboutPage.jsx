import HallsList from '../components/about/HallsList';
import GalleryGrid from '../components/about/GalleryGrid';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'; 

const STATS_DATA = [
  { value: '3', label: 'Сучасні зали' },
  { value: '600+', label: 'Місць для глядачів' },
  { value: '4K Laser', label: 'Чіткість проекції' },
  { value: '100 000+', label: 'Щасливих глядачів' },
];

export default function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#gallery') {
      const galleryElem = document.getElementById('gallery');
      if (galleryElem) {
        galleryElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="about-page">
      <section className="about-hero">
        <span className="about-tag">ПРО КІНОТЕАТР</span>
        <h1 className="about-title">Кінотеатр майбутнього — MYCINEMA</h1>
        <p className="about-lead">
          <strong>MYCINEMA</strong> - це сучасний кінопростір у самому серці Києва, де передові лазерні технології проекції поєднуються з неперевершеним просторовим звуком та найвищим рівнем глядацького комфорту.
        </p>
        <div className="about-stats-row">
          {STATS_DATA.map((item) => (
            <StatCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </section>

      <HallsList />

      <GalleryGrid />
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}