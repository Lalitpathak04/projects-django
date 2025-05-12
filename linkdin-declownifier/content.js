function roastJobPosts() {
  const posts = document.querySelectorAll('div.feed-shared-update-v2');
  posts.forEach((post) => {
    const text = post.innerText.toLowerCase();

    // Red flag buzzword blocks
    const block1 = [
      "comment and share profile",
      "comment interested",
      "type yes in comment",
      "check my profile",
      "dm me for details",
      "drop your resume",
      "message me on whatsapp",
      "ping me for quick reply",
      "serious candidates only",
      "quick joiners needed",
      "I am Interested",
      "Drop a Comment",
      "Hit the Like Button",
      "drop a comment",
      "like and comment",
      "like and share",
      "hit the like button",
      "share your profile"
    ];

    const block2 = [
      "work from home",
      "no age restriction",
      "10th to any degree",
      "income",
      "iso certified",
      "govt approved",
      "no consultancy",
      "no mlm",
      "no data entry",
      "no typing work",
      "highly reputed organization",
      "need only 10 people",
      "flexible timing",
      "earn from home",
      "immediate joiner",
      "notice period",
      "online work",
      "flexible",
      "salary in hand"
    ];

    const hasBlock1 = block1.some(phrase => text.includes(phrase));
    const block2Matches = block2.filter(phrase => text.includes(phrase)).length;

    // Fallback clownScore (your old logic)
    let clownScore = 0;
    if (text.includes("rockstar") || text.includes("ninja")) clownScore++;
    if (text.includes("unpaid") || text.includes("exposure")) clownScore++;
    if (text.includes("hiring urgently") || text.includes("hashtag#hiring")) clownScore++;
    if (text.includes("dm") || text.includes("interested candidates dm")) clownScore++;
    if (text.includes("0-15 days") || text.includes("immediate joiner") || text.includes("notice period")) clownScore++;

    const redFlag = hasBlock1 || block2Matches > 2;

    if ((redFlag || clownScore >= 2) && !post.classList.contains("clowned")) {
      const badge = document.createElement("div");
      badge.innerText = hasBlock1
        ? "🚩 Immediate Red Flag: Suspicious job post!"
        : "⚠️ Red Flag: Potentially fake job detected.";
      badge.style.background = "#ff4d4f";
      badge.style.color = "white";
      badge.style.padding = "6px";
      badge.style.marginTop = "5px";
      badge.style.borderRadius = "8px";
      badge.style.fontSize = "14px";
      badge.style.fontWeight = "bold";
      badge.style.fontFamily = "monospace";
      post.appendChild(badge);
      post.classList.add("clowned");
    }
  });
}


function scanProfilePage() {
  const summarySection = document.querySelector('.pv-text-details__left-panel');
  if (!summarySection || summarySection.classList.contains("clowned-profile")) return;

  const text = summarySection.innerText.toLowerCase();
  let clownScore = 0;

  const buzzwords = ["dream chaser", "thought leader", "crypto", "visionary", "nft", "grindset", "10x", "mindset"];
  buzzwords.forEach(word => {
    if (text.includes(word)) clownScore++;
  });

  const emojiCount = (text.match(/[\u{1F600}-\u{1F6FF}]/gu) || []).length;
  if (emojiCount > 3) clownScore++;

  if (clownScore >= 2) {
    const warning = document.createElement("div");
    warning.innerText = `Clown Radar: ${clownScore}/5 — Proceed with caution.`;
    warning.style.background = "#111";
    warning.style.color = "#ffcc00";
    warning.style.padding = "10px";
    warning.style.marginTop = "10px";
    warning.style.border = "2px solid #ff4d4f";
    warning.style.borderRadius = "12px";
    warning.style.fontFamily = "monospace";
    warning.style.fontWeight = "bold";
    summarySection.appendChild(warning);
    summarySection.classList.add("clowned-profile");
  }
}

function startScanning() {
  roastJobPosts();
  scanProfilePage();
}

console.log("DeClownifier content script loaded.");
setInterval(startScanning, 3000);
