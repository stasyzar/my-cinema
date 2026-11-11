const ROWS_COUNT = 6;
const SEATS_PER_ROW = 8;

export default function SeatGrid({ basePrice, occupiedSeats, selectedSeats, onSeatClick }) {
  return (
    <div className="hall-wrapper">
      <div className="screen-container">
        <div className="screen-arc" />
        <span className="screen-text">ЕКРАН</span>
      </div>

      <div className="hall-legend">
        <div className="legend-item">
          <span className="seat-sample seat-free" />
          <span>Вільне ({basePrice} грн)</span>
        </div>
        <div className="legend-item">
          <span className="seat-sample seat-vip-sample" />
          <span>VIP (+50 грн)</span>
        </div>
        <div className="legend-item">
          <span className="seat-sample seat-selected" />
          <span>Ваш вибір</span>
        </div>
        <div className="legend-item">
          <span className="seat-sample seat-occupied" />
          <span>Зайнято</span>
        </div>
      </div>

      <div className="seats-grid">
        {Array.from({ length: ROWS_COUNT }, (_, rIdx) => {
          const rowNumber = rIdx + 1;
          const isVip = rowNumber >= 5;
          const seatPrice = isVip ? basePrice + 50 : basePrice;

          return (
            <div key={rowNumber} className="seat-row">
              <span className="row-number">{rowNumber}</span>

              <div className="seats-row-list">
                {Array.from({ length: SEATS_PER_ROW }, (_, sIdx) => {
                  const seatNumber = sIdx + 1;
                  const seatId = `r${rowNumber}-s${seatNumber}`;
                  const isOccupied = occupiedSeats.includes(seatId);
                  const isSelected = selectedSeats.some((s) => s.id === seatId);

                  return (
                    <button
                      key={seatId}
                      type="button"
                      title={`Ряд ${rowNumber}, Місце ${seatNumber} (${seatPrice} грн)`}
                      disabled={isOccupied}
                      className={`seat-btn ${isVip ? 'vip' : ''} ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => onSeatClick(rowNumber, seatNumber, seatPrice)}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>

              <span className="row-number">{rowNumber}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}