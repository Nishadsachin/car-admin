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
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

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

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 280);
  }, 3400);
};

const dynamicForms = document.querySelectorAll(".dynamic-form");

dynamicForms.forEach((form) => {
  const fleetSelect = form.querySelector("[data-fleet-select]");
  const note = form.querySelector("[data-dynamic-note]");
  const interestSelect = form.querySelector("[data-interest-select]");
  const contactMethod = form.querySelector("[data-contact-method]");
  const messageBox = form.querySelector("textarea");
  const phoneInput = form.querySelector("[data-phone-input]");

  const updateDynamicNote = () => {
    if (!note || !fleetSelect) return;

    const map = {
      "1-10 vehicles": "A focused walkthrough will be tailored for smaller teams that want faster booking and dispatch control.",
      "11-50 vehicles": "We’ll highlight how FleetNest helps growing fleets coordinate drivers, duties, and billing more efficiently.",
      "51-200 vehicles": "Expect a demo focused on visibility, role-based workflows, and stronger reporting across larger teams.",
      "201+ vehicles": "We’ll tailor the conversation around enterprise workflows, branch operations, scale, and process automation.",
    };

    note.textContent = map[fleetSelect.value] || map["1-10 vehicles"];
    note.style.transform = "translateY(-2px)";
    window.setTimeout(() => {
      note.style.transform = "translateY(0)";
    }, 180);
  };

  const updateMessagePlaceholder = () => {
    if (!messageBox) return;
    const interestText = interestSelect ? interestSelect.options[interestSelect.selectedIndex].text : "your workflow";
    const placeholders = {
      email: `Tell us what you'd like to improve around ${interestText.toLowerCase()}.`,
      phone: `Share a callback time and what you want to discuss about ${interestText.toLowerCase()}.`,
      whatsapp: `Tell us your key questions about ${interestText.toLowerCase()} and we can continue on WhatsApp.`,
    };
    const method = contactMethod ? contactMethod.value : "email";
    messageBox.placeholder = placeholders[method] || placeholders.email;
  };

  fleetSelect?.addEventListener("change", updateDynamicNote);
  interestSelect?.addEventListener("change", updateMessagePlaceholder);
  contactMethod?.addEventListener("change", updateMessagePlaceholder);

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (phoneInput && phoneInput.value.length !== 10) {
      createToast("Invalid mobile number", "Please enter a valid 10-digit Indian mobile number.");
      phoneInput.focus();
      return;
    }
    const firstName = form.querySelector('input[type="text"]')?.value?.trim() || "there";
    form.reset();
    updateDynamicNote();
    updateMessagePlaceholder();
    createToast("Demo request sent", `Thanks ${firstName}. Our FleetNest team will contact you shortly.`);
  });

  updateDynamicNote();
  updateMessagePlaceholder();
});

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
