import html2canvas from 'html2canvas';

export default async function downloadDivAsImage(divElement: HTMLElement, filename: string) {
  try {
    const canvas = await html2canvas(divElement);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}