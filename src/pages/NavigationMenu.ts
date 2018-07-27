import Login from './Login';
const config = require('../config/config.json');
const selectors = require('../selectors/navMenu.json');

const baseURL = config.baseURL;

export default class NavigationMenu {
    page: any;
    constructor(page) {
        this.page = page;
    }

    async loadNavigationMenu() {
        await this.page.goto(baseURL);
        await this.page.waitFor(selectors.defaultPresenceLocator);
    }

    async loadFormAuthenticationPage() {
        const url = `${baseURL}${config.login}`;
        await this.page.goto(url);
        return new Login(this.page);
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
