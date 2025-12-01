import { app, BrowserWindow, nativeImage, NativeImage } from 'electron';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import { Canvas, createCanvas } from 'canvas';

let mainWindow: BrowserWindow | null = null;
let backendProcess: ChildProcess | null = null;

// Функция для создания динамической иконки с датой
function createDateIcon(date: number): NativeImage {
  const canvas: Canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');

  // Фон (красный квадрат со скруглёнными углами)
  ctx.fillStyle = '#d74937';
  ctx.beginPath();
  ctx.roundRect(50, 50, 412, 412, 50);
  ctx.fill();

  // Верхняя белая полоса
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(50, 50, 412, 100, [50, 50, 0, 0]);
  ctx.fill();

  // Текст месяца (маленький, сверху)
  const months = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
  const month = months[new Date().getMonth()];
  
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 45px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(month, 256, 100);

  // Число (большое, в центре)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 280px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(date.toString(), 256, 320);

  return nativeImage.createFromBuffer(canvas.toBuffer());
}

// Функция обновления иконки
function updateAppIcon(): void {
  const currentDate = new Date().getDate();
  const icon = createDateIcon(currentDate);
  
  if (mainWindow && !mainWindow.isDestroyed()) {
    // Для macOS устанавливаем иконку в Dock
    if (process.platform === 'darwin') {
      app.dock?.setIcon(icon);
    }
    // Для Windows/Linux устанавливаем иконку окна
    mainWindow.setIcon(icon);
  }
}

// Запуск таймера для обновления иконки каждую минуту
function startIconUpdater(): void {
  // Обновляем сразу
  updateAppIcon();
  
  // Затем обновляем каждую минуту (на случай смены дня)
  setInterval(() => {
    updateAppIcon();
  }, 60000); // Проверяем каждую минуту
}

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
    
    // Запускаем обновление иконки
    startIconUpdater();
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
