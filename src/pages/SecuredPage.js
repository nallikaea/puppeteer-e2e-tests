import BasePage from './BasePage';
import selectors from '../selectors/logout.json';
import loginSelectors from '../selectors/login.json';

export default class SecuredPage extends BasePage {

    async logout() {
        await this.page.click(selectors.logoutLink);
        await this.page.waitFor(loginSelectors.username);
    }

}
