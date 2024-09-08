const darkColors = [
  { name: "Charcoal Gray", hex: "#121212", rgb: "18, 18, 18" },
  { name: "Dark Slate Gray", hex: "#191919", rgb: "25, 25, 25" },
  { name: "Outer Space", hex: "#252525", rgb: "37, 37, 37" },
  { name: "Rich Black", hex: "#0A0A0A", rgb: "10, 10, 10" },
  { name: "Coffee Bean", hex: "#1B1B1B", rgb: "27, 27, 27" },
  { name: "Dark Gray", hex: "#212427", rgb: "33, 36, 39" },
  { name: "Oil Black", hex: "#0C0C0C", rgb: "12, 12, 12" },
  { name: "Obsidian", hex: "#0B1215", rgb: "11, 18, 21" },
  { name: "Ebony", hex: "#222428", rgb: "34, 36, 40" },
  { name: "Black Chocolate", hex: "#100D08", rgb: "16, 13, 8" },
  { name: "Gunmetal", hex: "#1D1F21", rgb: "29, 31, 33" },
  { name: "Smoky Black", hex: "#101720", rgb: "16, 23, 32" },
  { name: "Oxford Blue", hex: "#212437", rgb: "33, 42, 55" },
  { name: "Eerie Black", hex: "#1B1D23", rgb: "27, 29, 35" },
  { name: "Jet Black", hex: "#161618", rgb: "22, 22, 24" },
  { name: "Iridium", hex: "#181818", rgb: "24, 24, 24" },
  { name: "Arsenic", hex: "#11181C", rgb: "17, 24, 28" },
  { name: "Charleston Green", hex: "#212124", rgb: "33, 33, 36" },
  { name: "Jet", hex: "#2A2A2A", rgb: "42, 42, 42" },
  { name: "Black Olive", hex: "#242526", rgb: "36, 37, 38" },
  { name: "Midnight Blue", hex: "#212121", rgb: "33, 33, 33" }
];
const lightColors = [
  { name: "Off White", hex: "#FAF9F6", rgb: "250, 249, 246" },
  { name: "Snow", hex: "#FFFAFA", rgb: "255, 250, 250" },
  { name: "Ivory", hex: "#FFFFF0", rgb: "255, 255, 240" },
  { name: "Alice Blue", hex: "#F0F8FF", rgb: "240, 248, 255" },
  { name: "Ghost White", hex: "#F8F8FF", rgb: "248, 248, 255" },
  { name: "White Smoke", hex: "#F5F5F5", rgb: "245, 245, 245" },
  { name: "Seashell", hex: "#FFF5EE", rgb: "255, 245, 238" },
  { name: "Floral White", hex: "#FFFAF0", rgb: "255, 250, 240" },
  { name: "Honeydew", hex: "#F0FFF0", rgb: "240, 255, 240" },
  { name: "Mint Cream", hex: "#F5FFFA", rgb: "245, 255, 250" },
  { name: "Azure", hex: "#F0FFFF", rgb: "240, 255, 255" },
  { name: "Lavender Blush", hex: "#FFF0F5", rgb: "255, 240, 245" },
  { name: "Misty Rose", hex: "#FFE4E1", rgb: "255, 228, 225" },
  { name: "Gray94", hex: "#f0f0f0", rgb: "240, 240, 240" }
];

const container = document.getElementById('colorContainer');
const toggle = document.getElementById('colorToggle');
const root = document.documentElement;
const header = document.querySelector('h1')
const label = document.querySelector('.toggle-label')

function createColorCards(colors) {
  container.innerHTML = '';
  colors.forEach(color => {
      const card = document.createElement('div');
      card.className = 'color-card';
      card.style.backgroundColor = color.hex;
      card.style.color = isLightColor(color.hex) ? '#000' : '#fff';
      card.innerHTML = `
          <div class="color-name">${color.name}</div>
          <div class="color-info">RGB: ${color.rgb}</div>
          <div class="color-info">HEX: ${color.hex}</div>

      `;
      card.addEventListener('click', () => {
          navigator.clipboard.writeText(`rgb(${color.rgb})`).then(() => {
              alert(`RGB code copied: rgb(${color.rgb})`);
          }).catch(err => {
              console.error('Failed to copy: ', err);
          });
      });
      container.appendChild(card);
  });
}

function isLightColor(hex) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 128;
}

toggle.addEventListener('change', () => {
  if (toggle.checked) {
      root.classList.remove('dark');
      root.classList.add('light');
      header.textContent = 'Alt-White'
      label.textContent = 'See Alt-Black'
      createColorCards(lightColors);
  } else {
      root.classList.remove('light');
      root.classList.add('dark');
      header.textContent = 'Alt-Black'
      label.textContent = 'See Alt-White'
      createColorCards(darkColors);
  }
});

// Initial load
createColorCards(darkColors);