const state = {
  records: [],
  emails: [],
  selectedCapture: "",
};

const contactList = document.querySelector("#contact-list");
const inboxList = document.querySelector("#inbox-list");
const totalCount = document.querySelector("#total-count");
const autoCount = document.querySelector("#auto-count");
const inboxCount = document.querySelector("#inbox-count");
const outboundCount = document.querySelector("#outbound-count");
const recipient = document.querySelector("#recipient");
const capturedOptions = document.querySelector("#captured-email-options");
const search = document.querySelector("#search");
const note = document.querySelector("#composer-note");
const siteEmail = document.querySelector("#site-email");
const form = document.querySelector("#message-form");
const refreshButton = document.querySelector("#refresh");

function adminHeaders(extra = {}) {
  const token = localStorage.getItem("seramdAdminToken");
  return token ? { ...extra, authorization: `Bearer ${token}` } : extra;
}

async function adminFetch(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: adminHeaders(options.headers || {}),
  });

  if (response.status !== 401) {
    return response;
  }

  const token = prompt("Enter admin token");
  if (!token) {
    return response;
  }

  localStorage.setItem("seramdAdminToken", token);
  return fetch(path, {
    ...options,
    headers: adminHeaders(options.headers || {}),
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) {
    return "None";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function inboxEmails() {
  return state.emails
    .filter((email) => email.direction === "inbound")
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
}

function filteredRecords() {
  const query = search.value.trim().toLowerCase();
  if (!query) {
    return state.records;
  }

  return state.records.filter((record) => record.email.includes(query));
}

function selectCapture(email) {
  state.selectedCapture = email;
  recipient.value = email;
  renderContacts();
}

function renderStats() {
  totalCount.textContent = String(state.records.length);
  autoCount.textContent = String(state.emails.filter((email) => email.kind === "auto").length);
  inboxCount.textContent = String(state.emails.filter((email) => email.direction === "inbound").length);
  outboundCount.textContent = String(state.emails.filter((email) => email.direction === "outbound").length);
}

function renderRecipientOptions() {
  capturedOptions.innerHTML = state.records
    .map((record) => `<option value="${escapeHtml(record.email)}"></option>`)
    .join("");
}

function renderContacts() {
  const records = filteredRecords();

  if (!records.length) {
    contactList.innerHTML = `<div class="empty">No captured emails yet. Submit the public waitlist form to add one.</div>`;
    return;
  }

  contactList.innerHTML = records
    .map((record) => {
      const selected = record.email === state.selectedCapture ? " selected" : "";
      const lastActivity = record.lastMessageAt || record.lastSubmittedAt || record.createdAt;
      const autoLabel = record.autoMessageEnabled === false ? "manual" : "auto queued";
      return `
        <button class="contact-row${selected}" type="button" data-email="${escapeHtml(record.email)}">
          <span>
            <strong>${escapeHtml(record.email)}</strong>
            <small>${escapeHtml(record.source || "waitlist")} · ${formatDate(lastActivity)}</small>
          </span>
          <em>${escapeHtml(autoLabel)}</em>
        </button>
      `;
    })
    .join("");

  for (const button of contactList.querySelectorAll("[data-email]")) {
    button.addEventListener("click", () => selectCapture(button.dataset.email));
  }
}

function renderInbox() {
  const messages = inboxEmails();

  if (!messages.length) {
    inboxList.innerHTML = `<div class="empty">Inbox is empty. Domain email received by the backend will save here automatically.</div>`;
    return;
  }

  inboxList.innerHTML = messages
    .map((message) => {
      return `
        <article class="inbox-email">
          <header>
            <div>
              <strong>${escapeHtml(message.from)}</strong>
              <span>${escapeHtml(message.subject)}</span>
            </div>
            <small>${formatDate(message.createdAt)}</small>
          </header>
          <p>${escapeHtml(message.body)}</p>
          <button type="button" data-reply-to="${escapeHtml(message.from)}">Reply to this email</button>
        </article>
      `;
    })
    .join("");

  for (const button of inboxList.querySelectorAll("[data-reply-to]")) {
    button.addEventListener("click", () => {
      recipient.value = button.dataset.replyTo;
      recipient.focus();
    });
  }
}

async function loadRecords() {
  const response = await adminFetch("/api/admin/emails", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Could not load email dashboard.");
  }

  const payload = await response.json();
  state.records = payload.records || [];
  state.emails = payload.emails || [];
  siteEmail.textContent = `Website email: ${payload.siteEmail}`;

  if (!state.selectedCapture && state.records[0]) {
    state.selectedCapture = state.records[0].email;
    recipient.value = state.selectedCapture;
  }

  renderStats();
  renderRecipientOptions();
  renderContacts();
  renderInbox();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  note.textContent = "Saving outgoing email...";
  note.className = "form-note";

  const response = await adminFetch("/api/admin/messages", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    note.textContent = payload.error || "Could not save outgoing email.";
    note.className = "form-note error";
    return;
  }

  note.textContent = "Outgoing email saved and queued.";
  note.className = "form-note success";
  await loadRecords();
});

search.addEventListener("input", renderContacts);
refreshButton.addEventListener("click", loadRecords);

loadRecords().catch((error) => {
  contactList.innerHTML = `<div class="empty">${error.message}</div>`;
  inboxList.innerHTML = `<div class="empty">${error.message}</div>`;
});
