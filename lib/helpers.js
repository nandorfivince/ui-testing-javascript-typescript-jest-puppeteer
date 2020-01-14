module.exports = {
    
    click: async function(page, selector){
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch(error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    typeText: async function(page, text, selector){
        try{
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch(error){
            throw new Error(`Could not type text into selector: ${selector}`)
        }
    },

    loadUrl: async function(page, url) {
        await page.goto(url, {waitUntil: "networkidle0"})
    },

    getText: async function(page, selector){
        try{
            await page.waitForXPath(selector)
            return page.$eval(selector, e => e.innerHTML) // $ gives back the first count
        } catch(error){
            throw new Error(`Cannot get text from selector: ${selector}`)
        }
    },

    getCount: async function(page, selector){
        try{
            await page.waitForXPath(selector)
            return page.$$eval(selector, items => items.length) // $$ gives back all of the elements
        } catch(error){
            throw new Error(`Cannot get count of selector: ${selector}`)
        }
    },

    waitForText: async function(page, selector, text){
        try{
            await page.waitForSelector(selector)
            await page.waitForFunction(
                (selector, text) => 
                    document.querySelector(selector).innerText.inculdes(text),
                {},
                selector,
                text
            )
        } catch(error){
            throw new Error(`Text: ${text} not found for selector ${selector}`)
        }
    },

    waitForTextByXPath: async function(page, selector, text){
        try{
            await page.waitForXPath(selector)
            await page.waitForFunction(
                (selector, text) => 
                    document.querySelector(selector).innerText.inculdes(text),
                {},
                selector,
                text
            )
        } catch(error){
            throw new Error(`Text: ${text} not found for selector ${selector}`)
        }
    },

    pressKey: async function(page, key){
        try{
            await page.keyboard.press(key)
        } catch(error){
            throw new Error(`Could not press key: ${key} on the keyboard`)
        }
    },

    shouldExsist: async function(page, selector){
        try{
            // await page.waitForSelector(selector, {visible:true})
            await page.waitForXPath(selector, {visible:true})
        } catch(error){
            throw new Error(`Selector: ${selector} not exsist`)
        }
    },

    shouldNotExsist: async function(page, selector){
        try{
            await page.waitFor(() => !document.querySelector(selector))
        } catch(error){
            throw new Error(`Selector: ${selector} is visible, but should not`)
        }
    },

}