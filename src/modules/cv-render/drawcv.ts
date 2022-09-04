import { currentCVData, currentLetterData } from "./cvdata";
import { templates } from "./templates";

//const ratio = window.devicePixelRatio || 1;
let ratio = 4;
let newLinePosY = 0;
let newElPosX = 0;
let padding = 15 * ratio;

let currentCV: Record<string, any>;
const monthEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthRus = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 
]

export function drawCV(data: Record<string, any>, container: HTMLElement) {
  if (!data) data = {};
  newLinePosY = 0;
  newElPosX = 0;
  createCanvas();
  currentCV.utils = drawUtils(currentCV.cnv, currentCV.ctx);
  currentCV.utils.drawRect('#fff','#fff', 0, 0, currentCV.cnv.width, currentCV.cnv.height);
  container.appendChild(currentCV.cnv);
  if(!data || !data.hasOwnProperty('preferences')) Object.defineProperty(data, 'preferences',{value: {}});
  currentCV.settings = Object.assign({}, templates[data.preferences.template || 0].settings);
  applyRatio(ratio);
  setPreferences();
  renderCV(data);
}

export function drawLetter(data: Record<string, any>, container: HTMLElement) {
  if (!data) data = {};
  newLinePosY = 0;
  newElPosX = padding;
  createCanvas();
  currentCV.utils = drawUtils(currentCV.cnv, currentCV.ctx);
  currentCV.utils.drawRect('#fff','#fff', 0, 0, currentCV.cnv.width, currentCV.cnv.height);
  container.appendChild(currentCV.cnv);
  if(!data || !data.hasOwnProperty('preferences')) Object.defineProperty(data, 'preferences',{value: {}});
  currentCV.settings = Object.assign({}, templates[data.preferences.template || 0].settings);
  applyRatio(ratio);
  setPreferences();
  renderLetter(data);
}

function applyRatio(ratio = 4){
  currentCV.settings.textsize *= ratio;
  currentCV.settings.titlesize *= ratio;
  currentCV.settings.subtitlesize *= ratio;
  currentCV.settings.headersize *= ratio;
}

function createCanvas(){
  currentCV = {};
  const cnv = document.createElement('canvas') as HTMLCanvasElement;
  cnv.classList.add('border');
  const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;
  cnv.width = 2480;
  cnv.height = 3508;
  currentCV.cnv = cnv;
  currentCV.ctx = ctx;
}

function renderCV(cv: Record<string, any>){
  drawHeaderBackground(150);
  drawUserpic();
  drawTitle(getFullName(cv));
  drawSubtitle(`${cv.subtitle}`);
  drawHorizontalSeparator(newElPosX, newLinePosY + 0.5, undefined, currentCV.settings.subtitlecolor);
  drawAbout(`${cv.about}`);
  drawVerticalSeparator(currentCV.settings.sidebar === 'left' ? currentCV.cnv.width * 1 / 3 - padding : currentCV.cnv.width * 2 / 3, 150 * ratio + padding * 3 );
  drawCVBody(cv);
  drawCVSidebar(cv);
};

function renderLetter(letter: Record<string, any>){
  drawHeaderBackground(100);
  drawTitle(getFullName(letter));
  nextLine(currentCV.settings.subtitlesize);
  drawHeaderContacts('line', letter.email, letter.tel, '');
  drawLetterBody(letter);
};

function getFullName(cv: Record<string, any>){
  return `${cv.firstname || ''} ${cv.lastname || ''}`
}

function drawHeaderBackground(height: number) {
  currentCV.utils.drawRect(currentCV.settings.background, 'transparent', 0, 0, currentCV.cnv.width, height * ratio + padding * 2);
}

function drawVerticalSeparator(x: number, y: number) {
  currentCV.utils.drawRect(String(currentCV.settings.headercolor), 'transparent', x + 0.5, y, 1, currentCV.cnv.height - y - padding);
}

function drawHorizontalSeparator(x: number, y: number, width?: number, color?: string) {
  currentCV.utils.drawRect(color? color : currentCV.settings.headercolor, 'transparent', x, y + 0.5, width? width : currentCV.cnv.width - x - padding, 1);
  newLinePosY += padding;
}

