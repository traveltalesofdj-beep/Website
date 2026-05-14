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

      <!-- 🎯 Airport T-Shirt Details Form (ONLY FOR SPAIN) -->
      ${isSpain ? `
      <section class="scroll-reveal">
        <h2 class="text-2xl font-bold text-white mb-6">🎯 Airport Pairing Game</h2>

        <div id="airport-tshirt-card" class="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow border border-white/30 space-y-6">

          <div class="text-center space-y-3">
            <p class="text-2xl font-bold text-gray-800">Enter your T-shirt details</p>
            <p class="text-gray-700 max-w-2xl mx-auto">
             Add your name and T-shirt size now 👕
Random pairings will be revealed soon!!

Here’s the twist 😄
Whoever you get, you must gift them a funny and embarrassing T-shirt… and they are REQUIRED to wear it for the entire trip until we reach the destination 🚐😂
            </p>
            <p class="text-sm text-red-700 font-bold bg-red-50/80 border border-red-200 rounded-lg px-4 py-3 inline-block">
              Last date to submit: 31st May 2026, 11:59 PM BST
            </p>
          </div>

          <form id="airport-tshirt-form" name="airport-tshirt-details" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="space-y-4 text-left">
            <input type="hidden" name="form-name" value="airport-tshirt-details" />
            <input type="hidden" name="subject" data-remove-prefix value="New Airport T-Shirt Detail Submission" />
            <input type="hidden" name="trip" value="${data.title}" />

            <p class="hidden">
              <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
            </p>

            <div>
              <label for="airportTshirtName" class="block text-sm font-semibold text-gray-800 mb-2">Name: <span class="text-red-600">*</span></label>
              <input id="airportTshirtName" name="name" type="text" required placeholder="Enter your name"
                class="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label for="airportTshirtSize" class="block text-sm font-semibold text-gray-800 mb-2">T-shirt Size: <span class="text-red-600">*</span></label>
              <select id="airportTshirtSize" name="tshirtSize" required
                class="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select your size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" id="airportTshirtSubmit"
              class="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Submit T-shirt details 👕
            </button>

            <p id="airportTshirtError" class="hidden text-sm text-red-700 font-semibold text-center bg-red-50/80 border border-red-200 rounded-lg px-4 py-3">
              Something went wrong. Please try submitting again.
            </p>
          </form>

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
    initAirportTshirtForm();
  }
}




// ================= AIRPORT T-SHIRT FORM =================

function encodeFormData(data) {
  return new URLSearchParams(data).toString();
}

function initAirportTshirtForm() {
  const form = document.getElementById("airport-tshirt-form");
  const card = document.getElementById("airport-tshirt-card");

  if (!form || !card) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const submitButton = document.getElementById("airportTshirtSubmit");
    const errorMessage = document.getElementById("airportTshirtError");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      submitButton.classList.add("opacity-70", "cursor-not-allowed");
    }

    if (errorMessage) {
      errorMessage.classList.add("hidden");
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(new FormData(form))
      });

      if (!response.ok) {
        throw new Error(`Netlify form submission failed with status ${response.status}`);
      }

      card.innerHTML = `
        <div class="text-center space-y-4 py-8" aria-live="polite">
          <div class="text-5xl">👕</div>
          <h3 class="text-2xl font-bold text-gray-800">Thank you for the response!</h3>
          <p class="text-gray-700 max-w-2xl mx-auto">
            Please watch this space for your assignment in a few days.
          </p>
          <p class="text-sm text-gray-600 max-w-2xl mx-auto">
            Pairing will be added soon.
          </p>
        </div>
      `;
    } catch (error) {
      console.error("Airport T-shirt form submission failed:", error);

      if (errorMessage) {
        errorMessage.classList.remove("hidden");
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit T-shirt details 👕";
        submitButton.classList.remove("opacity-70", "cursor-not-allowed");
      }
    }
  });
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