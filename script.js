window.addEventListener("DOMContentLoaded", () => {
  const pageKey = "animated_" + window.location.pathname; // unique per page

  if (!sessionStorage.getItem(pageKey)) {
    document.body.classList.add("first-visit");
    sessionStorage.setItem(pageKey, "true");

    // remove the class after animations finish so hover effects still work
    setTimeout(() => {
      document.body.classList.remove("first-visit");
    }, 8000); // longest animation duration
  }
});
