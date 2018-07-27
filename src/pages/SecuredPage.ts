import BasePage from './BasePage';
const selectors = require('../selectors/logout.json');
const loginSelectors = require('../selectors/login.json');

export default class SecuredPage extends BasePage {

    async logout() : Promise<void> {
        await this.page.click(selectors.logoutLink);
        await this.page.waitFor(loginSelectors.username);
    }

}
