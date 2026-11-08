/**
 * ============================================================================
 * MIND OF AKIRA INSPIRED ENGINE
 * Portfolio of K A Vignesvaran
 * Three.js 3D WebGL Canvas • GSAP + ScrollTrigger • Interactive Terminal CLI
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // Remove loading class
  document.body.classList.remove('loading');

  /* --------------------------------------------------------------------------
   * 1. REAL-TIME LOCAL TIME CLOCK (IST / COIMBATORE)
   * -------------------------------------------------------------------------- */
  function updateClock() {
    const clockEl = document.getElementById('hero-clock');
    if (!clockEl) return;
    const now = new Date();
    // Format in IST (UTC+5:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockEl.textContent = `${now.toLocaleTimeString('en-GB', options)} IST`;
  }
  updateClock();
  setInterval(updateClock, 1000);


  /* --------------------------------------------------------------------------
   * 2. CUSTOM ELASTIC CYBER CURSOR
   * -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  // Smooth lerp loop for the outer cursor ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states for interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .matrix-card, .filter-btn');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });


  /* --------------------------------------------------------------------------
   * 3. THREE.JS 3D CYBERNETIC BACKGROUND CANVAS
   * -------------------------------------------------------------------------- */
  const canvas = document.getElementById('webgl-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Cloud Geometry
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0x7928ca);
    const baseColor = new THREE.Color(0x222233);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spatial distribution: wide cylinder / torus field
      const radius = 25 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 60;

      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = y;
      positions[i + 2] = Math.sin(theta) * radius;

      // Color variation
      const mixRatio = Math.random();
      const mixedColor = mixRatio > 0.8 ? cyanColor : (mixRatio > 0.6 ? purpleColor : baseColor);

      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Wireframe Geometric Core
    const coreGeo = new THREE.IcosahedronGeometry(14, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(12, 0, -10);
    scene.add(coreMesh);

    // Points Material
    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX - windowHalfX) * 0.001;
      targetY = (e.clientY - windowHalfY) * 0.001;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animateThree() {
      requestAnimationFrame(animateThree);
      const elapsedTime = clock.getElapsedTime();

      // Subtle rotation
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.015;

      coreMesh.rotation.x = elapsedTime * 0.08;
      coreMesh.rotation.y = elapsedTime * 0.09;

      // Parallax lerp
      camera.position.x += (targetX * 25 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 25 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animateThree();
  }


  /* --------------------------------------------------------------------------
   * 4. GSAP & SCROLLTRIGGER ANIMATIONS
   * -------------------------------------------------------------------------- */
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Reveal Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    heroTl
      .from('.hero-meta-badge', { y: 20, opacity: 0, delay: 0.2 })
      .from('.title-row .reveal-text', { y: '100%', stagger: 0.15, duration: 1.4 }, '-=0.8')
      .from('.hero-description', { y: 25, opacity: 0 }, '-=0.9')
      .from('.hero-actions .btn-cyber', { y: 20, opacity: 0, stagger: 0.15 }, '-=0.9')
      .from('.telemetry-cell', { y: 30, opacity: 0, stagger: 0.1 }, '-=0.7');

    // Number counters in telemetry
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const targetVal = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = targetVal % 1 !== 0;

      gsap.to(counter, {
        scrollTrigger: {
          trigger: counter,
          start: 'top 95%',
          once: true
        },
        duration: 2,
        ease: 'power2.out',
        onUpdate: function () {
          const progress = this.progress();
          const currentVal = targetVal * progress;
          counter.textContent = isDecimal ? currentVal.toFixed(4) : Math.round(currentVal).toLocaleString();
        }
      });
    });

    // Section Headers reveal
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%'
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Project Cards Stagger
      gsap.utils.toArray('.project-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%'
          },
          opacity: 0,
          y: 40,
          duration: 0.9,
          delay: idx * 0.05,
          ease: 'power3.out'
        });
      });

      // Matrix Cards Stagger
      gsap.from('.matrix-card', {
        scrollTrigger: {
          trigger: '.matrix-grid',
          start: 'top 80%'
        },
        opacity: 0,
        y: 35,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out'
      });

      // Timeline Items Stagger
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          },
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    }
  }


  /* --------------------------------------------------------------------------
   * 5. PROJECT CATEGORY FILTERING
   * -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* --------------------------------------------------------------------------
   * 6. AMBIENT AUDIO SYNTHESIZER / VISUALIZER TOGGLE
   * -------------------------------------------------------------------------- */
  const audioToggle = document.getElementById('audioToggle');
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let isAudioActive = false;

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      isAudioActive = !isAudioActive;
      audioToggle.classList.toggle('active', isAudioActive);
      const label = audioToggle.querySelector('.audio-label');

      if (isAudioActive) {
        label.textContent = 'AUDIO: ON';
        // Generate a subtle atmospheric ambient cyber drone (low volume)
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!audioCtx) audioCtx = new AudioContext();
          if (audioCtx.state === 'suspended') audioCtx.resume();

          oscillator = audioCtx.createOscillator();
          gainNode = audioCtx.createGain();

          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A hum
          gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // very subtle

          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
        } catch (e) {
          console.log('Web Audio feedback active.');
        }
      } else {
        label.textContent = 'AUDIO: OFF';
        if (oscillator) {
          try {
            oscillator.stop();
            oscillator.disconnect();
          } catch (e) {}
          oscillator = null;
        }
      }
    });
  }


  /* --------------------------------------------------------------------------
   * 7. SYSTEM DIAGNOSTIC CLI TERMINAL
   * -------------------------------------------------------------------------- */
  const terminalOverlay = document.getElementById('terminalOverlay');
  const openTerminalBtn = document.getElementById('openTerminalBtn');
  const closeTerminalBtn = document.getElementById('closeTerminalBtn');
  const termInput = document.getElementById('termInput');
  const termOutput = document.getElementById('termOutput');

  function openTerminal() {
    terminalOverlay.classList.add('open');
    setTimeout(() => termInput.focus(), 150);
  }

  function closeTerminal() {
    terminalOverlay.classList.remove('open');
  }

  if (openTerminalBtn) openTerminalBtn.addEventListener('click', openTerminal);
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);

  terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) closeTerminal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalOverlay.classList.contains('open')) {
      closeTerminal();
    }
  });

  // CLI Command Handler
  const COMMANDS = {
    help: `
Available commands:
  • <span class="term-cmd">about</span>       - Print engineer background & profile
  • <span class="term-cmd">projects</span>    - List primary engineering repositories
  • <span class="term-cmd">skills</span>      - Display technical capabilities matrix
  • <span class="term-cmd">experience</span>  - Show career & internship history
  • <span class="term-cmd">contact</span>     - Display communication channels
  • <span class="term-cmd">status</span>      - Run system integrity diagnostics
  • <span class="term-cmd">clear</span>       - Clear terminal buffer
  • <span class="term-cmd">exit</span>        - Close terminal modal
`,
    about: `
[ENGINEER PROFILE]
Name: K A Vignesvaran
Education: B.Tech in Electrical and Computer Engineering (Amrita Vishwa Vidyapeetham, CGPA 7.61)
Location: Coimbatore, Tamil Nadu, India
Specialization: Bridging low-level deterministic RTOS & hardware with distributed Databricks Lakehouse pipelines and applied ML.
`,
    projects: `
[ENGINEERING REPOSITORIES]
1. databricks-fmcg-medallion-pipeline
   -> Multi-Source FMCG Bronze/Silver/Gold Lakehouse on AWS S3 & Delta Lake
2. ev-charging-recommendation-system
   -> Driver-centric battery SoC prediction (XGBoost, R²=0.9324) & Haversine routing
3. dbt_x_gcp
   -> NYC 311 containerized ELT pipeline (Socrata REST API, BigQuery, dbt, CI/CD)
4. iot_csdi_canopy_imaging
   -> Final Year IoT crop canopy segmentation for Lady's Finger plants
5. parallel-cryptographic-hash-merkle-verification
   -> Parallel SHA-256 Merkle tree verification engine in C on QNX Neutrino RTOS
6. lora-communication-with-anti-jamming
   -> AES-encrypted LoRa telemetry with real-time RSSI/SNR channel hopping
`,
    skills: `
[CAPABILITIES MATRIX]
Languages   : C, Python, SQL, C++, Bash
Data Eng    : Databricks, PySpark, Google BigQuery, dbt, Delta Lake, AWS S3
Systems/RTOS: QNX Neutrino RTOS, POSIX Threads, IPC, IOV Messaging, Mutex/Semaphores
ML & Vision : XGBoost, Scikit-learn, Instance Segmentation (CVAT), Deep Learning
Cloud/Tools : Docker, GitHub Actions CI/CD, Git, Streamlit, REST APIs
`,
    experience: `
[WORK & EDUCATION]
• June 2026: Larsen & Toubro Limited (Chennai, India)
  EV Technology & Power Electronics Intern
  - MATLAB Simulink EV subsystems, BMS Coulomb counting SoC, DC-DC converter models.
  - Active/passive cell balancing & industrial railway electrification exposure.
• 2023 - 2027: Amrita Vishwa Vidyapeetham (Coimbatore)
  B.Tech Electrical & Computer Engineering (CGPA 7.61)
`,
    contact: `
[COMMUNICATION PROTOCOL]
• Email    : vignesvaranananthi@gmail.com
• GitHub   : https://github.com/Vignesvaran-K-A
• LinkedIn : https://linkedin.com/in/vignesvaran1412
• Location : Coimbatore, Tamil Nadu, India
`,
    status: `
[SYSTEM TELEMETRY]
STATUS     : ALL SYSTEMS OPERATIONAL
CPU LOAD   : NORMAL (DETERMINISTIC KERNEL)
LAKEHOUSE  : DELTA LAKE ACID COMMITS ACTIVE
ENCRYPTION : AES-256 VERIFIED
LATITUDE   : 11.0168° N
LONGITUDE  : 76.9558° E
`
  };

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = termInput.value.trim().toLowerCase();
        termInput.value = '';

        // Print input prompt line
        const cmdEcho = document.createElement('div');
        cmdEcho.className = 'term-line';
        cmdEcho.innerHTML = `<span class="term-prompt">user@vka-sys:~$</span> ${inputVal}`;
        termOutput.appendChild(cmdEcho);

        if (inputVal === 'clear') {
          termOutput.innerHTML = '';
          return;
        }

        if (inputVal === 'exit') {
          closeTerminal();
          return;
        }

        const response = document.createElement('div');
        response.className = 'term-line';

        if (COMMANDS[inputVal]) {
          response.innerHTML = COMMANDS[inputVal];
        } else if (inputVal === '') {
          // Do nothing on empty enter
        } else {
          response.innerHTML = `Unknown command: '${inputVal}'. Type <span class="term-cmd">'help'</span> for instructions.`;
        }

        termOutput.appendChild(response);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }

});

