function renderSpainTrip(data) {
  const root = document.getElementById("trip-root");

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

      <!-- Timeline -->
      <section class="scroll-reveal">
        <h2 class="text-2xl font-bold text-white mb-6">🗺️ Your Journey</h2>

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
}


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