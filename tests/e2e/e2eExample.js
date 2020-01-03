const puppeteer = require('puppeteer')
const expect = require('chai')
const config = require('../../lib/config')
const helpers = require('../../lib/helpers')
const untils = require('../../lib/utils')

let browser
let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            sloMo: config.slowMo,
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

describe('Login Test', () => {
    const LOGIN_FORM = "#login_form"

    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, '#online_banking_features')
    })

    it('should click on signin button', async () => {
        await helpers.click(page, '#signin_button')
        await helpers.shouldExist(page, LOGIN_FORM)
    })

    it('should submit login form', async () => {
        await helpers.typeText(page, untils.generateID(), '#user_login')
        await helpers.typeText(page, untils.generateID(), '#user_password')
        await helpers.click(page, '.btn-primary')
    })

    it('should get error message', async () => {
        await helpers.waitForText(page, '#login_form > div.alert.alert-error', 'Login and/or password are wrong')
        await helpers.shouldExist(page, LOGIN_FORM)
    })
})

describe('Search Test', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, '#online_banking_features')
    })

    it('should submit search phrase ', async () => {
        await helpers.typeText(page, "hello world", '#searchTerm')
        await helpers.pressKey(page, "Enter")
    })

    it('should display search results', async () => {
        await helpers.waitForText(page, 'h2', 'Search Results')
        await helpers.waitForText(page, 'body', 'No results were found for the query')
    })
})

describe('Navbar Links Test', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, '#online_banking_features')
    })

    it('should have correct number of links', async () => {
        const numberOfLinks = await helpers.getCount("#pages-nav > li")
        expect(numberOfLinks).to.equal(3)
    })
})

describe('Navbar Links Test', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, '#online_banking_features')
    })

    // it('', async () => {
    //     await 
    // })

    // it('', async () => {
    //     await 
    // })

    // it('', async () => {
    //     await 
    // })
})