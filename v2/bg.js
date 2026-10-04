// bg.js: builds the sliding picture columns behind the Home section
(function () {
  const box = document.querySelector(".hero-bg");
  if (!box) return;

  // The pictures to slide. Add or remove file names here.
  const pics = [
    "01-party-plate-grand-food-tasting-mar-2024", "02-party-plate-toast-wedding-fair",
    "03-party-plate-food-tasting-may-25-2025", "04-party-plate-food-tasting-may-24-2025",
    "05-party-plate-catering-service", "06-party-plate-wedding-cake",
    "07-party-plate-food-tasting-oct-2025", "08-hearts-bells-pandan-cake",
    "09-hearts-bells-flower-wreath-cake", "10-hearts-bells-heart-cakes",
    "11-hearts-bells-valentine-giveaway", "12-hearts-bells-christmas-caramel-cakes",
    "13-hearts-bells-gelato-collection", "14-hearts-bells-midnight-mocha",
    "15-hearts-bells-limited-stocks", "16-hearts-bells-chocolate-cake-salad",
    "17-hearts-bells-tropical-duo", "18-hearts-bells-have-them-all"
  ];

  // 4 columns on wide screens, 2 on phones
  const cols = window.innerWidth < 700 ? 2 : 4;
  const speeds = [70, 90, 80, 100]; // seconds per loop (bigger = slower)

  for (let c = 0; c < cols; c++) {
    // Give each column its own pictures
    const mine = pics.filter((_, i) => i % cols === c);

    const col = document.createElement("div");
    col.className = "bg-col" + (c % 2 === 1 ? " down" : ""); // even columns go up, odd go down

    const track = document.createElement("div");
    track.className = "bg-track";
    track.style.setProperty("--dur", speeds[c % speeds.length] + "s");

    // Add the set twice so the loop never shows a gap
    [...mine, ...mine].forEach(name => {
      const img = document.createElement("img");
      img.src = "images/" + name + ".jpg";
      img.alt = "";
      img.decoding = "async";
      track.appendChild(img);
    });

    col.appendChild(track);
    box.appendChild(col);
  }
})();
