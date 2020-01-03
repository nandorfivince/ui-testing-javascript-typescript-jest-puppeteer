const puppeteer = require('puppeteer')
const expect = require('chai')
const config = require('../../lib/config')
const helpers = require('../../lib/helpers')
const utils = require('../../lib/utils')
const homePage = require('../../page-objects/home-page')
const loginPage = require('../../page-objects/login-page')

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

    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should click on signin button', async () => {
        await helpers.click(page, homePage.SIGN_IN_BUTTON)
        await helpers.shouldExist(page, loginPage.LOGIN_FORM)
    })

    it('should submit login form', async () => {
        await helpers.typeText(page, untils.generateID(), loginPage.USER_NAME)
        await helpers.typeText(page, untils.generateID(), loginPage.USER_PASSWORD)
        await helpers.click(page, loginPage.SUBMIT_BUTTON)
    })

    it('should get error message', async () => {
        await helpers.waitForText(page, '#login_form > div.alert.alert-error', 'Login and/or password are wrong')
        await helpers.shouldExist(page, loginPage.LOGIN_FORM)
    })
})

describe('Search Test', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should submit search phrase ', async () => {
        await helpers.typeText(page, "hello world", homePage.SEARCH_BAR)
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
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should have correct number of links', async () => {
        const numberOfLinks = await helpers.getCount("#pages-nav > li")
        expect(numberOfLinks).to.equal(3)
    })
})

describe('Navbar Links Test', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should click on feedback link', async () => {
        await helpers.click(page, homePage.LINK_FEEDBACK)
        await helpers.shouldExist(page, 'form')
    })

    it('should submit the feedback form', async () => {
        await helpers.typeText(page, 'Vince', '#name')
        await helpers.typeText(page, utils.generateEmail(), '#email')
        await helpers.typeText(page, 'Just Subject', '#subject')
        await helpers.typeText(page, "just a comment", '#comment')
        await helpers.click(page, 'input[type="submit"]')
    })

    it('should display success message', async () => {
        await helpers.shouldExist(page, '#feedback-title')
        await helpers.waitForText(page, 'body', 'Thank you for your comments')
    })
})

describe('Forgotten Password', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should load forgotten password form', async () => {
        await helpers.loadUrl(page, "http://zero.webappsecurity.com/forgot-password.html")
        await helpers.waitForText(page, "h3", "Forgotten Password")
    })

    it('should submit email', async () => {
        await helpers.typeText(page, utils.generateEmail(), "#user_email")
        await helpers.click(page, ".btn-primary")
    })

    it('should display success message', async () => {
        await helpers.waitForText(page, 'body', "Your password will be sent to the following email")
    })
})