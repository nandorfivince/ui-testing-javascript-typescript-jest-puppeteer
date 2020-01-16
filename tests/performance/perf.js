// https://michaljanaszek.com/blog/test-website-performance-with-puppeteer
// https://github.com/Everettss/test-website-performance-with-puppeteer
// https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#record
// https://stackoverflow.com/questions/47316649/can-i-programatically-get-chrome-devtools-performance-information
// https://github.com/paulirish/automated-chrome-profiling/blob/master/readme.md#timeline-recording-example
// https://github.com/xtermjs/chrome-timeline
// https://www.npmjs.com/package/devtools-timeline-model

const timeline = require('chrome-timeline').timeline
const puppeteer = require('puppeteer')
const helpers = require('../../lib/helpers')

console.log(">>> 0")
timeline(async (runner) => {

    let browser
    let page

    browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        timeout: 10000,
    })

    page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setViewport({
            width: 800,
            height: 600,
    })

    // load something in chromium
    console.log(">>> 1")
    await page.goto('http://localhost:8081/')
    console.log(">>> 2")
    // start a timeline profiling
    await runner.tracingStart('TRACE_ABC')
    console.log(">>> 3")
    console.log(">>> runner: ", runner.remote)
    // do something in the remote page
    await runner.remote((done, window) => {
    //     console.log(">>> 4")
    // // this is within remote browser context
    // // call done when finished (sync variant)
    // // done()
    // // or async example with setTimeout
    // // setTimeout(done, 10000)
    })
    // stop the profiling
    await runner.tracingStop()
    await browser.close()
})