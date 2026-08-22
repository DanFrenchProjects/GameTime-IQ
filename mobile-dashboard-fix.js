/*
 GameTime IQ - Mobile Dashboard Fix
 Load AFTER dashboard-home.js.
 Does not change player data, football positions, stats or challenge content.
*/
(() => {
  const css = document.createElement("style");
  css.id = "gtiq-mobile-fix";
  css.textContent = `
    .dash-player,.roster-card,.quick-btn,.big-action{
      -webkit-appearance:none!important;appearance:none!important;
    }
    .dash-player{
      background:transparent!important;border:0!important;padding:0!important;
      color:inherit!important;width:auto!important;min-width:0!important;
    }
    #home.gtiq-dashboard,
    #home.gtiq-dashboard .dash-shell,
    #home.gtiq-dashboard .dash-panel,
    #home.gtiq-dashboard .dash-hero,
    #home.gtiq-dashboard .dash-pitch-wrap,
    #home.gtiq-dashboard .roster-panel,
    #home.gtiq-dashboard .player-detail{
      min-width:0!important;max-width:100%!important;
    }
    #home.gtiq-dashboard{overflow-x:hidden!important}

    @media (max-width:820px){
      body.gtiq-home-dashboard > #app > header{display:none!important}
      #app{width:100%!important;max-width:100%!important;overflow-x:hidden!important;padding-bottom:118px!important}
      main{padding:8px!important;width:100%!important;max-width:100%!important;overflow-x:hidden!important}
      #home.gtiq-dashboard .dash-shell{width:100%!important;gap:9px!important}
      #home.gtiq-dashboard .dash-top{
        display:grid!important;grid-template-columns:1fr!important;gap:8px!important;padding:10px!important
      }
      .dash-logo{justify-content:flex-start!important}
      .dash-logo b{font-size:18px!important}
      .dash-metrics{
        display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:6px!important;width:100%!important
      }
      .dash-metric{min-width:0!important;width:auto!important;padding:7px 4px!important}
      .dash-metric strong{font-size:17px!important}
      #home.gtiq-dashboard .dash-hero{
        display:grid!important;grid-template-columns:1fr!important;gap:8px!important;padding:10px!important
      }
      .dash-copy{padding:2px 4px 4px!important}
      .dash-copy h1{font-size:39px!important;line-height:.98!important;margin:6px 0 12px!important}
      .dash-copy p{font-size:14px!important;line-height:1.42!important;margin-bottom:14px!important}

      .dash-pitch-wrap{
        width:100%!important;min-height:0!important;height:auto!important;padding:0!important;
        aspect-ratio:1.18/1!important;overflow:visible!important
      }
      .dash-pitch{
        position:absolute!important;inset:0!important;width:100%!important;height:100%!important;
        clip-path:polygon(10% 0,90% 0,100% 100%,0 100%)!important;border-width:2px!important
      }
      .dash-pitch:before{inset:5% 7%!important}
      .dash-centre{width:72px!important;height:52px!important}
      .dash-mini{width:42px!important;height:50px!important;border-radius:12px!important;border-width:2px!important}
      .dash-base{width:38px!important;height:8px!important;margin-top:-6px!important}
      .dash-pname{font-size:6.8px!important;line-height:1!important;padding:2px 4px!important}
      .dash-arrow{font-size:18px!important}

      .quick-grid{
        display:grid!important;grid-template-columns:1fr 1fr!important;gap:7px!important;padding:5px 0 0!important
      }
      .quick-btn{min-height:82px!important;padding:8px!important}
      .quick-btn i{font-size:23px!important}
      .quick-btn b{font-size:13px!important}
      .quick-btn small{display:block!important;font-size:8px!important}

      .roster-panel{padding:9px!important;overflow:hidden!important}
      .roster-head{gap:8px!important}
      .roster-grid{
        display:flex!important;overflow-x:auto!important;overflow-y:hidden!important;gap:7px!important;
        padding:1px 1px 6px!important;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch
      }
      .roster-card{
        flex:0 0 104px!important;min-width:104px!important;width:104px!important;scroll-snap-align:start
      }
      .roster-card img{height:112px!important}
      .roster-card .rcopy{padding:6px!important}
      .roster-card strong{font-size:12px!important}
      .roster-card small{font-size:7.5px!important;line-height:1.15!important}
      .team-preview{flex:0 0 145px!important;min-width:145px!important}

      .player-detail{
        display:grid!important;grid-template-columns:1fr!important;gap:8px!important;padding:9px!important;margin-top:8px!important
      }
      .detail-summary{grid-template-columns:72px 1fr!important;gap:8px!important}
      .detail-summary img{width:72px!important;height:88px!important}
      .detail-summary h2{font-size:22px!important}
      .detail-summary p{font-size:11px!important;line-height:1.35!important}
      .trait-list{grid-template-columns:1fr!important}
      .radar{width:min(260px,100%)!important;height:185px!important}
      .recommend-card{padding:10px!important}
      .bottom-actions{display:grid!important;grid-template-columns:1fr!important;gap:7px!important}
      .big-action{min-width:0!important;width:100%!important}
      nav{padding-bottom:calc(11px + env(safe-area-inset-bottom))!important}
    }

    @media (max-width:430px){
      .dash-copy h1{font-size:35px!important}
      .dash-pitch-wrap{aspect-ratio:1.08/1!important}
      .dash-mini{width:38px!important;height:46px!important}
      .dash-pname{font-size:6.2px!important}
      .roster-card{flex-basis:98px!important;min-width:98px!important;width:98px!important}
      .roster-card img{height:106px!important}
    }
  `;
  document.head.appendChild(css);

  function syncHomeClass(){
    document.body.classList.toggle("gtiq-home-dashboard", !!document.querySelector("#home.active.gtiq-dashboard"));
  }

  syncHomeClass();

  const observer = new MutationObserver(syncHomeClass);
  document.querySelectorAll(".screen").forEach(s => observer.observe(s,{attributes:true,attributeFilter:["class"]}));

  if (document.querySelector("#home.active") && typeof renderHome === "function"){
    renderHome();
    syncHomeClass();
  }
})();
