import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
import launchPuppeteer from '../utils/launchPuppeteer';

describe('Broken images test:', () => {
    let browser;
    let page;
    let navMenu;
    let brokenImagesPage;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });
        navMenu = new NavigationMenu(page);
    });

    beforeEach(async () => {
        brokenImagesPage = await navMenu.loadBrokenImagesPage();
    });

    after(async () => {
        await browser.close();
    });

    it('Assert first image is broken', async () => {
        const status = await brokenImagesPage.getImageStatusCode(0);
        expect(status).to.be.equal(404);
    });

    it('Assert second image is broken', async () => {
        const status = await brokenImagesPage.getImageStatusCode(1);
        expect(status).to.be.equal(404);
    });

    it('Assert third image is not broken', async () => {
        const status = await brokenImagesPage.getImageStatusCode(2);
        expect(status).to.be.equal(200);
    });
});
