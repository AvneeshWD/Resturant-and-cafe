
const menuData = {
    starters: [
      { name: "Veg Soup of the Day", desc: "Fresh vegetables simmered in aromatic broth", price: "₹80" },
      { name: "Paneer Tikka", desc: "Cottage cheese marinated in tandoori spices", price: "₹180" },
      { name: "Samosa (2 pcs)", desc: "Crispy pastry filled with spiced potato & peas", price: "₹60" },
      { name: "Aloo Tikki Chaat", desc: "Classic street-style potato patties with chutneys", price: "₹90" },
      { name: "Dahi Bhalle", desc: "Soft lentil dumplings in cool yoghurt with tamarind", price: "₹100" },
      { name: "Veg Spring Rolls", desc: "Crispy rolls stuffed with stir-fried vegetables", price: "₹120" },
    ],
    mains: [
      { name: "Dal Makhani", desc: "Slow-cooked black lentils in a creamy tomato base", price: "₹160" },
      { name: "Paneer Butter Masala", desc: "Cottage cheese in rich buttery tomato gravy", price: "₹200" },
      { name: "Kadai Chicken", desc: "Tender chicken tossed with peppers in kadai spices", price: "₹240" },
      { name: "Mutton Rogan Josh", desc: "Slow-braised lamb in a Kashmiri aromatic sauce", price: "₹280" },
      { name: "Mixed Vegetable Curry", desc: "Seasonal vegetables in a fragrant curry base", price: "₹140" },
      { name: "Palak Paneer", desc: "Cottage cheese in fresh spinach and spice gravy", price: "₹180" },
    ],
    breads: [
      { name: "Butter Naan", desc: "Soft leavened bread baked in tandoor", price: "₹40" },
      { name: "Garlic Roti", desc: "Whole wheat roti with garlic butter", price: "₹35" },
      { name: "Laccha Paratha", desc: "Flaky layered whole wheat bread", price: "₹50" },
      { name: "Steamed Basmati Rice", desc: "Fragrant long-grain basmati rice", price: "₹60" },
      { name: "Veg Biryani", desc: "Layered basmati rice with aromatic vegetables & saffron", price: "₹180" },
      { name: "Jeera Rice", desc: "Basmati rice tempered with cumin and ghee", price: "₹80" },
    ],
    cafe: [
      { name: "Masala Chai", desc: "Spiced milk tea brewed with cardamom & ginger", price: "₹40" },
      { name: "Cold Coffee", desc: "Chilled coffee blended with ice cream & milk", price: "₹120" },
      { name: "Fresh Lime Soda", desc: "Zesty lime with sparkling soda, salted or sweet", price: "₹60" },
      { name: "Mango Lassi", desc: "Thick yoghurt blended with ripe Alphonso mangoes", price: "₹90" },
      { name: "Hot Chocolate", desc: "Rich Belgian-style cocoa with steamed milk", price: "₹110" },
      { name: "Watermelon Juice", desc: "Fresh-pressed seasonal fruit juice", price: "₹70" },
    ],
    desserts: [
      { name: "Gulab Jamun (2 pcs)", desc: "Soft milk-solid dumplings soaked in rose syrup", price: "₹80" },
      { name: "Rasmalai", desc: "Cottage cheese patties in chilled saffron milk", price: "₹100" },
      { name: "Gajar Halwa", desc: "Slow-cooked carrot pudding with ghee & nuts", price: "₹90" },
      { name: "Ice Cream (2 scoops)", desc: "Vanilla, chocolate, or mango — your pick", price: "₹100" },
      { name: "Kheer", desc: "Creamy rice pudding with cardamom and dry fruits", price: "₹80" },
      { name: "Chocolate Brownie", desc: "Warm fudgy brownie with vanilla ice cream", price: "₹130" },
    ],
  };

  function filterMenu(category, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const grid = document.getElementById('menuGrid');
    const items = menuData[category];
    grid.innerHTML = items.map(i => `
      <div class="menu-item">
        <div>
          <p class="menu-name">${i.name}</p>
          <p class="menu-desc">${i.desc}</p>
        </div>
        <span class="menu-price">${i.price}</span>
      </div>
    `).join('');
  }

  // Load starters on page load
  filterMenu('starters', document.querySelector('.tab.active'));

  // Intersection fade-in
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.exp-card, .review-card, .menu-item').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Load HLS Video
  const video = document.getElementById('jd-video');
  const videoSrc = 'https://stream.jdmagicbox.com/comp/hls/9999px535.x535.241207034003.e8a3_wkwsacixjiejwuq.m3u8';
  if (video) {
    if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', function() {
        video.play().catch(() => {});
      });
    }
  }