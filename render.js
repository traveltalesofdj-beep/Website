function renderSpainTrip(data) {
  const root = document.getElementById("spain-root");

  root.innerHTML = `

    <!-- Overview -->
    <div class="grid md:grid-cols-3 gap-6">
      ${data.overview.map(o => `
        <div class="bg-white p-5 rounded-xl shadow">
          <h3 class="font-semibold">${o.title}</h3>
          <p class="text-gray-600">${o.value}</p>
        </div>
      `).join("")}
    </div>

    <!-- Flights -->
    <section>
      <h2 class="text-xl font-bold mb-4">✈️ Flights</h2>
      ${data.flights.map(f => `
        <div class="bg-white p-5 rounded-xl shadow mb-4">
          <p class="font-semibold">${f.route}</p>
          <p class="text-gray-500">${f.time}</p>
        </div>
      `).join("")}
    </section>

    <!-- Hotels -->
    <section>
      <h2 class="text-xl font-bold mb-4">🏨 Stays</h2>
      <div class="grid md:grid-cols-2 gap-6">
        ${data.hotels.map(h => `
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <img src="${h.image}" class="w-full h-40 object-cover"/>
            <div class="p-4">
              <h3 class="font-semibold">${h.name}</h3>
              <p class="text-gray-500 text-sm">${h.nights}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </section>

<!-- Timeline Itinerary -->
<section>
  <h2 class="text-xl font-bold mb-6">🗺️ Journey Timeline</h2>

  <div class="relative border-l-2 border-gray-300 ml-4">

    ${data.itinerary.map(i => `
      <div class="mb-8 ml-6">

        <!-- Dot -->
        <span class="absolute -left-3 flex items-center justify-center w-6 h-6 bg-indigo-600 rounded-full text-white text-xs">
          •
        </span>

        <!-- Card -->
        <div class="bg-white p-5 rounded-xl shadow">
          <h3 class="font-semibold text-lg mb-2">${i.title}</h3>

          <ul class="list-disc ml-5 text-gray-600">
            ${i.items.map(it => `<li>${it}</li>`).join("")}
          </ul>
        </div>

      </div>
    `).join("")}

  </div>
</section>

  `;
}