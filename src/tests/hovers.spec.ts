import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
import launchPuppeteer from '../utils/launchPuppeteer';

// TODO figure out way to loop thgrough tests async, this suite violates DNRY rule!
// it.each cannot be used because of the lack of typings file, what else is out there for TypeScript?
describe('Hovers Test', () => {
    let browser;
    let page;
    let hoversPage;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });
        const navMenu = new NavigationMenu(page);
        hoversPage = await navMenu.loadHoversPage();
    });

    after(async () => {
        await browser.close();
    });

    it('Hover over images test - user 1', async () => {
        const userNumber = 0;
        await hoversPage.hoverOverImage(userNumber);
        const username = await hoversPage.getUserName(userNumber);
        expect(username).to.equal(`user${userNumber + 1}`);
        await hoversPage.clickViewProfile(userNumber);
        await hoversPage.returnToHoversPage();
    });

    it('Hover over images test - user 2', async () => {
        const userNumber = 1;
        await hoversPage.hoverOverImage(userNumber);
        const username = await hoversPage.getUserName(userNumber);
        expect(username).to.equal(`user${userNumber + 1}`);
        await hoversPage.clickViewProfile(userNumber);
        await hoversPage.returnToHoversPage();
    });

    it('Hover over images test - user 3', async () => {
        const userNumber = 2;
        await hoversPage.hoverOverImage(userNumber);
        const username = await hoversPage.getUserName(userNumber);
        expect(username).to.equal(`user${userNumber + 1}`);
        await hoversPage.clickViewProfile(userNumber);
        await hoversPage.returnToHoversPage();
    });
});
