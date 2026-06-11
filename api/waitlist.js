import { applyWaitlistSignup } from "../lib/waitlist.js";
import {
  createHandler,
  readJsonBody,
  readStore,
  requireMethod,
  requireStorage,
  sendJson,
  siteEmail,
  writeStore,
} from "./_lib/util.js";

export default createHandler(async (request, response) => {
  if (!requireMethod(request, response, "POST")) {
    return;
  }
  if (!requireStorage(response)) {
    return;
  }

  const { payload, error } = await readJsonBody(request);
  if (error) {
    sendJson(response, 400, { error });
    return;
  }

  const store = await readStore();
  const result = applyWaitlistSignup(store.records, store.emails, payload.email, siteEmail);

  if (result.error) {
    sendJson(response, 400, { error: result.error });
    return;
  }

  await writeStore(store);
  sendJson(response, 201, { ok: true, autoMessageQueued: result.autoMessageQueued });
});
