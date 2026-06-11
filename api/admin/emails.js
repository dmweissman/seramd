import {
  createHandler,
  readStore,
  requireAdmin,
  requireMethod,
  requireStorage,
  sendJson,
  siteEmail,
} from "../_lib/util.js";

export default createHandler(async (request, response) => {
  if (!requireMethod(request, response, "GET")) {
    return;
  }
  if (!requireAdmin(request, response)) {
    return;
  }
  if (!requireStorage(response)) {
    return;
  }

  const { records, emails } = await readStore();
  sendJson(response, 200, { records, emails, siteEmail });
});
