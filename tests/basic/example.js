const puppeteer = require('puppeteer')
const assert = require('chai').assert

const config = require('../../lib/config')
const untils = require('../../lib/utils')
const helpers = require('../../lib/helpers')

describe('My first puppeteer test', () => {
    let browser // give a browser instance
    let page // gives methods interacts with browser

    before(async function(){
        browser = await puppeteer.launch({
            // headless: config.isHeadless,
            headless: true,
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
        await helpers.loadUrl(page, config.baseUrl)
        await helpers.shouldExsist(page, '//*[@id="nav-search"]')
        const url = await page.url()
        const title = await page.title()
        assert.equal(url, "https://dev.to/", "Nooo No")
        assert.include(title, "DEV Community")
    })

    it('browser reload', async () => {
        await page.reload()
        await helpers.shouldExsist(page, '//*[@id="articles-list"]')
        const element = await page.$("#write-link")
        const text = await page.evaluate(element => element.textContent, element)
        console.log(">>> : " + text)
        assert.equal(text, "WRITE A POST", "bla")
        const url = await page.url()
        const title = await page.title()
        assert.equal(url, "https://dev.to/", "Nooo No")
        assert.include(title, "DEV Community")
    })

    it('click method', async () => {
        await helpers.loadUrl(page, config.baseUrl)
        // await page.click("#write-link", { // click funtion with options
        //     button: "left",
        //     clickCount: 2,
        //     delay: 100
        // })
        await helpers.click(page, '#write-link')
        await helpers.shouldExsist(page, '//*[@id="page-content-inner"]/div/div[1]/div')
    })

    it('submit into searchbox', async () => {
        await helpers.loadUrl(page, config.baseUrl)
        await helpers.typeText(page, untils.generateNumbers(), "#nav-search")
        await page.waitFor(3000)
        await helpers.pressKey(page, "Enter")
        await page.waitForXPath('//*[@id="articles-list"]')
    })

    it('measure navigation performance', async () => {
        // https://michaljanaszek.com/blog/test-website-performance-with-puppeteer
        await helpers.loadUrl(page, config.baseUrl)
        const performanceTiming = JSON.parse(
            await page.evaluate(() => JSON.stringify(window.performance.timing))
          );
          console.log(performanceTiming);
    })

})