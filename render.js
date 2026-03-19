function renderSpainTrip(data) {
  const root = document.getElementById("spain-root");

  root.innerHTML = `
    
    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${data.overview.map(item => `
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-semibold text-lg mb-2">${item.title}</h3>
          <p class="text-gray-600">${item.value}</p>
        </div>
      `).join("")}
    </div>

    <!-- Itinerary -->
    <section>
      <h2 class="text-2xl font-bold mb-6">🗺️ Rough Itinerary</h2>

      <div class="space-y-6">
        ${data.itinerary.map(day => `
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="font-semibold text-lg mb-2">${day.title}</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              ${day.items.map(i => `<li>${i}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Practical Info -->
    <section>
      <h2 class="text-2xl font-bold mb-6">ℹ️ Good to Know</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${data.info.map(i => `
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="font-semibold mb-2">${i.title}</h3>
            <p class="text-gray-600">${i.value}</p>
          </div>
        `).join("")}
      </div>
    </section>

  `;
}