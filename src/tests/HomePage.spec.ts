import { HomePage } from '../pages/Home.page';
import launchPuppeteer from '../utils/launchPuppeteer';
import { Logger } from '../utils/Logger';
import { expect } from 'chai';

describe('Home page tests', () => {
    const logger: Logger = new Logger('Home Spec');
    let browser;
    let page;
    let homePage: HomePage;
    let screenNumber: number = 0;

    before(async () => {
        logger.info('Launch puppeteer');
        browser = await launchPuppeteer();
        page = await browser.newPage();
        homePage = new HomePage(page);
        await homePage.loadHomePage();
        logger.info('Browser opened');
    });

    after(async () => {
        logger.info('Spec is done');
        await browser.close();
    });

    afterEach('Screen', async () => {
        await page.screenshot({
            path: `./screens/homepage${screenNumber}.png`,
            fullPage: true,
        });
        screenNumber += 1;
    });

    it('C1 Main page elements is present.', () => {
        for (const e of homePage.mainPageElements) {
            expect(e).to.exist;
        }
    });
});
