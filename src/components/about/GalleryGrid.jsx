import { useState, useRef } from 'react';

const GALLERY_PHOTOS = [
    {
        id: 1,
        title: 'Головний хол та каси кінотеатру',
        src: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80',
    },
    {
        id: 2,
        title: 'Кінобар та зона попкорну',
        src: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&auto=format&fit=crop&q=80',
    },
    {
        id: 3,
        title: 'Атмосфера премʼєрного показу',
        src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&auto=format&fit=crop&q=80',
    },
    {
        id: 4,
        title: 'Лаунж-зона для очікування сеансу',
        src: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1200&auto=format&fit=crop&q=80',
    },
    {
        id: 5,
        title: 'Глядачі на сеансі у 3D',
        src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=750&auto=format&fit=crop&q=80',
    },
    {
        id: 6,
        title: 'Лазерна апаратна IMAX',
        src: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=1000&auto=format&fit=crop&q=80',
    },
];

export default function GalleryGrid() {
    const [activePhoto, setActivePhoto] = useState(null);
    const trackRef = useRef(null);

    const handleScrollLeft = () => {
        const track = trackRef.current;
        if (!track) return;
        if (track.scrollLeft <= 30) {
            track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        const track = trackRef.current;
        if (!track) return;
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 50) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    return (
        <section className="gallery-section" id="gallery">
            <div className="gallery-header-row">
                <div className="section-title-wrap">
                    <span className="section-tag">ФОТОГАЛЕРЕЯ</span>
                    <h2>Життя кінотеатру</h2>
                </div>
                <div className="gallery-nav-buttons">
                    <button
                        type="button"
                        className="btn-gallery-nav"
                        onClick={handleScrollLeft}
                        aria-label="Попереднє фото"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className="btn-gallery-nav"
                        onClick={handleScrollRight}
                        aria-label="Наступне фото"
                    >
                        ›
                    </button>
                </div>
            </div>
            <div className="gallery-carousel-track" ref={trackRef}>
                {GALLERY_PHOTOS.map((photo) => (
                    <div
                        key={photo.id}
                        className="gallery-card-300"
                        onClick={() => setActivePhoto(photo)}
                        title="Клікніть для збільшення"
                    >
                        <img
                            src={photo.src}
                            alt={photo.title}
                            className="gallery-img-cover"
                            loading="lazy"
                        />
                        <div className="gallery-overlay">
                            <span className="gallery-aspect-badge">{photo.aspect}</span>
                            <p className="gallery-photo-title">{photo.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            {activePhoto && (
                <div className="lightbox-backdrop" onClick={() => setActivePhoto(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={activePhoto.src}
                            alt={activePhoto.title}
                            className="lightbox-full-img"
                        />
                        <div className="lightbox-footer">
                            <div>
                                <h4>{activePhoto.title}</h4>
                            </div>
                            <button
                                type="button"
                                className="btn-close-lightbox"
                                onClick={() => setActivePhoto(null)}
                            >
                                ✕ Закрити
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}