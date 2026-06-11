import { createHandler, requireMethod, sendJson, siteEmail } from "./_lib/util.js";

export default createHandler(async (request, response) => {
  if (!requireMethod(request, response, "GET")) {
    return;
  }

  sendJson(response, 200, { siteEmail });
});
