import Login from './Login';
import config from '../config/config.json';
import selectors from '../selectors/navMenu.json';

const baseURL = config.baseURL;

export default class NavigationMenu {

    constructor(page) {
        this.page = page;
    }    

    async loadNavigationMenu() {
        await this.page.goto(baseURL);
        await this.page.waitFor(selectors.defaultPresenceLocator);
    }

    async loadFormAuthenticationPage() {
        const url = `${baseURL}${config.login}`;
        const response = await this.page.goto(url);
        return new Login(this.page, response);
    }

    async getNumberOfLinks() {
        /*
        Do not chain the commands togther, otherwise an empty set will be returned,
        e.g. await this.page.$$(selectors.navLinks).length returns [0]
        while the below code returns an integer greater than zero.
        */
        return await this.page.$$(selectors.navLinks).then(e => e.length);
    }
}
