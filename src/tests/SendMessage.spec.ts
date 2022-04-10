import { SystemMessages } from '../data/constants/SystemMessages';
import launchPuppeteer from '../utils/launchPuppeteer';
import { Logger } from '../utils/Logger';
import { expect } from 'chai';
import { ContactPage } from '../pages/Contact.page';
import { SystemLabels } from '../data/constants/SystemLabels';
import * as login from '../data/Login.json';

describe('Send message to customer service.', () => {
    const logger: Logger = new Logger('Contact Spec');
    let browser;
    let page;
    let contactPage: ContactPage;
    let screenNumber: number = 0;

    before(async () => {
        logger.info('Launch puppeteer');
        browser = await launchPuppeteer();
        page = await browser.newPage();
        logger.info('Browser opened');
        contactPage = new ContactPage(page);
        await contactPage.loadHomePage();
        await contactPage.goToContactPage();
        logger.info('Contact page opened');
    });

    after(async () => {
        logger.info('Spec is done');
        await browser.close();
    });

    afterEach('Screen', async () => {
        await page.screenshot({
            path: `./screens/contactpage${screenNumber}.png`,
            fullPage: true,
        });
        screenNumber += 1;
    });

    it('C5 Displays a message in heading page.', async () => {
        expect(await contactPage.getHeading()).contains(SystemLabels.CUSTOMER_SERVICE);
    });

    it('C6 Displays successfully after user sends message to customer service.', async () => {
        await contactPage.sendMessage({
            username: login.user.login,
            subject: '2',
            message: 'My first test.',
            file: 'file.pdf',
        });
        expect(await contactPage.getSuccessMessage()).contains(SystemMessages.FEEDBACK_MESSAGE_SENT);
    });
});
