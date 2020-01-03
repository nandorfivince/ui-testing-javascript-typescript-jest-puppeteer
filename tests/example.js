const puppeteer = require('puppeteer')
const expect = require('chai')

describe('My first puppeteer test', () => {
    let browser // give a browser instance
    let page // gives methods interacts with browser

    before(async function(){
        browser = await puppeteer.launch({
            headless: true,
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
        // expect(url).to.contain("dev")
        // expect(title).to.contain("Community")
    })

    it('browser reload', async () => {
        await page.reload()
        await page.waitForSelector('#page-content')
        const url = await page.url()
        const title = await page.title()
        // expect(url).to.contain("dev")
        // expect(title).to.contain("Community")
    })

    it('click method', async () => {
        await page.goto("https://dev.to/")
        await page.waitForSelector("#write-link")
        await page.click("#write-link", { // click funtion with options
            button: "left",
            clickCount: 2,
            delay: 100
        })
        await page.waitForSelector(".registration-rainbow")
    })

    it('submit into searchbox', async () => {
        await page.goto("https://dev.to/")
        await page.waitForSelector("#nav-search")
        await page.type("#nav-search", "javascript")
        await page.keyboard.press("Enter")
    })

})