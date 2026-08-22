const revealItems = document.querySelectorAll(".reveal-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item) => observer.observe(item));

const heroTitle = document.querySelector(".hero-title");

if (heroTitle) {
  const original = heroTitle.innerHTML;
  heroTitle.innerHTML = original
    .split(/(<span class="title-accent">.*?<\/span>)/)
    .map((part) => {
      if (part.startsWith('<span class="title-accent">')) {
        return part;
      }

      return part.replace(/([A-Za-z]+)/g, '<span class="word-rise">$1</span>');
    })
    .join("");
}

const style = document.createElement("style");
style.textContent = `
  .hero-title .word-rise {
    display: inline-block;
    margin-right: 0.24em;
    opacity: 0;
    transform: translateY(22px) rotateX(30deg);
    animation: wordRise 0.8s ease forwards;
  }
  .hero-title .word-rise:nth-child(1) { animation-delay: 0.05s; }
  .hero-title .word-rise:nth-child(2) { animation-delay: 0.12s; }
  .hero-title .word-rise:nth-child(3) { animation-delay: 0.19s; }
  .hero-title .word-rise:nth-child(4) { animation-delay: 0.26s; }
  @keyframes wordRise {
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0deg);
    }
  }
`;
document.head.appendChild(style);

document.querySelectorAll(".nav-link").forEach((link) => {
  const label = link.textContent.trim().toLowerCase();

  if (label === "home") {
    link.setAttribute("href", "index.html");
  }
  if (label === "about") {
    link.setAttribute("href", "about.html");
  }
  if (label === "features") {
    link.setAttribute("href", "features.html");
  }
  if (label === "contact" || label === "book demo") {
    link.setAttribute("href", "contact.html");
  }
  if (label === "pricing") {
    link.setAttribute("href", "index.html#pricing");
  }
});

document.querySelectorAll("a.btn").forEach((link) => {
  const label = link.textContent.trim().toLowerCase();
  if (label.includes("book a demo") || label.includes("book demo")) {
    link.setAttribute("href", "contact.html");
  }
});
