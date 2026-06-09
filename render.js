function renderSpainTrip(data) {
  const root = document.getElementById("trip-root");

  const isSpain = data.title.toLowerCase().includes("spain");

  root.innerHTML = `

    <div class="space-y-16">

      <!-- HERO -->
      <div class="scroll-reveal text-center">
        <h1 class="text-4xl font-bold text-white mb-2">${data.title}</h1>
        <p class="text-white/80">${data.subtitle}</p>
      </div>

      <!-- Overview -->
      <div class="scroll-reveal grid md:grid-cols-3 gap-6">
        ${data.overview.map(o => `
          <div 
            class="bg-white/60 backdrop-blur-md p-5 rounded-xl shadow border border-white/30 text-center
            ${o.link ? 'cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300' : ''}"
            ${o.link ? `onclick="window.open('${o.link}', '_blank')"` : ''}
          >
            <h3 class="font-semibold text-gray-800">${o.title}</h3>
            <p class="text-gray-700">${o.value}</p>
          </div>
        `).join("")}
      </div>

      <!-- Flights -->
      <section class="scroll-reveal">
        <h2 class="text-2xl font-bold text-white mb-6">✈️ Flights</h2>

        ${data.flights.map(f => `
          <div class="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/30 mb-4 hover:shadow-xl transition">
            <img src="${f.image}" class="w-full h-40 object-cover"/>
            <div class="p-5">
              <p class="font-semibold text-lg">${f.route}</p>
              <p class="text-gray-600 text-sm">${f.time}</p>
            </div>
          </div>
        `).join("")}
      </section>

      <!-- Hotels -->
      <section class="scroll-reveal">
        <h2 class="text-2xl font-bold text-white mb-6">🏨 Stays</h2>

        <div class="grid md:grid-cols-2 gap-6">
          ${data.hotels.map(h => `
            <div class="bg-white/60 backdrop-blur-md rounded-2xl shadow overflow-hidden border border-white/30 hover:shadow-xl transition">
              
              <img src="${h.image}" class="w-full h-40 object-cover"/>

              <div class="p-4">
                <h3 class="font-semibold text-gray-800">${h.name}</h3>
                <p class="text-gray-600 text-sm">${h.nights}</p>

                ${h.link ? `
                  <a href="${h.link}" target="_blank"
                     class="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                     View Stay →
                  </a>
                ` : ''}
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- 🎯 Airport Pairing Generator (ONLY FOR SPAIN) -->
      ${isSpain ? `
      <section class="scroll-reveal">
        <h2 class="text-2xl font-bold text-white mb-6">🎯 Airport Pairing Game</h2>

        <div id="airport-pairing-card" class="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow border border-white/30 space-y-6">

          <div class="text-center space-y-3">
            <p class="text-2xl font-bold text-gray-800">Generate your T-shirt person</p>
            <p class="text-gray-700 max-w-2xl mx-auto">
              Select your name and let the generator reveal who you are gifting a T-shirt to.
            </p>
          </div>

          <form id="airport-pairing-form" class="space-y-4 text-left">
            <div>
              <label for="airportGiverName" class="block text-sm font-semibold text-gray-800 mb-2">Your name:</label>
              <select id="airportGiverName" name="giver" required
                class="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select your name</option>
              </select>
            </div>

            <button type="submit" id="airportPairingButton"
              class="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Generate my person 🎲
            </button>

            <div id="airportShuffleBox" class="hidden text-center bg-white/70 border border-white/40 rounded-xl px-4 py-5" aria-live="polite">
              <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Shuffling names...</p>
              <p id="airportShuffleName" class="text-3xl font-bold text-indigo-700 mt-2">?</p>
            </div>

            <p id="airportPairingError" class="hidden text-sm text-red-700 font-semibold text-center bg-red-50/80 border border-red-200 rounded-lg px-4 py-3">
              Something went wrong while generating your person. Please try again.
            </p>
          </form>

          <div id="airportPairingResult" class="hidden" aria-live="polite"></div>

        </div>
      </section>
      ` : ''}

      <!-- Timeline -->
      <section class="scroll-reveal">
        <h2 class="text-2xl font-bold text-white mb-6">🗺️ Our Journey</h2>

        <div class="space-y-8">
          ${data.itinerary.map((i, index) => `
            <div class="flex items-start gap-6">

              <div class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold shadow-lg">
                ${index + 1}
              </div>

              <div class="flex-1 bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow border border-white/30 hover:shadow-xl transition">
                <h3 class="font-semibold text-lg mb-2">${i.title}</h3>

                <ul class="space-y-1 text-gray-700">
                  ${i.items.map(it => `
                    <li class="flex items-center gap-2">
                      <span class="text-indigo-500">•</span>
                      ${it}
                    </li>
                  `).join("")}
                </ul>
              </div>

            </div>
          `).join("")}
        </div>
      </section>

    </div>
  `;

  initScrollAnimations();

  if (isSpain) {
    initAirportPairingGenerator();
  }
}




// ================= AIRPORT PAIRING GENERATOR =================

const AIRPORT_PARTICIPANTS = [
  "Cenvy",
  "Conchita",
  "Dillon",
  "Jovita",
  "Leander",
  "Lionel",
  "Sonal",
  "Zachery"
];

function initAirportPairingGenerator() {
  const form = document.getElementById("airport-pairing-form");
  const select = document.getElementById("airportGiverName");
  const button = document.getElementById("airportPairingButton");
  const shuffleBox = document.getElementById("airportShuffleBox");
  const shuffleName = document.getElementById("airportShuffleName");
  const errorMessage = document.getElementById("airportPairingError");
  const result = document.getElementById("airportPairingResult");

  if (!form || !select || !button || !shuffleBox || !shuffleName || !errorMessage || !result) return;

  AIRPORT_PARTICIPANTS.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const giver = select.value;
    const displayNames = AIRPORT_PARTICIPANTS.filter((name) => name !== giver);
    let shuffleIndex = 0;

    button.disabled = true;
    button.textContent = "Generating...";
    button.classList.add("opacity-70", "cursor-not-allowed");
    errorMessage.classList.add("hidden");
    result.classList.add("hidden");
    result.innerHTML = "";
    shuffleBox.classList.remove("hidden");
    shuffleName.textContent = "?";

    const shuffleTimer = window.setInterval(() => {
      const randomOffset = Math.floor(Math.random() * displayNames.length);
      shuffleIndex = (shuffleIndex + 1 + randomOffset) % displayNames.length;
      shuffleName.textContent = displayNames[shuffleIndex];
    }, 90);

    try {
      const assignmentRequest = fetch("/.netlify/functions/airportAssignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giver })
      });

      await new Promise((resolve) => window.setTimeout(resolve, 1500));

      const response = await assignmentRequest;

      if (!response.ok) {
        throw new Error(`Assignment request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.receiver) {
        throw new Error("Assignment response was missing receiver details");
      }

      window.clearInterval(shuffleTimer);
      shuffleName.textContent = data.receiver.name;

      window.setTimeout(() => {
        shuffleBox.classList.add("hidden");
        renderAirportPairingResult(result, data);
        button.disabled = false;
        button.textContent = "Reveal again 🎲";
        button.classList.remove("opacity-70", "cursor-not-allowed");
      }, 450);
    } catch (error) {
      console.error("Airport pairing generation failed:", error);
      window.clearInterval(shuffleTimer);
      shuffleBox.classList.add("hidden");
      errorMessage.classList.remove("hidden");
      button.disabled = false;
      button.textContent = "Generate my person 🎲";
      button.classList.remove("opacity-70", "cursor-not-allowed");
    }
  });
}

function renderAirportPairingResult(result, data) {
  const sizeText = data.receiver.tshirtSize || "Size not added yet";

  result.innerHTML = `
    <div class="bg-white/75 border border-white/50 rounded-2xl p-6 text-center shadow-inner space-y-5">
      <div class="text-5xl">👕</div>
      <div>
        <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">${data.giver.name}, you are giving a funny T-shirt to</p>
        <h3 class="text-4xl font-extrabold text-indigo-700 mt-2">${data.receiver.name}</h3>
      </div>

      <div class="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
        <div class="bg-white/80 rounded-xl px-4 py-4 border border-white/60">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Receiver Name</p>
          <p class="text-xl font-bold text-gray-800">${data.receiver.name}</p>
        </div>
        <div class="bg-white/80 rounded-xl px-4 py-4 border border-white/60">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">T-Shirt Size</p>
          <p class="text-xl font-bold text-gray-800">${sizeText}</p>
        </div>
      </div>

    </div>
  `;

  result.classList.remove("hidden");
}

// ================= SCROLL =================

function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}