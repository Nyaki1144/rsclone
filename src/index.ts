import "../src/scss/style.scss";
import * as bootstrap from "bootstrap";
import { initSettingBtns } from "./modules/cv-render/settingshandlers";
import { drawCV, drawLetter } from "./modules/cv-render/drawcv";
import { currentCVData, currentLetterData } from "./modules/cv-render/cvdata";
import { doc } from "prettier";
import { initDownloadBtns } from "./modules/cv-render/downloadcv";

function init(){
  console.log(document.body.dataset.page);
  switch(document.body.dataset.page){
    case 'cv-main':
      initCVMainPage();
      break;
    case 'cv-create':
      initCVCreatePage();
      break;
    case 'letter-create':
      initLetterCreatePage();
      break;
    case 'index':
      initIndexPage();
      break;
    case 'letter-main':
      initLetterMainPage();
      break;
  }
}

function initCVCreatePage(){
  const container = document.querySelector('.canvas-container') as HTMLElement;
  drawCV(currentCVData, container);
  initSettingBtns();
  initDownloadBtns();
}

function initCVMainPage(){
  const cvThumbs = document.querySelectorAll('.cv-thumb');
  cvThumbs.forEach((el) => drawCV(currentCVData, el as HTMLElement));
}

function initLetterMainPage(){
  const letterThumbs = document.querySelectorAll('.letter-thumb');
  letterThumbs.forEach((el) => drawLetter(currentLetterData, el as HTMLElement));
}

function initIndexPage(){
  const cvThumbs = document.querySelectorAll('.cv-thumb');
  cvThumbs.forEach((el) => drawCV(currentCVData, el as HTMLElement));
  const letterThumbs = document.querySelectorAll('.letter-thumb');
  letterThumbs.forEach((el) => drawLetter(currentLetterData, el as HTMLElement));
}

function initLetterCreatePage(){
  const container = document.querySelector('.canvas-container') as HTMLElement;
  drawLetter(currentLetterData, container);
  initSettingBtns();
  initDownloadBtns();
};

init();