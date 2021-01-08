import { avatarList } from "../components/images";

const TOTAL_USERS_COUNT = 200;

export const defaultStartCoords = { lat: 1.3521, lng: 103.8198 };

export const fakeUsers = [...Array(TOTAL_USERS_COUNT)].fill(0).map((val, index) => ({
  id: index,
  lat:
    defaultStartCoords.lat +
    0.2 * index * Math.sin((Math.PI * index) / 180) * Math.cos((23 * Math.PI * index) / 180) +
    Math.sin(index / 180),
  lng:
    defaultStartCoords.lng +
    0.2 * index * Math.cos((17 * Math.PI * index) / 180) * Math.sin((5 * Math.PI * index) / 180) +
    Math.sin(index / 180),
  details: {
    chatMessage: 'HI',
    // random avatar
    image: avatarList[avatarList.length * Math.random() << 0],
    name: 'User' + index.toString(10),
  },
}));
