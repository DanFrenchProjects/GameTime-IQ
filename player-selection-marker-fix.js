/*
 GameTime IQ - Player Selection Marker Fix
 Load AFTER mobile-dashboard-fix.js.
 Fixes sideways movement when selecting players.
 Does not alter formation positions or player data.
*/
(() => {
  const css = document.createElement("style");
  css.id = "gtiq-selection-marker-fix";
  css.textContent = `
    /* Lock each pitch player to a fixed anchor box so selection cannot move them */
    .dash-player{
      width:72px !important;
      height:92px !important;
      min-width:72px !important;
      max-width:72px !important;
      position:absolute !important;
      display:block !important;
      overflow:visible !important;
      transform:translate(-50%,-50%) !important;
      box-sizing:border-box !important;
    }

    .dash-player:hover,
    .dash-player:active,
    .dash-player.selected{
      transform:translate(-50%,-50%) !important;
    }

    /* Avatar is always centred in the fixed player box */
    .dash-player .dash-mini{
      position:absolute !important;
      left:50% !important;
      top:12px !important;
      transform:translateX(-50%) !important;
      display:block !important;
      margin:0 !important;
      z-index:3 !important;
    }

    /* Normal base stays directly below avatar */
    .dash-player .dash-base{
      position:absolute !important;
      left:50% !important;
      top:67px !important;
      transform:translateX(-50%) !important;
      margin:0 !important;
      z-index:2 !important;
    }

    /* Selected blue oval/circle below player */
    .dash-player.selected .dash-base{
      width:46px !important;
      height:11px !important;
      border:2px solid #62d9ff !important;
      background:#082944 !important;
      box-shadow:0 0 0 2px rgba(77,205,255,.18),0 0 13px rgba(77,205,255,.9) !important;
    }

    /* Arrow stays centred above head */
    .dash-player .dash-arrow{
      position:absolute !important;
      display:none !important;
      left:50% !important;
      top:-12px !important;
      bottom:auto !important;
      transform:translateX(-50%) !important;
      width:24px !important;
      text-align:center !important;
      z-index:9 !important;
      line-height:1 !important;
      color:#65d9ff !important;
      font-size:21px !important;
      text-shadow:0 2px 7px #001,0 0 8px rgba(75,209,255,.75) !important;
      pointer-events:none !important;
    }

    .dash-player.selected .dash-arrow{
      display:block !important;
    }

    /* Name plate always locked below the base */
    .dash-player .dash-pname{
      position:absolute !important;
      left:50% !important;
      top:76px !important;
      transform:translateX(-50%) !important;
      margin:0 !important;
      z-index:8 !important;
      min-width:max-content !important;
      pointer-events:none !important;
    }

    @media(max-width:820px){
      .dash-player{
        width:62px !important;
        min-width:62px !important;
        max-width:62px !important;
        height:82px !important;
      }

      .dash-player .dash-mini{
        top:10px !important;
      }

      .dash-player .dash-base{
        top:58px !important;
      }

      .dash-player.selected .dash-base{
        width:42px !important;
        height:10px !important;
      }

      .dash-player .dash-arrow{
        top:-11px !important;
        font-size:19px !important;
      }

      .dash-player .dash-pname{
        top:66px !important;
      }
    }

    @media(max-width:430px){
      .dash-player{
        width:58px !important;
        min-width:58px !important;
        max-width:58px !important;
        height:78px !important;
      }

      .dash-player .dash-base{
        top:54px !important;
      }

      .dash-player.selected .dash-base{
        width:39px !important;
      }

      .dash-player .dash-pname{
        top:62px !important;
      }
    }
  `;
  document.head.appendChild(css);
})();
