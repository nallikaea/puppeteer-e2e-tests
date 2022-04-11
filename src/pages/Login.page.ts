import BasePage from './Base.page';
import { Logger } from '../utils/Logger';

export class LoginPage extends BasePage {

    private logger: Logger = new Logger('Login Page');
    public page: any;

    constructor(page) {
        super(page);
    }

    private readonly loginSelector: string = '.login';
    private readonly inputEmailSelector: string = 'body #email';
    private readonly inputPasswordSelector: string = 'body #passwd';
    private readonly signInButtonSelector: string = 'body #SubmitLogin';
    private readonly accountSelector: string = '.account';
    private readonly welcomeMessageSelector: string = '.info-account';
    private readonly logOutButtonSelector: string = '.logout';

    get buttonLogin() {
        return this.page.$(this.loginSelector);
    }

    get inputEmail() {
        return this.page.$(this.inputEmailSelector);
    }

    get inputPassword() {
        return this.page.$(this.inputPasswordSelector);
    }

    get buttonSignIn() {
        return this.page.$(this.signInButtonSelector);
    }

    async getUserLoggedIn() {
        const res = await this.page.$(this.accountSelector);
        return await this.page.evaluate(e => e.textContent, res);
    }

    async getWelcomeMessage(): Promise<string> {
        const res = await this.page.$(this.welcomeMessageSelector);
        return await this.page.evaluate(e => e.textContent, res);
    }

    get buttonLogout() {
        return this.page.$(this.logOutButtonSelector);
    }

    public async enterUsername(username: string): Promise<void> {
        const un = await this.inputEmail;
        await un.focus();
        await un.type(username);
    }

    public async enterPassword(password: string): Promise<void> {
        const passwordElement = await this.inputPassword;
        await passwordElement.focus();
        await passwordElement.type(password);
    }

    async login(email: string, password: string) {
        try {
            await this.buttonLogin.then(e => e.click());
        } catch (err) {
            this.logger.info('The user is already logged in, start to logout');
            await this.buttonLogout.then(e => e.click());
            this.logger.info('Success');
            await this.buttonLogin.then(e => e.click());
        }
        await this.page.waitForSelector(this.inputEmailSelector);
        await this.enterUsername(email);
        await this.enterPassword(password);
        await this.buttonSignIn.then(e => e.click());
        await this.page.waitForSelector(this.welcomeMessageSelector);
        this.logger.info('Login success');

    }
}
