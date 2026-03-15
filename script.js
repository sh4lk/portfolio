window.addEventListener('scroll', function() {
  var scrollTop = window.scrollY;
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var scrolled = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrolled + '%';
  
  // --- BOUTON RETOUR EN HAUT ---
  const backToTop = document.getElementById('back-to-top');
  if (scrollTop > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

document.addEventListener("DOMContentLoaded", function() {

  // --- PAGE LOADER ---
  const loader = document.getElementById('page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  });
  // Fallback si load déjà passé
  if (document.readyState === 'complete') {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }

  // --- BOUTON RETOUR EN HAUT ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- REVEAL TEXT LETTRE PAR LETTRE ---
  const revealText = document.querySelector('.reveal-text');
  if (revealText) {
    const text = revealText.getAttribute('data-text');
    revealText.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${0.8 + i * 0.08}s`;
      revealText.appendChild(span);
    });
    revealText.style.opacity = '1';
  }
  
  // --- EFFET TYPING ---
  const typingText = document.getElementById('typing-text');
  const words = ['cybersécurité', 'pentesting', 'CTF', 'réseaux sécurisés'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause avant de supprimer
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause avant le prochain mot
    }

    setTimeout(type, typeSpeed);
  }

  if (typingText) {
    type();
  }

  // --- ANIMATIONS FADE-IN AU SCROLL ---
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- FORMULAIRE DE CONTACT ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Format plus propre pour le mailto
      const mailtoLink = `mailto:mateoadnot@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`${message}\n\n---\nDe: ${name}\nEmail: ${email}`)}`;
      
      window.location.href = mailtoLink;
    });
  }

  const leftBtn = document.querySelector('.exp-arrow.left');
  const rightBtn = document.querySelector('.exp-arrow.right');
  const slider = document.querySelector('.exp-slider');

  if(leftBtn && rightBtn && slider) {
    leftBtn.addEventListener('click', function() {
      slider.scrollBy({ left: -320, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', function() {
      slider.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Appliquer le thème: priorité au choix sauvegardé, sinon préférence système
  if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }

  // Écouter les changements de préférence système
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === null) {
      if (e.matches) {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        body.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
      }
    }
  });

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
  });

  // --- INDICATEUR DE SECTION ACTIVE ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]');
  
  function updateActiveNav() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Si on est tout en haut, aucune section active
    if (scrollY < 200) {
      navLinksItems.forEach(link => link.classList.remove('active'));
    }
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // --- TERMINAL MODE (Easter Egg) ---
  const terminalToggle = document.getElementById('pseudo');
  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalClose = document.getElementById('terminal-close');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  
  const terminalCommands = {
    help: `<span class="accent">Commandes disponibles:</span>
  <span class="command">about</span>     - Affiche les infos sur moi
  <span class="command">skills</span>    - Liste mes compétences
  <span class="command">ctf</span>       - Mes participations CTF
  <span class="command">projects</span>  - Affiche mes projets
  <span class="command">contact</span>   - Infos de contact
  <span class="command">social</span>    - Liens sociaux
  <span class="command">whoami</span>    - Qui suis-je ?
  <span class="command">clear</span>     - Efface le terminal
  <span class="command">exit</span>      - Ferme le terminal
  <span class="command">matrix</span>    - Easter egg ;)`,
    
    about: `<span class="accent">┌─────────────────────────────────────────┐</span>
<span class="accent">│</span>           <span class="success">À PROPOS DE MOI</span>              <span class="accent">│</span>
<span class="accent">└─────────────────────────────────────────┘</span>

<span class="response">Nom:</span> Matéo A.
<span class="response">Pseudo:</span> <span class="accent">shalk</span>
<span class="response">École:</span> Guardia Cybersecurity School
<span class="response">Passion:</span> Cybersécurité, CTF, Pentesting

Je suis passionné par la cybersécurité, la 
résolution de défis CTF et l'analyse de 
vulnérabilités. Actuellement à la recherche 
d'un stage ou d'une alternance.`,
    
    skills: `<span class="accent">┌─────────────────────────────────────────┐</span>
<span class="accent">│</span>           <span class="success">MES COMPÉTENCES</span>              <span class="accent">│</span>
<span class="accent">└─────────────────────────────────────────┘</span>

<span class="command">[■■■■■■■■■□]</span> CTF - RootMe
<span class="command">[■■■■■■■■□□]</span> Virtualisation
<span class="command">[■■■■■■■■□□]</span> Réseaux sécurisés
<span class="command">[■■■■■■■□□□]</span> Développement
<span class="command">[■■■■■■■■■□]</span> Serveur maison`,
    
    ctf: `<span class="accent">┌─────────────────────────────────────────┐</span>
<span class="accent">│</span>          <span class="success">PARTICIPATIONS CTF</span>             <span class="accent">│</span>
<span class="accent">└─────────────────────────────────────────┘</span>

<span class="command">[Mar 2026]</span> GuardiHack 2026
           <span class="response">Équipe:</span> <span class="accent">HexaCore</span>
           <span class="response">Classement:</span> <span class="success">#3 / 42 équipes</span>
           <span class="response">Catégories:</span> Web, Reverse, Pwn, Osint,
                       Forensics, Crypto
           <span class="response">Compétition nationale Guardia</span>
           <span class="response">Cybersecurity School</span>`,
    
    projects: `<span class="accent">┌─────────────────────────────────────────┐</span>
<span class="accent">│</span>             <span class="success">MES PROJETS</span>                <span class="accent">│</span>
<span class="accent">└─────────────────────────────────────────┘</span>

<span class="command">[Oct 2025]</span> Administration ISR
           └─ Réseau avec filtrage firewall

<span class="command">[Nov 2025]</span> Sécurisation ISR
           └─ DMZ et segmentation VLAN

<span class="command">[Nov 2025]</span> Serveur maison
           └─ Ubuntu Server + Coolify + Tailscale

<span class="command">[Nov 2025]</span> Hébergement site
           └─ Nginx + Cloudflared

<span class="command">[Déc 2025]</span> TalentHub
           └─ Site web sécurisé (PHP/MySQL)

<span class="command">[Jan 2026]</span> GestStock
           └─ Application Python sécurisée`,
    
    contact: `<span class="accent">┌─────────────────────────────────────────┐</span>
<span class="accent">│</span>              <span class="success">CONTACT</span>                   <span class="accent">│</span>
<span class="accent">└─────────────────────────────────────────┘</span>

<span class="response">Email:</span> sh4lk.profesional@gmail.com

N'hésitez pas à me contacter pour toute
proposition de stage ou d'alternance !`,
    
    social: `<span class="accent">┌─────────────────────────────────────────┐</span>
<span class="accent">│</span>           <span class="success">RÉSEAUX SOCIAUX</span>              <span class="accent">│</span>
<span class="accent">└─────────────────────────────────────────┘</span>

<span class="command">GitHub:</span>   github.com/sh4lk
<span class="command">LinkedIn:</span> linkedin.com/in/matéo-a-63ba61386`,
    
    whoami: `<span class="success">shalk</span> - Étudiant en cybersécurité
<span class="response">uid=1337(shalk) gid=1337(cyber) groups=1337(cyber),42(ctf),1000(dev)</span>`,
    
    matrix: 'matrix_effect'
  };
  
  let commandHistory = [];
  let historyIndex = -1;
  
  function printToTerminal(text, isCommand = false) {
    const line = document.createElement('div');
    if (isCommand) {
      line.innerHTML = `<span class="terminal-prompt">shalk@portfolio:~$</span> <span class="command">${text}</span>`;
    } else {
      line.innerHTML = text;
    }
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
  
  function showWelcome() {
    terminalOutput.innerHTML = '';
    printToTerminal(`<span class="accent">
   _____ _           _ _    
  / ____| |         | | |   
 | (___ | |__   __ _| | | __
  \\___ \\| '_ \\ / _\` | | |/ /
  ____) | | | | (_| | |   < 
 |_____/|_| |_|\\__,_|_|_|\\_\\
</span>
<span class="response">Bienvenue dans le terminal de shalk !</span>
<span class="response">Tapez</span> <span class="command">help</span> <span class="response">pour voir les commandes disponibles.</span>
`);
  }
  
  function executeCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    
    if (command === '') return;
    
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;
    
    printToTerminal(cmd, true);
    
    if (command === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }
    
    if (command === 'exit') {
      terminalOverlay.classList.add('terminal-hidden');
      return;
    }
    
    if (command === 'matrix') {
      printToTerminal('<span class="success">Entering the Matrix...</span>');
      setTimeout(() => {
        startMatrixEffect();
      }, 500);
      return;
    }
    
    if (terminalCommands[command]) {
      printToTerminal(terminalCommands[command]);
    } else {
      printToTerminal(`<span class="error">zsh: command not found: ${cmd}</span>
<span class="response">Tapez</span> <span class="command">help</span> <span class="response">pour voir les commandes.</span>`);
    }
  }
  
  function startMatrixEffect() {
    const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789';
    let matrixInterval;
    let count = 0;
    
    matrixInterval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 50; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const color = Math.random() > 0.9 ? '#fff' : '#00ff00';
        line += `<span style="color:${color}">${char}</span>`;
      }
      printToTerminal(line);
      count++;
      
      if (count > 20) {
        clearInterval(matrixInterval);
        printToTerminal('<span class="accent">Wake up, shalk...</span>');
      }
    }, 100);
  }
  
  if (terminalToggle && terminalOverlay) {
    terminalToggle.addEventListener('click', () => {
      terminalOverlay.classList.remove('terminal-hidden');
      showWelcome();
      setTimeout(() => terminalInput.focus(), 100);
    });
    
    terminalClose.addEventListener('click', () => {
      terminalOverlay.classList.add('terminal-hidden');
    });
    
    terminalOverlay.addEventListener('click', (e) => {
      if (e.target === terminalOverlay) {
        terminalOverlay.classList.add('terminal-hidden');
      }
    });
    
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
        terminalInput.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      } else if (e.key === 'Escape') {
        terminalOverlay.classList.add('terminal-hidden');
      }
    });
    
    // Focus input quand on clique dans le terminal
    document.querySelector('.terminal-body')?.addEventListener('click', () => {
      terminalInput.focus();
    });
  }
});