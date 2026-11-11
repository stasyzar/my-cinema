import { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contacts-form-block">
      <div className="block-header">
        <h2>Напишіть нам</h2>
        <p>Маєте запитання, відгук або пропозицію про співпрацю?</p>
      </div>

      {isSubmitted ? (
        <div className="form-success-alert">
          <div className="success-icon">✓</div>
          <h3>Повідомлення надіслано!</h3>
          <p>Дякуємо за звернення. Адміністратор кінотеатру зв'яжеться з вами найближчим часом.</p>
          <button
            type="button"
            className="btn-send-again"
            onClick={() => setIsSubmitted(false)}
          >
            Надіслати ще одне повідомлення
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contacts-form">
          <div className="form-group">
            <label htmlFor="contact-name">Ваше ім'я *</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              placeholder="Олександр Коваль"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="contact-email">Email *</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-phone">Телефон</label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                placeholder="+380..."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Повідомлення *</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Опишіть ваше запитання або побажання..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit-contact">
            Надіслати повідомлення
          </button>
        </form>
      )}
    </div>
  );
}