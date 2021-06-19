import Login from './Login';
import Checkboxes from './Checkboxes';
import HoversPage from './HoversPage';
import JavaScriptAlerts from './JavaScriptAlerts';
import KeyPresses from './KeyPresses';
import BrokenImages from './BrokenImages';
import { HTTPResponse } from 'puppeteer';

const config = require('../config/config.json');
const selectors = require('../selectors/navMenu.json');

const baseURL = config.baseURL;

export default class NavigationMenu {
    page: any;
    constructor(page) {
        this.page = page;
    }

    private async gotoPage(path: string) : Promise<HTTPResponse> {
        return await this.page.goto(`${baseURL}${path}`);
    }

    public async loadNavigationMenu() : Promise<void> {
        await this.page.goto(baseURL);
        await this.page.waitFor(selectors.defaultPresenceLocator);
    }

    public async loadFormAuthenticationPage() : Promise<Login> {
        await this.gotoPage(config.login);
        return new Login(this.page);
    }

    public async getNumberOfLinks() : Promise<number> {
        /*
        Do not chain the commands togther, otherwise an empty set will be returned,
        e.g. await this.page.$$(selectors.navLinks).length returns [0]
        while the below code returns an integer greater than zero.
        */
        return await this.page.$$(selectors.navLinks).then(e => e.length);
    }

    public async loadCheckboxesPage() : Promise<Checkboxes> {
        await this.gotoPage(config.checkboxes);
        return new Checkboxes(this.page);
    }

    public async loadHoversPage() : Promise<HoversPage> {
        await this.gotoPage(config.hovers);
        return new HoversPage(this.page);
    }

    public async loadJavaScriptAlertsPage() {
        await this.gotoPage(config.javaScriptAlerts);
        return new JavaScriptAlerts(this.page);
    }

    public async loadKeyPressesPage() {
        await this.gotoPage(config.keyPresses);
        return new KeyPresses(this.page);
    }

    public async loadBrokenImagesPage() {
        await this.gotoPage(config.brokenImages);
        return new BrokenImages(this.page);
    }
}
