import { contextBridge } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Здесь можно добавить API для взаимодействия между renderer и main процессом
  platform: process.platform,
});
