import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SeatGrid from './SeatGrid';
import TicketModal from './TicketModal';

export default function BookingSection({ movie }) {
  const { user, login } = useAuth();

  const sessions = movie.sessions || ['13:30', '17:00', '20:30'];
  const [selectedSession, setSelectedSession] = useState(sessions[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [purchasedTicket, setPurchasedTicket] = useState(null);

  const [allBookings, setAllBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('mycinema_bookings');
      return saved ? JSON.parse(saved) : {
        [`${movie.id}_${sessions[0]}`]: ['r2-s4', 'r2-s5', 'r4-s3'],
      };
    } catch {
      return {};
    }
  });

  const [userTickets, setUserTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('mycinema_user_tickets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const currentSessionKey = `${movie.id}_${selectedSession}`;
  const occupiedSeats = allBookings[currentSessionKey] || [];

  const myTicketsForMovie = user
    ? userTickets.filter((t) => t.userId === user.uid && t.movieId === movie.id)
    : [];
  const myTotalSeatsCount = myTicketsForMovie.reduce((sum, t) => sum + t.seats.length, 0);

  const handleSessionChange = (session) => {
    setSelectedSession(session);
    setSelectedSeats([]);
  };

  const handleSeatClick = (row, seat, price) => {
    const seatId = `r${row}-s${seat}`;
    if (occupiedSeats.includes(seatId)) return;

    const alreadySelected = selectedSeats.find((s) => s.id === seatId);
    if (alreadySelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, { id: seatId, row, seat, price }]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handleBuyTickets = () => {
    if (!user || selectedSeats.length === 0) return;

    const newTicket = {
      id: `TCK-${Date.now().toString().slice(-6)}`,
      userId: user.uid,
      userName: user.displayName,
      movieId: movie.id,
      movieTitle: movie.title,
      hall: movie.hall,
      session: selectedSession,
      seats: selectedSeats,
      totalPrice,
      date: new Date().toLocaleDateString('uk-UA'),
    };

    const newOccupied = [...occupiedSeats, ...selectedSeats.map((s) => s.id)];
    const updatedBookings = { ...allBookings, [currentSessionKey]: newOccupied };
    setAllBookings(updatedBookings);
    localStorage.setItem('mycinema_bookings', JSON.stringify(updatedBookings));

    const updatedTickets = [...userTickets, newTicket];
    setUserTickets(updatedTickets);
    localStorage.setItem('mycinema_user_tickets', JSON.stringify(updatedTickets));

    setPurchasedTicket(newTicket);
    setSelectedSeats([]);
  };

  return (
    <section className="booking-section">
      <div className="booking-header">
        <div>
          <h2>Вибір сеансу та квитків</h2>
          <p className="booking-hall-name">Зал: <strong>{movie.hall}</strong> ({movie.format})</p>
        </div>

        <div className="user-tickets-badge">
          {user ? (
            <span>
              🎟️ У вас придбано <strong>{myTotalSeatsCount}</strong> {myTotalSeatsCount === 1 ? 'квиток' : 'квитків'} на цей фільм
            </span>
          ) : (
            <span className="guest-warning">
              ⚠️ Тільки авторизовані користувачі можуть бронювати квитки
            </span>
          )}
        </div>
      </div>

      <div className="sessions-picker">
        <span className="sessions-label">Час сеансу:</span>
        <div className="sessions-buttons">
          {sessions.map((time) => (
            <button
              key={time}
              type="button"
              className={`session-btn ${selectedSession === time ? 'active' : ''}`}
              onClick={() => handleSessionChange(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <SeatGrid
        basePrice={movie.price}
        occupiedSeats={occupiedSeats}
        selectedSeats={selectedSeats}
        onSeatClick={handleSeatClick}
      />

      <div className="booking-summary-bar">
        <div className="summary-info">
          <div>
            Обрано місць: <strong>{selectedSeats.length}</strong>
            {selectedSeats.length > 0 && (
              <span className="selected-seats-details">
                ({selectedSeats.map((s) => `Р${s.row}М${s.seat}`).join(', ')})
              </span>
            )}
          </div>
          <div className="summary-total-price">
            До сплати: <strong>{totalPrice} грн</strong>
          </div>
        </div>

        {user ? (
          <button
            type="button"
            className="btn-buy-tickets"
            disabled={selectedSeats.length === 0}
            onClick={handleBuyTickets}
          >
            Придбати {selectedSeats.length > 0 ? `(${totalPrice} грн)` : ''}
          </button>
        ) : (
          <button type="button" className="btn-login-to-buy" onClick={login}>
            Увійдіть через Google для купівлі
          </button>
        )}
      </div>

      <TicketModal ticket={purchasedTicket} onClose={() => setPurchasedTicket(null)} />
    </section>
  );
}