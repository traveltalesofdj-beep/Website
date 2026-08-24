document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("body > nav");
  if (nav) {
    nav.classList.add("tt-nav");
    const brand = nav.querySelector('a[href="index.html"], a[href^="index.html#"]');
    if (brand) {
      brand.classList.add("tt-brand");
      const existingMark = brand.querySelector(".tt-brand-mark, .brand-mark");
      if (existingMark) {
        existingMark.classList.add("tt-brand-mark");
      } else {
        const mark = document.createElement("span");
        mark.className = "tt-brand-mark";
        mark.setAttribute("aria-hidden", "true");
        mark.innerHTML = '<i class="fas fa-compass"></i>';
        brand.prepend(mark);
      }
    }
  }

  document.querySelectorAll("body > footer").forEach(footer => footer.classList.add("tt-footer"));

  if (!document.querySelector(".coffee-float")) {
    const support = document.createElement("a");
    support.className = "coffee-float";
    support.href = "https://buymeacoffee.com/traveltalesofdj";
    support.target = "_blank";
    support.rel = "noopener";
    support.setAttribute("aria-label", "Buy Travel Tales a coffee");
    support.innerHTML = '<i class="fas fa-mug-hot"></i><span>Buy us a coffee</span>';
    document.body.appendChild(support);
  }
});
