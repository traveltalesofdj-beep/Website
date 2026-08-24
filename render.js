function renderTrip(data) {
  const root = document.getElementById("trip-root");
  if (!root || !data || typeof data !== "object") return;

  const overview = Array.isArray(data.overview) ? data.overview : [];
  const flights = Array.isArray(data.flights) ? data.flights : [];
  const hotels = Array.isArray(data.hotels) ? data.hotels : [];
  const weatherStops = Array.isArray(data.weatherStops) ? data.weatherStops : [];
  const tshirtResults = Array.isArray(data.tshirtResults) ? data.tshirtResults : [];
  const itinerary = Array.isArray(data.itinerary) ? data.itinerary : [];
  const routeCodes = Array.isArray(data.routeCodes) ? data.routeCodes : [];

  root.innerHTML = `
    <div class="trip-layout">
      <header class="trip-hero scroll-reveal">
        <p class="trip-kicker">${data.eyebrow || "A new adventure"}</p>
        <h1>${data.title || "Upcoming trip"}</h1>
        <p>${data.subtitle || "More details are coming soon."}</p>
        ${routeCodes.length === 2 ? `<div class="hero-route" aria-label="Route from ${routeCodes[0]} to ${routeCodes[1]}"><span>${routeCodes[0]}</span><i class="fas fa-arrow-right"></i><span>${routeCodes[1]}</span></div>` : ""}
      </header>

      ${overview.length ? `
        <section class="overview-grid scroll-reveal" aria-label="Trip overview">
          ${overview.map(item => `
            <article class="glass-card overview-card">
              <i class="fas ${item.icon || "fa-compass"}"></i>
              <div><span>${item.title}</span><strong>${item.value}</strong></div>
            </article>
          `).join("")}
        </section>
      ` : ""}

      ${data.documentsLink ? `
        <div class="documents-cta scroll-reveal">
          <div class="documents-cta-icon"><i class="fas fa-folder-open"></i></div>
          <div><span class="card-label">Shared trip folder</span><h2>Tickets, bookings and IDs</h2><p>Open the group’s shared Google Drive folder for the latest travel documents.</p></div>
          <a href="${data.documentsLink}" target="_blank" rel="noopener" class="trip-button">Open documents <i class="fas fa-arrow-up-right-from-square"></i></a>
        </div>
      ` : ""}

      ${flights.length || data.train ? `
        <section class="trip-section scroll-reveal">
          ${sectionHeading("Getting there", "Flights, trains and the useful details in between", "fa-route")}
          <div class="flight-grid with-train">
            ${flights.map(flight => `
              <article class="glass-card transport-card">
                <img src="${flight.image}" alt="Aircraft in flight" loading="lazy">
                <div class="card-body">
                  <span class="card-label">${flight.flight || "Flight"}</span>
                  <h3>${flight.route}</h3>
                  <p>${flight.time}</p>
                </div>
              </article>
            `).join("")}
            ${data.train ? `
              <article class="glass-card transport-card">
                <img src="${data.train.image}" alt="Train for this journey" loading="lazy">
                <div class="card-body">
                  <span class="card-label">${data.train.operator}</span>
                  <h3>${data.train.route}</h3>
                  <p>${data.train.time}</p>
                  <small>${data.train.details || ""}</small>
                </div>
              </article>
            ` : ""}
          </div>
        </section>
      ` : ""}

      ${weatherStops.length ? `
        <section class="trip-section scroll-reveal">
          ${sectionHeading("Weather for the journey", "A live daily forecast for each stop", "fa-cloud-sun")}
          <div id="weather-grid" class="weather-grid" aria-live="polite">
            ${weatherStops.map(stop => `
              <article class="glass-card weather-city" data-weather-city="${stop.city}">
                <div class="weather-city-head"><div><span class="card-label">${stop.dates}</span><h3>${stop.city}</h3></div><i class="fas fa-circle-notch fa-spin"></i></div>
                <p class="weather-status">Loading the latest forecast…</p>
              </article>
            `).join("")}
          </div>
          <p class="weather-credit">Forecast updates live from <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>. Conditions may change.</p>
        </section>
      ` : ""}

      ${hotels.length ? `
        <section class="trip-section scroll-reveal">
          ${sectionHeading("Where we’re staying", "A comfortable base for the journey", "fa-bed")}
          <div class="stay-grid">
            ${hotels.map(hotel => `
              <article class="glass-card stay-card">
                <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
                <div class="card-body">
                  <span class="card-label">${hotel.location || "Trip stay"}</span>
                  <h3>${hotel.name}</h3>
                  <p>${hotel.nights}</p>
                  ${hotel.link ? `<a href="${hotel.link}" target="_blank" rel="noopener" class="text-link">View stay <i class="fas fa-arrow-right"></i></a>` : ""}
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}

      ${tshirtResults.length ? `
        <section class="trip-section scroll-reveal">
          ${sectionHeading("T-shirt draw results", "The game is finished — here’s the final gifting list", "fa-shirt")}
          <div class="results-grid">
            ${tshirtResults.map(result => `
              <article class="glass-card result-card">
                <div class="result-person"><span>${result.giver}</span><i class="fas fa-arrow-right"></i><strong>${result.receiver}</strong></div>
                <p>Receiver size <b>${result.size}</b></p>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}

      ${itinerary.length ? `
        <section class="trip-section scroll-reveal">
          ${sectionHeading("Trip story", "The itinerary, day by day", "fa-map-location-dot")}
          <div class="timeline">
            ${itinerary.map((day, index) => `
              <article class="timeline-row">
                <div class="timeline-marker"><span>${String(index + 1).padStart(2, "0")}</span></div>
                <div class="glass-card timeline-card">
                  <span class="card-label">${day.date || ""}</span>
                  <h3>${day.title}</h3>
                  <ul>${(Array.isArray(day.items) ? day.items : []).map(item => `<li><span></span>${item}</li>`).join("")}</ul>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}
    </div>
  `;

  initScrollAnimations();
  loadTripWeather(weatherStops);
}

// Kept as an alias for any older page that still calls the original renderer name.
function renderSpainTrip(data) {
  renderTrip(data);
}

function sectionHeading(title, subtitle, icon) {
  return `<div class="section-heading"><div class="section-icon"><i class="fas ${icon}"></i></div><div><h2>${title}</h2><p>${subtitle}</p></div></div>`;
}

const weatherDescriptions = {
  0: ["Clear", "fa-sun"], 1: ["Mostly clear", "fa-sun"], 2: ["Partly cloudy", "fa-cloud-sun"], 3: ["Overcast", "fa-cloud"],
  45: ["Foggy", "fa-smog"], 48: ["Rime fog", "fa-smog"], 51: ["Light drizzle", "fa-cloud-rain"], 53: ["Drizzle", "fa-cloud-rain"],
  55: ["Heavy drizzle", "fa-cloud-showers-heavy"], 61: ["Light rain", "fa-cloud-rain"], 63: ["Rain", "fa-cloud-showers-heavy"],
  65: ["Heavy rain", "fa-cloud-showers-heavy"], 80: ["Rain showers", "fa-cloud-rain"], 81: ["Rain showers", "fa-cloud-showers-heavy"],
  82: ["Heavy showers", "fa-cloud-showers-heavy"], 95: ["Thunderstorms", "fa-cloud-bolt"], 96: ["Storms and hail", "fa-cloud-bolt"], 99: ["Storms and hail", "fa-cloud-bolt"]
};

async function loadTripWeather(stops) {
  await Promise.all(stops.map(async stop => {
    const card = document.querySelector(`[data-weather-city="${stop.city}"]`);
    if (!card) return;
    const params = new URLSearchParams({
      latitude: stop.latitude,
      longitude: stop.longitude,
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: stop.timezone || "Europe/Madrid",
      start_date: stop.startDate,
      end_date: stop.endDate
    });
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!response.ok) throw new Error("Forecast unavailable");
      const payload = await response.json();
      card.querySelector(".fa-spin")?.remove();
      card.querySelector(".weather-status")?.remove();
      const days = payload.daily.time.map((date, index) => {
        const [label, icon] = weatherDescriptions[payload.daily.weather_code[index]] || ["Mixed", "fa-cloud-sun"];
        const dateLabel = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`));
        return `<div class="weather-day"><span>${dateLabel}</span><i class="fas ${icon}" title="${label}"></i><strong>${Math.round(payload.daily.temperature_2m_max[index])}°</strong><small>${Math.round(payload.daily.temperature_2m_min[index])}° · ${payload.daily.precipitation_probability_max[index] ?? 0}% rain</small></div>`;
      }).join("");
      card.insertAdjacentHTML("beforeend", `<div class="weather-days">${days}</div>`);
    } catch (error) {
      const status = card.querySelector(".weather-status");
      card.querySelector(".fa-spin")?.remove();
      if (status) status.textContent = "The live forecast is temporarily unavailable. Please check again shortly.";
    }
  }));
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".scroll-reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("show"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  elements.forEach(element => observer.observe(element));
}
