import { useEffect, useRef, useState } from 'react';
import { getWhatsAppUrl, salonDetails } from './config.js';

const services = [
  {
    number: '01',
    title: 'Hair Artistry',
    description: 'Precision cuts, considered styling, and personalised hair transformations.',
    note: 'CUT · COLOUR · STYLE',
  },
  {
    number: '02',
    title: 'Skin Rituals',
    description: 'Restorative facials and thoughtful skincare treatments, tailored to you.',
    note: 'CARE · RESTORE · GLOW',
  },
  {
    number: '03',
    title: 'Bridal Beauty',
    description: 'Refined bridal styling for the moments you will carry with you.',
    note: 'BRIDAL · OCCASION · EDIT',
  },
  {
    number: '04',
    title: 'Nail Atelier',
    description: 'Elegant manicures and polished finishing touches, down to the detail.',
    note: 'MANICURE · DETAIL · FINISH',
  },
];

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85',
    alt: 'Warmly lit salon styling stations and mirrors',
    className: 'gallery-image gallery-image--tall',
    caption: 'A space to exhale',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
    alt: 'Beauty professional creating a polished hairstyle',
    className: 'gallery-image gallery-image--portrait',
    caption: 'The finishing touch',
  },
  {
    src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1000&q=85',
    alt: 'Contemporary salon interior with elegant styling chairs',
    className: 'gallery-image gallery-image--wide',
    caption: 'Every detail, considered',
  },
  {
    src: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=85',
    alt: 'A stylist carefully working on a client’s hair',
    className: 'gallery-image gallery-image--small',
    caption: 'Artistry in the making',
  },
];

const navItems = [
  ['Home', '#home'],
  ['Services', '#services'],
  ['The Experience', '#experience'],
  ['Gallery', '#gallery'],
  ['Contact', '#contact'],
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow-icon${diagonal ? ' arrow-icon--diagonal' : ''}`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12M10 4.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 36);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <a className="brand-mark" href="#home" aria-label="AURELLE home" onClick={closeMenu}>
        <span className="brand-mark__name">AURELLE</span>
        <span className="brand-mark__descriptor">LUXURY BEAUTY LOUNGE</span>
      </a>

      <button
        className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        className={`primary-navigation${menuOpen ? ' primary-navigation--open' : ''}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a
          className="header-booking"
          href={getWhatsAppUrl('Hello, I would like to book an appointment at AURELLE.')}
          onClick={closeMenu}
          target={salonDetails.whatsappNumber ? '_blank' : undefined}
          rel={salonDetails.whatsappNumber ? 'noreferrer' : undefined}
        >
          Book an appointment <ArrowIcon diagonal />
        </a>
      </nav>
    </header>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`reveal${visible ? ' reveal--visible' : ''} ${className}`}
      ref={elementRef}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__image" role="img" aria-label="AURELLE-inspired marble salon with arched mirrors and brass details" />
      <div className="hero__wash" />
      <div className="hero__content">
        <p className="eyebrow hero__eyebrow">THE ART OF BEAUTY &amp; SELF-CARE</p>
        <h1 id="hero-title">
          Your Beauty.
          <br />
          <em>Our Artistry.</em>
        </h1>
        <p className="hero__copy">
          Discover a more elevated approach to beauty, where expert artistry,
          personalised care, and exceptional surroundings come together.
        </p>
        <div className="hero__actions">
          <a className="button button--gold" href="#contact">
            Book your experience <ArrowIcon />
          </a>
          <a className="text-link text-link--light" href="#services">
            Explore our services <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero__signature" aria-hidden="true">
        <span>BEAUTY, WITH INTENTION</span>
        <span className="hero__signature-line" />
        <span>EST. FOR YOUR MOMENT</span>
      </div>
      <a className="scroll-cue" href="#services" aria-label="Scroll to services">
        <span className="scroll-cue__line" />
        <span>SCROLL TO DISCOVER</span>
      </a>
    </section>
  );
}

