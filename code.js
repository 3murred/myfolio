document.addEventListener("DOMContentLoaded", () => {
  // menu mobile

  const menuButton = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    const menuLinks = mobileMenu.querySelectorAll("a");

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  }

  // intro portal com decriptacao crescente

  const intro = document.getElementById("intro-screen");
  const systemText = document.getElementById("intro-system");
  const message = document.getElementById("intro-message");
  const welcome = document.getElementById("intro-welcome");
  const progressFill = document.getElementById("intro-progress-fill");
  const footer = document.getElementById("intro-footer");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@";

  const randomText = (length) =>
    Array.from(
      { length },
      () =>
        randomCharacters[Math.floor(Math.random() * randomCharacters.length)],
    ).join("");

  // revelar caracteres progressivamente
  const decryptText = async (element, target, speed = 65) => {
    if (!element) return;
    for (let i = 0; i <= target.length; i++) {
      const revealed = target.slice(0, i);
      const remaining = randomText(target.length - i);
      element.textContent = revealed + remaining;
      await sleep(speed);
    }
    element.textContent = target;
  };

  const runIntro = async () => {
    if (
      !intro ||
      !systemText ||
      !message ||
      !welcome ||
      !progressFill ||
      !footer
    ) {
      return;
    }
    document.body.classList.add("intro-active");
    systemText.textContent = "INITIALIZING SYSTEM...";
    footer.textContent = "ESTABLISHING SECURE CONNECTION";
    await sleep(800);
    systemText.textContent = "UNAUTHORIZED ACCESS DETECTED";
    footer.textContent = "BYPASSING SECURITY PROTOCOLS";
    await sleep(500);
    systemText.textContent = "DECRYPTING MESSAGE...";
    footer.textContent = "DECODING TRANSMISSION";
    await decryptText(message, "VOCÊ FOI HACKEADO", 65);
    await sleep(350);
    welcome.classList.add("is-visible");
    await sleep(500);
    systemText.textContent = "IDENTITY VERIFIED";
    footer.textContent = "WELCOME TO MURRED";

    // BARRA DE PROGRESSO
    for (let value = 0; value <= 100; value += 2) {
      progressFill.style.width = `${value}%`;
      await sleep(25);
    }
    await sleep(600);

    // SAIR DO PORTAL E ABRIR O PORTFOLIO
    intro.classList.add("is-exiting");
    document.body.classList.remove("intro-active");
    await sleep(1300);
    intro.remove();
  };

  if (intro) {
    runIntro();
  }
  // reprodutor de musica

  const audio = document.getElementById("background-audio");
  const player = document.getElementById("music-player");
  const vinyl = document.getElementById("vinyl");
  const status = document.getElementById("music-status");
  const playButton = document.getElementById("music-play");
  const progress = document.getElementById("music-progress");
  const currentTime = document.getElementById("music-current-time");
  const duration = document.getElementById("music-duration");
  const volume = document.getElementById("music-volume");

  if (
    !audio ||
    !player ||
    !vinyl ||
    !status ||
    !playButton ||
    !progress ||
    !currentTime ||
    !duration ||
    !volume
  ) {
    return;
  }

  // volume padrao
  audio.volume = Number(volume.value);

  // foramto dos segundos em minutos:segundos
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // aparencia do reprodutor atualizando
  const updatePlayerState = () => {
    const isPlaying = !audio.paused && !audio.ended;

    vinyl.classList.toggle("is-playing", isPlaying);
    playButton.textContent = isPlaying ? "||" : "▶";
    playButton.setAttribute(
      "aria-label",
      isPlaying ? "pausar musica" : "reproduzir musica",
    );
    status.textContent = isPlaying ? "NOW PLAYING" : "AUDIO PLAYER";
  };

  // play ou pausar
  playButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        status.textContent = "PLAYBACK BLOCKED";
        console.warn("reproducao do audio falhou", error);
      }
    } else {
      audio.pause();
    }
    updatePlayerState();
  });

  // progresso atualizado
  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  // duracao da musica
  const updateDuration = () => {
    if (Number.isFinite(audio.duration)) {
      duration.textContent = formatTime(audio.duration);
      progress.disabled = false;
    }
  };

  audio.addEventListener("loadedmetadata", updateDuration);
  audio.addEventListener("durationchange", updateDuration);

  // mostrar onde esta a musica
  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    }
  });

  // controle de volume
  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    audio.muted = audio.volume === 0;
  });

  // sincronizar play e pausa
  audio.addEventListener("play", updatePlayerState);
  audio.addEventListener("pause", updatePlayerState);

  audio.addEventListener("ended", () => {
    updatePlayerState();
    progress.value = 0;
  });

  //inicializar
  updateDuration();
  updatePlayerState();
});
