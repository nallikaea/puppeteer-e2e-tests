import BasePage from './BasePage';
import SecuredPage from './SecuredPage';
import { ElementHandle } from '../../node_modules/@types/puppeteer';
const selectors = require('../selectors/login.json');
const presenceLocators = require('../selectors/screenPresenceLocators.json');

export default class Login extends BasePage {

    get username() : Promise<ElementHandle> {
        return Promise.resolve(this.page.$(selectors.username));
    }

    get password() : Promise<ElementHandle> {
        return Promise.resolve(this.page.$(selectors.password));
    }

    get submitButton() : Promise<ElementHandle> {
        return Promise.resolve(this.page.$(selectors.loginButton));
    }

    async enterUsername(username) : Promise<void> {
        const un = await this.username;
        await un.focus();
        await un.type(username);
    }

    async enterPassword(password) : Promise<void> {
        const passwordElement = await this.password;
        await passwordElement.focus();
        await passwordElement.type(password);
    }

    async submitLoginForm() : Promise<SecuredPage> {
        await this.submitButton.then(e => e.click());
        // await this.page.waitForNavigation();
        await this.page.waitForSelector(presenceLocators.securedPage, { visible: true });
        return new SecuredPage(this.page);
    }

    async login(username, password) : Promise<SecuredPage> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        return await this.submitLoginForm();
    }
}
