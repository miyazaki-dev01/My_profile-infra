function handler(event) {
  var req = event.request;
  var uri = req.uri || "/";

  // NOTE: API は書き換え対象外。将来 /api/* を別ビヘイビアに切り出すまでの保険。
  var skip = ["/api/"];
  for (var i = 0; i < skip.length; i++) {
    if (uri.startsWith(skip[i])) return req;
  }

  if (uri.endsWith("/")) {
    req.uri += "index.html"; // /docs/ → /docs/index.html
    return req;
  }

  var last = uri.split("/").pop();
  if (last && last.indexOf(".") === -1) {
    req.uri += ".html"; // /about → /about.html
  }

  return req;
}
