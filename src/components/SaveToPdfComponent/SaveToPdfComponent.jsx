import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

export const SaveToPdfComponent = () => {
   const handleSaveToPDF = () => {
      // Создаем новый экземпляр jsPDF
      const doc = new jsPDF("landscape");

      // Получаем все графики на странице (у них есть класс 'PdfOnePage')
      const charts = document.querySelectorAll(".PdfOnePage");

      // Проходимся по каждому графику и создаем скриншот с помощью html2canvas
      charts.forEach((chart, index) => {
         html2canvas(chart).then((canvas) => {
            // Преобразуем скриншот в Data URL
            const dataURL = canvas.toDataURL("image/png");

            // Добавляем скриншот в PDF документ
            if (index > 0) {
               doc.addPage();
            }
            const pageWidth = doc.internal.pageSize.getWidth(); // Получаем ширину страницы
            const pageHeight = doc.internal.pageSize.getHeight(); // Получаем высоту страницы
            doc.addImage(dataURL, "PNG", 10, 10, pageWidth - 20, 0);

            // Если это последний график, сохраняем PDF файл
            if (index === charts.length - 1) {
               doc.save("Charts.pdf");
            }
         });
      });
   };

   return (
      <ButtonComponent name={"Сохранить в PDF"} onClick={handleSaveToPDF} />
   );
};
