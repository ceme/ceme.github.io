(function () {
  var IMAGE_PATH = "spiral.gif";

  // Load the gif exactly once. The browser fetches this single file, decodes
  // it, and stores it in cache. Once we hand that same cached resource to
  // CSS as a background-image, every tile repetition across the page reuses
  // the cached copy instead of triggering additional network requests.
  var loader = new Image();

  loader.onload = function () {
    document.body.style.backgroundImage = "url('" + IMAGE_PATH + "')";
    document.body.classList.add("tiled");
  };

  loader.onerror = function () {
    console.error("Failed to load " + IMAGE_PATH);
  };

  loader.src = IMAGE_PATH;
})();
