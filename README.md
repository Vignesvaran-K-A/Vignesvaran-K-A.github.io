# K A Vignesvaran — Systems, Data & Intelligence

> **High-Performance Cyber-Editorial Portfolio**  
> Inspired by the award-winning aesthetic of **Mind of Akira**, built with modern HTML5, vanilla CSS, Three.js, and GSAP ScrollTrigger.

Live Deployment: [https://vignesvaran-k-a.github.io/](https://vignesvaran-k-a.github.io/)

---

## ⚡ Overview

This repository hosts the official personal engineering portfolio of **K A Vignesvaran**, Electrical & Computer Engineer specializing in:
- **Data Engineering & Lakehouse:** Databricks, PySpark, Delta Lake, Medallion Architecture, Google BigQuery, dbt Core.
- **Embedded Systems & RTOS:** QNX Neutrino RTOS, Multithreading (POSIX Threads), IPC, IOV Message Passing, BMS & EV Subsystems.
- **Applied Machine Learning & AI:** XGBoost, Geospatial Analysis, Deep Learning Instance Segmentation (CVAT), Predictive Analytics.

---

## 🛠 Featured Engineering Case Studies

1. **Multi-Source FMCG Medallion Pipeline**
   - Platform: Databricks Lakehouse, PySpark, SQL, AWS S3, Delta Lake
   - Architecture: Ingestion, schema validation, Bronze-Silver-Gold transformation layers.
   - [Repository](https://github.com/Vignesvaran-K-A/databricks-fmcg-medallion-pipeline)

2. **SoC-Aware Intelligent EV Charging Station Recommendation System**
   - Platform: Machine Learning, XGBoost, Geospatial Analysis, Python
   - Highlights: Battery State of Charge (SoC) prediction model ($R^2 = 0.9324$, $\text{MAE} = 1.91$) with Haversine radius routing across 489 charging hubs.
   - [Repository](https://github.com/Vignesvaran-K-A/ev-charging-recommendation-system)

3. **NYC 311 Data Engineering & Municipal Analytics Platform**
   - Platform: Python, dbt, Google BigQuery, Docker, GitHub Actions CI/CD, Streamlit
   - Highlights: Socrata REST API containerized batch ELT pipeline with automated dbt tests.
   - [Repository](https://github.com/Vignesvaran-K-A/dbt_x_gcp)

4. **IoT Crop Shoot Density Index (CSDI) via Canopy Imaging (Final Year Project)**
   - Platform: IoT Imaging, CVAT Polygon Annotation, Instance Segmentation, Deep Learning
   - Highlights: Agricultural canopy imaging for Lady's Finger plants to model temporal crop growth and yield health.
   - [Repository](https://github.com/Vignesvaran-K-A/iot_csdi_canopy_imaging)

5. **Parallel Cryptographic Hash & Merkle Verification Engine**
   - Platform: C, QNX Neutrino RTOS, POSIX Threads, IPC, IOV Messaging, SHA-256
   - Highlights: Deterministic multithreaded firmware verification engine on QNX microkernel.
   - [Repository](https://github.com/Vignesvaran-K-A/parallel-cryptographic-hash-merkle-verification)

6. **Secure LoRa Communication with Intelligent Anti-Jamming**
   - Platform: LoRa RF, AES Encryption, RSSI/SNR Spectrum Sensing, Dynamic Frequency Hopping
   - [Repository](https://github.com/Vignesvaran-K-A/lora-communication-with-anti-jamming)

7. **Nexus 3 Autonomous Robotic Vehicle Platform**
   - Platform: Embedded C, Sensor Fusion, Closed-Loop PID Velocity Regulation, Obstacle Avoidance

---

## 🎨 Creative & Interaction Stack

- **Three.js (r128):** Real-time 3D cyber particle field and rotating wireframe icosahedron with parallax tracking.
- **GSAP (3.12.5) + ScrollTrigger:** Kinetic typography reveals, metric count-up animations, and smooth scrub timelines.
- **System Diagnostic CLI:** In-browser terminal emulator supporting interactive commands (`help`, `about`, `projects`, `skills`, `experience`, `contact`, `status`).
- **Web Audio API:** Interactive synthesizer ambient drone simulation.

---

## 🚀 Local Development

Preview with any static file server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js npx
npx serve .
```
Or right-click `index.html` in VS Code and choose **"Open with Live Server"**.
