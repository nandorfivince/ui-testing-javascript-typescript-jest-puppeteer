const puppeteer = require('puppeteer')
const expect = require('chai')

const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText  = require('../lib/helpers').waitForText
const pressKey  = require('../lib/helpers').pressKey
const shouldExsist  = require('../lib/helpers').shouldExsist

describe('My first puppeteer test', () => {
    let browser // give a browser instance
    let page // gives methods interacts with browser

    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            sloMo: config.slowMo, // delay between each puppeteer actions
            devtools: config.isDevtools,
            timeout: config.launchTimeout,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeout)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight,
        })
    })

    after(async function() {
        await browser.close()
    })


    it('My first test step', async ()=> {
        // await page.goto("https://dev.to/")
        // await page.goto(config.baseUrl)
        await loadUrl(page, config.baseUrl)
        // await page.waitForSelector("#nav-search")
        await shouldExsist(page, "#nav-search")
        const url = await page.url()
        const title = await page.title()
        // expect(url).to.contain("dev")
        // expect(title).to.contain("Community")
    })

    it('browser reload', async () => {
        await page.reload()
        // await page.waitForSelector('#page-content')
        await shouldExsist(page, "#page-content")
        await waitForText(page, 'body', "WRITE A POST")

        const url = await page.url()
        const title = await page.title()
        // expect(url).to.contain("dev")
        // expect(title).to.contain("Community")
    })

    it('click method', async () => {
        // await page.goto("https://dev.to/")
        await loadUrl(page, config.baseUrl)
        // await page.waitForSelector("#write-link")
        // await page.click("#write-link", { // click funtion with options
        //     button: "left",
        //     clickCount: 2,
        //     delay: 100
        // })
        await click(page, "#write-link")
        // await page.waitForSelector(".registration-rainbow")
        await shouldExsist(page, ".registration-rainbow")
    })

    it('submit into searchbox', async () => {
        // await page.goto("https://dev.to/")
        await loadUrl(page, config.baseUrl)
        // await page.waitForSelector("#nav-search")
        // await page.type("#nav-search", "javascript")
        await typeText(page, "javascript", "#nav-search")
        // await page.keyboard.press("Enter")
        await pressKey(page, "Enter")
        await page.waitForXPath('//*[@id="articles-list"]')
    })

})