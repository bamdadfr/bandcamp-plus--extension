import {State} from './common/state';
import {PageController} from './controllers/page.controller';

window.addEventListener('load', async () => {
  await State.init();
  PageController.init();
});
