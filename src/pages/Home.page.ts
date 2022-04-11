import BasePage from './Base.page';
import { Logger } from '../utils/Logger';

export class HomePage extends BasePage {

    private logger: Logger = new Logger('Home Page');
    public page: any;

    constructor(page) {
        super(page);
    }

    private readonly logoSelector: string = 'img.logo.img-responsive';
    private readonly cartSelector: string = '.shopping_cart > a';

    get logoSite() {
        return this.page.$(this.logoSelector);
    }

    get cart() {
        return this.page.$(this.cartSelector);
    }

    get mainPageElements() {
        return [this.logoSite, this.cart];
    }
}