function drawUserpic() {
  let x, y;
  if(currentCV.settings.template === 0){
    x = newElPosX + padding;
    y = newLinePosY + padding;
  } else {
    x = currentCV.cnv.width - 150 * ratio - padding;
    y = padding;
  }
  currentCV.utils.drawRect('#000', 'transparent', x, y, 150 * ratio, 150 * ratio);
  // TODO draw image
  newElPosX = x + padding + 150 * ratio;
}

function drawTitle(text: string) {
  let x, y;
  if(currentCV.settings.template === 0){
    x = newElPosX;
    y = newLinePosY + padding;
  } else {
    x = padding;
    y = padding;
  }
  currentCV.utils.drawText(Number(currentCV.settings.titlesize), currentCV.settings.titlefont, currentCV.settings.titlecolor, text, x, y);
  nextLine(currentCV.settings.titlesize);
}

function drawSubtitle(text: string) {
  let x, y;
  if(currentCV.settings.template === 0){
    x = newElPosX;
    y = newLinePosY + padding / 2;
  } else {
    x = padding;
    y = newLinePosY + padding / 2;
  }
  currentCV.utils.drawText(currentCV.settings.subtitlesize, currentCV.settings.subtitlefont, currentCV.settings.subtitlecolor, text, x, y);
  nextLine(currentCV.settings.subtitlesize);
}

function drawAbout(text: string) {
  let x: number;
  let y: number;
  if(currentCV.settings.template === 0){
    x = newElPosX;
    y = newLinePosY + padding / 2;
  } else {
    x = padding;
    y = newLinePosY + padding / 2;
  }
  const maxwidth = currentCV.cnv.width - 150 * ratio - padding * 3;
  drawSeveralLines(currentCV.settings.textsize, currentCV.settings.subtitlefont, currentCV.settings.subtitlecolor, text, x, y, maxwidth);
}

function drawSeveralLines(size: number, font: string, color: string, text: string, x: number, y: number, maxwidth = 0){
  currentCV.utils.drawText(size, font, color, '', x, y);
  let curString = '';
  let length = 0;
  const words = text.split(' ');
  for(let i = 0; i < words.length; i++){
    curString += words[i] + ' ';
    length = currentCV.ctx.measureText(curString).width;
    if(length >= maxwidth){
      curString = curString.trim().slice(0, (curString.trim().lastIndexOf(' ')));
      currentCV.utils.drawText(size, font, color, curString, x, y);
      i--;
      y += padding;
      curString = '';
      length = 0;
      continue;
    }
    currentCV.utils.drawText(size, font, color, curString, x, y);
  }
  newLinePosY = y;
  nextLine(currentCV.settings.textsize);
}

function drawHeaderContacts(align:string = 'column', email: string, phone: string, location: string){
  // TODO add icons
  // drawImage(emailImg, 0, 0, 14, 14);
  const color = align === 'column' ? currentCV.settings.textcolor : currentCV.settings.subtitlecolor;
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, color, email, newElPosX, newLinePosY);
  let length = currentCV.ctx.measureText(email).width;
  newLinePosY += align === 'column' ? currentCV.settings.textsize + padding/2 : 0;
  newElPosX += align === 'column' ? 0 : length + padding * 2;

  //drawImage(phoneImg, newElPosX, newLinePosY, 14, 14);
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, color, phone, newElPosX, newLinePosY);
  length = currentCV.ctx.measureText(phone).width;
  newLinePosY += align === 'column' ? currentCV.settings.textsize + padding/2 : 0;
  newElPosX += align === 'column' ? 0 : length + padding * 2;

  //drawImage(addressImg, newElPosX, newLinePosY, 14, 14);
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, color , location, newElPosX, newLinePosY);
  length = currentCV.ctx.measureText(location).width;
  newLinePosY += align === 'column' ? currentCV.settings.textsize + padding/2 : 0;
  newElPosX += align === 'column' ? 0 : length + padding * 2;
  
  if (align === 'line')
  newLinePosY = 100 * ratio + padding * 3;
}

