// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const mobileMenuLinks = document.querySelectorAll(".mobile-nav .nav-link")
  
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
  
        // Toggle between menu and close icons
        const menuIcon = mobileMenuToggle.querySelector("i")
        if (menuIcon) {
          if (mobileMenu.classList.contains("active")) {
            menuIcon.classList.remove("fa-bars")
            menuIcon.classList.add("fa-times")
          } else {
            menuIcon.classList.remove("fa-times")
            menuIcon.classList.add("fa-bars")
          }
        }
      })
  
      // Close mobile menu when a link is clicked
      mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active")
  
          // Reset menu icon
          const menuIcon = mobileMenuToggle.querySelector("i")
          if (menuIcon) {
            menuIcon.classList.remove("fa-times")
            menuIcon.classList.add("fa-bars")
          }
        })
      })
    }
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Stats counter animation
    const statValues = document.querySelectorAll(".stat-value")
    const animateStats = () => {
      statValues.forEach((stat) => {
        const target = Number.parseInt(stat.getAttribute("data-count"))
        const duration = 2000 // ms
        const startTime = performance.now()
  
        const updateCounter = (currentTime) => {
          const elapsedTime = currentTime - startTime
          const progress = Math.min(elapsedTime / duration, 1)
          const easedProgress = easeOutQuart(progress)
  
          const currentCount = Math.floor(easedProgress * target)
          stat.textContent = currentCount + "+"
  
          if (progress < 1) {
            requestAnimationFrame(updateCounter)
          }
        }
  
        requestAnimationFrame(updateCounter)
      })
    }
  
    // Easing function for smoother animation
    const easeOutQuart = (x) => {
      return 1 - Math.pow(1 - x, 4)
    }
  
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll(".animate-element")
    const statsSection = document.getElementById("stats")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.closest("#stats")) {
              animateStats()
            }
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )
  
    // Observe all animate elements
    animateElements.forEach((element) => {
      observer.observe(element)
    })
  
    // Testimonials slider
    const testimonials = [
      {
        name: "David Miller",
        role: "Member for 2 years",
        image: "images/trainer1.jpg",
        quote:
          "PowerFit completely transformed my approach to fitness. The trainers are knowledgeable and supportive, and the community keeps me motivated. I've lost 30 pounds and gained confidence!",
      },
      {
        name: "Emma Thompson",
        role: "Member for 1 year",
        image: "images/trainer2.jpg",
        quote:
          "After trying several gyms, I finally found my fitness home at PowerFit. The facilities are top-notch, and the personal training has helped me achieve goals I never thought possible.",
      },
      {
        name: "James Wilson",
        role: "Member for 3 years",
        image: "images/trainer3.jpg",
        quote:
          "As a busy professional, I appreciate the 24/7 access and variety of classes that fit my schedule. The trainers remember your name and genuinely care about your progress.",
      },
      {
        name: "Sophia Garcia",
        role: "Member for 6 months",
        image: "images/trainer4.jpg",
        quote:
          "The nutrition coaching combined with my workout routine has been a game-changer. I've seen more progress in 6 months at PowerFit than in years at other gyms.",
      },
    ]
  
    const testimonialSlider = document.getElementById("testimonials-slider")
    const prevButton = document.getElementById("prev-testimonial")
    const nextButton = document.getElementById("next-testimonial")
    const dots = document.querySelectorAll(".dot")
  
    let currentTestimonial = 0
    let autoplayInterval
  
    // Function to update testimonial content
    const updateTestimonial = (index) => {
      if (!testimonialSlider) return
  
      const testimonial = testimonials[index]
      testimonialSlider.innerHTML = `
              <div class="testimonial-quote">
                  <i class="fas fa-quote-left"></i>
              </div>
              <div class="testimonial-content">
                  <div class="testimonial-author">
                      <div class="author-image">
                          <img src="${testimonial.image}" alt="${testimonial.name}">
                      </div>
                      <div class="author-info">
                          <h3 class="author-name">${testimonial.name}</h3>
                          <p class="author-role">${testimonial.role}</p>
                      </div>
                  </div>
                  <div class="testimonial-text">
                      <p>"${testimonial.quote}"</p>
                  </div>
              </div>
          `
  
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index)
      })
    }
  
    // Initialize testimonial slider
    if (testimonialSlider) {
      // Set first testimonial
      updateTestimonial(0)
  
      // Previous button
      if (prevButton) {
        prevButton.addEventListener("click", () => {
          clearInterval(autoplayInterval)
          currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
          updateTestimonial(currentTestimonial)
        })
      }
  
      // Next button
      if (nextButton) {
        nextButton.addEventListener("click", () => {
          clearInterval(autoplayInterval)
          currentTestimonial = (currentTestimonial + 1) % testimonials.length
          updateTestimonial(currentTestimonial)
        })
      }
  
      // Dot buttons
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          clearInterval(autoplayInterval)
          currentTestimonial = index
          updateTestimonial(currentTestimonial)
        })
      })
  
      // Autoplay
      autoplayInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length
        updateTestimonial(currentTestimonial)
      }, 5000)
    }
  
    // Contact form submission
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // In a real implementation, you would send the form data to a server
        alert("Form submitted! (This is a demo)")
        contactForm.reset()
      })
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: "smooth",
          })
        }
      })
    })
  })
  
  