import { Swipe, SwipeItem, Button, Popup } from 'vant';
// 放入数组
const plugins = [
  Swipe, SwipeItem, Button, Popup
];
export default function getVant(app) {
  plugins.forEach((item) => app.use(item));
}
