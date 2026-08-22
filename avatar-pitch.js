/*
 GameTime IQ - Exact Avatar Pitch Upgrade
 Uses the existing Assets/player-01.jpg ... player-08.jpg files.
 Add this file to the repository root and load it AFTER the existing inline script.
*/
(() => {
  const formation = {
    1: {x: 16, y: 44}, // Reggie - Left Winger
    2: {x: 68, y: 78}, // Ben - Right Central Defender
    3: {x: 43, y: 46}, // Lochlan - Attacking/Central Midfield
    4: {x: 64, y: 18}, // Tom - Striker
    5: {x: 32, y: 78}, // Grayson - Left Central Defender
    6: {x: 50, y: 91}, // Freddie - Goalkeeper
    7: {x: 38, y: 18}, // Casper - Forward
    8: {x: 82, y: 44}  // Louie - Right side / Defensive Midfielder
  };

  const css = document.createElement("style");
  css.textContent = `
    .pitch .player-token{
      position:absolute;
      transform:translate(-50%,-50%);
      width:58px;
      height:58px;
      z-index:6;
      border-radius:50%;
      border:3px solid rgba(255,255,255,.95);
      background:#082642;
      background-size:cover;
      background-position:center 12%;
      box-shadow:0 4px 10px #001a,0 0 0 2px #052743;
      cursor:pointer;
      transition:left .55s,top .55s,transform .18s,box-shadow .18s;
    }
    .pitch .player-token:hover,
    .pitch .player-token:active{transform:translate(-50%,-50%) scale(1.08)}
    .pitch .player-token.you{
      border-color:var(--y);
      box-shadow:0 0 0 4px #ffc92855,0 0 18px #ffc928aa,0 5px 12px #001a;
    }
    .pitch .player-token .pitch-name{
      position:absolute;
      left:50%;
      top:calc(100% + 4px);
      transform:translateX(-50%);
      min-width:max-content;
      padding:3px 5px;
      border-radius:6px;
      background:#041323e8;
      border:1px solid rgba(255,255,255,.18);
      color:#fff;
      text-align:center;
      font-size:8px;
      line-height:1.05;
      font-weight:900;
      letter-spacing:.15px;
      pointer-events:none;
    }
    .pitch .player-token .pitch-name strong{color:var(--c)}
    .pitch .player-token.you .pitch-name{border-color:var(--y)}
    .pitch .player-token .select-arrow{
      display:none;
      position:absolute;
      left:50%;
      bottom:calc(100% + 4px);
      transform:translateX(-50%);
      color:var(--y);
      font-size:20px;
      line-height:1;
      text-shadow:0 2px 5px #001;
    }
    .pitch .player-token.you .select-arrow{display:block}
    @media(max-width:700px){
      .pitch .player-token{width:49px;height:49px}
      .hero .pitch .player-token{width:43px;height:43px}
      .pitch .player-token .pitch-name{font-size:7px;padding:2px 4px}
      .pitch .player-token .select-arrow{font-size:17px}
    }
  `;
  document.head.appendChild(css);

  window.pitchSelect = function(id){
    const active = document.querySelector(".screen.active");
    if (!active) return;

    if (active.id === "home"){
      selected = id;
      learnSelected = id;
      save();
      renderHome();
    } else if (active.id === "learn"){
      selected = id;
      learnSelected = id;
      save();
      renderLearn();
      renderHome();
    }
  };

  // Replace the original tactical-circle renderer with the exact player assets.
  token = function(p, me=false){
    const pos = formation[p.id] || {x:p.x,y:p.y};
    return `<div class="player-token ${me ? "you" : ""}"
      role="button"
      aria-label="Select ${p.name}, ${p.role}"
      onclick="pitchSelect(${p.id})"
      style="left:${pos.x}%;top:${pos.y}%;background-image:url('${p.img}')">
        <span class="select-arrow">▼</span>
        <span class="pitch-name"><strong>${String(p.id).padStart(2,"0")} ${p.name}</strong><br>${p.short}</span>
      </div>`;
  };

  setBall = function(el,p){
    const pos = formation[p.id] || {x:p.x,y:p.y};
    el.style.left = pos.x + "%";
    el.style.top = pos.y + "%";
  };

  // Re-render the visible app with the upgraded pitch.
  renderHome();
  if (document.querySelector("#learn.active")) renderLearn();
})();
