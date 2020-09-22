module.exports = {
  localBasePath: "/",
  remoteBasePath: "/public_html",
  del: [
    "/css/",
    "/fonts/",
    "/images/",
    "/img/",
    "/js/",
    "/scss/",
    "./index.html",
    "./favicon.ico"
  ],
  clear: [
    { dir: "/", test: "index.html" },
    { dir: "/", test: "favicon.ico" }
  ],

  sync: [{ src: "/dist", dest: "/" }]
};
