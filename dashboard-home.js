/*
 GameTime IQ - Dashboard Home Upgrade
 Load AFTER avatar-pitch.js.
 Rebuilds HOME only. Existing Learn / Player / Team / Profile logic remains intact.
*/
(() => {
  const statProfiles = {
    1:{speed:86,passing:74,movement:88,awareness:78,shooting:70,defending:58,traits:["DIRECT RUNNER","CREATES WIDTH","RECOVERY WORK"]},
    2:{speed:72,passing:78,movement:73,awareness:84,shooting:48,defending:88,traits:["COVER","BUILD FROM BACK","PROTECT THE MIDDLE"]},
    3:{speed:79,passing:86,movement:88,awareness:90,shooting:78,defending:62,traits:["FINDS POCKETS","LINKS PLAY","SCANS EARLY"]},
    4:{speed:84,passing:72,movement:90,awareness:83,shooting:91,defending:50,traits:["FINISHER","TIMED RUNS","LINK PLAY"]},
    5:{speed:74,passing:80,movement:75,awareness:85,shooting:50,defending:89,traits:["COVER","LEFT-SIDE BUILD","RECOVERY"]},
    6:{speed:66,passing:82,movement:76,awareness:92,shooting:35,defending:91,traits:["DISTRIBUTION","COMMUNICATION","SWEEPER SUPPORT"]},
    7:{speed:90,passing:75,movement:85,awareness:80,shooting:80,defending:60,traits:["DANGEROUS RUNS","CREATES 2v1s","COUNTER-PRESS"]},
    8:{speed:76,passing:88,movement:84,awareness:92,shooting:64,defending:86,traits:["BALANCE","RECEIVE & TURN","PROTECT CENTRE"]}
  };

  // Locked pitch orientation:
  // top = attacking end, bottom = our goal.
  const homeFormation = {
    7:{x:38,y:14}, 4:{x:64,y:14},
    1:{x:17,y:38}, 3:{x:46,y:43}, 8:{x:80,y:38},
    5:{x:32,y:70}, 2:{x:69,y:70},
    6:{x:50,y:86}
  };

  const css = document.createElement("style");
  css.textContent = `
    #home.gtiq-dashboard{padding:0}
    #home.gtiq-dashboard .dash-shell{display:grid;gap:12px}
    #home.gtiq-dashboard .dash-panel{
      background:linear-gradient(145deg,#0d3961f7,#061a31fa);
      border:1px solid rgba(108,186,241,.28);
      border-radius:18px;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 8px 28px rgba(0,0,0,.18);
    }
    #home.gtiq-dashboard .dash-top{
      display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:10px 13px;
    }
    .dash-logo{display:flex;gap:10px;align-items:center}
    .dash-shield{
      width:46px;height:54px;display:grid;place-items:center;border-radius:14px 14px 18px 18px;
      background:linear-gradient(#163f70,#06213e);border:2px solid #d8e9f8;color:#ffd23d;font-weight:900;font-size:11px;
      box-shadow:0 0 0 2px #0d77c555;
    }
    .dash-logo b{font-size:19px;letter-spacing:.7px}.dash-logo small{display:block;color:#6ad6ff;font-size:9px;font-weight:900;letter-spacing:1.4px}
    .dash-metrics{display:flex;gap:7px;align-items:center}
    .dash-metric{
      min-width:86px;padding:8px 11px;border-radius:13px;background:#061a31;border:1px solid rgba(255,255,255,.13);
      text-align:center;
    }
    .dash-metric small{display:block;color:#a9bfd1;font-size:8px;font-weight:900;letter-spacing:.8px}
    .dash-metric strong{display:block;color:#ffc928;font-size:20px;line-height:1.05}
    .dash-level{min-width:58px}.dash-level strong{color:#fff}
    .dash-hero{display:grid;grid-template-columns:.86fr 1.34fr .72fr;gap:10px;padding:12px}
    .dash-copy{padding:8px 6px}
    .dash-copy h1{font-size:clamp(34px,5.2vw,58px);line-height:.98;margin:7px 0 12px}
    .dash-copy p{font-size:15px;margin:0 0 16px}
    .dash-cta{display:inline-flex;align-items:center;gap:8px}
    .dash-pitch-wrap{position:relative;min-height:355px;padding:9px}
    .dash-pitch{
      position:absolute;inset:18px 5px 8px;
      background:
        linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px),
        repeating-linear-gradient(90deg,#178847 0,#178847 12.5%,#1c9650 12.5%,#1c9650 25%);
      background-size:44px 44px,44px 44px,auto;
      clip-path:polygon(12% 0,88% 0,100% 100%,0 100%);
      border:3px solid rgba(215,245,223,.85);
      box-shadow:inset 0 0 26px rgba(0,0,0,.18),0 10px 22px rgba(0,0,0,.25);
      overflow:hidden;
    }
    .dash-pitch:before{
      content:"";position:absolute;inset:6% 8%;border:2px solid rgba(255,255,255,.65);
      clip-path:polygon(8% 0,92% 0,100% 100%,0 100%);
    }
    .dash-pitch:after{
      content:"";position:absolute;left:50%;top:8%;height:84%;border-left:2px solid rgba(255,255,255,.5);opacity:.8
    }
    .dash-centre{
      position:absolute;left:50%;top:48%;width:92px;height:62px;border:2px solid rgba(255,255,255,.55);
      border-radius:50%;transform:translate(-50%,-50%);
    }
    .dash-player{
      position:absolute;transform:translate(-50%,-50%);z-index:6;cursor:pointer;text-align:center;
      transition:.18s transform,.18s filter;
    }
    .dash-player:hover,.dash-player:active{transform:translate(-50%,-50%) scale(1.06)}
    .dash-mini{
      width:54px;height:65px;border-radius:15px 15px 12px 12px;object-fit:cover;object-position:50% 10%;
      border:2px solid rgba(255,255,255,.95);background:#0b3156;
      box-shadow:0 7px 9px rgba(0,0,0,.36),0 0 0 2px #0a365d;
    }
    .dash-player.selected .dash-mini{border-color:#63d9ff;box-shadow:0 0 0 4px #38caff55,0 0 17px #38caff99,0 7px 9px rgba(0,0,0,.36)}
    .dash-base{width:50px;height:10px;margin:-8px auto 0;border-radius:50%;background:#09253f;border:2px solid #3a6687}
    .dash-player.selected .dash-base{border-color:#6edcff;box-shadow:0 0 10px #56d6ff}
    .dash-pname{
      margin-top:1px;padding:2px 5px;border-radius:7px;background:#031322dc;color:#fff;
      font-size:8px;line-height:1.05;font-weight:900;white-space:nowrap;border:1px solid rgba(255,255,255,.15)
    }
    .dash-pname b{color:#fff}.dash-pname span{color:#70d8ff}
    .dash-arrow{display:none;position:absolute;left:50%;bottom:calc(100% + 3px);transform:translateX(-50%);color:#68d9ff;font-size:22px;text-shadow:0 2px 7px #001}
    .dash-player.selected .dash-arrow{display:block}
    .quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px}
    .quick-btn{
      min-height:112px;background:#0b2b4d;border:1px solid rgba(255,255,255,.14);color:#fff;border-radius:14px;
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;
    }
    .quick-btn i{font-style:normal;font-size:29px}.quick-btn b{font-size:15px}.quick-btn small{color:#aac2d5;font-size:10px;text-align:center}
    .roster-panel{padding:10px 12px 12px}
    .roster-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
    .roster-head b{color:#64d7ff;font-size:10px;letter-spacing:1.2px}
    .roster-grid{display:grid;grid-template-columns:repeat(8,minmax(102px,1fr)) 160px;gap:7px;overflow-x:auto;padding-bottom:3px}
    .roster-card{
      position:relative;min-width:102px;background:#0b2b4d;border:2px solid rgba(255,255,255,.16);border-radius:14px;overflow:hidden;
      color:#fff;text-align:left;padding:0;cursor:pointer;
    }
    .roster-card.selected{border-color:#55d4ff;box-shadow:0 0 14px #49cfff7a}
    .roster-card img{width:100%;height:124px;object-fit:cover;object-position:50% 8%;display:block}
    .roster-card .rcopy{padding:7px}.roster-card strong{display:block;font-size:14px}.roster-card small{display:block;color:#58d1ff;font-size:9px;font-weight:900;margin-top:3px}
    .roster-card .card-arrow{display:none;position:absolute;top:2px;left:50%;transform:translateX(-50%);font-size:20px;color:#64ddff}
    .roster-card.selected .card-arrow{display:block}
    .team-preview{min-width:160px;padding:7px;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:#082541}
    .mini-board{position:relative;height:116px;border-radius:10px;background:repeating-linear-gradient(90deg,#168748 0,#168748 25%,#1a954f 25%,#1a954f 50%);border:2px solid rgba(255,255,255,.55)}
    .mini-dot{position:absolute;width:13px;height:13px;border-radius:50%;background:#1188eb;border:1px solid white;transform:translate(-50%,-50%)}
    .mini-dot.gk{background:#ff8c21}
    .team-preview b{display:block;margin-top:6px;font-size:13px}.team-preview small{color:#a9bfd1;font-size:9px}
    .player-detail{display:grid;grid-template-columns:.85fr 1.1fr .75fr;gap:10px;padding:12px;margin-top:10px}
    .detail-summary{display:grid;grid-template-columns:86px 1fr;gap:10px;align-items:start}
    .detail-summary img{width:86px;height:110px;object-fit:cover;object-position:50% 8%;border-radius:13px;border:2px solid #55d4ff}
    .detail-summary h2{margin:2px 0 3px;font-size:25px}.detail-summary .role-pill{display:inline-block;background:#0d6dcc;border:1px solid #57c8ff;border-radius:999px;padding:5px 9px;font-size:10px;font-weight:900}
    .trait-list{grid-column:1/-1;display:grid;gap:6px;margin-top:3px}.trait{padding:8px;border-radius:10px;background:#082641;border:1px solid rgba(255,255,255,.11)}.trait b{display:block;font-size:11px}.trait span{color:#a9bfd1;font-size:9px}
    .radar-wrap{display:grid;place-items:center}.radar{width:220px;height:180px}
    .radar text{fill:#cfe6f4;font-size:8px;font-weight:800}.radar polygon.grid{fill:none;stroke:#3a7098;stroke-width:1}.radar polygon.data{fill:#1689e855;stroke:#50c6ff;stroke-width:2}
    .recommend-card{padding:10px;border-radius:13px;background:#082641;border:1px solid rgba(255,255,255,.12)}
    .recommend-card h3{margin:4px 0 7px}.recommend-card p{font-size:11px;margin:0 0 8px}.focus-chip{display:inline-block;margin:3px 3px 0 0;padding:4px 6px;border-radius:999px;background:#0d355b;color:#6bd7ff;font-size:8px;font-weight:900}
    .bottom-actions{display:grid;grid-template-columns:1.4fr .7fr .7fr;gap:9px}
    .big-action{padding:12px 14px;display:flex;align-items:center;gap:12px;color:#fff;cursor:pointer}
    .big-action i{font-style:normal;font-size:29px}.big-action b{display:block}.big-action small{color:#a9bfd1}
    @media(max-width:820px){
      #home.gtiq-dashboard .dash-top{grid-template-columns:1fr}.dash-metrics{justify-content:space-between}
      .dash-metric{flex:1;min-width:0}.dash-level{flex:.6}
      .dash-hero{grid-template-columns:1fr}.dash-copy{padding:8px}.dash-pitch-wrap{min-height:390px}.quick-grid{grid-template-columns:repeat(4,1fr)}
      .quick-btn{min-height:84px}.quick-btn i{font-size:24px}.quick-btn small{display:none}
      .roster-grid{grid-template-columns:repeat(8,118px) 170px}
      .player-detail{grid-template-columns:1fr}.radar{width:100%;max-width:280px;height:190px}
      .bottom-actions{grid-template-columns:1fr}.dash-copy h1{font-size:42px}
    }
    @media(max-width:520px){
      .dash-pitch-wrap{min-height:340px}.dash-mini{width:45px;height:56px}.dash-pname{font-size:7px}
      .quick-grid{grid-template-columns:1fr 1fr}.quick-btn{min-height:88px}.roster-grid{grid-template-columns:repeat(8,112px) 165px}
      .dash-logo b{font-size:17px}
    }
  `;
  document.head.appendChild(css);

  function levelFromXP(v){ return Math.max(1,Math.floor(v/500)+1); }
  function currentIQ(){ return Math.round((xp||0)/10); }
  function mkMiniBoard(){
    return Object.entries(homeFormation).map(([id,pos]) => `<span class="mini-dot ${+id===6?"gk":""}" style="left:${pos.x}%;top:${pos.y}%"></span>`).join("");
  }
  function radarSvg(stats){
    const keys=[["DEF",stats.defending],["PASS",stats.passing],["MOVE",stats.movement],["AWARE",stats.awareness],["SPEED",stats.speed],["SHOOT",stats.shooting]];
    const cx=110,cy=90,R=58;
    const pts=(r)=>keys.map((_,i)=>{const a=-Math.PI/2+i*Math.PI/3;return `${cx+Math.cos(a)*r},${cy+Math.sin(a)*r}`}).join(" ");
    const data=keys.map(([,v],i)=>{const a=-Math.PI/2+i*Math.PI/3,r=R*v/100;return `${cx+Math.cos(a)*r},${cy+Math.sin(a)*r}`}).join(" ");
    const labels=keys.map(([k,v],i)=>{const a=-Math.PI/2+i*Math.PI/3,r=78;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;return `<text x="${x}" y="${y}" text-anchor="middle">${k} ${v}</text>`}).join("");
    return `<svg class="radar" viewBox="0 0 220 180" aria-label="Player statistics">
      <polygon class="grid" points="${pts(58)}"/><polygon class="grid" points="${pts(42)}"/><polygon class="grid" points="${pts(26)}"/>
      <polygon class="data" points="${data}"/>${labels}
    </svg>`;
  }
  function recommendation(p){
    const map={
      1:"Keep checking both the touchline and inside space. Your best movement is the one that gives the ball carrier a clear option while still threatening forward.",
      2:"Scan before receiving and protect the central route when teammates step out. Carry forward when space is genuinely free.",
      3:"Scan shoulders early, receive between lines and recognise when a teammate's movement creates a new pocket for you.",
      4:"Work on the timing of runs rather than just speed. Link when tightly marked, then attack the next space quickly.",
      5:"Give the goalkeeper a clear left-side option, then think cover first when the winger presses ahead of you.",
      6:"Use your view of the whole pitch. Choose distribution from pressure and stay connected behind possession.",
      7:"Make defenders choose in 2v1s. Your run can create space for a teammate even when you do not receive the ball.",
      8:"Move out of cover shadows, receive on angles and keep the team balanced behind attacks so transitions are protected."
    }; return map[p.id];
  }

  function renderDashboard(){
    const home=document.getElementById("home");
    if(!home) return;
    home.classList.add("gtiq-dashboard");
    const p=P(selected), s=statProfiles[p.id];

    const roster=players.map(x=>`
      <button class="roster-card ${x.id===selected?"selected":""}" data-pick="${x.id}">
        <span class="card-arrow">⇩</span>
        <img src="${x.img}" alt="${x.name}">
        <div class="rcopy"><strong>${String(x.id).padStart(2,"0")} ${x.name.toUpperCase()}</strong><small>${x.role.toUpperCase()}</small></div>
      </button>`).join("");

    const pitchPlayers=players.map(x=>{
      const pos=homeFormation[x.id];
      return `<button class="dash-player ${x.id===selected?"selected":""}" data-pick="${x.id}" style="left:${pos.x}%;top:${pos.y}%">
        <span class="dash-arrow">▼</span>
        <img class="dash-mini" src="${x.img}" alt="${x.name}">
        <span class="dash-base"></span>
        <span class="dash-pname"><b>${String(x.id).padStart(2,"0")} ${x.name}</b><br><span>${x.short}</span></span>
      </button>`;
    }).join("");

    home.innerHTML=`
      <div class="dash-shell">
        <div class="dash-panel dash-top">
          <div class="dash-logo"><div class="dash-shield">TIBS<br>2023<br>⚽</div><div><b>GAME TIME IQ</b><small>LEARN • DECIDE • PLAY</small></div></div>
          <div class="dash-metrics">
            <div class="dash-metric"><small>GAME IQ</small><strong>⭐ ${currentIQ()}</strong></div>
            <div class="dash-metric"><small>STREAK</small><strong>🔥 ${streak||0}</strong></div>
            <div class="dash-metric dash-level"><small>LEVEL</small><strong>${levelFromXP(xp||0)}</strong></div>
          </div>
        </div>

        <div class="dash-panel dash-hero">
          <div class="dash-copy">
            <span class="tag">TIBS WHITES • GAME AWARENESS</span>
            <h1>Learn the picture.<br>Then play it.</h1>
            <p>Understand your position, solve realistic match situations and connect the whole team from goalkeeper to goal.</p>
            <button class="primary dash-cta" data-go="learn">START LEARNING <span>›</span></button>
          </div>
          <div class="dash-pitch-wrap">
            <div class="dash-pitch"><div class="dash-centre"></div>${pitchPlayers}</div>
          </div>
          <div>
            <span class="tag">QUICK ACCESS</span>
            <div class="quick-grid">
              <button class="quick-btn" data-go="learn"><i>📘</i><b>LEARN</b><small>Know your role</small></button>
              <button class="quick-btn" data-go="player"><i>🧠</i><b>PLAYER</b><small>Solve your position</small></button>
              <button class="quick-btn" data-go="team"><i>🤝</i><b>TEAM</b><small>Play as a team</small></button>
              <button class="quick-btn" data-go="profile"><i>🏆</i><b>PROFILE</b><small>Track progress</small></button>
            </div>
          </div>
        </div>

        <div class="dash-panel roster-panel">
          <div class="roster-head"><b>TIBS WHITES • YOUR TEAM</b><span class="tag">SELECT A PLAYER</span></div>
          <div class="roster-grid">
            ${roster}
            <div class="team-preview"><span class="tag">TEAM PREVIEW</span><div class="mini-board">${mkMiniBoard()}</div><b>2-3-2</b><small>Balanced learning shape</small></div>
          </div>

          <div class="player-detail">
            <div class="detail-summary">
              <img src="${p.img}" alt="${p.name}">
              <div><span class="tag">PLAYER ${String(p.id).padStart(2,"0")}</span><h2>${p.name}</h2><span class="role-pill">${p.role.toUpperCase()}</span><p>${p.summary}</p></div>
              <div class="trait-list">${s.traits.map((t,i)=>`<div class="trait"><b>${t}</b><span>${["Key position behaviour","Game awareness focus","Development focus"][i]}</span></div>`).join("")}</div>
            </div>
            <div class="radar-wrap">${radarSvg(s)}</div>
            <div class="recommend-card">
              <span class="tag">GAME RECOMMENDATION</span><h3>${p.name}'s next focus</h3><p>${recommendation(p)}</p>
              <span class="focus-chip">SCAN</span><span class="focus-chip">MOVE</span><span class="focus-chip">REACT</span>
              <button class="primary" id="dashPlayPlayer" style="width:100%;margin-top:10px">PLAY AS ${p.name.toUpperCase()} ›</button>
            </div>
          </div>
        </div>

        <div class="bottom-actions">
          <button class="dash-panel big-action" id="playTeam"><i>⚽</i><div><b>Play as TIBS WHITES</b><small>Play through realistic match situations with the full team.</small></div></button>
          <button class="dash-panel big-action" id="continueChallenge"><i>📋</i><div><b>Continue Challenge</b><small>Pick up where you left off.</small></div></button>
          <button class="dash-panel big-action" id="quickChallenge"><i>⚡</i><div><b>Quick Challenge</b><small>Random scenario to test Game IQ.</small></div></button>
        </div>
      </div>`;

    home.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.go)));
    home.querySelectorAll("[data-pick]").forEach(b=>b.addEventListener("click",()=>{
      selected=Number(b.dataset.pick); learnSelected=selected; save(); renderDashboard(); topStats();
    }));
    document.getElementById("dashPlayPlayer").addEventListener("click",()=>show("player"));
    document.getElementById("playTeam").addEventListener("click",()=>show("team"));
    document.getElementById("continueChallenge").addEventListener("click",()=>show("player"));
    document.getElementById("quickChallenge").addEventListener("click",()=>{
      selected=players[Math.floor(Math.random()*players.length)].id; learnSelected=selected; save(); show("player");
    });
  }

  // Replace only HOME rendering.
  renderHome = renderDashboard;
  renderDashboard();
})();
