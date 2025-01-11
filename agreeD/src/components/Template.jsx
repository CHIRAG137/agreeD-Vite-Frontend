import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Configure the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PdfPreview = () => {
  const [pdf, setPdf] = useState(null);
  const [clickInfo, setClickInfo] = useState({ x: 0, y: 0, page: 0 });

  useEffect(() => {
    const loadPdf = async () => {
      const pdfUrl = "http://localhost:3000/pdf"; // Use direct download link
      const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
      setPdf(pdfDoc);
    };
    loadPdf();
  }, []);

  const handleDocClick = (e) => {
    if (!pdf) return;

    const rect = e.target.getBoundingClientRect(); // Get position of the PDF container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Estimate page number based on Y position
    const pageHeight = rect.height / pdf.numPages;
    const page = Math.floor(y / pageHeight) + 1;

    setClickInfo({ x, y, page });
  };

  const renderPdfPage = (pageNumber) => {
    if (!pdf) return;

    pdf.getPage(pageNumber).then((page) => {
      const canvas = document.getElementById(`pdf-page-${pageNumber}`);
      const context = canvas.getContext("2d");

      const viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({ canvasContext: context, viewport }).promise;
    });
  };

  return (
    <div style={{ color: "black", paddingTop: "40px" }}>
      <div
        style={{
          height: "530px",
          overflow: "scroll",
          position: "relative",
        }}
        onClick={handleDocClick}
      >
        {pdf &&
          Array.from({ length: pdf.numPages }, (_, idx) => (
            <canvas
              key={idx}
              id={`pdf-page-${idx + 1}`}
              style={{ display: "block", marginBottom: "20px" }}
            />
          ))}
      </div>
      {pdf &&
        Array.from({ length: pdf.numPages }, (_, idx) =>
          renderPdfPage(idx + 1)
        )}
      <div>
        <p>
          Clicked at X: {clickInfo.x}, Y: {clickInfo.y}
        </p>
        <p>Page Number: {clickInfo.page}</p>
      </div>
    </div>
  );
};

export default PdfPreview;
