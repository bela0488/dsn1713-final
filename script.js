function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }

    return "light";
}

function updateButton({ buttonEl, isDark }) {
    const newIcon = isDark ? "dark_mode" : "light_mode";
    const newAriaLabel = isDark ? "Change to light theme" : "Change to dark theme";

    buttonEl.setAttribute("aria-label", newAriaLabel);

    const iconElement = buttonEl.querySelector("i");


    if (iconElement) {
        iconElement.style.opacity = 0;
    }


    buttonEl.classList.add("theme-toggle-transition");

    setTimeout(() => {

        buttonEl.innerHTML = `<i class="material-icons" aria-hidden="true">${newIcon}</i>`;


        const newIconElement = buttonEl.querySelector("i");


        newIconElement.style.opacity = 0;


        newIconElement.offsetHeight;


        newIconElement.style.transition = "opacity 0.2s ease";
        newIconElement.style.opacity = 1;


        buttonEl.classList.remove("theme-toggle-transition");
    }, 200);
}

function updateLogo({ isDark }) {
    const logoEl = document.querySelector("img[alt='Logo']");


    logoEl.style.opacity = 0;


    logoEl.offsetHeight;


    setTimeout(() => {
        logoEl.src = isDark ? "images/logo-white.svg" : "images/logo.svg";


        logoEl.style.transition = "opacity 0.2s ease";
        logoEl.style.opacity = 1;
    }, 200);
}

function updateThemeOnHtmlEl({ theme }) {
    const htmlEl = document.querySelector("html");


    htmlEl.setAttribute("data-theme", theme);


    htmlEl.style.transition = "background-color 0.3s ease, color 0.3s ease";
}

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");


let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });


updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateLogo({ isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });


button.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);


    updateThemeOnHtmlEl({ theme: newTheme });


    setTimeout(() => {
        updateButton({ buttonEl: button, isDark: newTheme === "dark" });
        updateLogo({ isDark: newTheme === "dark" });
    }, 100);

    currentThemeSetting = newTheme;
});