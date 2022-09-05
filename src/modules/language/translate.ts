export function translate() {
  const dataText = document.querySelectorAll("[data-i18n]");
  const lenguage = document.querySelector(".lenguage") as HTMLElement;
  const lenguageItem = document.querySelectorAll(".lenguage-item");

  const i18Obj = {
    en: {
      "fill-letter": "fill out your letter",

      "letter-topick": "Cover Letter Subject",
      "personal-area": "Personal Area",
      resumes: "Resumes",
      letter: "Letter",
      "letter-title": "Letter",
      "create-resume": "Create a resume",
      "create-letter": "Create a letter",
      "upload-your-resume": "Upload your resume",
      name: "Name",
      lastname: "Lastname",
      email: "Email",
      tel: "Phone number",
      address: "address",
      "About-me": "About me",
      "lenguage-level-1": "English language proficiency level from 1 to 5",
      "lenguage-level-2": "Russian language proficiency level from 1 to 5",
      "lenguage-level-3": "HTML knowledge level from 1 to 5",
      "lenguage-level-4": "JavaScript knowledge level from 1 to 5",
      "create-resume-btn": "Click to create resume",
      send: "Send",
      back: "Back",
      dashboard: "Dashboard",
      save: "Save",
      template: "template",
      font: "Font",
      color: "Color",
      size: "Size",
      push: "Click to create a letter",
    },
    ru: {
      "fill-letter": "заполнить письмо",
      "letter-topick": "Тема сопроводительного письма",
      "personal-area": "Личный кабинет",
      resumes: "Резюме",
      letter: "Сопроводительное письмо",
      "letter-title": "Сп. письмо",
      "create-resume": "Создать резюме",
      "create-letter": "Создать сопроводительное письмо",
      "upload-your-resume": "Загрузите свою фотографию",
      name: "Имя",
      lastname: "Фамилия",
      email: "Почта",
      tel: "Телефон",
      address: "Адрес",
      "About-me": "О себе",
      "lenguage-level-1": "Уровень знания Английского языка от 1 до 5",
      "lenguage-level-2": "Уровень знания Русского языка от 1 до 5",
      "lenguage-level-3": "Уровень знания HTML от 1 до 5",
      "lenguage-level-4": "Уровень знания JavaScript от 1 до 5",
      "create-resume-btn": "Нажмите, что бы создать резюме",
      send: "Отправить",
      back: "Назад",
      dashboard: "Личный кабинет",
      save: "Cохранить",
      template: "Шаблон",
      font: "Шрифт",
      color: "цвет",
      size: "Размер",
      push: "Нажмите, чтобы создать письмо",
    },
  };

  let checkLang = (leng: any) => {
    console.log(localStorage.getItem("lang"), leng);

    if (
      localStorage.getItem("lang") == leng &&
      localStorage.getItem("lang") == "rus"
    ) {
      let textRu = Object.entries(i18Obj.ru);
      dataText.forEach((el: any) => {
        textRu.forEach((elem) => {
          if (el.dataset.i18n == elem[0]) el.textContent = elem[1];
        });
      });
    }

    if (
      localStorage.getItem("lang") == leng &&
      localStorage.getItem("lang") == "eng"
    ) {
      let textEn = Object.entries(i18Obj.en);
      dataText.forEach((el: any) => {
        textEn.forEach((elem) => {
          if (el.dataset.i18n === elem[0]) el.textContent = elem[1];
        });
      });
    }
  };

  lenguage.addEventListener("click", (event: any) => {
    localStorage.setItem("lang", event.target.getAttribute("data-lang"));
    checkLang(localStorage.getItem("lang"));

    if (event.target.classList.contains("lenguage-item") && event.target.id) {
      lenguageItem.forEach((el) => {
        el.classList.remove("activ-item");
      });
      event.target.classList.add("activ-item");
    }
  });

  if (
    localStorage.getItem("lang") === null &&
    localStorage.getItem("lang") === "eng"
  ) {
    localStorage.setItem("lang", "eng");
    checkLang("eng");
  } else if (localStorage.getItem("lang") === "rus") {
    checkLang("rus");
  }
}
