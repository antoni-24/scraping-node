var express = require('express');
const puppeteer = require("puppeteer");
const app = express();

app.get("/", async (req, res) => {
  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://reservas.machupicchu.gob.pe/inicio');
  await page.screenshot({path: 'mapi1.jpg'});

  //await page.type('#resAduGen', '6');
  await page.$eval('#fmGeneral #resAduGen', el => el.value = '4');
  await page.screenshot({path: 'mapi2.jpg'});

  //await page.click('#fmGeneral button');
  await page.evaluate(() => {
    document.querySelector('#fmGeneral button[type=submit]').click();
  });
  await page.waitForSelector('[id=fmRutaGeneral]');
  //await page.waitFor(5000);
  await page.screenshot({path: 'mapi3.jpg'});

  const data = await page.evaluate(() => {
  const elements = document.querySelector('#fmRutaGeneral .row');
    return elements.innerHTML;
  });
        
  await browser.close();
  
  res.contentType("text/plain");
  res.send(data);
});

app.listen(8080, () =>
  console.log("¡Aplicación de ejemplo escuchando en el puerto 8080!")
);