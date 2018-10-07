import Login from './Login';
import Checkboxes from './Checkboxes';
import HoversPage from './HoversPage';

const config = require('../config/config.json');
const selectors = require('../selectors/navMenu.json');

const baseURL = config.baseURL;

export default class NavigationMenu {
    page: any;
    constructor(page) {
        this.page = page;
    }

    private async gotoPage(path) {
        await this.page.goto(`${baseURL}${path}`);
    }

    async loadNavigationMenu() : Promise<void> {
        await this.page.goto(baseURL);
        await this.page.waitFor(selectors.defaultPresenceLocator);
    }

    public loadFormAuthenticationPage() : Promise<Login> {
        return this.gotoPage(config.login).then(() => new Login(this.page));
    }

    public async getNumberOfLinks() : Promise<number> {
        /*
        Do not chain the commands togther, otherwise an empty set will be returned,
        e.g. await this.page.$$(selectors.navLinks).length returns [0]
        while the below code returns an integer greater than zero.
        */
        return await this.page.$$(selectors.navLinks).then(e => e.length);
    }

    async loadCheckboxesPage() : Promise<Checkboxes> {
        return this.gotoPage(config.checkboxes).then(() => new Checkboxes(this.page));
    }

    async loadHoversPage() : Promise<HoversPage> {
        return this.gotoPage(config.hovers).then(() => new HoversPage(this.page));
    }
}
