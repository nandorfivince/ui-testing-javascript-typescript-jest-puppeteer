const puppeteer = require('puppeteer')
const assert = require('chai').assert

const config = require('../../lib/config')
const untils = require('../../lib/utils')
const helpers = require('../../lib/helpers')

const timeline = require('chrome-timeline').timeline


describe('My first puppeteer test', () => {
    let browser // give a browser instance
    let page // gives methods interacts with browser

    before(async function(){
        browser = await puppeteer.launch({
            // headless: config.isHeadless,
            headless: false,
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


    // it('My first test step', async ()=> {
    //     await helpers.loadUrl(page, config.baseUrl)
    //     await helpers.shouldExist(page, '//*[@id="nav-search"]')
    //     const url = await page.url()
    //     const title = await page.title()
    //     assert.equal(url, "https://dev.to/", "Nooo No")
    //     assert.include(title, "DEV Community")
    // })
    // 
    // it('browser reload', async () => {
    //     await page.reload()
    //     await helpers.shouldExist(page, '//*[@id="articles-list"]')
    //     const element = await page.$("#write-link")
    //     const text = await page.evaluate(element => element.textContent, element)
    //     assert.equal(text, "WRITE A POST", "bla")
    //     const url = await page.url()
    //     const title = await page.title()
    //     assert.equal(url, "https://dev.to/", "Nooo No")
    //     assert.include(title, "DEV Community")
    // })
    //
    // it('click method', async () => {
    //     await helpers.loadUrl(page, config.baseUrl)
    //     // await page.click("#write-link", { // click funtion with options
    //     //     button: "left",
    //     //     clickCount: 2,
    //     //     delay: 100
    //     // })
    //     await helpers.click(page, '#write-link')
    //     await helpers.shouldExist(page, '//*[@id="page-content-inner"]/div/div[1]/div')
    // })
    //
    // it('submit into searchbox', async () => {
    //     await helpers.loadUrl(page, config.baseUrl)
    //     await helpers.typeText(page, untils.generateNumbers(), "#nav-search")
    //     await page.waitFor(3000)
    //     await helpers.pressKey(page, "Enter")
    //     await page.waitForXPath('//*[@id="articles-list"]')
    // })
    //
    // it('measure navigation performance', async () => {
    //     // https://michaljanaszek.com/blog/test-website-performance-with-puppeteer
    //     // https://github.com/Everettss/test-website-performance-with-puppeteer
    //     // https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#record
    //     // https://stackoverflow.com/questions/47316649/can-i-programatically-get-chrome-devtools-performance-information
    //     // https://github.com/paulirish/automated-chrome-profiling/blob/master/readme.md#timeline-recording-example
    //     // https://github.com/xtermjs/chrome-timeline
    //     // https://www.npmjs.com/package/devtools-timeline-model
    //
    //     // await helpers.loadUrl(page, "https://marvinng-demo.chemaxon.com/master/")
    //
    //     await page.goto("http://localhost:8081/")
    //     await page.waitFor(1000)
    //     // const performanceTiming = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.timing)))
    //     // console.log(performanceTiming)
    //     // await page.waitFor(1000)
    //
    //     await helpers.typeText(page, "oxytocin", "#marvin-0-frame > div:nth-child(2) > div > div:nth-child(2) > div > input")
    //     await helpers.pressKey(page, "Enter")
    //
    //     const performanceTiming = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.timing)))
    //     console.log(performanceTiming)
    //     await page.waitFor(1000)
    //
    // })
    
    it('measure navigation performance', async () => {
        timeline(async (runner) => {
                // load something in chromium
                await runner.page.goto('http://localhost:8081/')
                // start a timeline profiling
                await runner.tracingStart('TRACE_ABC')
                // do something in the remote page
                await runner.remote((done, window) => {
                // this is within remote browser context
                // await helpers.typeText(page, "oxytocin", "#marvin-0-frame > div:nth-child(2) > div > div:nth-child(2) > div > input")
                // await helpers.pressKey(page, "Enter")
                // call done when finished (sync variant)
                done()
                // or async example with setTimeout
                setTimeout(done, 10000)
            })
            // stop the profiling
            await runner.tracingStop()
        })
    })


})