import {deltaTime} from '/assets/js/modules/deltaTime.js'

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const dt = new deltaTime(1000, () => console.log('fired'));

dt.start();