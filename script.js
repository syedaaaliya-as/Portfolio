(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const projects = {
    graph: { tag:'01 / AI • RAG', title:'Multi-Modal Graph RAG for Driver Safety Monitoring', text:'Designed a multi-modal Graph RAG system integrating visual, sensor, and contextual information for driver safety analysis and risk detection.', idea:'Bring multiple streams of driver context together so safety analysis can reason across visual, sensor and contextual information.', stack:['Python','Graph RAG','LLMs','PyTorch','OpenCV','NetworkX','Computer Vision'] },
    interview: { tag:'02 / GENAI', title:'Smart Interview Preparation Agent', text:'Developed an AI-powered interview preparation agent for dynamic question generation, interview evaluation, and performance tracking using LLM-based workflows.', idea:'Turn interview practice into a repeatable AI workflow: generate, evaluate, track, improve.', stack:['Python','LLMs','Activepieces','OpenAI API','Prompt Engineering','REST APIs'] },
    tourist: { tag:'03 / WEB • ML', title:'Context-Aware Tourist Recommendation System', text:'Developed a real-time recommendation system using Decision Trees, weather data, and user preferences to generate context-aware tourist recommendations.', idea:'Make recommendations react to real-world context instead of treating every traveller the same.', stack:['Python','Flask','Decision Tree','JavaScript','HTML/CSS','OpenStreetMap API','Weather API'] },
    nlp: { tag:'04 / NLP', title:'NLP-Based Language Detection, Readability & Bias Analysis', text:'Developed an NLP dashboard for language detection, sentiment analysis, readability scoring, and bias analysis with interactive data visualizations.', idea:'Put several language-quality signals into one interactive dashboard for easier exploration of text.', stack:['Python','FastText','VADER','TextStat','Pandas','Matplotlib','Flask'] },
    helmet: { tag:'05 / COMPUTER VISION', title:'Helmet & Triple Riding Detection', text:'Developed an automated computer vision system for detecting helmet violations and triple riding among two-wheeler riders in real-time surveillance footage.', idea:'Automate surveillance review to identify helmet violations and triple-riding instances in real time.', stack:['Python','YOLOv3','OpenCV','Deep Learning','CNN','Computer Vision','Image Processing'] }
  };

  const answers = {
    help:'Try: about, projects, skills, journey, experience, research, publications, contact, why ai?, or clear.',
    about:'Syeda Aaliya is a Computer Science & Engineering student specializing in AI & ML, with work across GenAI, NLP, computer vision, data and software systems.',
    projects:'Five highlighted projects: Multi-Modal Graph RAG for Driver Safety, Smart Interview Preparation Agent, Context-Aware Tourist Recommendation, NLP Language/Readability/Bias Analysis, and Helmet & Triple Riding Detection.',
    skills:'Python · Java · C · SQL · ML/DL · CNN · RNN · LSTM · Transformers · RAG · LLMs · PyTorch · TensorFlow · Flask · Git/GitHub · Snowflake · Databricks · and more.',
    journey:'2019–2021 Diploma → 2022–2024 Wipro IT Support Engineer → 2024–2027 B.E. CSE (AI & ML).',
    experience:'Wipro Ltd, 2022–2024: IT Support Engineer on the ICICI Bank project, working with database management, technical support, asset management and support-process optimization.',
    research:'Hybrid Intelligence Learning Architecture for Pulmonary Hypertension Diagnosis — ICEFEET 2026, accepted.',
    publications:'Publication: Hybrid Intelligence Learning Architecture for Pulmonary Hypertension Diagnosis — ICEFEET 2026, accepted.',
    contact:'Email: syeda01aaliya@gmail.com | Bengaluru, Karnataka, India',
    'why ai?':'Because intelligent systems sit at the intersection of curiosity, problem solving and experimentation — exactly the kind of work Aaliya enjoys building.',
    'who is aaliya?':'A curious AI & ML learner who likes turning ideas into projects — with a growing focus on GenAI, computer vision, NLP and practical systems.'
  };

  const escapeHTML = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function initProjects() {
    const modal = $('#modal');
    if (!modal) return;
    const close = $('#closeModal');
    const modalTag = $('#modalTag'), modalTitle = $('#modalTitle'), modalText = $('#modalText'), modalIdea = $('#modalIdea'), modalStack = $('#modalStack');
    const openProject = key => {
      const p = projects[key];
      if (!p) return;
      modalTag.textContent = p.tag; modalTitle.textContent = p.title; modalText.textContent = p.text; modalIdea.textContent = p.idea;
      modalStack.innerHTML = p.stack.map(x => `<span>${escapeHTML(x)}</span>`).join('');
      modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
    };
    const closeModal = () => { modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
    $$('.project-card').forEach(card => card.addEventListener('click', () => openProject(card.dataset.project)));
    close?.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  function initLab() {
    const terminal = $('#terminalBody');
    if (!terminal) return;
    const getInput = () => $('#terminalInput', terminal);

    const run = raw => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      if (cmd === 'clear') {
        terminal.innerHTML = '<div class="terminal-input"><span>&gt;</span><input id="terminalInput" autocomplete="off" placeholder="try: why ai?" aria-label="Ask Aaliya" /></div>';
        getInput()?.focus();
        return;
      }
      const answer = answers[cmd] || 'I don\'t have that command yet. Try <b>help</b>.';
      const line = document.createElement('div');
      line.className = 'terminal-response';
      line.innerHTML = `<span class="terminal-command">&gt; ${escapeHTML(cmd)}</span><div class="terminal-answer">${answer}</div>`;
      const inputRow = $('.terminal-input', terminal);
      terminal.insertBefore(line, inputRow);
      const input = getInput();
      if (input) { input.value = ''; input.focus(); }
      terminal.scrollTop = terminal.scrollHeight;
    };

    terminal.addEventListener('click', e => {
      const button = e.target.closest('[data-cmd]');
      if (button) run(button.dataset.cmd);
    });
    terminal.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.matches('#terminalInput')) run(e.target.value);
    });
    getInput()?.focus();
  }

  function initTheme() {
    const button = $('#themeBtn');
    if (!button) return;
    if (localStorage.getItem('aaliya-theme') === 'light') document.body.classList.add('light');
    const update = () => {
      const light = document.body.classList.contains('light');
      button.textContent = light ? '☾' : '☼';
      button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    };
    update();
    button.addEventListener('click', () => {
      document.body.classList.toggle('light');
      localStorage.setItem('aaliya-theme', document.body.classList.contains('light') ? 'light' : 'dark');
      update();
    });
  }

  function initNavigation() {
    const menu = $('#menuBtn'), nav = $('#navLinks');
    if (menu && nav) {
      menu.addEventListener('click', () => nav.classList.toggle('open'));
      nav.addEventListener('click', e => { if (e.target.closest('a')) nav.classList.remove('open'); });
    }
  }

  // V8 performance: no scroll handler, no IntersectionObserver, no custom cursor loop.
  // The page renders all content immediately so scrolling stays on the browser's fast path.
  function initProgress() {}
  function initReveal() {}
  function initPointerEffects() {}

  function initPreloader() {
    const loader = $('#preloader');
    if (!loader) return;
    const done = () => setTimeout(() => loader.classList.add('done'), 380);
    if (document.readyState === 'complete') done(); else window.addEventListener('load', done, {once:true});
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProjects();
    initLab();
    initTheme();
    initNavigation();
    initProgress();
    initReveal();
    initPointerEffects();
    initPreloader();
  });
})();
