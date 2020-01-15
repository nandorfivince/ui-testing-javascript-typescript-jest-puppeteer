const puppeteer = require('puppeteer')
const expect = require('chai')
const config = require('../../lib/config')
const helpers = require('../../lib/helpers')
const utils = require('../../lib/utils')
const homePage = require('../../page-objects/home-page')
const loginPage = require('../../page-objects/login-page')
const searchResultsPage = require('../../page-objects/searchResults-page')
const feedbackPage = require('../../page-objects/feedback-page')
const feedbackResultsPage = require('../../page-objects/feedbackResults-page')
const assert = require('chai').assert

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
        await helpers.typeText(page, utils.generateID(), loginPage.USER_NAME)
        await helpers.typeText(page, utils.generateID(), loginPage.USER_PASSWORD)
        await helpers.click(page, loginPage.SUBMIT_BUTTON)
    })

    it('should get error message', async () => {
        // await helpers.waitForText(page, 'div.container form#login_form.form-horizontal .alert-error.alert', text)
        const element = await page.$("div.container form#login_form.form-horizontal .alert-error.alert")
        const text = await page.evaluate(element => element.textContent, element)
        let newString = text.replace(/\s+/g|/\n|\r/g,' ').trim()
        assert.include(newString, "Login and/or password are wrong.")
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
        // await helpers.waitForText(page, searchResultsPage.SEARCH_RESULTS, 'Search Results:')
        const element = await page.$(searchResultsPage.SEARCH_RESULTS)
        const text = await page.evaluate(element => element.textContent, element)
        assert.include(text, "Search Results:")

        // await helpers.waitForText(page, searchResultsPage.SEARCH_RESULTS_CONTENT, 'No results were found for the query')
        const element2 = await page.$(searchResultsPage.SEARCH_RESULTS_CONTENT)
        const text2 = await page.evaluate(element2 => element2.textContent, element2)
        assert.include(text2, "No results were found for the query")
    })
})

describe('Navbar Links Test', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should have correct number of links', async () => {
        const numberOfLinks = await helpers.getCount('div#online_banking_features.divider.row div.span3')
        expect(numberOfLinks).to.equal(4)
    })
})

describe('Navbar Links Test', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should click on feedback link', async () => {
        await helpers.click(page, homePage.LINK_FEEDBACK)
        await helpers.shouldExist(page, feedbackPage.FEEDBACK_FORM)
    })

    it('should submit the feedback form', async () => {
        await helpers.typeText(page, 'Vince', feedbackPage.FORM_NAME)
        await helpers.typeText(page, utils.generateEmail(), feedbackPage.FORM_EMAIL)
        await helpers.typeText(page, 'Just Subject', feedbackPage.FORM_SUBJECT)
        await helpers.typeText(page, "just a comment", feedbackPage.FORM_COMMENT)
        await helpers.click(page, feedbackPage.FORM_SUBMIT_BUTTON)
    })

    it('should display success message', async () => {
        await helpers.shouldExist(page, feedbackResultsPage.FEEDBACK_RESULTS_TITLE)
        // await helpers.waitForText(page, feedbackResultsPage.FEEDBACK_RESULTS_CONTENT, 'Thank you for your comments')
        const element = await page.$(searchResultsPage.SEARCH_RESULTS_CONTENT)
        const text = await page.evaluate(element => element.textContent, element)
        assert.include(text, "Thank you for your comments")
    })
})

describe('Forgotten Password', () => {
    it('should navigate to homepage', async () => {
        await helpers.loadUrl(page, config.zeroWebAppUrl)
        await helpers.shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('should load forgotten password form', async () => {
        await helpers.loadUrl(page, "http://zero.webappsecurity.com/forgot-password.html")
        // await helpers.waitForText(page, "h3", "Forgotten Password")
        const element = await page.$("body > div.wrapper > div.container > div > div > div > div > h3")
        const text = await page.evaluate(element => element.textContent, element)
        assert.include(text, "Forgotten Password")
    })

    it('should submit email', async () => {
        await helpers.typeText(page, utils.generateEmail(), "#user_email")
        await helpers.click(page, "#send_password_form > div.form-actions > input")
    })

    it('should display success message', async () => {
        // await helpers.waitForText(page, 'body', "Your password will be sent to the following email")
        const element = await page.$("body > div.wrapper > div.container > div > div > div")
        const text2 = await page.evaluate(element => element.textContent, element)
        assert.include(text2, "Your password will be sent to the following email")
    })
})