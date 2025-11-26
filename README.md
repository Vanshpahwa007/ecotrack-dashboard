# Welcome to my project

CIRCUIT DIAGRAM (IOT Components)

https://www.circuito.io/static/reply/index.html?solutionId=6926d9f2e81bfa32828593da&solutionPath=storage.circuito.io

🎯 About
EcoTrack is an advanced IoT-powered dashboard designed for real-time monitoring and optimization of campus sustainability metrics. Built for the Build-Up Ideathon, this project demonstrates how technology can drive environmental consciousness and operational efficiency in educational institutions.
Problem Statement
Campuses lack real-time visibility into their resource consumption, leading to:

❌ Energy wastage and high utility costs
❌ Inefficient water usage and leaks going undetected
❌ Poor waste management and low recycling rates
❌ Unmonitored air quality affecting student health

Our Solution
EcoTrack provides a comprehensive monitoring system that:

✅ Tracks energy, water, waste, and air quality in real-time
✅ Generates smart alerts for anomalies and optimization opportunities
✅ Calculates sustainability scores and tracks improvements
✅ Monitors individual buildings for granular insights
✅ Integrates with affordable ESP32-based IoT sensors

🛠️ Tech Stack
Frontend

Framework: React 18+ with Hooks
Styling: Tailwind CSS
Icons: Lucide React
State Management: React useState/useEffect
Build Tool: Vite/Create React App

Backend (Optional)

Hardware: ESP32 Development Board
Language: Arduino C++
Protocol: HTTP REST API
Data Format: JSON

Sensors Supported
CategorySensorsEnergyACS712, ZMPT101B, PZEM-004TWaterYF-S201, HC-SR04, TDS MeterAir QualityDHT22, MQ-135, MH-Z19WasteHC-SR04, HX711, IR Sensors

🚀 Live Demo
Check out the live dashboard: EcoTrack Dashboard
The demo runs with simulated sensor data - no hardware required!

💻 Getting Started
Prerequisites

Node.js 16+ and npm
Git
(Optional) ESP32 with Arduino IDE for hardware integration

Installation

Clone the repository

bash   git clone https://github.com/Vanshpahwa007/ecotrack-dashboard.git
   cd ecotrack-dashboard

Install dependencies

bash   npm install

Start development server

bash   npm run dev

Open in browser

   http://localhost:5173
Build for Production
bashnpm run build
npm run preview

🔌 ESP32 Setup (Optional)
Hardware Requirements

ESP32 Development Board (~₹500)
Sensors (see Bill of Materials)
Breadboard and jumper wires
5V 2A power supply
USB cable

Quick Start

Install Arduino IDE

Download from arduino.cc
Add ESP32 board support


Upload Code

cpp   // Open esp32/esp32_sensor_code.ino
   // Update WiFi credentials:
   const char* ssid = "Your_WiFi_SSID";
   const char* password = "Your_Password";
   
   // Upload to ESP32

Get IP Address

Open Serial Monitor (115200 baud)
Note the IP address displayed
Example: 192.168.1.100


Connect Dashboard

In dashboard, click "Configure"
Enter ESP32 IP address
Click "Connect to ESP32"
Live data will start streaming!


📁 Project Structure
ecotrack-dashboard/
├── public/
│   └── assets/           # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.jsx
│   │   ├── MetricCard.jsx
│   │   ├── BuildingCard.jsx
│   │   └── AlertPanel.jsx
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── esp32/
│   ├── esp32_sensor_code.ino  # ESP32 Arduino code
│   └── libraries/              # Required libraries
├── docs/
│   ├── CIRCUIT.md       # Circuit diagram guide
│   └── API.md           # API documentation
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
