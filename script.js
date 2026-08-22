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
    threshold: 0.18,
  }
);

revealItems.forEach((item) => {
  observer.observe(item);
});

const quoteForm = document.querySelector(".quote-form");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = "Request Sent";
    submitButton.disabled = true;

    window.setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      quoteForm.reset();
    }, 2200);
  });
}

const heroText = document.querySelector(".hero-title");

if (heroText) {
  const original = heroText.innerHTML;
  heroText.innerHTML = original
    .split(/(<span class="title-accent">.*?<\/span>)/)
    .map((part) => {
      if (part.startsWith('<span class="title-accent">')) {
        return part;
      }

      return part.replace(/([A-Za-z]+)/g, '<span class="word-lift">$1</span>');
    })
    .join("");
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      const faqAnswer = faq.querySelector(".faq-answer");
      if (faqAnswer) {
        faqAnswer.style.maxHeight = "0px";
      }
    });

    if (!isActive) {
      item.classList.add("active");
      question.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

const createToast = (title, message) => {
  let stack = document.querySelector(".toast-stack");

  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }

  const toast = document.createElement("div");
  toast.className = "site-toast";
  toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
  stack.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 280);
  }, 3200);
};

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    quoteForm.reset();
    createToast("Quote request sent", "Thanks. Our team will reach out within 2 business hours.");
  });
}

const leadForm = document.querySelector(".lead-form");

if (leadForm) {
  const radios = leadForm.querySelectorAll('input[name="fleet-size"]');
  const messageBox = leadForm.querySelector("textarea");
  const methodSelect = leadForm.querySelector('select[id="preferredContact"]');

  if (radios.length) {
    const note = document.createElement("div");
    note.className = "dynamic-note mt-1";

    const radioBlock = leadForm.querySelector(".fleet-options");
    if (radioBlock && radioBlock.parentElement) {
      radioBlock.parentElement.insertAdjacentElement("beforeend", note);
    }

    const updateLeadNote = () => {
      const selectedIndex = [...radios].findIndex((radio) => radio.checked);
      const messages = [
        "Great for small fleets that want a cleaner booking and dispatch workflow.",
        "A strong fit for growing operators that need better coordination across teams.",
        "Ideal for scaling businesses that want deeper reporting and operational control.",
        "Best for large fleets that need structure, visibility, and enterprise-style workflows.",
      ];

      note.textContent = messages[Math.max(selectedIndex, 0)] || messages[0];
      note.style.transform = "translateY(-2px)";
      window.setTimeout(() => {
        note.style.transform = "translateY(0)";
      }, 180);
    };

    radios.forEach((radio) => {
      radio.addEventListener("change", updateLeadNote);
    });

    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      leadForm.reset();
      updateLeadNote();
      if (messageBox) {
        messageBox.placeholder = "How can we help you?";
      }
      createToast("Form submitted", "Your FleetNest request has been received successfully.");
    });

    updateLeadNote();
  }

  if (methodSelect && messageBox) {
    methodSelect.addEventListener("change", () => {
      const placeholders = {
        email: "Tell us about your current workflow and what you'd like to improve.",
        phone: "Share a convenient callback time and what you want to discuss.",
        whatsapp: "Tell us what you want to explore and we can continue on WhatsApp.",
      };

      messageBox.placeholder = placeholders[methodSelect.value] || placeholders.email;
    });
  }
}

const normalizeLinks = () => {
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

    if (
      label.includes("book demo") ||
      label.includes("book a demo") ||
      label.includes("talk to sales") ||
      label.includes("start free trial")
    ) {
      link.setAttribute("href", "contact.html");
    }
  });
};

normalizeLinks();
