
const players = [
  {id:1, role:"WINGER", skill:"Quick movement and support", img:"Assets/player-01.jpg"},
  {id:2, role:"DEFENDER", skill:"Reads danger and protects space", img:"Assets/player-02.jpg"},
  {id:3, role:"ATTACKER", skill:"Creates chances and finds space", img:"Assets/player-03.jpg"},
  {id:4, role:"STRIKER", skill:"Movement near goal", img:"Assets/player-04.jpg"},
  {id:5, role:"DEFENDER", skill:"Strong positioning and cover", img:"Assets/player-05.jpg"},
  {id:6, role:"GOALKEEPER", skill:"Starts attacks and sees the pitch", img:"Assets/player-06.jpg"},
  {id:7, role:"FORWARD", skill:"Makes dangerous attacking runs", img:"Assets/player-07.jpg"},
  {id:8, role:"MIDFIELDER", skill:"Links play and scans for options", img:"Assets/player-08.jpg"}
];

const scenarios = [
  {
    cat:"SUPPORT",
    question:"You pass forward to a teammate near the corner. An opponent immediately presses them. What should you do next?",
    hint:"Think about how your movement can make your teammate's next decision easier.",
    actors:[
      {id:"you",team:"blue",x:43,y:62,you:true},
      {id:"mate",team:"blue",x:67,y:75,label:"TEAMMATE"},
      {id:"b2",team:"blue",x:40,y:34},
      {id:"r1",team:"red",x:74,y:67},
      {id:"r2",team:"red",x:69,y:47},
      {id:"r3",team:"red",x:53,y:27}
    ],
    ballStart:[43,62], ballEnd:[67,75],
    correct:2,
    options:[
      "Head straight into the box",
      "Run down the line next to the ball",
      "Move into space where you are an easy relief pass",
      "Stand still after making the pass"
    ],
    success:"Excellent support. You moved away from pressure, opened a clear passing lane and gave your teammate an escape route.",
    fail:"Your teammate is under pressure. The best movement is to create a clear angle where they can see you and play away from danger.",
    outcome:{you:[50,57],ball:[50,57]}
  },
  {
    cat:"SCAN",
    question:"A pass is travelling into you in midfield and an opponent is closing from behind. What should you do before the ball arrives?",
    hint:"Your first touch is easier when your brain already has a picture.",
    actors:[
      {id:"you",team:"blue",x:50,y:52,you:true},
      {id:"mate",team:"blue",x:30,y:70,label:"PASSER"},
      {id:"b2",team:"blue",x:72,y:37},
      {id:"r1",team:"red",x:56,y:43,label:"PRESSURE"},
      {id:"r2",team:"red",x:73,y:68},
      {id:"r3",team:"red",x:40,y:25}
    ],
    ballStart:[30,70],ballEnd:[50,52],
    correct:0,
    options:[
      "Check over your shoulder and scan before receiving",
      "Only watch the ball until it reaches your foot",
      "Run back towards the passer without looking up",
      "Wait until the defender tackles you, then decide"
    ],
    success:"Great scanning. You know where pressure and space are before your first touch, so you can receive with a plan.",
    fail:"The key is to scan before receiving. That picture tells you where pressure is coming from and where your next option is.",
    outcome:{you:[55,58],ball:[57,61]}
  },
  {
    cat:"SPACE",
    question:"The ball is on the left and three teammates have crowded around it. You are on the far side. What is the smartest movement?",
    hint:"Making the pitch bigger can create space for everyone.",
    actors:[
      {id:"you",team:"blue",x:67,y:55,you:true},
      {id:"b1",team:"blue",x:31,y:62},
      {id:"b2",team:"blue",x:37,y:52},
      {id:"b3",team:"blue",x:28,y:42},
      {id:"r1",team:"red",x:40,y:60},
      {id:"r2",team:"red",x:44,y:45},
      {id:"r3",team:"red",x:57,y:35}
    ],
    ballStart:[31,62],ballEnd:[31,62],
    correct:1,
    options:[
      "Run towards the ball so everyone is close together",
      "Stay wide and become an option on the opposite side",
      "Stand behind an opponent so they cannot see you",
      "Move next to your goalkeeper"
    ],
    success:"Exactly. Staying wide stretches the opposition and gives your team another route out of the crowded area.",
    fail:"When everyone crowds the ball, space disappears. Staying wide makes the pitch bigger and gives the team another option.",
    outcome:{you:[79,54],ball:[31,62]}
  },
  {
    cat:"REACT",
    question:"Your team loses the ball while attacking. The opposition can counter quickly. What is your first job?",
    hint:"The game changes the instant possession changes.",
    actors:[
      {id:"you",team:"blue",x:56,y:43,you:true},
      {id:"b1",team:"blue",x:70,y:64},
      {id:"b2",team:"blue",x:67,y:30},
      {id:"r1",team:"red",x:48,y:52,label:"BALL"},
      {id:"r2",team:"red",x:37,y:35},
      {id:"r3",team:"red",x:34,y:68}
    ],
    ballStart:[56,43],ballEnd:[48,52],
    correct:2,
    options:[
      "Keep running towards their goal",
      "Stop and wait for the coach to tell you",
      "React quickly: press if you can, or recover to protect your goal",
      "Complain about losing the ball"
    ],
    success:"Brilliant reaction. The first few seconds after losing possession are crucial — press if it is on, otherwise recover and protect danger.",
    fail:"The moment the ball is lost, react. Either try to win it back quickly or recover into a position that protects your goal.",
    outcome:{you:[50,51],ball:[48,52]}
  },
  {
    cat:"2 v 1",
    question:"You are running at one defender with a teammate free to your right. The defender starts coming towards you. What is the best idea?",
    hint:"Can you make the defender choose before you release the ball?",
    actors:[
      {id:"you",team:"blue",x:47,y:55,you:true},
      {id:"mate",team:"blue",x:62,y:38,label:"TEAMMATE"},
      {id:"b2",team:"blue",x:27,y:72},
      {id:"r1",team:"red",x:60,y:57,label:"DEFENDER"},
      {id:"r2",team:"red",x:77,y:33},
      {id:"r3",team:"red",x:79,y:72}
    ],
    ballStart:[47,55],ballEnd:[47,55],
    correct:3,
    options:[
      "Pass immediately before the defender commits",
      "Turn around and play backwards every time",
      "Run straight into the defender",
      "Drive towards the defender, draw them in, then release your teammate"
    ],
    success:"Perfect 2v1 thinking. By attacking the defender first, you make them commit and create more space for your teammate.",
    fail:"In a 2v1, try to draw the defender towards you. Once they commit, the pass to your teammate becomes much harder to defend.",
    outcome:{you:[54,54],ball:[62,38]}
  }
];