function drawCVBody(cv: Record<string, any>) {
  newElPosX = currentCV.settings.sidebar === 'left' ? currentCV.cnv.width * 1 / 3 : padding;
  newLinePosY = 150 * ratio + (padding * 3);
  const lang = localStorage.getItem('lang');
  if(cv.education){
    currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.textfont, currentCV.settings.headercolor, lang === 'eng'?' Education': 'Образование', newElPosX, newLinePosY);
    newLinePosY += currentCV.settings.headersize + padding;
    const educationData = cv.education;
    for(const entry of educationData){
      drawBodySection(
        `${entry.begin} - ${entry.end}`,
        entry.title,
        `${entry.school}, ${entry.location}`,
        entry.description);
    }
    newLinePosY += padding;
    drawHorizontalSeparator (currentCV.settings.sidebar === 'left'? newElPosX : padding, newLinePosY + 0.5, 340);
  }
  if(cv.employment){
    currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.headerfont, currentCV.settings.headercolor, lang === 'eng'? 'Work': 'Работа', newElPosX, newLinePosY);
    newLinePosY += currentCV.settings.headersize + padding;
    const employmentData = cv.employment;
    for(const entry of employmentData){
      drawBodySection(
        `${entry.begin} - ${entry.end}`,
        entry.position,
        `${entry.employer}, ${entry.location}`,
        entry.description);
    }
  }
}

function drawLetterBody(letter: Record<string, any>){
  newElPosX = padding;
  const now = new Date();
  const lang = localStorage.getItem('Lang');
  const dateLine = `${now.getDate()} ${lang === 'Eng'? monthEng[now.getMonth()] : monthRus[now.getMonth()]} ${now.getFullYear()}`;
  currentCV.utils.drawText(currentCV.settings.subtitlesize, currentCV.settings.textfont, 'darkgrey', dateLine, newElPosX, newLinePosY);
  nextLine(currentCV.settings.subtitlesize);
  if(letter.title){
    currentCV.utils.drawText(currentCV.settings.subtitlesize, currentCV.settings.textfont, currentCV.settings.textcolor, letter.title, newElPosX, newLinePosY);
    nextLine(currentCV.settings.subtitlesize);
  }
  if(letter.content){
    const maxwidth = currentCV.cnv.width - padding * 2;
    drawSeveralLines(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, letter.content, newElPosX, newLinePosY, maxwidth);
  }
}

function drawBodySection(dates: string, title: string, location: string, description: string) {
  currentCV.utils.drawBoldText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, title, newElPosX, newLinePosY);
  newElPosX += 900 + padding;
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, dates, newElPosX, newLinePosY);
  nextLine(currentCV.settings.textsize);
  newElPosX = currentCV.settings.sidebar === 'left' ? currentCV.cnv.width * 1 / 3 : padding;
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, 'grey', location, newElPosX, newLinePosY);
  nextLine(currentCV.settings.textsize);
  const maxwidth = currentCV.cnv.width * 2 / 3 - padding * 2;
  drawSeveralLines(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, description, newElPosX, newLinePosY, maxwidth);
}

function drawCVSidebar(cv: Record<string, any>) {
  newElPosX = currentCV.settings.sidebar === 'left' ? padding : currentCV.cnv.width * 2 / 3 + padding;
  newLinePosY = 150 * ratio + padding * 3;
  const lang = localStorage.getItem('lang');
  if(currentCV.settings.template === 0 || currentCV.settings.template === 1){
    if(cv.email || cv.tel || cv.address){
      currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.headerfont, currentCV.settings.headercolor, lang === 'eng'? 'Contacts': 'Контакты', newElPosX, newLinePosY);
      nextLine(currentCV.settings.headersize);
      drawHeaderContacts('column', cv.email, cv.tel, cv.address);
      newLinePosY += padding;
    }
  }
  if(cv.skills){
    currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.headerfont, currentCV.settings.headercolor, lang === 'eng'? 'Skills': 'Навыки', newElPosX, newLinePosY);
    nextLine(currentCV.settings.headersize);
    const skills = cv.skills;
    for(const entry of skills){
      drawSkill(entry.skill, entry.level);
    }
    newLinePosY += padding;
  }
  if(cv.languages){
    currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.headerfont, currentCV.settings.headercolor, lang === 'eng'? 'Languages': 'Языки', newElPosX, newLinePosY);
    nextLine(currentCV.settings.headersize);
    const languages = cv.languages;
    for(const entry of languages){
      drawSkill(entry.language, entry.level);
    }
  }
}

