// https://michaljanaszek.com/blog/test-website-performance-with-puppeteer
// https://github.com/Everettss/test-website-performance-with-puppeteer
// https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#record
// https://stackoverflow.com/questions/47316649/can-i-programatically-get-chrome-devtools-performance-information
// https://github.com/paulirish/automated-chrome-profiling/blob/master/readme.md#timeline-recording-example
// https://github.com/xtermjs/chrome-timeline
// https://www.npmjs.com/package/devtools-timeline-model

const timeline = require('chrome-timeline').timeline
const puppeteer = require('puppeteer')

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