import { cvPreferences } from "./settingshandlers";
import { templates } from "./templates";

const cnvcontainer = document.querySelector('.canvas-container')
const cnv = document.querySelector('#cv-page') as HTMLCanvasElement;
const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;
//const ratio = window.devicePixelRatio || 1;
cnv.width = cnvcontainer?.clientWidth || 0;
cnv.height = cnvcontainer?.clientHeight || 0;
let newLinePosY = 0;
let newElPosX = 0;
let padding = 15;

let headerSettings = {...templates[0].headerSettings};
let mainSettings = {...templates[0].mainSettings};

/*
const emailImg = loadImage('./assets/icons/email.svg');
const addressImg = loadImage('./assets/icons/address.svg');
const phoneImg = loadImage('./assets/icons/phone.svg');
const userpicImg = loadImage('./assets/icons/email.svg');
*/

function drawRect(fillColor: string, strokeColor: string, x: number, y: number , w: number, h: number) {
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(x, y, w, h);
  }
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, w, h);
  }
}

function drawImage(img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  ctx.drawImage(img, x, y, w, h);
}

function drawText(fontSize: number, font: string, color: string, text: string, x: number, y: number) {
  y = y + Number(fontSize);
  const fontSetting = `${fontSize}px ${font}`;
  ctx.fillStyle = color;
  ctx.font = fontSetting;
  ctx.fillText(text, x, y);
}

function drawVerticalSeparator(x: number, y: number) {
  drawRect(mainSettings.headercolor, 'transparent', x + 0.5, y, 1, cnv.height - padding);
};

function drawHorizontalSeparator(x: number, y: number, width?: number, color?: string) {
  drawRect(color? color : mainSettings.headercolor, 'transparent', x, y + 0.5, width? width : cnv.width - x - padding, 1);
  newLinePosY += padding;
}

function drawBgRect() {
  drawRect(mainSettings.headercolor, 'transparent', 0, 0, cnv.width, 150 + padding * 2);
}

function drawUserpic() {
  let x = 0 + padding;
  let y = 0 + padding;
  drawRect('#000', 'transparent', x, y, 150, 150);
  // drawImage(userpicImg, x, y, 150, 150);
  newElPosX = x + padding + 150;
}

function drawTitle(text: string) {
  const x = newElPosX;
  const y = padding;
  drawText(headerSettings.titlesize, headerSettings.titlefont, headerSettings.titlecolor, text, x, y);
  newLinePosY += headerSettings.titlesize + padding;
}

function drawSubtitle(text: string) {
  const x = newElPosX;
  const y = newLinePosY;
  drawText(headerSettings.subtitlesize, headerSettings.subtitlefont, headerSettings.subtitlecolor, text, x, y);
  newLinePosY += headerSettings.subtitlesize + padding;
}

function drawHeaderContacts(email: string, phone: string, location: string){
  // drawImage(emailImg, 0, 0, 14, 14);
  newElPosX += 14;
  drawText(mainSettings.textsize, mainSettings.font, headerSettings.subtitlecolor , email, newElPosX, newLinePosY);
  let length = ctx.measureText(email).width;
  newElPosX += length + padding;

  //drawImage(phoneImg, newElPosX, newLinePosY, 14, 14);
  newElPosX += 14;
  drawText(mainSettings.textsize, mainSettings.font, headerSettings.subtitlecolor , phone, newElPosX, newLinePosY);
  length = ctx.measureText(phone).width;
  newElPosX += length + padding;

  //drawImage(addressImg, newElPosX, newLinePosY, 14, 14);
  newElPosX += 14;
  drawText(mainSettings.textsize, mainSettings.font, headerSettings.subtitlecolor , location, newElPosX, newLinePosY);
  length = ctx.measureText(location).width;
  newElPosX += length + padding;
  newLinePosY += 14 + padding;
  newElPosX = padding * 2 + 150; 
}

function drawCVHeader() {
  drawBgRect();
  drawUserpic();
  drawTitle('John Doe');
  drawSubtitle('programmer');
  drawHorizontalSeparator(newElPosX, newLinePosY + 0.5, undefined, headerSettings.subtitlecolor);
  drawHeaderContacts('ex@gmafjs.com', '123812', 'Vilnius')
}

