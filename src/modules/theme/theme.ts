export function choosTopic() {
  const themeIcon = document.querySelectorAll(".theme");
  const sun = document.querySelector('[data-icon="sun"]') as HTMLElement;
  const moon = document.querySelector('[data-icon="moon"]') as HTMLElement;

  sun?.addEventListener("click", (event: any) => {
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  });

  moon?.addEventListener("click", (event: any) => {
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
  });

  themeIcon.forEach((el) => {
    el.addEventListener("click", function () {
      switched();
    });
  });

  function switched() {
    if (localStorage.getItem("theme") === "sun") {
      localStorage.setItem("theme", "moon");
    } else {
      localStorage.setItem("theme", "sun");
    }
  }

  themeIcon.forEach((el) => {
    el.addEventListener("click", function () {
      checkTeam(localStorage.getItem("theme"));
    });
  });

  function checkTeam(data: any) {
    document.body.style.setProperty(
      "--background-color",
      `var(--background-color-${data})`
    );
    document.body.style.setProperty(
      "--font-color",
      `var(--font-color-${data})`
    );
  }
  if (
    localStorage.getItem("theme") === null &&
    localStorage.getItem("theme") === "sun"
  ) {
    localStorage.setItem("theme", "sun");
    checkTeam("sun");
  } else if (localStorage.getItem("theme") === "moon") {
    checkTeam("moon");
  }
}
