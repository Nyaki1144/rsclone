import { currentCVData } from "./cvdata";
import { templates } from "./templates";

//const ratio = window.devicePixelRatio || 1;
let newLinePosY = 0;
let newElPosX = 0;
let padding = 15;

let currentCV: Record<string, any>;

export function drawCV(data: Record<string, any>, container: HTMLElement) {
  newLinePosY = 0;
  newElPosX = 0;
  createCanvas();
  currentCV.utils = drawUtils(currentCV.cnv, currentCV.ctx);
  container.appendChild(currentCV.cnv);
  currentCV.settings = Object.assign({}, templates[data.preferences.template || 0].settings);
  setPreferences();
  renderCV(data);
}

function createCanvas(){
  currentCV = {};
  const cnv = document.createElement('canvas') as HTMLCanvasElement;
  cnv.classList.add('border');
  const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;
  cnv.width = 620;
  cnv.height = 877;
  currentCV.cnv = cnv;
  currentCV.ctx = ctx;
}

function renderCV(cv: Record<string, any>){
  drawHeaderBackground();
  drawUserpic();
  drawTitle(`${cv.firstname} ${cv.lastname}`);
  drawSubtitle(`${cv.subtitle}`);
  drawHorizontalSeparator(newElPosX, newLinePosY + 0.5, undefined, String(currentCV.settings.subtitlecolor));
  drawHeaderContacts(cv.email, cv.tel, cv.address);
  drawVerticalSeparator(currentCV.settings.sidebar === 'left' ? 170.5 - padding : 394.5, newLinePosY + padding*2 );
  drawCVBody(cv);
  drawCVSidebar(cv);
};

function drawHeaderBackground() {
  currentCV.utils.drawRect(currentCV.settings.background, 'transparent', 0, 0, currentCV.cnv.width, 150 + padding * 2);
}

function drawVerticalSeparator(x: number, y: number) {
  currentCV.utils.drawRect(String(currentCV.settings.headercolor), 'transparent', x + 0.5, y, 1, currentCV.cnv.height - y - padding);
}

function drawHorizontalSeparator(x: number, y: number, width?: number, color?: string) {
  currentCV.utils.drawRect(color? color : currentCV.settings.headercolor, 'transparent', x, y + 0.5, width? width : currentCV.cnv.width - x - padding, 1);
  newLinePosY += padding;
}

function drawUserpic() {
  let x = 0 + padding;
  let y = 0 + padding;
  currentCV.utils.drawRect('#000', 'transparent', x, y, 150, 150);
  // TODO draw image
  newElPosX = x + padding + 150;
}

function drawTitle(text: string) {
  const x = newElPosX;
  const y = padding;
  currentCV.utils.drawText(Number(currentCV.settings.titlesize), String(currentCV.settings.titlefont), String(currentCV.settings.titlecolor), text, x, y);
  newLinePosY += currentCV.settings.titlesize + padding;
}

function drawSubtitle(text: string) {
  const x = newElPosX;
  const y = newLinePosY;
  currentCV.utils.drawText(currentCV.settings.subtitlesize, currentCV.settings.subtitlefont, currentCV.settings.subtitlecolor, text, x, y);
  newLinePosY += currentCV.settings.subtitlesize + padding;
}

function drawHeaderContacts(email: string, phone: string, location: string){
  // TODO add icons
  // drawImage(emailImg, 0, 0, 14, 14);
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.subtitlecolor , email, newElPosX, newLinePosY);
  let length = currentCV.ctx.measureText(email).width;
  newLinePosY += 14 + padding/2;

  //drawImage(phoneImg, newElPosX, newLinePosY, 14, 14);
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.subtitlecolor , phone, newElPosX, newLinePosY);
  length = currentCV.ctx.measureText(phone).width;
  newLinePosY += 14 + padding/2;

  //drawImage(addressImg, newElPosX, newLinePosY, 14, 14);
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.subtitlecolor , location, newElPosX, newLinePosY);
  length = currentCV.ctx.measureText(location).width;
  newLinePosY += 14 + padding/2;
}

