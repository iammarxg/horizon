let isRequesting = false;

// Sync theme preference from Horizon if stored
if (typeof chrome !== 'undefined' && chrome.storage?.local) {
  try {
    chrome.storage.local.get('themeOverride', (data) => {
      if (data?.themeOverride === 'light') {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      } else if (data?.themeOverride === 'dark') {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      }
    });
  } catch (e) {}
}

async function requestMic() {
  if (isRequesting) return;

  const statusEl = document.getElementById('status');
  const btn = document.getElementById('allow-btn');
  const desc = document.getElementById('desc');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (statusEl) {
      statusEl.textContent = 'Microphone access is not supported by your browser.';
      statusEl.className = 'status error';
      statusEl.style.display = 'block';
    }
    return;
  }

  isRequesting = true;
  if (statusEl) {
    statusEl.style.display = 'none';
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(t => t.stop());
    if (statusEl) {
      statusEl.textContent = 'Microphone permission granted! Returning to your new tab...';
      statusEl.className = 'status';
      statusEl.style.display = 'block';
    }
    if (btn) btn.style.display = 'none';
    if (desc) desc.style.display = 'none';
    setTimeout(() => {
      window.close();
      if (statusEl) {
        statusEl.textContent = 'Microphone permission granted! You may close this tab and return to Horizon.';
      }
    }, 1200);
  } catch (err) {
    isRequesting = false;
    if (statusEl) {
      statusEl.textContent = 'Permission was ' + (err.name === 'NotAllowedError' ? 'denied' : 'not granted') + '. Please allow microphone access in site settings.';
      statusEl.className = 'status error';
      statusEl.style.display = 'block';
    }
  }
}

document.getElementById('allow-btn')?.addEventListener('click', requestMic);
// Also attempt immediately on user load
requestMic();
