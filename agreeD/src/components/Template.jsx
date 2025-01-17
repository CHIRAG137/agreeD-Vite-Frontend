import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Configure the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PdfPreview = () => {
  const [pdf, setPdf] = useState(null);
  const [clickInfo, setClickInfo] = useState({ x: 0, y: 0, page: 0 });
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const loadPdf = async () => {
      const pdfUrl = "http://localhost:3000/pdf"; // Use the API route from the server
      const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
      setPdf(pdfDoc);

      // Log the total number of pages in the PDF
      console.log('Total number of pages:', pdfDoc.numPages);
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

    // Calculate tab position in points
    const pageWidthInches = 1000 / 96; // Convert container width (px) to inches (assuming 96 DPI)
    const pageHeightInches = rect.height / 96; // Convert container height (px) to inches (assuming 96 DPI)
    
    // Convert to points (1 inch = 72 points)
    const xPosition = (x / rect.width) * pageWidthInches * 72;
    const yPosition = (y / rect.height) * pageHeightInches * 72;

    console.log(`Tab Position (x, y): (${xPosition.toFixed(0)}, ${yPosition.toFixed(0)})`);
  };

  const renderPdfPage = (pageNumber) => {
    if (!pdf) return;

    pdf.getPage(pageNumber).then((page) => {
      const canvas = document.getElementById(`pdf-page-${pageNumber}`);
      const context = canvas.getContext("2d");

      // Calculate scale based on the container's width and height
      const scale = Math.min(
        containerDimensions.width / page.getViewport({ scale: 1 }).width,
        containerDimensions.height / page.getViewport({ scale: 1 }).height
      );

      const viewport = page.getViewport({ scale });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({ canvasContext: context, viewport }).promise;
    });
  };

  // Handle window resize to update container dimensions
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("pdf-container");
      if (container) {
        setContainerDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize dimensions

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ color: "black", paddingTop: "40px" }}>
      <div
        id="pdf-container"
        style={{
          width: "1000px", // Adjust this to your desired width
          height: "530px", // Fixed height
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
              style={{ display: "block", marginBottom: "20px", width:"940px" }}
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
