import { LoginPage } from '../pages/Login.page';
import { SystemMessages } from '../data/constants/SystemMessages';
import * as login from '../data/Login.json';
import launchPuppeteer from '../utils/launchPuppeteer';
import { Logger } from '../utils/Logger';
import { expect } from 'chai';

describe('Authentication page', () => {
    const logger: Logger = new Logger('Login Spec');
    let browser;
    let page;
    let loginPage: LoginPage;
    let screenNumber: number = 0;

    before(async () => {
        logger.info('Launch puppeteer');
        browser = await launchPuppeteer();
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        await loginPage.loadHomePage();
        logger.info('Browser opened');
    });

    after(async () => {
        logger.info('Spec is done');
        await browser.close();
    });

    afterEach('Screen', async () => {
        await page.screenshot({
            path: `./screens/loginpage${screenNumber}.png`,
            fullPage: true,
        });
        screenNumber += 1;
    });

    it('C2 Displays login message successfully.', async () => {
        await loginPage.login(login.user.login, login.user.password);
        expect(await loginPage.getWelcomeMessage()).to.be.equal(SystemMessages.FEEDBACK_USER_LOGGED);
    });

    it('C3 Displays user name on the page.', async () => {
        expect(await loginPage.getUserLoggedIn()).contains(login.user.name);
    });
});