function Services() {
  return (
    <section className="services section-pad" id="services" aria-labelledby="services-title">
      <div className="section-heading">
        <Reveal>
          <p className="eyebrow eyebrow--dark">A MORE PERSONAL KIND OF BEAUTY</p>
          <h2 id="services-title">
            The art of <em>self-care</em>
          </h2>
          <p className="section-heading__copy">
            Thoughtfully curated treatments designed around you.
          </p>
        </Reveal>
        <Reveal className="section-index">
          <span>01</span>
          <span className="section-index__rule" />
          <span>04</span>
        </Reveal>
      </div>
      <div className="service-list">
        {services.map((service, index) => (
          <Reveal key={service.number} className="service-reveal" delay={index * 70}>
            <a className="service-row" href="#contact" aria-label={`Enquire about ${service.title}`}>
              <span className="service-row__number">{service.number}</span>
              <span className="service-row__main">
                <span className="service-row__title">{service.title}</span>
                <span className="service-row__description">{service.description}</span>
              </span>
              <span className="service-row__note">{service.note}</span>
              <span className="service-row__arrow"><ArrowIcon /></span>
            </a>
          </Reveal>
        ))}
      </div>
      <a className="text-link text-link--dark services__link" href="#contact">
        Discover your ritual <ArrowIcon />
      </a>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience" id="experience" aria-labelledby="experience-title">
      <Reveal className="experience__visual">
        <img
          src="/images/luxury-salon.jpg"
          alt="Warm marble salon interior with arched mirrors, brass shelving, and black styling chairs"
          loading="lazy"
        />
        <span className="experience__image-label">A PLACE TO PAUSE</span>
        <span className="experience__image-index">A / 01</span>
      </Reveal>
      <div className="experience__copy">
        <Reveal>
          <p className="eyebrow eyebrow--dark">A SENSE OF ARRIVAL</p>
          <h2 id="experience-title">
            An experience
            <br />
            beyond the <em>ordinary.</em>
          </h2>
          <p className="experience__intro">
            Step into a space where every detail is considered, every ritual is
            intentional, and every visit is designed around you.
          </p>
        </Reveal>
        <div className="experience-notes">
          <Reveal>
            <div className="experience-note">
              <span className="experience-note__number">01</span>
              <div>
                <h3>Considered surroundings</h3>
                <p>An elegant, calming space made for a moment of your own.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="experience-note">
              <span className="experience-note__number">02</span>
              <div>
                <h3>Care, made personal</h3>
                <p>Time, attention, and recommendations shaped around you.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="experience-note">
              <span className="experience-note__number">03</span>
              <div>
                <h3>Ritual over routine</h3>
                <p>Thoughtful beauty rituals, delivered with a lighter touch.</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <a className="text-link text-link--dark" href="#gallery">
            Take a closer look <ArrowIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery-section section-pad" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <Reveal>
          <p className="eyebrow eyebrow--dark">A STUDY IN BEAUTY</p>
          <h2 id="gallery-title">
            The AURELLE <em>details</em>
          </h2>
        </Reveal>
        <Reveal>
          <p className="gallery-heading__copy">
            A glimpse into the spaces, gestures, and little details that make
            your time with us feel like your own.
          </p>
        </Reveal>
      </div>
      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <Reveal key={image.src} className={image.className} delay={index * 65}>
            <figure>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>
                <span>{image.caption}</span>
                <span className="gallery-image__number">0{index + 1}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const hasWhatsApp = Boolean(salonDetails.whatsappNumber);

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__ornament" aria-hidden="true">A</div>
      <Reveal className="contact__inner">
        <p className="eyebrow">YOUR TIME, BEAUTIFULLY SPENT</p>
        <h2 id="contact-title">
          Your moment of
          <br />
          beauty <em>awaits.</em>
        </h2>
        <p className="contact__copy">
          Make time for yourself. Discover a beauty experience designed to leave
          you feeling confident, refreshed, and inspired.
        </p>
        <div className="contact__actions">
          <a
            className="button button--gold"
            href={hasWhatsApp ? getWhatsAppUrl() : '#contact-details'}
            target={hasWhatsApp ? '_blank' : undefined}
            rel={hasWhatsApp ? 'noreferrer' : undefined}
          >
            Book an appointment <ArrowIcon />
          </a>
          <a className="text-link text-link--light" href="#contact-details">
            Contact the salon <ArrowIcon />
          </a>
        </div>
      </Reveal>
      <div className="contact__bottom" id="contact-details">
        <a className="brand-mark brand-mark--footer" href="#home">
          <span className="brand-mark__name">AURELLE</span>
          <span className="brand-mark__descriptor">LUXURY BEAUTY LOUNGE</span>
        </a>
        <div className="contact__details">
          {salonDetails.salonAddress && (
            <div>
              <span className="eyebrow">VISIT</span>
              <p>{salonDetails.salonAddress}</p>
            </div>
          )}
          {salonDetails.businessHours && (
            <div>
              <span className="eyebrow">HOURS</span>
              <p>{salonDetails.businessHours}</p>
            </div>
          )}
          {hasWhatsApp && (
            <div>
              <span className="eyebrow">APPOINTMENTS</span>
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">WhatsApp us</a>
            </div>
          )}
          {salonDetails.instagramUrl && (
            <div>
              <span className="eyebrow">FOLLOW ALONG</span>
              <a href={salonDetails.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          )}
        </div>
        <a className="back-to-top" href="#home">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
      <div className="contact__legal">
        <span>© {new Date().getFullYear()} AURELLE BEAUTY LOUNGE</span>
        <span>MADE FOR YOUR MOMENT</span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Experience />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
