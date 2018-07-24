import BasePage from './BasePage';

export default class Logout extends BasePage {

    async logout() {
        await this.page.click('.radius > i');
        await this.page.waitForNavigation();
    }

}
