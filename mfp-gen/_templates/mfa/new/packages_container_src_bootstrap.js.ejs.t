---
to: packages/<%= name.toLowerCase() %>/src/bootstrap.js
---
import { MicroFrontApp } from './micro-front-app/micro-front-app'

const root = document.querySelector('#root');
root.appendChild(new MicroFrontApp());
