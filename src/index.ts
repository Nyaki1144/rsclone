import "../src/scss/style.scss";
import * as bootstrap from "bootstrap";
import { initSettingBtns } from "./modules/cv-render/settingshandlers";
import { drawCV } from "./modules/cv-render/drawcv";
import { currentCVData } from "./modules/cv-render/cvdata";
import { doc } from "prettier";
import { choosTopic } from "./modules/theme/theme";

function init() {
  switch (document.body.dataset.page) {
    case "cv-main":
      initCVMainPage();
      break;
    case "cv-create":
      initCVCreatePage();
      break;
    case "index":
      initIndexPage();
      break;
  }
}

function initCVCreatePage() {
  const container = document.querySelector(".canvas-container") as HTMLElement;
  drawCV(currentCVData, container);
  initSettingBtns();
}

function initCVMainPage() {
  const cvThumbs = document.querySelectorAll(".cv-thumb");
  cvThumbs.forEach((el) => drawCV(currentCVData, el as HTMLElement));
}

function initIndexPage() {
  const cvThumbs = document.querySelectorAll(".cv-thumb");
  cvThumbs.forEach((el) => drawCV(currentCVData, el as HTMLElement));
}

init();
choosTopic();
