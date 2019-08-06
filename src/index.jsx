import React from 'react';
import ReactDOM from 'react-dom';
import '@common/layouts/css/index.less';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
