import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
import launchPuppeteer from '../utils/launchPuppeteer';
require('it-each')();
require('it-each')({ testPerIteration: true });

describe('Hover over image test:', () => {
    let browser;
    let page;
    let navMenu;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });
        navMenu = new NavigationMenu(page);
    });

    after(async () => {
        await browser.close();
    });

    // @ts-ignore: Property 'each' does not exist on type 'ITestDefinition'.
    // it-each does not have a typing file as of July 2018.
    it.each([0, 1, 2], 'Hover over images test, user %s', ['element'], async (userNumber, next) => {
        const hoversPage = await navMenu.loadHoversPage();
        await hoversPage.hoverOverImage(userNumber);
        const username = await hoversPage.getUserName(userNumber);
        expect(username).to.equal(`user${userNumber + 1}`);
        await hoversPage.clickViewProfile(userNumber);
        await hoversPage.returnToHoversPage();
        next();
    });
});
