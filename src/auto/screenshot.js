const puppeteer = require("puppeteer")
const { 
    DataHora,
    sleep
} = require("../functions/functions")

// const run = async () => {
//     try {

//         await screeshot()

//     } catch (error) {

//         return false;

//     }
// }
// run()

async function screenshot() {
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ], headless: true, ignoreHTTPSErrors: true
        });
        const page = await browser.newPage();
        await page.setCacheEnabled(false);

        page.on('error', msg => {
            browser.close();
            throw msg;
        });

        console.info('[' + DataHora() + '] [NAV]: Efetuando redirecionamento para a url...');
        let navigation = await page.goto("https://github.com/login")
            .then(async (success) => {

                await sleep(3000);

                await page.setViewport({
                    width: 1900,
                    height: 1080
                })

                console.info(`[${DataHora()}] [NAV]: User!`);
                const login = await page.$x('//*[@id="login_field"]');
                await login[0].type("daniel199257@gmail.com");

                console.info(`[${DataHora()}] [NAV]: Key!`);
                const password = await page.$x('//*[@id="password"]');
                await password[0].type("Dan549216895");

                await page.keyboard.press(String.fromCharCode(13));

                await sleep(10000);

                let cache = await page.screenshot({
                    path: "image.png",
                    fullPage: true,
                });

                await sleep(5000);

                console.info(`[${DataHora()}] [NAV]: Finalizando navegacao!`);
                await page.close();
                await browser.close();

            }).catch(async (error) => {

                console.info(`[${DataHora()}][ERRO]<thenCatch> Houve um erro ${error.message}`);
                await page.close();
                await browser.close();
                return false;

            })

            return true;

    } catch (error) {
        console.info(`[${DataHora()}][ERRO]<tryCatch> Houve um erro ${error.message}`);
        return false;
    }

}



module.exports = {
    screenshot
}
