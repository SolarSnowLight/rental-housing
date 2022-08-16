/* Импорт сторонних библиотек */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/* Импорт внутренных элементов (контейнеры, хуки, компоненты, hocs, и т.д.) */
import App from './containers/App';
import { setupStore } from './store/store';

/* Импорт файлов конфигурации */
import storeConfig from "./configs/store.config.json";

/* Импорти стилей */
import './styles/normalize.css';
import './styles/index.css';
import { useAppDispatch } from './hooks/redux.hook';
import { authSlice } from './store/reducers/AuthSlice';

/* Инициализируем константу root определённым элементом, определённым в DOM дереве (div с id = "root") */
const root = ReactDOM.createRoot(document.getElementById('root'));

/* Инициализация централизованного хранилища */
const store = setupStore();

/* Подписка на изменения в local storage, с ключом main-store */
/*store.subscribe(() => {
  localStorage[storeConfig["main-store"]] = JSON.stringify(store.getState());
});*/

/* Отображение в конкретном элементе DOM дерева определённого React-компонента */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

/* Для справки:
Компоненты, обёрнутые в <StrictMode> (только в dev режиме), 
умышленно рендерятся по два раза, чтобы избежать нежелательных сайд-эффектов, 
которые можно добавить в процессе разработки.
*/