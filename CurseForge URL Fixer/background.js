chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    let url = new URL(details.url);
    if (url.hostname === "minecraft.curseforge.com") {
      let pathParts = url.pathname.split("/");
      if (pathParts[1] === "projects" && pathParts.length >= 3) {
        let projectName = pathParts[2];
        let newUrl = `https://www.curseforge.com/minecraft/mc-mods/${projectName}`;
        
        // Create notification
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "CurseForge URL Redirect",
          message: `Redirecting to: ${newUrl}`
        });

        return { redirectUrl: newUrl };
      }
    }
    return {};
  },
  { urls: ["*://minecraft.curseforge.com/*"] },
  ["blocking"]
);
