const form = document.querySelector("#waitlist");
const note = document.querySelector("#form-note");
const waitlistButton = form?.querySelector("button[type='submit']");

function setFormNote(message, state = "neutral") {
  if (!note) {
    return;
  }

  note.textContent = message;
  note.dataset.state = state;
}

function setSubmitting(isSubmitting) {
  if (!waitlistButton) {
    return;
  }

  waitlistButton.disabled = isSubmitting;
  waitlistButton.setAttribute("aria-busy", String(isSubmitting));
  waitlistButton.textContent = isSubmitting ? "Saving..." : "Join waitlist";
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = String(new FormData(form).get("email") || "").trim();

  if (!email || !form.checkValidity()) {
    setFormNote("Enter a valid email address.", "error");
    form.reportValidity();
    return;
  }

  setSubmitting(true);
  setFormNote("Saving your spot...", "neutral");

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || "Could not save your email.");
    }

    setFormNote("You're on the private launch list.", "success");
    form.reset();
  } catch {
    setFormNote("You're on the list locally. Start the server to save emails to the dashboard.", "warning");
  } finally {
    setSubmitting(false);
  }
});
