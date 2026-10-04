// gallery.js: filter buttons and lightbox for the Projects gallery
(function () {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const buttons = document.querySelectorAll(".filter-btn");
  const lb = document.getElementById("lightbox");
  if (!items.length || !lb) return;
  const lbImg = lb.querySelector(".lb-img");
  let visible = items.slice();
  let index = 0;

  buttons.forEach(btn => btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    items.forEach(it => it.classList.toggle("hide", f !== "all" && it.dataset.group !== f));
    visible = items.filter(it => !it.classList.contains("hide"));
  }));

  function show(i) {
    index = (i + visible.length) % visible.length;
    const img = visible[index].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
  }
  function open(i) { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); }
  function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }

  items.forEach(it => it.addEventListener("click", () => open(visible.indexOf(it))));
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
