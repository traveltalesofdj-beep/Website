document.addEventListener("DOMContentLoaded", () => {
  const slots = [...document.querySelectorAll(".instagram-slot[data-instagram-url]")];
  if (!slots.length) return;

  slots.forEach(slot => {
    const url = slot.dataset.instagramUrl;
    if (!/^https:\/\/(www\.)?instagram\.com\/(p|reel)\//i.test(url)) return;
    const embed = document.createElement("blockquote");
    embed.className = "instagram-media";
    embed.dataset.instgrmPermalink = url.split("?")[0];
    embed.dataset.instgrmVersion = "14";
    embed.style.cssText = "background:#fff;border:0;border-radius:16px;box-shadow:0 10px 28px rgba(23,34,31,.08);margin:0 auto;min-width:280px;width:100%;";
    slot.replaceChildren(embed);
  });

  if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  } else {
    window.instgrm?.Embeds?.process();
  }
});
