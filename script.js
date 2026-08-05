/**
 * PRIME NDT INTERNATIONAL - Core JS logic
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. STICKY NAVBAR LOGIC
    const nav = document.querySelector("nav");
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    // 2. MOBILE MENU & HAMBURGER TOGGLE
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            menuBtn.classList.toggle("active");
            mobileMenu.classList.toggle("active");
        });

        // Close menu on clicking outside or on links
        document.addEventListener("click", function (e) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                menuBtn.classList.remove("active");
                mobileMenu.classList.remove("active");
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuBtn.classList.remove("active");
                mobileMenu.classList.remove("active");
            });
        });
    }

    // 3. SCROLL-TO-TOP BUTTON BEHAVIOR
    const scrollTopBtn = document.getElementById("scroll-top-btn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("active");
            } else {
                scrollTopBtn.classList.remove("active");
            }
        });

        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    const revealElements = document.querySelectorAll(".reveal");
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    // Once animated, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }

    // 5. CONTACT FORM HANDLING
    const contactForm = document.querySelector(".contact-form-panel form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            // Basic UI loading representation
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Sending Message...";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Display modal success pop-up
                showToast("Message Sent! Thank you for contacting Prime NDT. We will get back to you shortly.", "success");
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    // Toast Alert Helper
    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%) translateY(100px)";
        toast.style.background = type === "success" ? "#172a45" : "#721c24";
        toast.style.color = "#ffffff";
        toast.style.border = `2px solid ${type === "success" ? "#d4af37" : "#f5c6cb"}`;
        toast.style.padding = "16px 28px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.5)";
        toast.style.fontFamily = "'Outfit', sans-serif";
        toast.style.fontWeight = "600";
        toast.style.zIndex = "10000";
        toast.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease";
        toast.style.opacity = "0";
        toast.innerText = message;

        document.body.appendChild(toast);
        
        // Trigger transition
        setTimeout(() => {
            toast.style.transform = "translateX(-50%) translateY(0)";
            toast.style.opacity = "1";
        }, 50);

        // Remove toast
        setTimeout(() => {
            toast.style.transform = "translateX(-50%) translateY(100px)";
            toast.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 400);
        }, 4000);
    }
});

// 6. GALLERY & RESOURCES TAB SWAPPER LOGIC (Accessible globally)
window.switchTab = function (tab) {
    const tabRes = document.getElementById("tab-resources");
    const tabGal = document.getElementById("tab-gallery");
    const resSec = document.getElementById("resources-section");
    const galSec = document.getElementById("gallery-section");

    if (!tabRes || !tabGal) return;

    if (tab === "gallery") {
        tabGal.classList.add("active");
        tabRes.classList.remove("active");
        if (galSec) galSec.style.display = "grid";
        if (resSec) resSec.style.display = "none";
    } else {
        tabRes.classList.add("active");
        tabGal.classList.remove("active");
        if (resSec) resSec.style.display = "grid";
        if (galSec) galSec.style.display = "none";
    }
};