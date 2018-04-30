import { until } from 'selenium-webdriver';
import { driver, defaultTimeout } from '../helpers';

const rootSelector = {css: '#root'};
const serverUrl = process.env.CLIENT_SERVER_URL;

export const root = () => driver.findElement(rootSelector);

export const load = async () => {
  await driver.get(`${serverUrl}/`);
  await driver.wait(until.elementLocated(root), defaultTimeout);
};
