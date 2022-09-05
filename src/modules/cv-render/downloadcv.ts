import {jsPDF} from "jspdf";

export function initDownloadBtns(){
  const optionPDF = document.querySelector('.download-pdf');
  const optionImg = document.querySelector('.download-img');
  optionPDF?.addEventListener('click', downloadCVPDF);
  optionImg?.addEventListener('click', downloadCVImg);
}

function downloadCVImg(){
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  const image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  const link = document.createElement('a');
  link.download = 'save';
  link.href = image;
  link.click();
}

function downloadCVPDF(){
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  let width = canvas.width; 
  let height = canvas.height;
  let pdf;

  if(width > height){
    pdf = new jsPDF('l', 'px', [width, height]);
  }
  else{
    pdf = new jsPDF('p', 'px', [height, width]);
  }

  width = pdf.internal.pageSize.getWidth();
  height = pdf.internal.pageSize.getHeight();
  pdf.addImage(canvas, 'png', 0, 0,width,height);
  pdf.save("download.pdf");
}