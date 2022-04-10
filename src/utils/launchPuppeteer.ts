import * as puppeteer from 'puppeteer';

const defaultOptions = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
    ],
};

export default async (options = undefined) => {
    const puppeterOptions = (options === undefined) ? defaultOptions : options;
    return await puppeteer.launch(puppeterOptions);
};
