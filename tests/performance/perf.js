// https://michaljanaszek.com/blog/test-website-performance-with-puppeteer
// https://github.com/Everettss/test-website-performance-with-puppeteer
// https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#record
// https://stackoverflow.com/questions/47316649/can-i-programatically-get-chrome-devtools-performance-information
// https://github.com/paulirish/automated-chrome-profiling/blob/master/readme.md#timeline-recording-example
// https://github.com/xtermjs/chrome-timeline
// https://www.npmjs.com/package/devtools-timeline-model
// https://github.com/paulirish/automated-chrome-profiling/blob/master/get-timeline-trace.js
// https://stackoverflow.com/questions/35576174/chrome-developer-toolstimeline-calculating-aggregated-time-from-json-trace-fil
// https://groups.google.com/forum/#!topic/google-chrome-developer-tools/Xl_n9Gj1gH4
// https://medium.com/@aslushnikov/automating-clicks-in-chromium-a50e7f01d3fb

// const timeline = require('chrome-timeline').timeline
// const puppeteer = require('puppeteer')
// const helpers = require('../../lib/helpers')

// console.log(">>> 0")
// timeline(async (runner) => {

//     let browser
//     let page

//     browser = await puppeteer.launch({
//         headless: false,
//         devtools: false,
//         timeout: 10000,
//     })

//     page = await browser.newPage()
//         await page.setDefaultTimeout(10000)
//         await page.setViewport({
//             width: 800,
//             height: 600,
//     })

//     // load something in chromium
//     console.log(">>> 1")
//     await page.goto('http://localhost:8081/')
//     console.log(">>> 2")
//     // start a timeline profiling
//     await runner.tracingStart('TRACE_ABC')
//     console.log(">>> 3")
//     console.log(">>> runner: ", runner.remote)
//     // do something in the remote page
//     await runner.remote((done, window) => {
//         console.log(">>> 4")
//     // // this is within remote browser context
//     // // call done when finished (sync variant)
//     done()
//     // // or async example with setTimeout
//     setTimeout(done, 10000)
//     })
//     // stop the profiling
//     await runner.tracingStop()
//     await browser.close()
// })



// valami( async ()=> {
//     const page = await browser.newPage();
//     const devtoolsProtocolClient = await page.target().createCDPSession();
//     await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true });
//     await page.goto('https://example.org/');
// })

// async function collectCoverage() {
//     const browser = await puppeteer.launch({ headless: false });
    
//     const collectPromises = EVENTS.map(async event => {
//       const page = await browser.newPage();
//       const har = new PuppeteerHar(page);
//       await page.emulate(iPhone);
//       await har.start({ path: "results.har" }); // Har file
//       await page.tracing.start({ screenshots: true, path: "trace.json" });
  
//       page.on("response", async response => {
//       });
  
//       await Promise.all([
//         page.coverage.startJSCoverage(),
//         page.coverage.startCSSCoverage()
//       ]);
  
//       await page.goto('https://example.org/', { waitUntil: event });
      
//       await har.stop();
//       await page.tracing.stop();
  
//       const [jsCoverage, cssCoverage] = await Promise.all([
//         page.coverage.stopJSCoverage(),
//         page.coverage.stopCSSCoverage()
//       ]);
  
//       addUsage(cssCoverage, "css", event);
//       addUsage(jsCoverage, "js", event);
  
//       await page.close();
//     });
  
//     await Promise.all(collectPromises);
  
//     return browser.close();
//   }
// async function dragAndDrop(page, originSelector, destinationSelector) {
// const example = await page.$('#INNER_BOUNDING_RECT-706F');
        // const bounding_box = await example.boundingBox();
        // await page.mouse.move(bounding_box.x + bounding_box.width / 2, bounding_box.y + bounding_box.height / 2);
        // await page.mouse.down();
        // await page.mouse.move(126, 19);
        // await page.mouse.up();
//     // await page.waitFor(originSelector)
//     // await page.waitFor(destinationSelector)
//     // const origin = await page.$(originSelector)
//     // const destination = await page.$(destinationSelector)
//     // const ob = await origin.boundingBox()
//     // const db = await destination.boundingBox()
  
