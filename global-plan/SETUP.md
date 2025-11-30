# Руководство по настройке проекта

## Необходимые инструменты

### Системные требования
- **macOS**: 10.14 или выше
- **Node.js**: 18.x или выше
- **Yarn**: 1.22.x или выше
- **Git**: для контроля версий

### Установка Node.js и Yarn
```bash
# Через Homebrew
brew install node
brew install yarn

# Проверка установки
node --version
yarn --version
```

## Инициализация проекта

### Шаг 1: Создание структуры проекта
```bash
cd /Users/one.van/Desktop/Calendar

# Инициализация основного package.json (monorepo)
yarn init -y

# Создание директорий
mkdir -p backend frontend shared docs
```

### Шаг 2: Настройка Backend (NestJS)
```bash
cd backend

# Инициализация NestJS приложения
npx @nestjs/cli new . --skip-git --package-manager yarn

# Установка дополнительных зависимостей
yarn add @nestjs/typeorm typeorm sqlite3
yarn add @nestjs/config class-validator class-transformer
yarn add -D @types/node

# Создание модулей
npx nest generate module events
npx nest generate module categories
npx nest generate module reminders

# Создание контроллеров и сервисов
npx nest generate controller events
npx nest generate service events
npx nest generate controller categories
npx nest generate service categories
npx nest generate controller reminders
npx nest generate service reminders
```

### Шаг 3: Настройка Frontend (Electron)
```bash
cd ../frontend

# Инициализация
yarn init -y

# Установка Electron
yarn add -D electron

# Установка зависимостей для разработки
yarn add -D electron-builder typescript @types/node

# Установка зависимостей для UI
yarn add axios date-fns

# Если используем React
yarn add react react-dom
yarn add -D @types/react @types/react-dom
yarn add -D webpack webpack-cli webpack-dev-server
yarn add -D html-webpack-plugin ts-loader
```

### Шаг 4: Настройка TypeScript

#### Backend tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

#### Frontend tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "lib": ["ES2021", "DOM"],
    "jsx": "react",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Структура файлов после инициализации

```
Calendar/
├── README.md
├── PLAN.md
├── ARCHITECTURE.md
├── SETUP.md
├── package.json (root)
│
├── backend/
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── events/
│   │   ├── categories/
│   │   └── reminders/
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
├── frontend/
│   ├── src/
│   │   ├── main.ts (Electron main process)
│   │   ├── preload.ts
│   │   ├── renderer/
│   │   │   ├── index.html
│   │   │   ├── index.ts
│   │   │   ├── components/
│   │   │   └── styles/
│   ├── package.json
│   ├── tsconfig.json
│   └── electron-builder.json
│
├── shared/
│   ├── types/
│   │   ├── event.types.ts
│   │   ├── category.types.ts
│   │   └── reminder.types.ts
│   └── utils/
│       └── date.utils.ts
│
└── docs/
    └── (дополнительная документация)
```

## Следующие шаги

После выполнения инициализации:

1. **Backend разработка**
   - Настроить подключение к SQLite
   - Создать entities
   - Реализовать DTO и валидацию
   - Создать API endpoints

2. **Frontend разработка**
   - Создать базовое Electron окно
   - Настроить IPC коммуникацию
   - Разработать UI компоненты
   - Интегрировать с Backend API

3. **Интеграция**
   - Запустить Backend на localhost:3000
   - Запустить Electron приложение
   - Протестировать взаимодействие

4. **Сборка**
   - Настроить electron-builder
   - Создать .dmg для macOS
   - Протестировать установку

## Полезные команды

### Backend
```bash
cd backend

# Разработка
yarn start:dev

# Сборка
yarn build

# Production
yarn start:prod
```

### Frontend
```bash
cd frontend

# Разработка
yarn dev

# Сборка
yarn build

# Запуск Electron
yarn start

# Сборка приложения
yarn dist
```

## Troubleshooting

### Проблема: Порт 3000 занят
```bash
# Найти процесс на порту 3000
lsof -ti:3000

# Убить процесс
kill -9 $(lsof -ti:3000)
```

### Проблема: Electron не запускается
```bash
# Переустановить Electron
cd frontend
rm -rf node_modules yarn.lock
yarn install
```

### Проблема: TypeScript ошибки
```bash
# Очистить и пересобрать
yarn build --clean
```
