import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
import launchPuppeteer from '../utils/launchPuppeteer';

describe('JavaScript alerts test', () => {
    let browser;
    let navMenu;
    let jsAlert;
    let page;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });
        navMenu = new NavigationMenu(page);
    });

    beforeEach(async () => {
        await navMenu.loadNavigationMenu();
        jsAlert = await navMenu.loadJavaScriptAlertsPage();
    });

    after(async () => {
        await browser.close();
    });

    it('JavaScript alert test', async () => {
        // Alert handling code handled in dialog event.
        page.on('dialog', async (dialog) => {
            expect(await dialog.message()).to.be.equal('I am a JS Alert');
            await dialog.accept();
        });
        expect(await jsAlert.getPageHeader()).to.be.equal('JavaScript Alerts');
        await jsAlert.clickJSAlertButton();
        expect(await jsAlert.getResult()).to.be.equal('You successfuly clicked an alert');
    });
});
