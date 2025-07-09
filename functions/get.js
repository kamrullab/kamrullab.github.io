export async function onRequest(context) {
  const tryUrl = async (url) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    } catch {
      return false;
    }
  };

  const primary = "https://get.activated.win";
  const fallback = "https://massgrave.dev/get";

  const isPrimaryUp = await tryUrl(primary);
  const target = isPrimaryUp ? primary : fallback;

  return Response.redirect(target, 302);
}
