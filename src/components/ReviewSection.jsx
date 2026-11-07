import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DEFAULT_REVIEWS from '../data/default_reviews.js';

export default function ReviewSection({ movieId }) {
    const { user, login } = useAuth();

    const [allReviews, setAllReviews] = useState(() => {
        try {
            const saved = localStorage.getItem('mycinema_reviews');
            return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
        } catch {
            return DEFAULT_REVIEWS;
        }
    });

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;
        const newReview = {
            id: Date.now(),
            movieId,
            user: user.displayName,
            photo: user.photoURL,
            rating,
            comment,
        };
        const updatedReviews = [...allReviews, newReview];
        setAllReviews(updatedReviews);
        localStorage.setItem('mycinema_reviews', JSON.stringify(updatedReviews));
        setComment('');
    }

    const movieReviews = allReviews.filter((r) => Number(r.movieId) === Number(movieId));

    return (
        <section className="reviews-section">
            <div className="reviews-header">
                <h2>Відгуки глядачів <span>({movieReviews.length})</span></h2>
            </div>

            {user ? (
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="review-form-user">
                        {user.photoURL && (
                            <img src={user.photoURL} alt={user.displayName} className="review-form-avatar" referrerPolicy="no-referrer" />
                        )}
                        <span>Ви пишете як <strong>{user.displayName}</strong></span>
                    </div>

                    <div className="review-rating-picker">
                        <span className="rating-label">Ваша оцінка:</span>
                        <div className="stars-row">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star-select-btn ${star <= rating ? 'active' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </button>
                            ))}
                            <span className="rating-number">{rating} з 5</span>
                        </div>
                    </div>

                    <textarea
                        className="review-textarea"
                        rows={3}
                        placeholder="Поділіться вашими враженнями про цей фільм..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button type="submit" className="btn-submit-review">
                        Опублікувати відгук
                    </button>
                </form>
            ) : (
                <div className="review-login-prompt">
                    <p>Хочете поділитися враженнями? Увійдіть, щоб залишити відгук.</p>
                    <button type="button" onClick={login} className="btn-review-login">
                        Увійти через Google
                    </button>
                </div>
            )}

            <div className="reviews-list">
                {movieReviews.length > 0 ? (
                    movieReviews.map((rev) => (
                        <div key={rev.id} className="review-card">
                            <div className="review-card-top">
                                <div className="review-author">
                                    {rev.photo ? (
                                        <img src={rev.photo} alt={rev.user} className="review-author-avatar" referrerPolicy="no-referrer" />
                                    ) : (
                                        <div className="review-avatar-placeholder">
                                            {rev.user?.[0] || 'Г'}
                                        </div>
                                    )}
                                    <div>
                                        <div className="review-author-name">{rev.user}</div>
                                        <div className="review-stars-display">
                                            {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="review-comment-text">{rev.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-reviews-text">
                        Поки що немає відгуків до цього фільму. Будьте першим, хто поділиться думкою!
                    </p>
                )}
            </div>
        </section>
    );
}