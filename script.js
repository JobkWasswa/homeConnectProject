// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
  // Initialize Hero Slider
  initializeHeroSlider();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(31, 41, 55, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#1f2937";
    header.style.backdropFilter = "none";
  }
});

// Intersection Observer for section highlighting
const observerOptions = {
  root: null,
  rootMargin: "-100px 0px -50% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Remove active class from all navigation links
      document.querySelectorAll(".navigation a").forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to current section link
      const currentLink = document.querySelector(
        `.navigation a[href="#${entry.target.id}"]`
      );
      if (currentLink) {
        currentLink.classList.add("active");
      }
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section[id]").forEach((section) => {
  observer.observe(section);
});

// Add some interactive effects
document.querySelectorAll(".toc-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Button click handlers (you can customize these)
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Add click effect
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);

    // You can add specific functionality here based on button content
    const text = this.textContent.trim();
    if (text.includes("Live Demo")) {
      console.log("Live Demo clicked");
      // Add your live demo link here
    } else if (text.includes("GitHub") || text.includes("Source Code")) {
      console.log("GitHub clicked");
      // Add your GitHub repository link here
    }
  });
});

// Hero Slider Functionality
function initializeHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Auto-slide every 3 seconds
  setInterval(nextSlide, 3000);

  // Dot click functionality
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}

// Add scroll-to-top functionality
function createScrollToTop() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = '<i data-lucide="arrow-up"></i>';
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

  document.body.appendChild(scrollButton);
  lucide.createIcons();

  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.style.opacity = "1";
    } else {
      scrollButton.style.opacity = "0";
    }
  });
}

createScrollToTop();
