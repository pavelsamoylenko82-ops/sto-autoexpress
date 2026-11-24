const app = document.getElementById("app");

const icons = {
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.28a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></svg>`,
  route: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h5a4 4 0 0 0 4-4V9"/><path d="m14 5 3 3 3-3"/></svg>`,
  calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/><path d="M8 15h2M14 15h2M8 18h2"/></svg>`,
  arrow: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`,
  pin: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  clock: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  star: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"/></svg>`,
  telegram: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>`,
  viber: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4-.9L3 21l1.8-4.7a8.4 8.4 0 1 1 16.2-4.8z"/><path d="M14.5 8.5a3 3 0 0 1 1 2.2"/><path d="M12 7a5 5 0 0 1 4 4.8"/></svg>`,
  check: `<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>`,
  chevron: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`
};

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const lookup = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return lookup[character];
  });

const imageMarkup = (image, className, options = {}) => {
  const loading = options.eager ? "eager" : "lazy";
  const fetchPriority = options.eager ? ' fetchpriority="high"' : "";
  return `<figure class="${className}">
    <img src="${escapeHTML(image.src)}" srcset="${escapeHTML(image.srcset)}" sizes="${escapeHTML(image.sizes)}" width="${image.width}" height="${image.height}" alt="${escapeHTML(image.alt)}" loading="${loading}" decoding="async"${fetchPriority}>
    <figcaption>${escapeHTML(image.caption)}</figcaption>
  </figure>`;
};

const renderHeader = (data) => {
  const primaryPhone = data.contacts.phones.find((phone) => phone.primary) || data.contacts.phones[0];
  return `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#top" translate="no" aria-label="${escapeHTML(data.brand.name)} - ${escapeHTML(data.ui.toHome)}">
        <span class="brand-mark"><img src="${escapeHTML(data.brand.logo)}" alt="${escapeHTML(data.brand.logoAlt)}" width="160" height="160" loading="eager" decoding="async"></span>
        <span class="brand-text">
          <strong>${escapeHTML(data.brand.name)}</strong>
          <small>${escapeHTML(data.brand.descriptor)}</small>
        </span>
      </a>
      <nav class="desktop-nav" aria-label="${escapeHTML(data.ui.mainNav)}">
        ${data.nav.map((item) => `<a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="${escapeHTML(primaryPhone.href)}" aria-label="${escapeHTML(data.ui.call)}: ${escapeHTML(primaryPhone.label)}">${icons.phone}<span>${escapeHTML(primaryPhone.label)}</span></a>
        <a class="btn btn-primary btn-sm" href="#booking">${escapeHTML(data.ui.book)} ${icons.arrow}</a>
      </div>
    </div>
  </header>`;
};

const renderHero = (data) => {
  const primaryPhone = data.contacts.phones.find((phone) => phone.primary) || data.contacts.phones[0];
  return `<section class="hero" id="top">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">${escapeHTML(data.hero.eyebrow)}</p>
        <h1>${escapeHTML(data.hero.title)}</h1>
        <p class="hero-lead">${escapeHTML(data.hero.lead)}</p>
        <dl class="hero-facts">
          ${data.hero.facts.map((fact) => `<div class="hero-fact">
            <dt class="fact-label">${escapeHTML(fact.label)}</dt>
            <dd class="fact-value">${fact.kind === "rating" ? icons.star : ""}${escapeHTML(fact.value)}</dd>
            <dd class="fact-note">${escapeHTML(fact.note)}</dd>
          </div>`).join("")}
        </dl>
        <div class="hero-base">
          <p class="hero-address">${icons.pin}<span><b>${escapeHTML(data.hero.addressLabel)}</b>${escapeHTML(data.contacts.addressShort)}</span></p>
          <div class="hero-cta">
            <a class="btn btn-primary" href="#booking">${escapeHTML(data.hero.primaryCta)} ${icons.arrow}</a>
            <a class="btn btn-ghost" href="${escapeHTML(primaryPhone.href)}">${icons.phone}${escapeHTML(data.hero.secondaryCta)}</a>
          </div>
        </div>
      </div>
      <figure class="hero-media">
        <div class="hero-photo">
          <img src="${escapeHTML(data.hero.image.src)}" srcset="${escapeHTML(data.hero.image.srcset)}" sizes="${escapeHTML(data.hero.image.sizes)}" width="${data.hero.image.width}" height="${data.hero.image.height}" alt="${escapeHTML(data.hero.image.alt)}" loading="eager" fetchpriority="high" decoding="async">
          <span class="hero-badge">${escapeHTML(data.hero.imageBadge)}</span>
        </div>
        <figcaption><span>${escapeHTML(data.hero.imageCaption)}</span><span>${escapeHTML(data.brand.established)}</span></figcaption>
      </figure>
    </div>
  </section>`;
};

const renderStrip = (data) => `<div class="proof-strip">
  <div class="container proof-strip-inner">
    ${data.marquee.map((item) => `<span class="proof-strip-item">${escapeHTML(item)}</span>`).join("")}
  </div>
</div>`;

const renderProof = (data) => `<section class="section proof">
  <div class="container proof-grid">
    <div class="proof-intro reveal">
      <p class="eyebrow">${escapeHTML(data.proof.eyebrow)}</p>
      <div class="section-title"><h2>${escapeHTML(data.proof.title)}</h2></div>
      <p class="section-lead">${escapeHTML(data.proof.lead)}</p>
    </div>
    <div class="proof-list reveal">
      ${data.proof.items.map((item) => `<article class="proof-row">
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
      </article>`).join("")}
    </div>
  </div>
</section>`;

const renderServices = (data) => `<section class="section services" id="services">
  <div class="container">
    <div class="services-grid">
      <div class="services-intro reveal">
        <p class="eyebrow">${escapeHTML(data.services.eyebrow)}</p>
        <div class="section-title"><h2>${escapeHTML(data.services.title)}</h2></div>
        <p class="section-lead">${escapeHTML(data.services.lead)}</p>
        <p class="services-note">${escapeHTML(data.services.note)}</p>
        <a class="btn btn-primary" href="#booking">${escapeHTML(data.ui.book)} ${icons.arrow}</a>
      </div>
      <div class="price-table reveal">
        ${data.services.priced.map((service) => `<div class="price-row">
          <div>
            <span class="price-tag">${escapeHTML(service.tag)}</span>
            <h3>${escapeHTML(service.name)}</h3>
          </div>
          <span class="price-value">${escapeHTML(service.price)}</span>
        </div>`).join("")}
      </div>
    </div>
    <div class="request-panel reveal">
      <div class="request-head">
        <div>
          <h3>${escapeHTML(data.services.requestLabel)}</h3>
          <p>${escapeHTML(data.services.requestNote)}</p>
        </div>
        <span class="request-price">${escapeHTML(data.services.requestPrice)}</span>
      </div>
      <div class="service-tags">
        ${data.services.request.map((service) => `<button class="service-tag" type="button" data-service="${escapeHTML(service)}">${escapeHTML(service)}</button>`).join("")}
      </div>
    </div>
  </div>
</section>`;

const renderAbout = (data) => `<section class="section about" id="about">
  <div class="container about-grid">
    <div class="about-copy reveal">
      <p class="eyebrow">${escapeHTML(data.about.eyebrow)}</p>
      <div class="section-title"><h2>${escapeHTML(data.about.title)}</h2></div>
      ${data.about.paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
      <blockquote class="about-quote">
        <p>${escapeHTML(data.about.quote)}</p>
        <cite>${escapeHTML(data.about.quoteSource)}</cite>
      </blockquote>
    </div>
    <div class="about-photos reveal">
      ${data.about.images.map((image) => imageMarkup(image, "about-photo")).join("")}
    </div>
  </div>
</section>`;

const renderGallery = (data) => `<section class="section gallery" aria-labelledby="gallery-title">
  <div class="container">
    <div class="gallery-head">
      <div class="reveal">
        <p class="eyebrow">${escapeHTML(data.gallery.eyebrow)}</p>
        <div class="section-title"><h2 id="gallery-title">${escapeHTML(data.gallery.title)}</h2></div>
      </div>
      <p class="section-lead reveal">${escapeHTML(data.gallery.lead)}</p>
    </div>
    <div class="gallery-grid">
      ${imageMarkup(data.gallery.wide, "gallery-item gallery-item-wide reveal")}
      ${data.gallery.portraits.map((image) => imageMarkup(image, "gallery-item gallery-item-portrait reveal")).join("")}
    </div>
  </div>
</section>`;

const renderReviews = (data) => `<section class="section reviews" id="reviews">
  <div class="container">
    <div class="reviews-top">
      <div class="reviews-intro reveal">
        <p class="eyebrow">${escapeHTML(data.reviews.eyebrow)}</p>
        <div class="section-title"><h2>${escapeHTML(data.reviews.title)}</h2></div>
        <p class="section-lead">${escapeHTML(data.reviews.lead)}</p>
      </div>
      <div class="reviews-summary reveal">
        <div class="rating-list">
          ${data.reviews.ratings.map((rating) => `<div class="rating-item">
            <span class="rating-source">${escapeHTML(rating.source)}</span>
            <span class="rating-value">${escapeHTML(rating.value)}${icons.star}</span>
            <span class="rating-note">${escapeHTML(rating.note)}</span>
          </div>`).join("")}
        </div>
        <a class="btn btn-ghost" href="${escapeHTML(data.contacts.yandexMaps)}" target="_blank" rel="noopener">${escapeHTML(data.ui.allReviews)} ${icons.arrow}</a>
      </div>
    </div>
    <div class="reviews-grid">
      ${data.reviews.items.map((review) => `<article class="review-card reveal">
        <header class="review-header">
          <div>
            <span class="review-author">${escapeHTML(review.name)}</span>
            <span class="review-date">${escapeHTML(review.date)}</span>
          </div>
          <span class="review-score">${escapeHTML(review.rating)}.0 ${icons.star}</span>
        </header>
        <p class="review-text">${escapeHTML(review.text)}</p>
      </article>`).join("")}
    </div>
  </div>
</section>`;

const renderBooking = (data) => {
  const primaryPhone = data.contacts.phones.find((phone) => phone.primary) || data.contacts.phones[0];
  return `<section class="section booking" id="booking">
    <div class="container booking-grid">
      <div class="booking-copy reveal">
        <p class="eyebrow">${escapeHTML(data.booking.eyebrow)}</p>
        <h2>${escapeHTML(data.booking.title)}</h2>
        <p class="section-lead">${escapeHTML(data.booking.lead)}</p>
        <ul class="booking-points">
          ${data.booking.points.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}
        </ul>
        <a class="booking-phone" href="${escapeHTML(primaryPhone.href)}">${icons.phone}${escapeHTML(primaryPhone.label)}</a>
      </div>
      <div class="booking-panel reveal">
        <form class="form" id="booking-form" novalidate>
          <label class="field" for="name">
            <span class="field-label">${escapeHTML(data.booking.form.name)}</span>
            <input class="field-input" id="name" name="name" type="text" autocomplete="name" placeholder="${escapeHTML(data.booking.form.namePlaceholder)}" required minlength="2">
          </label>
          <label class="field" for="phone">
            <span class="field-label">${escapeHTML(data.booking.form.phone)}</span>
            <input class="field-input" id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="${escapeHTML(data.booking.form.phonePlaceholder)}" required maxlength="19" aria-describedby="phone-hint">
            <span class="form-hint" id="phone-hint">${escapeHTML(data.ui.phoneHint)}</span>
          </label>
          <label class="field field-full" for="service">
            <span class="field-label">${escapeHTML(data.booking.form.service)}</span>
            <span class="select-wrap">
              <select class="field-input" id="service" name="service" required>
                <option value="" selected>${escapeHTML(data.servicesForm.default)}</option>
                ${data.servicesForm.options.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}
              </select>
              ${icons.chevron}
            </span>
          </label>
          <p class="form-error" id="form-error" role="alert" hidden></p>
          <button class="btn btn-primary form-submit" type="submit">${escapeHTML(data.booking.form.submit)} ${icons.arrow}</button>
          <p class="form-privacy">${escapeHTML(data.booking.form.privacy)}</p>
        </form>
        <div class="form-success" id="form-success" tabindex="-1" hidden>
          <span class="success-icon">${icons.check}</span>
          <h3>${escapeHTML(data.booking.form.successTitle)}</h3>
          <p>${escapeHTML(data.booking.form.successText)}</p>
        </div>
      </div>
    </div>
  </section>`;
};

const renderContacts = (data) => `<section class="section contacts" id="contacts">
  <div class="container">
    <div class="contacts-head">
      <div class="reveal">
        <p class="eyebrow">${escapeHTML(data.contactsSection.eyebrow)}</p>
        <h2>${escapeHTML(data.contactsSection.title)}</h2>
      </div>
      <p class="section-lead reveal">${escapeHTML(data.contactsSection.lead)}</p>
    </div>
    <div class="contact-grid">
      <div class="address-card reveal">
        <p class="eyebrow">${escapeHTML(data.contactsSection.addressLabel)}</p>
        <h3>${escapeHTML(data.contacts.addressShort)}</h3>
        <p class="address-full">${escapeHTML(data.contacts.addressFull)}</p>
        <div class="address-meta">
          <div>
            <span class="meta-label">${escapeHTML(data.contactsSection.hoursLabel)}</span>
            <span class="meta-value">${escapeHTML(data.contacts.hours)}</span>
            <span class="meta-value">${escapeHTML(data.contacts.hoursNote)}</span>
          </div>
          <div>
            <span class="meta-label">${escapeHTML(data.contactsSection.addressLabel)}</span>
            <span class="meta-value">${escapeHTML(data.contacts.addressNote)}</span>
          </div>
        </div>
        <div class="address-actions">
          <a class="btn btn-primary" href="${escapeHTML(data.contacts.yandexMaps)}" target="_blank" rel="noopener">${escapeHTML(data.ui.openMaps)} ${icons.arrow}</a>
          <a class="btn btn-ghost" href="${escapeHTML(data.contacts.yandexRoute)}" target="_blank" rel="noopener">${icons.route}${escapeHTML(data.ui.buildRoute)}</a>
        </div>
        <p class="route-note">${escapeHTML(data.contactsSection.routeNote)}</p>
      </div>
      <div class="contact-side reveal">
        <h3>${escapeHTML(data.contactsSection.phonesLabel)}</h3>
        <div class="phone-list">
          ${data.contacts.phones.map((phone) => `<a class="phone-link" href="${escapeHTML(phone.href)}"><span>${escapeHTML(phone.label)}</span>${icons.phone}</a>`).join("")}
        </div>
        <div>
          <p class="meta-label">${escapeHTML(data.contactsSection.writeLabel)}</p>
          <div class="social-actions" style="margin-top: 10px;">
            <a class="social-btn" href="${escapeHTML(data.contacts.viber.href)}" target="_blank" rel="noopener">${icons.viber}${escapeHTML(data.contacts.viber.label)}</a>
            <a class="social-btn" href="${escapeHTML(data.contacts.telegram.href)}" target="_blank" rel="noopener">${icons.telegram}${escapeHTML(data.contacts.telegram.label)}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

const renderFaq = (data) => `<section class="section faq" aria-labelledby="faq-title">
  <div class="container faq-grid">
    <div class="faq-intro reveal">
      <p class="eyebrow">${escapeHTML(data.faq.eyebrow)}</p>
      <div class="section-title"><h2 id="faq-title">${escapeHTML(data.faq.title)}</h2></div>
      <p class="section-lead">${escapeHTML(data.faq.lead)}</p>
    </div>
    <div class="faq-list reveal">
      ${data.faq.items.map((item) => `<details class="faq-item">
        <summary><span>${escapeHTML(item.q)}</span><span class="faq-plus" aria-hidden="true"></span></summary>
        <p>${escapeHTML(item.a)}</p>
      </details>`).join("")}
    </div>
  </div>
</section>`;

const renderFooter = (data) => {
  const primaryPhone = data.contacts.phones.find((phone) => phone.primary) || data.contacts.phones[0];
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand-block">
        <div class="footer-brand">
          <span class="brand-mark"><img src="${escapeHTML(data.brand.logo)}" alt="${escapeHTML(data.brand.logoAlt)}" width="160" height="160" loading="lazy" decoding="async"></span>
          <div>
            <strong translate="no">${escapeHTML(data.brand.name)}</strong>
            <p class="footer-note">${escapeHTML(data.footer.note)}</p>
          </div>
        </div>
        <a class="footer-photo-credit" href="${escapeHTML(data.contacts.yandexPhotos)}" target="_blank" rel="noopener">${escapeHTML(data.footer.photoCredit)}</a>
      </div>
      <div>
        <p class="footer-title">${escapeHTML(data.footer.navTitle)}</p>
        <nav class="footer-nav" aria-label="${escapeHTML(data.footer.navTitle)}">
          ${data.nav.map((item) => `<a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`).join("")}
        </nav>
      </div>
      <div>
        <p class="footer-title">${escapeHTML(data.footer.contactsTitle)}</p>
        <div class="footer-contacts">
          <a href="${escapeHTML(primaryPhone.href)}">${escapeHTML(primaryPhone.label)}</a>
          <a href="${escapeHTML(data.contacts.viber.href)}" target="_blank" rel="noopener">${escapeHTML(data.contacts.viber.label)}</a>
          <a href="${escapeHTML(data.contacts.telegram.href)}" target="_blank" rel="noopener">${escapeHTML(data.contacts.telegram.label)}</a>
          <a href="${escapeHTML(data.contacts.yandexRoute)}" target="_blank" rel="noopener">${escapeHTML(data.ui.buildRoute)}</a>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>${escapeHTML(data.footer.rights)}</span>
      <span>${escapeHTML(data.contacts.addressShort)}, ${escapeHTML(data.contacts.city)}</span>
    </div>
  </footer>`;
};

const renderMobileBar = (data) => `<nav class="mobile-bar" aria-label="${escapeHTML(data.ui.quickActions)}">
  ${data.mobileBar.map((item) => `<a href="${escapeHTML(item.href)}"${item.action === "route" ? ' target="_blank" rel="noopener"' : ""}>${icons[item.icon] || icons.phone}<span>${escapeHTML(item.label)}</span></a>`).join("")}
</nav>`;

const render = (data) => {
  document.title = data.meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", data.meta.description);
  document.documentElement.lang = data.meta.lang;

  app.innerHTML = `<a class="skip-link" href="#main">${escapeHTML(data.ui.skip)}</a>
    ${renderHeader(data)}
    <main id="main">
      ${renderHero(data)}
      ${renderStrip(data)}
      ${renderProof(data)}
      ${renderServices(data)}
      ${renderAbout(data)}
      ${renderGallery(data)}
      ${renderReviews(data)}
      ${renderBooking(data)}
      ${renderContacts(data)}
      ${renderFaq(data)}
    </main>
    ${renderFooter(data)}
    ${renderMobileBar(data)}`;

  initForm(data);
  initServiceLinks(data);
  initReveals();
};

const digitsFromPhone = (value) => {
  let digits = String(value).replace(/\D/g, "");
  if (digits.startsWith("375")) digits = digits.slice(3);
  else if (digits.startsWith("80") && digits.length === 11) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 10) digits = digits.slice(1);
  return digits.slice(0, 9);
};

