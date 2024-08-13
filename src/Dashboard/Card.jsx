import React from "react";
import '../App.css';

const Cards = ({ widget, handleAddWidget, handleDeleteWidget, categoryIndex, widgetIndex }) => {
  return (
    <div className="card" style={{ width: "430px" }}>
      {widget ? (
        <>
          <div className="d-flex justify-content-between align-items-start">
            <img 
              src={widget.image} 
              className="card-image" 
              alt={widget.title} 
              style={{ width: "150px", height: "250px" }} 
            />
            <div className="card-body" style={{ flex: 1 }}>
              <h4 className="card-title">{widget.title}</h4>
              <p className="card-text">{widget.description}</p>
            </div>
            <button 
              onClick={() => handleDeleteWidget(categoryIndex, widgetIndex)} 
              className="btn btn-light btn-sm"
              style={{ marginLeft: "auto" }}
            >
              &times;
            </button>
          </div>
        </>
      ) : (
        <div className="card-body">
          <button
            onClick={() => handleAddWidget(categoryIndex, widgetIndex)}
            className="btn btn-light btn-outline-dark"
          >
            Add Widget+
          </button>
        </div>
      )}
    </div>
  );
};

export default Cards;
