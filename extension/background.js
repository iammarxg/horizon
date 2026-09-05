// Service worker for Horizon: Chrome New Tab for Brave
// Handles installation and default state setup

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    // Set default state on first install
    await chrome.storage.local.set({
      accounts: [],
      activeAccountId: null,
      shortcuts: [
        { id: "s1", name: "YouTube", url: "https://youtube.com" },
        { id: "s2", name: "Gmail", url: "https://mail.google.com" },
        { id: "s3", name: "Maps", url: "https://maps.google.com" },
        { id: "s4", name: "GitHub", url: "https://github.com" },
      ],
      shortcutsView: "row",
      searchEngine: "google",
      background: { type: "curated", index: 0 },
      themeOverride: "auto",
      voiceLang: "auto",
      showVoiceBtn: true,
      hasSeenFooterOnboarding: false,
    });
  }
});