const formatPhone = (digits) => {
  let output = "+375 (";
  if (!digits) return output;
  output += digits.slice(0, 2);
  if (digits.length >= 2) output += ")";
  if (digits.length > 2) output += ` ${digits.slice(2, 5)}`;
  if (digits.length > 5) output += `-${digits.slice(5, 7)}`;
  if (digits.length > 7) output += `-${digits.slice(7, 9)}`;
  return output;
};

const initForm = (data) => {
  const form = document.getElementById("booking-form");
  const success = document.getElementById("form-success");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const serviceSelect = document.getElementById("service");
  const errorBox = document.getElementById("form-error");

  if (!form || !success || !nameInput || !phoneInput || !serviceSelect || !errorBox) return;

  const clearError = () => {
    errorBox.textContent = "";
    errorBox.hidden = true;
  };

  const setError = (message, field) => {
    errorBox.textContent = message;
    errorBox.hidden = false;
    if (field) {
      field.setAttribute("aria-invalid", "true");
      field.focus();
    }
  };

  [nameInput, phoneInput, serviceSelect].forEach((field) => {
    field.addEventListener("input", () => {
      field.removeAttribute("aria-invalid");
      clearError();
    });
    field.addEventListener("change", () => {
      field.removeAttribute("aria-invalid");
      clearError();
    });
  });

  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value) phoneInput.value = "+375 (";
  });

  phoneInput.addEventListener("input", () => {
    const digits = digitsFromPhone(phoneInput.value);
    if (!digits && phoneInput.value.trim() === "") {
      phoneInput.value = "";
      return;
    }
    phoneInput.value = formatPhone(digits);
  });

  phoneInput.addEventListener("blur", () => {
    if (!digitsFromPhone(phoneInput.value)) phoneInput.value = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();

    if (nameInput.value.trim().length < 2) {
      setError(data.ui.nameError, nameInput);
      return;
    }

    if (digitsFromPhone(phoneInput.value).length !== 9) {
      setError(data.ui.phoneError, phoneInput);
      return;
    }

    if (!serviceSelect.value) {
      setError(data.ui.serviceError, serviceSelect);
      return;
    }

    form.reset();
    form.hidden = true;
    success.hidden = false;
    success.focus({ preventScroll: true });
    success.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center"
    });
  });
};

const initServiceLinks = (data) => {
  const serviceSelect = document.getElementById("service");
  const booking = document.getElementById("booking");
  const nameInput = document.getElementById("name");
  if (!serviceSelect || !booking) return;

  document.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.getAttribute("data-service") || "";
      const optionExists = Array.from(serviceSelect.options).some((option) => option.value === service);
      if (!optionExists && service) {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = service;
        serviceSelect.append(option);
      }
      serviceSelect.value = service;
      serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      booking.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
      if (nameInput) {
        window.setTimeout(() => nameInput.focus({ preventScroll: true }), 420);
      }
    });
  });
};

const initReveals = () => {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
  );

  items.forEach((item) => observer.observe(item));
};

const boot = async () => {
  try {
    const response = await fetch("data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    render(data);
  } catch (error) {
    app.innerHTML = '<div class="boot-error">Не удалось загрузить данные сайта. Обновите страницу.</div>';
    console.error(error);
  }
};

boot();
