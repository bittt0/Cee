(function() {
  try {
    // Create a basic document if not present
    if (!document.body) {
      document.open();
      document.write('<html><body></body></html>');
      document.close();
    }
    document.body.innerHTML = ''; // Clear any existing content

    // Inline minimal UI
    const html = `
      <div id="password-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 1000;">
        <div id="password-box" style="background: rgba(85, 60, 154, 0.7); backdrop-filter: blur(15px); border-radius: 16px; padding: 1.5rem; text-align: center; border: 1px solid rgba(255,255,255,0.1); color: white; width: 80vw; max-width: 300px;">
          <h2 style="font-family: 'Lilita One', sans-serif; font-weight: normal;">Enter Password</h2>
          <input type="password" id="password-input" placeholder="Password..." autocomplete="off" style="padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(85,60,154,0.5); color: white; font-size: 1rem; font-weight: normal; margin: 1rem 0; width: 100%; outline: none;">
          <br>
          <button id="password-submit" style="background: rgba(107,70,193,0.8); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; font-size: 1rem; font-weight: normal;">Submit</button>
          <div id="error" style="color: #ff6b6b; font-size: 0.8rem; font-weight: normal; margin-top: 0.5rem;"></div>
        </div>
      </div>
      <div id="main-content" class="hidden" style="background: rgba(107,70,193,0.4); backdrop-filter: blur(20px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); padding: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.3); text-align: center; color: white; max-width: 90vw; width: 100%; margin: 1rem; transition: opacity 0.3s ease;">
        <h1 style="font-size: 3rem; font-weight: normal; background: linear-gradient(45deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4)); -webkit-background-clip: text; background-clip: text; color: transparent; letter-spacing: 2px; margin-bottom: 2rem;">Cee</h1>
        <div id="game-menu" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-top: 1rem;">
          <button class="game-button" data-game="crazystackblocks" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Crazy Stack Blocks</button>
          <button class="game-button" data-game="doodlejump" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Doodle Jump</button>
          <button class="game-button" data-game="driftboss" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Drift Boss</button>
          <button class="game-button" data-game="geometrydash" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Geometry Dash</button>
          <button class="game-button" data-game="gunspin" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Gun Spin</button>
          <button class="game-button" data-game="leverwarriors" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Lever Warriors</button>
          <button class="game-button" data-game="polyominoblocks" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Polyomino Blocks</button>
          <button class="game-button" data-game="polytrack" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Poly Track</button>
          <button class="game-button" data-game="subwaysurfers" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">Subway Surfers</button>
          <button class="game-button" data-game="webecome" style="background: rgba(85,60,154,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; padding: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: normal; transition: all 0.3s ease;">We Become</button>
        </div>
        <div class="controls" style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
          <button class="control-btn" onclick="window.open('https://github.com/bittt0/Cee')" style="background: rgba(85,60,154,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; padding: 0.5rem 1rem; cursor: pointer; font-size: 0.8rem; font-weight: normal; transition: all 0.3s ease;">GitHub</button>
          <button class="control-btn" id="settings-btn" style="background: rgba(85,60,154,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; padding: 0.5rem 1rem; cursor: pointer; font-size: 0.8rem; font-weight: normal; transition: all 0.3s ease;">Settings</button>
          <button class="control-btn" id="back-btn" style="display:none; background: rgba(85,60,154,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; padding: 0.5rem 1rem; cursor: pointer; font-size: 0.8rem; font-weight: normal; transition: all 0.3s ease;">Back to Homepage</button>
          <button class="control-btn" onclick="window.close()" style="background: rgba(85,60,154,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; padding: 0.5rem 1rem; cursor: pointer; font-size: 0.8rem; font-weight: normal; transition: all 0.3s ease;">Close</button>
        </div>
        <button class="secret-btn" onclick="alert('${SECRET_MESSAGE}');" style="position: absolute; bottom: 20px; right: 20px; width: 10px; height: 10px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; cursor: pointer; font-size: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; transition: all 0.3s ease;">?</button>
      </div>
      <div id="settings-panel" style="display: none; position: fixed; top: 20px; right: 20px; background: rgba(85,60,154,0.7); backdrop-filter: blur(15px); border-radius: 12px; padding: 1rem; border: 1px solid rgba(255,255,255,0.1); z-index: 1001; max-width: 250px;">
        <h3 style="font-family: 'Lilita One', sans-serif; font-weight: normal;">Settings</h3>
        <label style="font-weight: normal;">Tab Cloaking</label>
        <input type="text" id="title-input" placeholder="New tab title" value="Cee" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; background: rgba(85,60,154,0.5); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 4px; font-weight: normal;">
        <button onclick="cloakTab()" style="background: rgba(107,70,193,0.8); border: none; padding: 0.5rem; margin-top: 0.5rem; font-weight: normal;">Apply Cloak</button>
        <br>
        <label style="font-weight: normal;">Tab Icon</label>
        <input type="file" id="icon-upload" accept="image/*" style="color: white; padding: 0; margin: 0.5rem 0;">
        <button onclick="setIcon()" style="background: rgba(107,70,193,0.8); border: none; padding: 0.5rem; margin-top: 0.5rem; font-weight: normal;">Set Icon</button>
        <button onclick="document.getElementById('settings-panel').style.display='none'" style="background: rgba(107,70,193,0.8); border: none; padding: 0.5rem; margin-top: 0.5rem; font-weight: normal;">Close</button>
      </div>
    `;
    document.body.innerHTML = html;

    // Initialize script
    const passwordContainer = document.getElementById('password-container');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const error = document.getElementById('error');
    const gameMenu = document.getElementById('game-menu');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const backBtn = document.getElementById('back-btn');

    if (!passwordContainer || !passwordInput || !passwordSubmit) {
      console.error('Critical DOM elements missing');
      document.body.innerHTML = '<h1 style="color:#ff6b6b;font-family:\'Lilita One\',sans-serif;text-align:center;">Error: UI failed to load. Check console (F12).</h1>';
      return;
    }

    function checkPassword() {
      if (passwordInput.value === 'letmein') {
        passwordContainer.style.display = 'none';
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

    passwordSubmit.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkPassword();
    });

    gameMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('game-button')) {
        const game = e.target.dataset.game;
        const gameUrl = `https://bittt0.github.io/Cee/games/${game}/index.html`;
        const gameWindow = window.open(gameUrl, '_blank');
        if (gameWindow) {
          backBtn.style.display = 'inline-block';
          console.log('Opened game in new window:', gameUrl);
        } else {
          console.error('Failed to open new window, likely blocked by popup settings');
        }
      }
    });

    backBtn.addEventListener('click', () => {
      window.location.href = 'about:blank'; // Reloads the bookmarklet
      console.log('Returning to homepage');
    });

    settingsBtn.addEventListener('click', () => {
      settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
    });

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
    });

    passwordInput.focus();
    console.log('Script initialized');
  } catch (e) {
    console.error('Script error:', e);
    document.body.innerHTML = '<h1 style="color:#ff6b6b;font-family:\'Lilita One\',sans-serif;text-align:center;">Error: ' + e.message + '. Check console (F12).</h1>';
  }
})();
