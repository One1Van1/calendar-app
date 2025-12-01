import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';

let mainWindow: BrowserWindow | null = null;
let backendProcess: ChildProcess | null = null;

// Запуск NestJS backend
function startBackend(): Promise<void> {
  return new Promise((resolve, reject) => {
    const backendPath = path.join(__dirname, '../../backend');
    
    console.log('Starting NestJS backend...');
    backendProcess = spawn('yarn', ['start:dev'], {
      cwd: backendPath,
      shell: true,
      stdio: 'pipe',
    });

    backendProcess.stdout?.on('data', (data: Buffer) => {
      const output = data.toString();
      console.log(`[Backend]: ${output}`);
      
      // Проверяем, что сервер запустился
      if (output.includes('Application is running on')) {
        console.log('Backend started successfully!');
        resolve();
      }
    });

    backendProcess.stderr?.on('data', (data: Buffer) => {
      console.error(`[Backend Error]: ${data.toString()}`);
    });

    backendProcess.on('error', (error: Error) => {
      console.error('Failed to start backend:', error);
      reject(error);
    });

    // Таймаут на запуск
    setTimeout(() => {
      console.log('Backend startup timeout - assuming it started');
      resolve();
    }, 10000);
  });
}

// Остановка backend при закрытии приложения
function stopBackend(): void {
  if (backendProcess) {
    console.log('Stopping backend...');
    backendProcess.kill();
    backendProcess = null;
  }
}

// Создание главного окна
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Calendar',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#ffffff',
    show: false, // Покажем после загрузки
  });

  // Загружаем UI после запуска backend
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  // Показываем окно после загрузки
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Открываем DevTools в режиме разработки
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Инициализация приложения
app.whenReady().then(async () => {
  try {
    // Сначала запускаем backend
    await startBackend();
    
    // Ждём немного, чтобы backend точно поднялся
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Затем создаём окно
    createWindow();
  } catch (error) {
    console.error('Failed to start application:', error);
    app.quit();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Закрытие приложения
app.on('window-all-closed', () => {
  stopBackend();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  stopBackend();
});

app.on('will-quit', () => {
  stopBackend();
});
