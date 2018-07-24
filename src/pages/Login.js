import BasePage from './BasePage';
import selectors from '../selectors/login.json';

export default class Login extends BasePage {

    get username() {
        return Promise.resolve(this.page.$(selectors.username));
    }

    get password() {
        return Promise.resolve(this.page.$(selectors.password));
    }

    get submitButton() {
        return Promise.resolve(this.page.$(selectors.loginButton));
    }

    async enterUsername(username) {
        const un = await this.username; 
        await un.focus();
        await un.type(username);
    }

    async enterPassword(password) {
        const passwordElement = await this.password;
        await passwordElement.focus();
        await passwordElement.type(password);
    }

    async submitLoginForm() {
        await this.submitButton.then(e => e.click());
        await this.page.waitForNavigation();
    }
}
