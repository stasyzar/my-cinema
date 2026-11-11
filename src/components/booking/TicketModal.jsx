export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div className="ticket-modal-backdrop" onClick={onClose}>
      <div className="ticket-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-card-header">
          <span className="ticket-success-icon">✓</span>
          <h3>Квиток успішно придбано!</h3>
        </div>

        <div className="ticket-card-body">
          <div className="ticket-movie-title">{ticket.movieTitle}</div>
          <div className="ticket-meta-grid">
            <div><span>Зал:</span> <strong>{ticket.hall}</strong></div>
            <div><span>Сеанс:</span> <strong>{ticket.session}</strong></div>
            <div><span>Дата:</span> <strong>{ticket.date}</strong></div>
            <div><span>Глядач:</span> <strong>{ticket.userName}</strong></div>
          </div>

          <div className="ticket-seats-list">
            <span>Місця:</span>
            <div className="ticket-badges-wrap">
              {ticket.seats.map((s) => (
                <span key={s.id} className="ticket-seat-pill">
                  Ряд {s.row}, Місце {s.seat}
                </span>
              ))}
            </div>
          </div>

          <div className="ticket-price-total">
            <span>Сума замовлення:</span>
            <strong>{ticket.totalPrice} грн</strong>
          </div>

          <div className="ticket-barcode">
            <div className="barcode-lines" />
            <span className="barcode-code">{ticket.id}</span>
          </div>
        </div>

        <button type="button" className="btn-close-ticket" onClick={onClose}>
          Зрозуміло
        </button>
      </div>
    </div>
  );
}