function drawEducationSection(dates: string, title: string, location: string, description: string) {
  drawText(mainSettings.textsize, mainSettings.font, mainSettings.textcolor, title, newElPosX, newLinePosY);
  newElPosX += 200;
  drawText(mainSettings.textsize, mainSettings.font, mainSettings.textcolor, dates, newElPosX, newLinePosY);
  newLinePosY += mainSettings.textsize;
  newElPosX = mainSettings.sidebar === 'left' ? 170 : padding;
  drawText(mainSettings.textsize, mainSettings.font, 'grey', location, newElPosX, newLinePosY);
  newLinePosY += mainSettings.textsize + padding;
  drawText(mainSettings.textsize, mainSettings.font, mainSettings.textcolor, description, newElPosX, newLinePosY);
  newLinePosY += mainSettings.textsize + padding;
}

function drawCVBody() {
  newElPosX = mainSettings.sidebar === 'left' ? 170 : padding;
  newLinePosY = 150 + (padding * 3);
  drawText(mainSettings.headersize, mainSettings.font, mainSettings.headercolor, 'Education', newElPosX, newLinePosY);
  newLinePosY += mainSettings.headersize + padding;
  drawEducationSection('Sep 2022 - Present', 'Title', 'Minsk, BLR', 'Some description');
  drawEducationSection('May 2020 - Sep 2022', 'Title 2', 'Vilnius, LTU', 'Some description to add here');
  newLinePosY += padding;
  drawHorizontalSeparator (mainSettings.sidebar === 'left'? newElPosX : padding, newLinePosY + 0.5, 340);
  drawText(mainSettings.headersize, mainSettings.font, mainSettings.headercolor, 'Work', newElPosX, newLinePosY);
  newLinePosY += mainSettings.headersize + padding;
  drawEducationSection('Oct 2019 - Present', 'Work', 'Oslo', 'Some description again');
  drawEducationSection('Jan 2015 - Oct 2015', 'Work again', 'Company, LTU', 'Some description to add here again and again');
}

function drawCVSidebar() {
  newElPosX = mainSettings.sidebar === 'left' ? padding : 400 + padding;
  newLinePosY = 150 + padding * 3;
  drawText(mainSettings.headersize, mainSettings.font, mainSettings.headercolor, 'Skills', newElPosX, newLinePosY);
  newLinePosY += mainSettings.headersize + padding;
  drawSkill('HTML', 3);
  drawSkill('JS', 4);
  newLinePosY+= padding;
  drawText(mainSettings.headersize, mainSettings.font, mainSettings.headercolor, 'Languages', newElPosX, newLinePosY);
  newLinePosY += mainSettings.headersize + padding;
  drawSkill('English', 5);
  drawSkill('Chinese', 3);
}

export function drawCV() {
  drawCVHeader();
  drawCVBody();
  drawVerticalSeparator(mainSettings.sidebar === 'left' ? 170.5 - padding : 394.5, cnv.height - newLinePosY);
  drawCVSidebar();
}

function drawSkill(skill: string, level: number) {
  drawText(mainSettings.textsize, mainSettings.font, mainSettings.textcolor, skill, newElPosX, newLinePosY);
  newLinePosY += mainSettings.textsize + padding/2;
  if (mainSettings.template === 1){
    for (let i = 1; i <= 5; i++)
    {
      drawRect(i <= level? 'black': 'transparent', 'black', newElPosX, newLinePosY, 5, 5);
      newElPosX += 10;
    }
  } else {
    drawRect('transparent', mainSettings.headercolor, newElPosX, newLinePosY, 75, 5);
    drawRect(mainSettings.headercolor, 'transparent', newElPosX, newLinePosY, level*15, 5);
  }
  newLinePosY += padding;
  newElPosX = mainSettings.sidebar === 'left' ? padding : 400 + padding;
}

function loadImage(src: string) {
  const img = new Image();
  img.src = src;
  return img;
}

 function clearCanvas(){
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  newLinePosY = 0;
  newElPosX = 0;
}

export function refreshCV() {
  if (cvPreferences.font && cvPreferences.font !== 'default') {
    headerSettings.titlefont = cvPreferences.font;
    headerSettings.subtitlefont = cvPreferences.font;
    mainSettings.font = cvPreferences.font;
  }
  if (cvPreferences.color && cvPreferences.color !== 'default') {
    mainSettings.headercolor = cvPreferences.color;
  }
  if (cvPreferences.size && cvPreferences.size !== 'default') {
    if(cvPreferences.size === 's') {mainSettings.textsize = 10};
    if(cvPreferences.size === 'm') mainSettings.textsize = 14;
    if(cvPreferences.size === 'l') mainSettings.textsize = 16;
  }
  if (cvPreferences.template && cvPreferences.template !== mainSettings.template) {
    mainSettings.template = cvPreferences.template;
    headerSettings = {...templates[cvPreferences.template - 1].headerSettings};
    mainSettings = {...templates[cvPreferences.template - 1].mainSettings};
  }
  clearCanvas();
  drawCV();

}
