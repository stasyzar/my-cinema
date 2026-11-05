import { useState } from 'react';

export default function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Дивлюся «${title}» у кінотеатрі MyCinema!`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="movie-share-block">
      <span className="share-label">Поділитися:</span>
      <div className="share-buttons">
        <a
          href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
          target="_blank"
          rel="noreferrer"
          className="btn-share"
        >
          Telegram
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noreferrer"
          className="btn-share"
        >
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
          target="_blank"
          rel="noreferrer"
          className="btn-share"
        >
          Twitter
        </a>
        <button type="button" onClick={handleCopyLink} className="btn-share btn-copy">
          {copied ? 'Скопійовано! ✓' : 'Копіювати лінк'}
        </button>
      </div>
    </div>
  );
}