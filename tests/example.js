const puppeteer = require('puppeteer')
const expect = require('chai')

describe('My first puppeteer test', () => {
    let browser // give a browser instance
    let page // gives methods interacts with browser

    before(async function(){
        browser = await puppeteer.launch({
            headless: false,
            sloMo: 0, // delay between each puppeteer actions
            devtools: false,
            timeout: 1000,
        })
        page = await browser.newPage()
        await page.setViewport({
            width: 800,
            height: 600,
        })
    })

    after(async function() {
        await browser.close()
    })


    it('My first test step', async ()=> {
        await page.goto("https://dev.to/")
        await page.waitForSelector("#nav-search")

        const url = await page.url()
        const title = await page.title()

        await page.waitFor(3000) // only for debug purpose

        expect(url).to.contain('dev')
        expect(title).contain('Community')

    })
})