function drawCVBody(cv: Record<string, any>) {
  newElPosX = currentCV.settings.sidebar === 'left' ? 170 : padding;
  newLinePosY = 150 + (padding * 3);
  currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.textfont, currentCV.settings.headercolor, 'Education', newElPosX, newLinePosY);
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
  currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.headerfont, currentCV.settings.headercolor, 'Work', newElPosX, newLinePosY);
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

function drawBodySection(dates: string, title: string, location: string, description: string) {
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, title, newElPosX, newLinePosY);
  newElPosX += 200;
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, dates, newElPosX, newLinePosY);
  newLinePosY += currentCV.settings.textsize;
  newElPosX = currentCV.settings.sidebar === 'left' ? 170 : padding;
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, 'grey', location, newElPosX, newLinePosY);
  newLinePosY += currentCV.settings.textsize + padding;
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, description, newElPosX, newLinePosY);
  newLinePosY += currentCV.settings.textsize + padding;
}

function drawCVSidebar(cv: Record<string, any>) {
  newElPosX = currentCV.settings.sidebar === 'left' ? padding : 400 + padding;
  newLinePosY = 150 + padding * 3;
  currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.headerfont, currentCV.settings.headercolor, 'Skills', newElPosX, newLinePosY);
  newLinePosY += currentCV.settings.headersize + padding;
  const skills = cv.skills;
  for(const entry of skills){
    drawSkill(entry.skill, entry.level);
  }
  newLinePosY+= padding;
  currentCV.utils.drawText(currentCV.settings.headersize, currentCV.settings.headerfont, currentCV.settings.headercolor, 'Languages', newElPosX, newLinePosY);
  newLinePosY += currentCV.settings.headersize + padding;
  const languages = cv.languages;
  for(const entry of languages){
    drawSkill(entry.language, entry.level);
  }
}

function drawSkill(skill: string, level: number) {
  currentCV.utils.drawText(currentCV.settings.textsize, currentCV.settings.textfont, currentCV.settings.textcolor, skill, newElPosX, newLinePosY);
  newLinePosY += currentCV.settings.textsize + padding/2;
  if (currentCV.settings.template === 0){
    for (let i = 1; i <= 5; i++)
    {
      currentCV.utils.drawRect(i <= level? currentCV.settings.headercolor: 'transparent', 'black', newElPosX, newLinePosY, 5, 5);
      newElPosX += 10;
    }
  } else {
    currentCV.utils.drawRect('transparent', currentCV.settings.headercolor, newElPosX, newLinePosY, 75, 5);
    currentCV.utils.drawRect(currentCV.settings.headercolor, 'transparent', newElPosX, newLinePosY, level*15, 5);
  }
  newLinePosY += padding;
  newElPosX = currentCV.settings.sidebar === 'left' ? padding : 400 + padding;
}

export function refreshCV() {
  currentCV.utils.clearCanvas();
  setPreferences();
  renderCV(currentCVData);
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
    if(currentCVData.preferences.fontsize === 's') currentCV.settings.textsize = 10;
    if(currentCVData.preferences.fontsize === 'm') currentCV.settings.textsize = 14;
    if(currentCVData.preferences.fontsize === 'l') currentCV.settings.textsize = 16;
  }
  if (currentCVData.preferences.template >= 0) {
    currentCV.settings.template = currentCVData.preferences.template;
    console.log('template', currentCV.settings.template);
  }
}

export function resetSettings(){
  currentCV.settings = Object.assign({}, templates[currentCVData.preferences.template].settings);
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
      ctx.fillText(text, x, y);
    },

    clearCanvas(){
      ctx.clearRect(0, 0, cnv.width, cnv.height);
      newLinePosY = 0;
      newElPosX = 0;
    }
  }
}