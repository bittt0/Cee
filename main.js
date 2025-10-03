(function() {
  try {
    // Ensure a basic document exists
    if (!document.body) {
      document.open();
      document.write('<html><body></body></html>');
      document.close();
    }

    // Initial fallback UI to prevent blank page
    document.body.innerHTML = '<div style="color:white;font-family:\'Lilita One\',sans-serif;text-align:center;">Loading...</div>';

    // Editable secret button message
    const SECRET_MESSAGE = 'Secret unlocked: You found the button! 🎉';

    // Build the full page
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Cee</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Lilita One', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #6b46c1 0%, #553c9a 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            -webkit-user-select: none;
            user-select: none;
            touch-action: manipulation;
          }
          .glass-panel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(35px);
            -webkit-backdrop-filter: blur(35px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 1.5rem;
            width: 90vw;
            max-width: 600px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
            text-align: center;
            color: white;
          }
          .hidden { display: none; }
          .title {
            font-size: 2.5rem;
            font-weight: normal;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.65));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: 1px;
            margin-bottom: 1.5rem;
          }
          .game-menu, .controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            margin: 1rem 0;
          }
          .game-button, .control-btn {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.25);
            border-radius: 12px;
            color: white;
            padding: 0.8rem 1.2rem;
            cursor: pointer;
            font-size: 1rem;
            font-weight: normal;
            transition: all 0.3s ease;
          }
          .game-button:hover, .control-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
          }
          #password-input {
            padding: 0.7rem;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: white;
            font-size: 1rem;
            font-weight: normal;
            margin: 1rem 0;
            width: 100%;
            outline: none;
          }
          #password-input::placeholder { color: rgba(255, 255, 255, 0.7); }
          #password-submit {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 0.7rem 1.5rem;
            font-size: 1rem;
            font-weight: normal;
            border-radius: 8px;
          }
          #password-submit:hover { background: rgba(255, 255, 255, 0.15); }
          #error { color: #ff6b6b; font-size: 0.9rem; font-weight: normal; margin-top: 0.5rem; }
          #game-frame {
            width: 100%;
            height: 80vh;
            border: none;
            border-radius: 15px;
            display: none;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          #settings-panel {
            display: none;
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 12px;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.25);
            z-index: 1001;
            max-width: 250px;
          }
          #settings-panel input {
            width: 100%;
            padding: 0.5rem;
            margin: 0.5rem 0;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.25);
            color: white;
            border-radius: 6px;
            font-weight: normal;
          }
          #settings-panel input[type="file"] { color: white; padding: 0; }
          #settings-panel button {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 0.5rem;
            margin-top: 0.5rem;
            font-weight: normal;
            border-radius: 6px;
          }
          #settings-panel button:hover { background: rgba(255, 255, 255, 0.15); }
          .secret-btn {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            cursor: pointer;
            font-size: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
          }
          .secret-btn:hover {
            background: rgba(255, 255, 255, 0.4);
            transform: scale(1.1);
          }
          @media (max-width: 600px) {
            .glass-card { padding: 1rem; }
            .title { font-size: 2rem; }
            .game-button, .control-btn { padding: 0.6rem 1rem; font-size: 0.9rem; }
          }
        </style>
      </head>
      <body>
        <div id="password-container" class="glass-panel">
          <div id="password-box" class="glass-card">
            <h2>Enter Password</h2>
            <input type="password" id="password-input" placeholder="Password..." autocomplete="off">
            <br>
            <button id="password-submit">Submit</button>
            <div id="error"></div>
          </div>
        </div>
        <div id="main-content" class="glass-panel hidden">
          <h1 class="title">Cee</h1>
          <div id="game-menu"></div>
          <div class="controls">
            <button class="control-btn" onclick="window.open('https://github.com/bittt0/Cee')">GitHub</button>
            <button class="control-btn" id="settings-btn">Settings</button>
            <button class="control-btn" id="back-btn" style="display:none;">Back to Homepage</button>
            <button class="control-btn" onclick="window.close()">Close</button>
          </div>
          <iframe id="game-frame"></iframe>
          <button class="secret-btn" onclick="alert('${SECRET_MESSAGE}');">?</button>
        </div>
        <div id="settings-panel" class="glass-card">
          <h3>Settings</h3>
          <label>Tab Cloaking</label>
          <input type="text" id="title-input" placeholder="New tab title" value="Cee">
          <button onclick="cloakTab()">Apply Cloak</button>
          <br>
          <label>Tab Icon</label>
          <input type="file" id="icon-upload" accept="image/*">
          <button onclick="setIcon()">Set Icon</button>
          <button onclick="document.getElementById('settings-panel').style.display='none'">Close</button>
        </div>
      </body>
      </html>
    `;
    document.open();
    document.write(html);
    document.close();

    // Initialize script after DOM is ready
    setTimeout(() => {
      try {
        const passwordContainer = document.getElementById('password-container');
        const passwordInput = document.getElementById('password-input');
        const passwordSubmit = document.getElementById('password-submit');
        const error = document.getElementById('error');
        const gameMenu = document.getElementById('game-menu');
        const gameFrame = document.getElementById('game-frame');
        const settingsBtn = document.getElementById('settings-btn');
        const settingsPanel = document.getElementById('settings-panel');
        const backBtn = document.getElementById('back-btn');

        if (!passwordContainer || !passwordInput || !passwordSubmit) {
          console.error('Critical DOM elements missing:', { passwordContainer, passwordInput, passwordSubmit });
          return;
        }

        const games = [
          { name: 'Crazy Stack Blocks', id: 'crazystackblocks' },
          { name: 'Doodle Jump', id: 'doodlejump' },
          { name: 'Drift Boss', id: 'driftboss' },
          { name: 'Geometry Dash', id: 'geometrydash' },
          { name: 'Gun Spin', id: 'gunspin' },
          { name: 'Lever Warriors', id: 'leverwarriors' },
          { name: 'Polyomino Blocks', id: 'polyominoblocks' },
          { name: 'Poly Track', id: 'polytrack' },
          { name: 'Subway Surfers', id: 'subwaysurfers' },
          { name: 'We Become', id: 'webecome' }
        ];

        games.forEach(game => {
          const button = document.createElement('button');
          button.className = 'game-button';
          button.textContent = game.name;
          button.onclick = () => {
            try {
              gameFrame.src = `https://bittt0.github.io/Cee/games/${game.id}/index.html`;
              gameFrame.onload = () => console.log('Game loaded:', game.id);
              gameFrame.onerror = () => console.error('Failed to load game:', game.id);
              gameFrame.style.display = 'block';
              gameMenu.style.display = 'none';
              backBtn.style.display = 'inline-block';
              console.log('Attempting to load game:', game.id);
            } catch (e) {
              console.error('Game load error:', e);
            }
          };
          gameMenu.appendChild(button);
        });

        function checkPassword() {
          if (passwordInput.value === 'letmein') {
            passwordContainer.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            window.name = 'cee_' + Math.random().toString(36).substring(2);
            console.log('Password accepted, UI shown');
          } else {
            error.textContent = 'Incorrect password. Try again.';
            passwordInput.value = '';
            passwordInput.focus();
            console.warn('Incorrect password entered');
          }
        }

        passwordSubmit.onclick = checkPassword;
        passwordInput.onkeypress = (e) => {
          if (e.key === 'Enter') checkPassword();
        };

        backBtn.onclick = () => {
          gameFrame.style.display = 'none';
          gameFrame.src = '';
          gameMenu.style.display = 'flex';
          backBtn.style.display = 'none';
          console.log('Returned to homepage');
        };

        settingsBtn.onclick = () => {
          settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
        };

        window.cloakTab = () => {
          const newTitle = document.getElementById('title-input').value || 'Cee';
          document.title = newTitle;
          alert('Tab title changed to: ' + newTitle);
          settingsPanel.style.display = 'none';
        };

        window.setIcon = () => {
          const fileInput = document.getElementById('icon-upload');
          const file = fileInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
              link.type = 'image/x-icon';
              link.rel = 'shortcut icon';
              link.href = e.target.result;
              document.head.appendChild(link);
              alert('Tab icon updated!');
            };
            reader.readAsDataURL(file);
          } else {
            alert('Please select an image file.');
          }
          settingsPanel.style.display = 'none';
        };

        passwordInput.focus();
        console.log('Script initialized successfully');
      } catch (e) {
        console.error('Script error:', e);
        document.body.innerHTML = '<h1 style="color:#ff6b6b;font-family:\'Lilita One\',sans-serif;text-align:center;">Error: ' + e.message + '. Check console (F12).</h1>';
      }
    }, 100);
  } catch (e) {
    console.error('Script error:', e);
    document.body.innerHTML = '<h1 style="color:#ff6b6b;font-family:\'Lilita One\',sans-serif;text-align:center;">Error: ' + e.message + '. Check console (F12).</h1>';
  }
})();
