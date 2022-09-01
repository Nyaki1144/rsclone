import { currentCVData } from "./cvdata";
import { refreshCV, resetSettings } from "./drawcv";

const templateThumbs = document.querySelectorAll('.template-thumb');
const dropdownOptions = document.querySelectorAll('.dropdown-item:not(.download-option)');
const selectedColor = document.querySelector('.selected-color');

const colorPresets = document.querySelectorAll('.color-option');
const colorpicker = document.querySelector('.colorpicker');


export function initSettingBtns() {
  templateThumbs.forEach(template => template.addEventListener('click', setSetting));
  dropdownOptions.forEach(font => font.addEventListener('click', setSetting));
  colorPresets.forEach(color => color.addEventListener('mouseover', setColor));
  colorPresets.forEach(color => color.addEventListener('click', setColor));
  colorpicker?.addEventListener('input', setColor);
}

function setSetting(e: Event): void {
  if ((e.target as HTMLElement).dataset.cvTemplate) {
    currentCVData.preferences.template = Number((e.target as HTMLElement).dataset.cvTemplate);
    currentCVData.preferences.color = 'default';
    currentCVData.preferences.font = 'default';
    currentCVData.preferences.fontsize = 'default';
    resetSettings();
  }
  if ((e.target as HTMLElement).dataset.cvFont) {
    currentCVData.preferences.font = (e.target as HTMLElement).dataset.cvFont || 'default';
  }
  if ((e.target as HTMLElement).dataset.cvSize) {
    currentCVData.preferences.fontsize = (e.target as HTMLElement).dataset.cvSize || 'default';
  }
  refreshCV();
}

function setColor(e: Event): void {
  let color;
  if ((e.target as HTMLElement).dataset.cvColor){
    color = (e.target as HTMLElement).dataset.cvColor;
  } else {
    color = (e.target as HTMLInputElement).value;
  }
  (selectedColor as HTMLElement).textContent = color || '';
  currentCVData.preferences.color = color || 'default';
  refreshCV();
}