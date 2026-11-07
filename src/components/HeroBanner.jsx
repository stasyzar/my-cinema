import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { memo } from 'react';

export default HeroBanner = memo(function HeroBanner() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <section className="hero-banner">
            <video
                ref={videoRef}
                className="hero-video"
                src="/hero-trailer.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="hero-overlay" />

            <div className="hero-content">
                <div className="hero-badges">
                    <span className="badge badge-accent">ПРЕМ'ЄРА ТИЖНЯ</span>
                    <span className="badge badge-dark">3D</span>
                </div>

                <h1 className="hero-title">Людина-павук: Крізь Всесвіти</h1>

                <p className="hero-desc">
                    Великий екран. Глибокий звук. Історії, які залишаються з вами назавжди.
                </p>

                <div className="hero-actions">
                    <Link to="/movie/14" className="btn-hero-primary">
                        Купити квиток →
                    </Link>
                    <button type="button" onClick={toggleSound} className="btn-hero-secondary">
                        {isMuted ? 'Увімкнути звук 🔊' : 'Вимкнути звук 🔇'}
                    </button>
                </div>
            </div>
        </section>
    );
})