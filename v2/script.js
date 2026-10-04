document.documentElement.classList.add("js");

const pics = [
  ["01-party-plate-grand-food-tasting-mar-2024","pp","Party Plate Grand Food Tasting invitation, March 2024"],
  ["02-party-plate-toast-wedding-fair","pp","Party Plate Toast Wedding Fair promo"],
  ["03-party-plate-food-tasting-may-25-2025","pp","Party Plate Grand Food Tasting invitation, May 25 2025"],
  ["04-party-plate-food-tasting-may-24-2025","pp","Party Plate Grand Food Tasting invitation, May 24 2025"],
  ["05-party-plate-catering-service","pp","Party Plate Catering Service ad"],
  ["06-party-plate-wedding-cake","pp","Party Plate wedding cake post"],
  ["07-party-plate-food-tasting-oct-2025","pp","Party Plate Grand Food Tasting invitation, October 2025"],
  ["08-hearts-bells-pandan-cake","hb","Hearts and Bells pandan cake layers breakdown"],
  ["09-hearts-bells-flower-wreath-cake","hb","Hearts and Bells flower wreath cake"],
  ["10-hearts-bells-heart-cakes","hb","Hearts and Bells heart cakes"],
  ["11-hearts-bells-valentine-giveaway","hb","Hearts and Bells Valentine's Heart Cake giveaway"],
  ["12-hearts-bells-christmas-caramel-cakes","hb","Hearts and Bells Christmas Caramel Cakes"],
  ["13-hearts-bells-gelato-collection","hb","Hearts and Bells Gelato Collection"],
  ["14-hearts-bells-midnight-mocha","hb","Hearts and Bells Midnight Mocha cake"],
  ["15-hearts-bells-limited-stocks","hb","Hearts and Bells limited stocks announcement"],
  ["16-hearts-bells-chocolate-cake-salad","hb","Hearts and Bells chocolate cake post"],
  ["17-hearts-bells-tropical-duo","hb","Hearts and Bells Tropical Duo cake"],
  ["18-hearts-bells-have-them-all","hb","Hearts and Bells cake lineup"]
];
const IMG = "../images/";

document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

(function () {
  const words = ["Graphic Designer", "Layout Artist"];
  const el = document.getElementById("typed");
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 50 : 100);
  })();
})();

const gallery = document.getElementById("gallery");
pics.forEach(([f, g, a]) => {
  const fig = document.createElement("figure");
  fig.className = "g-item reveal";
  fig.dataset.group = g;
  fig.innerHTML = '<img src="' + IMG + f + '.jpg" alt="' + a + '" loading="lazy">';
  gallery.appendChild(fig);
});

const items = Array.from(document.querySelectorAll(".g-item"));
const buttons = document.querySelectorAll(".filter");
let visible = items.slice();
buttons.forEach(btn => btn.addEventListener("click", () => {
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  items.forEach(it => it.classList.toggle("hide", f !== "all" && it.dataset.group !== f));
  visible = items.filter(it => !it.classList.contains("hide"));
}));

const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector(".lb-img");
let idx = 0;
function show(i) {
  idx = (i + visible.length) % visible.length;
  const img = visible[idx].querySelector("img");
  lbImg.src = img.src; lbImg.alt = img.alt;
}
function openLb(i) { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); }
function closeLb() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }
items.forEach(it => it.addEventListener("click", () => openLb(visible.indexOf(it))));
lb.querySelector(".lb-close").addEventListener("click", closeLb);
lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") show(idx - 1);
  if (e.key === "ArrowRight") show(idx + 1);
});

(function () {
  const box = document.querySelector(".hero-bg");
  const cols = window.innerWidth < 700 ? 2 : 4;
  const speeds = [70, 90, 80, 100];
  for (let c = 0; c < cols; c++) {
    const mine = pics.filter((_, i) => i % cols === c);
    const col = document.createElement("div");
    col.className = "bg-col" + (c % 2 ? " down" : "");
    const track = document.createElement("div");
    track.className = "bg-track";
    track.style.setProperty("--dur", speeds[c % 4] + "s");
    [...mine, ...mine].forEach(p => {
      const img = document.createElement("img");
      img.src = IMG + p[0] + ".jpg"; img.alt = ""; img.decoding = "async";
      track.appendChild(img);
    });
    col.appendChild(track); box.appendChild(col);
  }
})();

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
