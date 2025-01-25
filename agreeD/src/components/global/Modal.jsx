const Modal = ({ isOpen, onClose, children, style = {} }) => {
  if (!isOpen) return null;

  const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalContentStyles = {
    backgroundColor: "#171717",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "auto",
    maxWidth: "1000px",
    ...style,
  };

  const closeButtonStyles = {
    background: "none",
    border: "none",
    fontSize: "30px",
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  };

  return (
    <div style={modalStyles} onClick={onClose}>
      <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyles} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
