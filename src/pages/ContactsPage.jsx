import ContactCards from '../components/contacts/ContactCards';
import CinemaMap from '../components/contacts/CinemaMap';
import FeedbackForm from '../components/contacts/FeedbackForm';

export default function ContactsPage() {
  return (
    <div className="contacts-page">
      <div className="contacts-hero">
        <h1 className="contacts-title">Контакти та розташування</h1>
        <p className="contacts-subtitle">
          Чекаємо на вас щодня в кінотеатрі <strong>MYCINEMA</strong>. Обирайте зручний спосіб зв'язку або завітайте до нас на сеанс!
        </p>
      </div>

      <ContactCards />

      <div className="contacts-main-row">
        <CinemaMap />
        <FeedbackForm />
      </div>
    </div>
  );
}