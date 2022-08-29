const cvPreferences = {
  'template': 1,
  'font': 'default',
  'color': 'default',
  'size': 'default'
}
const templateThumbs = document.querySelectorAll('.template-thumb');
const dropdownOptions = document.querySelectorAll('.dropdown-item');
const selectedColor = document.querySelector('.selected-color');

const colorPresets = document.querySelectorAll('.color-option');
const colorpicker = document.querySelector('.colorpicker');


export function initSettingBtns() {
  templateThumbs.forEach(template => template.addEventListener('click', setSetting));
  dropdownOptions.forEach(font => font.addEventListener('click', setSetting));
  colorPresets.forEach(color => color.addEventListener('click', setColor));
  colorpicker?.addEventListener('input', setColor)
}

function setSetting(e: Event) {
  if ((e.target as HTMLElement).dataset.cvTemplate) {
    cvPreferences.template = Number((e.target as HTMLElement).dataset.cvTemplate);
  }
  if ((e.target as HTMLElement).dataset.cvFont) {
    cvPreferences.font = (e.target as HTMLElement).dataset.cvFont || 'default';
  }
  if ((e.target as HTMLElement).dataset.cvSize) {
    cvPreferences.size = (e.target as HTMLElement).dataset.cvSize || 'default';
  }

  console.log(cvPreferences);
}

function setColor(e: Event) {
  let color;
  if ((e.target as HTMLElement).dataset.cvColor){
    color = (e.target as HTMLElement).dataset.cvColor;
  } else {
    color = (e.target as HTMLInputElement).value;
  }
  (selectedColor as HTMLElement).textContent = color || '';
  cvPreferences.color = color || 'default';
  console.log(cvPreferences);
}