function drawSkill(skill: string, level: number) {
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, skill, newElPosX, newLinePosY);
  newLinePosY += currentCV.settings.textsize + padding/2;
  if (currentCV.settings.template === 0){
    for (let i = 1; i <= 5; i++)
    {
      currentCV.utils.drawRect(i <= level? currentCV.settings.headercolor: 'transparent', 'black', newElPosX, newLinePosY, 5 * ratio, 5 * ratio);
      newElPosX += 10 * ratio;
    }
  } else {
    currentCV.utils.drawRect('transparent', currentCV.settings.headercolor, newElPosX, newLinePosY, 75 * ratio, 5 * ratio);
    currentCV.utils.drawRect(currentCV.settings.headercolor, 'transparent', newElPosX, newLinePosY, level * 15 * ratio, 5 * ratio);
  }
  newLinePosY += padding;
  newElPosX = currentCV.settings.sidebar === 'left' ? padding : currentCV.cnv.width * 2 / 3 + padding;
}

export function refreshCV() {
  currentCV.utils.clearCanvas();
  setPreferences();
  renderCV(currentCVData);
}

export function refreshLetter() {
  currentCV.utils.clearCanvas();
  setPreferences();
  newElPosX = padding;
  renderLetter(currentLetterData);
}

function setPreferences(){

  if (currentCVData.preferences.font && currentCVData.preferences.font !== 'default') {
    currentCV.settings.titlefont = currentCVData.preferences.font;
    currentCV.settings.subtitlefont = currentCVData.preferences.font;
    currentCV.settings.textfont = currentCVData.preferences.font;
    currentCV.settings.headerfont = currentCVData.preferences.font;
  }
  if (currentCVData.preferences.color && currentCVData.preferences.color !== 'default') {
    currentCV.settings.headercolor = currentCVData.preferences.color;
    currentCV.settings.background = currentCVData.preferences.color;
  }
  if (currentCVData.preferences.fontsize && currentCVData.preferences.fontsize !== 'default') {
    if(currentCVData.preferences.fontsize === 's') currentCV.settings.textsize = 10 * ratio;
    if(currentCVData.preferences.fontsize === 'm') currentCV.settings.textsize = 14 * ratio;
    if(currentCVData.preferences.fontsize === 'l') currentCV.settings.textsize = 16 * ratio;
  }
  if (currentCVData.preferences.template >= 0) {
    currentCV.settings.template = currentCVData.preferences.template;
  }
}

export function resetSettings(){
  currentCV.settings = Object.assign({}, templates[currentCVData.preferences.template].settings);
  applyRatio(ratio);
}

function nextLine(height: number){
  newLinePosY += height + padding;
}

function drawUtils(cnv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  return {
    drawRect(fillColor: string, strokeColor: string, x: number, y: number , w: number, h: number): void {
      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(x, y, w, h);
      }
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, w, h);
      }
    },

    drawImage(img: HTMLImageElement, x: number, y: number, w: number, h: number) {
      ctx.drawImage(img, x, y, w, h);
    },

    drawText(fontSize: number, font: string, color: string, text: string, x: number, y: number) {
      y = y + Number(fontSize);
      const fontSetting = `${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.font = fontSetting;
      text = (text === 'undefined')? '': text;
      ctx.fillText(text || '', x, y);
    },

    drawBoldText(fontSize: number, font: string, color: string, text: string, x: number, y: number) {
      y = y + Number(fontSize);
      const fontSetting = `bold ${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.font = fontSetting;
      text = (text === 'undefined')? '': text;
      ctx.fillText(text || '', x, y);
    },

    clearCanvas(){
      ctx.clearRect(0, 0, cnv.width, cnv.height);
      newLinePosY = 0;
      newElPosX = 0;
      this.drawRect('#fff','#fff', 0, 0, currentCV.cnv.width, currentCV.cnv.height);
    }
  }
}