//     // console.log(`Dragging from ${ob.x + ob.width / 2}, ${ob.y + ob.height / 2}`)
//     // await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2)
//     // await page.mouse.down()
//     // console.log(`Dropping at   ${db.x + db.width / 2}, ${db.y + db.height / 2}`)
//     // await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2)
//     // await page.mouse.up()
//   }

const puppeteer = require('puppeteer')
const helpers = require('../../lib/helpers')
const config = require('../../lib/config')
const fs = require('fs')
const Tracium = require('tracium')

before(async function(){
    browser = await puppeteer.launch({
        headless: false,
        sloMo: 10,
        devtools: false,
        timeout: 5000,
    })
    page = await browser.newPage()
    await page.setDefaultTimeout(5000)
    await page.setViewport({width: 1024,height: 768,})
})

describe('Puppeteer performance', () => {

    it('get elements from canvas', async ()=> {
        
        await page.goto('http://localhost:8081/')

        // await helpers.typeText(page, "", "")
        // await helpers.pressKey(page, "")
        await page.waitFor(1000)

        // const element = page.evaluate(() => document.getElementById(''));

        

        // for (let i = 0; i < 1; i++) {
        //     console.log(i);
        //     helpers.click(page, '')
        //     await helpers.typeText(page, "", "")
        //     await helpers.pressKey(page, "Enter")
        //     await page.waitFor(500)
        // }

        helpers.click(page, '#tool-icon-select')
        await page.waitFor(1000)
        await page.click('')
        await page.waitFor(1000)

        await page.mouse.move(400, 400);
        await page.waitFor(1000)
        await page.mouse.down({button: 'left'});
        await page.waitFor(1000)
        await page.mouse.move(410, 410);
        await page.waitFor(1000)
        await page.mouse.up({button: 'left'});
        await page.waitFor(1000)

        // const elementHandle = await page.$('');

        // console.log(">>> :" + elementHandle)


        await page.waitFor(2000)

        // console.log(">>> :" + element)
        await browser.close()
    })


    // it('put down   onto canvas', async ()=> {
    //     const browser = await puppeteer.launch({headless: false, timeout: 10000,})
    //     const page = await browser.newPage()

    //     // DO SOMETHING TO BE MEASURED
    //     await page.goto('http://localhost:8081/')

    //     for (let i = 0; i < 9; i++) {
    //         console.log(i);
    //         await helpers.typeText(page, "", """)
    //         await helpers.pressKey(page, "")
    //         await page.waitFor(1000)
    //      }
        
    //     await browser.close()
    // })

    // it('test', async ()=> {
    //     const browser = await puppeteer.launch({headless: true, timeout: 10000,})
    //     const page = await browser.newPage()

    //     // START TRACE
    //     await page.tracing.start({path: 'trace.json'}) //categories: ['devtools.timeline']

    //     // DO SOMETHING TO BE MEASURED
    //     await page.goto('http://localhost:8081/')
    //     await helpers.typeText(page, "", "")
    //     await helpers.pressKey(page, "")
        
    //     // STOP TRACE
    //     const stories = await page.$$eval('a.storylink', anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
    //     console.log(stories)
    //     await page.tracing.stop()

    //     await browser.close()
    // })

    // it('parse', async ()=> {
    //     // PARSE TRACE.JSON
    //     const traceJSON = JSON.parse(fs.readFileSync('./trace.json', 'utf8'))
    //     // console.log(traceJSON)
    //     const tasks = Tracium.computeMainThreadTasks(traceJSON, {flatten: true,});
    //     // console.log(">>> " + tasks)
    //     let totalScriptTime = 0;
    //     for (const task of tasks) {
    //     if (task.kind === 'scriptEvaluation' || task.kind === 'scriptParseCompile')
    //         totalScriptTime += task.selfTime;
    //     }
    //     console.log(`Total javascript time: ${Math.round(totalScriptTime*100)/100}ms`);
    // })

})








