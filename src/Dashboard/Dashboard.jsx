import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Cards from "./Card";
import NavbarHead from "./Navbar";

import Workload from "../images/CWPP/Workload.png";
import Vulnerability from "../images/CWPP/Vulnerability.png";
import Runtime from "../images/CWPP/Runtime.png";
import Resource from "../images/CWPP/Resource.png";
import Network from "../images/CWPP/Network.png";

import Security from "../images/CSPM/Security.png";
import Risk from "../images/CSPM/Security.png";
import Compliance from "../images/CSPM/Security.png";
import Threat from "../images/CSPM/Security.png";
import Activity from "../images/CSPM/Security.png";

import Container from '../images/RegisterScan/Container.png';
import Compliance01 from '../images/RegisterScan/Compliance.png';
import Dependency from '../images/RegisterScan/Dependency.png';
import Results from '../images/RegisterScan/Scan.png';
import Management from '../images/RegisterScan/imageImage.png';

const widgetCategories = [
  {
    name: "CSPM Dashboard",
    widgets: [
      {
        title: "Security Overview",
        description: "A summary of security configurations and compliance status.",
        image: Security,
      },
      {
        title: "Risk Assessment",
        description: "Detailed risk analysis for cloud infrastructure.",
        image: Risk,
      },
      {
        title: "Compliance Checks",
        description: "Automated compliance checks for industry standards.",
        image: Compliance,
      },
      {
        title: "Threat Detection",
        description: "Real-time detection of potential security threats.",
        image: Threat,
      },
      {
        title: "Activity Logs",
        description: "Logs of user activities and changes in the environment.",
        image: Activity,
      },
    ],
  },
  {
    name: "CWPP Dashboard",
    widgets: [
      {
        title: "Workload Monitoring",
        description: "Continuous monitoring of cloud workloads.",
        image: Workload,
      },
      {
        title: "Vulnerability Scanning",
        description: "Identify vulnerabilities in running workloads.",
        image: Vulnerability,
      },
      {
        title: "Runtime Protection",
        description: "Protect workloads during runtime from attacks.",
        image: Runtime,
      },
      {
        title: "Resource Utilization",
        description: "Track and optimize resource usage in workloads.",
        image: Resource,
      },
      {
        title: "Network Security",
        description: "Monitor and secure network traffic for workloads.",
        image: Network,
      },
    ],
  },
  {
    name: "Registry Scan",
    widgets: [
      {
        title: "Container Vulnerabilities",
        description: "Scan for vulnerabilities in container images.",
        image: Container,
      },
      {
        title: "Image Compliance",
        description: "Ensure container images comply with standards.",
        image: Compliance01,
      },
      {
        title: "Dependency Analysis",
        description: "Analyze dependencies in container images for risks.",
        image: Dependency,
      },
      {
        title: "Scan Results",
        description: "Detailed results of the latest registry scans.",
        image: Results,
      },
      {
        title: "Image Management",
        description: "Manage and organize container images in the registry.",
        image: Management,
      },
    ],
  },
];

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [categoryWidgets, setCategoryWidgets] = useState(
    widgetCategories.map(() => Array(3).fill(null))
  );
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [currentWidgetIndex, setCurrentWidgetIndex] = useState(null);

  useEffect(() => {
    const storedWidgets = localStorage.getItem("categoryWidgets");
    if (storedWidgets) {
      setCategoryWidgets(JSON.parse(storedWidgets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categoryWidgets", JSON.stringify(categoryWidgets));
  }, [categoryWidgets]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSelect = (eventKey) => setActiveTab(eventKey);

  const handleCheckboxChange = (widget) => {
    setSelectedWidgets((prevWidgets) => {
      const widgetExists = prevWidgets.some((w) => w.title === widget.title);
      if (widgetExists) {
        return prevWidgets.filter((w) => w.title !== widget.title);
      }
      const updatedWidgets = [...prevWidgets, widget];
      if (updatedWidgets.length > 3) {
        updatedWidgets.shift(); // Automatically remove the first selected widget if there are more than 3
      }
      return updatedWidgets;
    });
  };

  const handleConfirm = () => {
    if (currentCategoryIndex !== null && currentWidgetIndex !== null) {
      setCategoryWidgets((prevCategoryWidgets) => {
        const updatedCategoryWidgets = [...prevCategoryWidgets];
        updatedCategoryWidgets[currentCategoryIndex][currentWidgetIndex] =
          selectedWidgets[0] || null; // Add the first selected widget to the specific card slot

        return updatedCategoryWidgets;
      });
    }
    setSelectedWidgets([]);
    handleClose();
  };

  const handleCancel = () => {
    setSelectedWidgets([]);
    handleClose();
  };

  const handleAddWidget = (categoryIndex, widgetIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setCurrentWidgetIndex(widgetIndex);
    setActiveTab(`tab${categoryIndex + 1}`);
    handleShow();
  };

  const handleDeleteWidget = (categoryIndex, widgetIndex) => {
    if (window.confirm("Are you sure you want to delete this widget?")) {
      setCategoryWidgets((prevCategoryWidgets) => {
        const updatedCategoryWidgets = [...prevCategoryWidgets];
        updatedCategoryWidgets[categoryIndex][widgetIndex] = null; // Remove the widget from the category

        return updatedCategoryWidgets;
      });
    }
  };

  return (
    <>
      <div className="dashboard-bg">
        <NavbarHead handleShow={handleShow} />

        <div className="p-3">
          {widgetCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2 className="mb-3">{category.name}</h2>
              <div className="d-flex justify-content-between">
                {categoryWidgets[categoryIndex].map((widget, widgetIndex) => (
                  <div key={widgetIndex} className="mb-4">
                    <Cards
                      style={{ width: "500px" }}
                      widget={widget}
                      handleAddWidget={handleAddWidget}
                      handleDeleteWidget={handleDeleteWidget}
                      categoryIndex={categoryIndex}
                      widgetIndex={widgetIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "700px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="bg-primary w-100 p-2 text-white">
            Widget Selection
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav
            justify
            variant="tabs"
            activeKey={activeTab}
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey="tab1">CSPM</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab2">CWPP</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab3">Registry</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="tab-content mt-3">
            {widgetCategories.map(
              (category, categoryIndex) =>
                activeTab === `tab${categoryIndex + 1}` && (
                  <div key={categoryIndex}>
                    {category.widgets.map((widget, widgetIndex) => (
                      <div key={widgetIndex} className="mb-2">
                        <input
                          type="checkbox"
                          id={`widget-${categoryIndex}-${widgetIndex}`}
                          checked={selectedWidgets.some(
                            (w) => w.title === widget.title
                          )}
                          onChange={() => handleCheckboxChange(widget)}
                        />
                        <label
                          htmlFor={`widget-${categoryIndex}-${widgetIndex}`}
                          className="ms-2"
                        >
                          {widget.title}
                        </label>
                      </div>
                    ))}
                    <div className="mt-3">
                      <button
                        className="btn btn-primary me-2"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Dashboard;
