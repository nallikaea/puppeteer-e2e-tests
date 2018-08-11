import * as puppeteer from 'puppeteer';
import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
const messages = require('../config/messages.json');
const username:string = 'tomsmith';
const password:string = 'SuperSecretPassword!';

describe('Test', () => {

    let browser;
    let page;
    let loginPage;

    before(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        const navMenu = new NavigationMenu(page);
        await navMenu.loadNavigationMenu();
        console.log(await navMenu.getNumberOfLinks());
        loginPage = await navMenu.loadFormAuthenticationPage();
    });

    after(async () => {
        await browser.close();
    });

    it('Login test', async () => {
        expect(await loginPage.getPageHeader()).to.equal('Login Page');
        expect(await loginPage.getPageSubHeader()).to.equal(messages.loginSubheader);
        expect(await loginPage.getFooterText()).to.equal(messages.poweredByMessage);

        const securedPage = await loginPage.login(username, password);
        expect(await securedPage.getPageMessage()).to.equal('You logged into a secure area!');
        expect(await securedPage.getPageHeader()).to.equal('Secure Area');
        expect(await securedPage.getFooterText()).to.equal(messages.poweredByMessage);
        await securedPage.logout();

        expect(await loginPage.getPageMessage()).to.equal('You logged out of the secure area!');
        expect(await loginPage.getPageHeader()).to.not.equal('Secure Area');
    });
});