let selected = +(localStorage.getItem("gtiq_player") || 1);
let index = 0;
let score = 0;
let xp = +(localStorage.getItem("gtiq_xp") || 0);
let streak = +(localStorage.getItem("gtiq_streak") || 0);
let answers = [];
let locked = false;

const $ = id => document.getElementById(id);
const screens = ["home","players","challenge","results"];

function showScreen(name){
  screens.forEach(s => $("screen-"+s).classList.toggle("active", s===name));
  document.querySelectorAll(".bottom-nav button[data-nav]").forEach(b=>{
    b.classList.toggle("nav-active",b.dataset.nav===name);
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
function updateTop(){
  $("xpTop").textContent=xp;
  $("streakTop").textContent=streak;
  const done = +(localStorage.getItem("gtiq_lastPct") || 0);
  $("homePct").textContent=done+"%";
  $("homeRing").style.background=`conic-gradient(var(--yellow) ${done*3.6}deg,#183b5a 0)`;
}
function player(){
  return players.find(p=>p.id===selected);
}
function renderPlayers(){
  const grid=$("playersGrid"); grid.innerHTML="";
  players.forEach(p=>{
    const b=document.createElement("button");
    b.className="player-card"+(p.id===selected?" selected":"");
    b.innerHTML=`<img src="${p.img}" alt="Player ${String(p.id).padStart(2,"0")} avatar"><div class="player-label"><strong>${String(p.id).padStart(2,"0")}</strong><small>${p.role}</small></div>`;
    b.addEventListener("click",()=>{selected=p.id;localStorage.setItem("gtiq_player",selected);renderPlayers();});
    grid.appendChild(b);
  });
  const p=player();
  $("selectedPlayerCard").innerHTML=`<img src="${p.img}" alt="Selected player"><div><div class="eyebrow">PLAYER ${String(p.id).padStart(2,"0")}</div><h3>${p.role}</h3><p>${p.skill}</p></div><button class="primary" id="usePlayer">USE THIS PLAYER</button>`;
  $("usePlayer").addEventListener("click",()=>startChallenge());
}
function actorMarkup(a){
  const p=player();
  let cls=`actor ${a.team||"blue"}${a.you?" you":""}`;
  let style=`left:${a.x}%;top:${a.y}%;`;
  if(a.you) style+=`background-image:url('${p.img}');`;
  return `<div class="${cls}" id="actor-${a.id}" style="${style}">${a.you?"YOU":(a.team==="red"?"OPP":"TIBS")}${a.label?`<span class="tag">${a.label}</span>`:""}</div>`;
}
function setBall(pos){$("ball").style.left=pos[0]+"%";$("ball").style.top=pos[1]+"%";}
function clearArrows(){document.querySelectorAll(".move-arrow").forEach(x=>x.remove())}
function arrow(from,to){
  const pitch=$("pitch"), r=pitch.getBoundingClientRect();
  const x1=r.width*from[0]/100,y1=r.height*from[1]/100,x2=r.width*to[0]/100,y2=r.height*to[1]/100;
  const len=Math.hypot(x2-x1,y2-y1),ang=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
  const el=document.createElement("div");el.className="move-arrow";
  el.style.left=x1+"px";el.style.top=y1+"px";el.style.width=len+"px";el.style.transform=`rotate(${ang}deg)`;
  pitch.appendChild(el);
}
function renderScenario(){
  locked=true; clearArrows();
  const s=scenarios[index];
  $("scenarioCategory").textContent=s.cat;
  $("scenarioCounter").textContent=`${index+1} / ${scenarios.length}`;
  $("scoreNow").textContent=score;
  $("progressBar").style.width=`${((index+1)/scenarios.length)*100}%`;
  $("scenarioQuestion").textContent=s.question;
  $("scenarioHint").textContent="Watch the move first…";
  $("actors").innerHTML=s.actors.map(actorMarkup).join("");
  setBall(s.ballStart);
  $("freezeBanner").classList.remove("show");
  $("feedback").className="feedback"; $("feedback").innerHTML="";
  $("nextBtn").classList.add("hidden");
  const box=$("answers");box.innerHTML="";
  s.options.forEach((o,i)=>{
    const b=document.createElement("button");b.className="answer";b.disabled=true;
    b.innerHTML=`<strong>${String.fromCharCode(65+i)}</strong>${o}`;
    b.addEventListener("click",()=>choose(i,b));
    box.appendChild(b);
  });
  // Short "watch" sequence before the decision.
  setTimeout(()=>setBall(s.ballEnd),650);
  setTimeout(()=>{
    $("freezeBanner").classList.add("show");
    $("scenarioHint").textContent=s.hint;
    [...box.children].forEach(b=>b.disabled=false);
    locked=false;
  },1450);
}
function choose(choice,btn){
  if(locked)return;locked=true;
  const s=scenarios[index], good=choice===s.correct;
  const buttons=[...$("answers").children];buttons.forEach(b=>b.disabled=true);
  buttons[s.correct].classList.add("correct");
  if(!good)btn.classList.add("bad");
  if(good){score++;xp+=100;}else{xp+=25;}
  answers.push({cat:s.cat,good});
  $("scoreNow").textContent=score;
  $("xpTop").textContent=xp;
  localStorage.setItem("gtiq_xp",xp);
  $("feedback").className="feedback show "+(good?"good":"bad");
  $("feedback").innerHTML=`<strong>${good?"✅ GREAT DECISION +100 XP":"💡 NOT THE BEST OPTION +25 XP"}</strong>${good?s.success:s.fail}`;
  $("freezeBanner").classList.remove("show");
  // Animate the consequence.
  const you=$("actor-you");
  if(s.outcome?.you){arrow([parseFloat(you.style.left),parseFloat(you.style.top)],s.outcome.you);setTimeout(()=>{you.style.left=s.outcome.you[0]+"%";you.style.top=s.outcome.you[1]+"%";},150);}
  if(s.outcome?.ball){setTimeout(()=>setBall(s.outcome.ball),550);}
  $("nextBtn").textContent=index===scenarios.length-1?"SEE MY RESULT →":"NEXT SCENARIO →";
  $("nextBtn").classList.remove("hidden");
}
function startChallenge(){
  index=0;score=0;answers=[];showScreen("challenge");renderScenario();
}
function finish(){
  const pct=Math.round(score/scenarios.length*100);
  localStorage.setItem("gtiq_lastPct",pct);
  if(pct>=80) streak+=1; else streak=0;
  localStorage.setItem("gtiq_streak",streak);
  const p=player();
  $("resultAvatar").innerHTML=`<img src="${p.img}" alt="Player ${p.id}">`;
  $("bigScore").textContent=`${score}/${scenarios.length}`;
  $("resultXp").textContent=`+${score*100+(scenarios.length-score)*25}`;
  const stats={};answers.forEach(a=>{if(!stats[a.cat])stats[a.cat]={n:0,c:0};stats[a.cat].n++;if(a.good)stats[a.cat].c++});
  const arr=Object.entries(stats).sort((a,b)=>(b[1].c/b[1].n)-(a[1].c/a[1].n));
  $("bestSkill").textContent=arr[0]?.[0]||"—";$("workOn").textContent=arr[arr.length-1]?.[0]||"—";
  if(pct===100){$("resultTitle").textContent="GAME IQ MASTER! 🌟";$("resultCopy").textContent="Five brilliant decisions. Now try to spot the same pictures in your next match.";$("coachNote").textContent="Outstanding. Keep scanning early and moving with purpose — especially after you pass."}
  else if(pct>=80){$("resultTitle").textContent="HOMEWORK PASSED! ⚽";$("resultCopy").textContent="Strong game awareness. One or two details to keep improving.";$("coachNote").textContent="Good work. Don't just remember the answer — remember WHY the movement helped the team."}
  else{$("resultTitle").textContent="KEEP BUILDING 💪";$("resultCopy").textContent="Every decision is practice. Replay the challenge and use the explanations.";$("coachNote").textContent="Ask yourself three things: Where is the pressure? Where is the space? How can I help the next player?"}
  updateTop();showScreen("results");
}
$("playBtn").addEventListener("click",startChallenge);
$("chooseBtn").addEventListener("click",()=>{renderPlayers();showScreen("players")});
$("challengeBack").addEventListener("click",()=>showScreen("home"));
$("nextBtn").addEventListener("click",()=>{if(index===scenarios.length-1)finish();else{index++;renderScenario()}});
$("againBtn").addEventListener("click",startChallenge);
$("homeBtn").addEventListener("click",()=>showScreen("home"));
document.querySelectorAll("[data-back='home']").forEach(b=>b.addEventListener("click",()=>showScreen("home")));
document.querySelectorAll(".bottom-nav button[data-nav]").forEach(b=>b.addEventListener("click",()=>{
  if(b.dataset.nav==="players"){renderPlayers();showScreen("players")}
  else if(b.dataset.nav==="challenge")startChallenge();
  else showScreen(b.dataset.nav);
}));
$("resetBtn").addEventListener("click",()=>{
  if(confirm("Reset GameTime IQ progress on this device?")){
    localStorage.removeItem("gtiq_xp");localStorage.removeItem("gtiq_streak");localStorage.removeItem("gtiq_lastPct");
    xp=0;streak=0;updateTop();showScreen("home");
  }
});
renderPlayers();updateTop();showScreen("home");
