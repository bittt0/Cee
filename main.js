javascript:(function(){
  var w = window.open('about:blank', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  w.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cee</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: auto;
    }
    .glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
      color: white;
      max-width: 90vw;
      width: 100%;
      margin: 1rem;
    }
    h1 {
      margin: 0 0 1.5rem;
      font-size: 3.5rem;
      font-weight: 300;
      background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 2px;
    }
    .subtitle {
      margin: 0 0 2rem;
      opacity: 0.8;
      font-size: 1.1rem;
      font-style: italic;
    }
    .iframe-container {
      width: 100%;
      height: 60vh;
      min-height: 400px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }
    .controls {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    button {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    @media (max-width: 768px) {
      .glass { padding: 1.5rem; margin: 0.5rem; }
      h1 { font-size: 2.5rem; }
      .iframe-container { height: 50vh; }
      .controls { flex-direction: column; align-items: center; }
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .glass { animation: fadeIn 0.6s ease-out; }
  </style>
</head>
<body>
  <div class="glass">
    <h1>Cee</h1>
    <p class="subtitle">Your Gateway to Epic Games</p>
    <div class="iframe-container">
      <iframe src="https://bittt0.github.io/Cee" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"></iframe>
    </div>
    <div class="controls">
      <button onclick="document.querySelector('iframe').requestFullscreen()">Fullscreen</button>
      <button onclick="window.location.reload()">Refresh</button>
      <button onclick="window.close()">Close</button>
    </div>
  </div>
  <script>
    // Add smooth scroll to iframe if needed
    window.addEventListener('load', function() {
      const iframe = document.querySelector('iframe');
      iframe.onload = function() {
        console.log('Cee loaded!');
      };
    });
    // Handle fullscreen errors gracefully
    document.addEventListener('fullscreenchange', function() {
      if (!document.fullscreenElement) {
        document.querySelector('.iframe-container').style.height = '60vh';
      }
    });
  </script>
</body>
</html>`);
  w.document.close();
})();
