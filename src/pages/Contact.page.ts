import BasePage from './Base.page';
import { Logger } from '../utils/Logger';

export class ContactPage extends BasePage {

    private logger: Logger = new Logger('Contact Page');
    public page: any;

    constructor(page) {
        super(page);
    }

    private readonly contactLinkSelector: string = 'body #contact-link';
    private readonly headingSelector: string = '.page-heading.bottom-indent';
    private readonly subjectContactSelector: string = 'body #id_contact';
    private readonly messageSelector: string = 'body #message';
    private readonly submitButtonSelector: string = 'body #submitMessage';
    private readonly successMessageSelector: string = '.alert.alert-success';
    private readonly uploadFileSelector: string = 'body #fileUpload';
    private readonly inputEmailSelector: string = 'body #email';

    get contactLink() {
        return this.page.$(this.contactLinkSelector);
    }

    async getHeading() {
        const res = await this.page.$(this.headingSelector);
        return await this.page.evaluate(e => e.textContent, res);
    }

    get subjectContact() {
        return this.page.$(this.subjectContactSelector);
    }

    get message() {
        return this.page.$(this.messageSelector);
    }

    get buttonSubmitMessage() {
        return this.page.$(this.submitButtonSelector);
    }

    async getSuccessMessage() {
        const res = await this.page.$(this.successMessageSelector);
        return await this.page.evaluate(e => e.textContent, res);
    }

    get inputFile() {
        return this.page.$(this.uploadFileSelector);
    }

    async goToContactPage() {
        await this.contactLink.then(e => e.click());
        await this.page.waitForSelector(this.headingSelector);
    }

    get inputEmail() {
        return this.page.$(this.inputEmailSelector);
    }

    async sendMessage(content: { subject: string; message: string; file?: string, username: string }) {
        this.logger.info('Type message to send');
        await this.page.waitForSelector(this.messageSelector);
        if (content.file) {
            const f = await this.inputFile;
            await f.focus();
            await f.type(`${process.cwd()}/files-to-upload/${content.file}`);
        }

        const ms = await this.message;
        await ms.focus();
        await ms.type(content.message);
        const un = await this.inputEmail;
        await un.focus();
        await un.type(content.username);
        await this.page.select(this.subjectContactSelector, content.subject);
        await this.buttonSubmitMessage.then(e => e.click());
        this.logger.info('Sent!');
        await this.page.waitForSelector(this.successMessageSelector);
    }
}
