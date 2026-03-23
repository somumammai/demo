
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('.site-header');

    // Function to set theme
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    };

    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check for system dark mode preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Header scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) { // Add shadow after scrolling 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page loads already scrolled down
    handleScroll();

    // Calculate and display read time
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        const text = articleBody.textContent || articleBody.innerText;
        const wordsPerMinute = 200; // Average reading speed
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        const readTimeElement = document.querySelector('.read-time');
        if (readTimeElement) {
            readTimeElement.textContent = `${readTime} min read`;
        }
    }
});
