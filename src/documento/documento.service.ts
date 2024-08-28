import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Handlebars from 'handlebars';
import puppeteer, { Browser } from 'puppeteer';

@Injectable()
export class DocumentoService implements OnModuleInit, OnModuleDestroy {

  private browser: Browser;

  constructor() {}
  
  async onModuleInit() {
      console.log('lanzando chrome')
      this.browser = await puppeteer.launch();
      console.log('browser iniciado', this.browser);
  }
  
  async onModuleDestroy() {
    console.log('destruyendo module')
    await this.browser.close();
  }
  

  async getDocumento(id: string) {
    
    const htmlTemplate = `
    <h1 style="font-family: sans-serif">Documento de prueba</h1>
    <div style="height: 40px; width: 100px; border: 1px solid red; border-radius: 10px;"></div>
    <p style="font-weight: 600; background-color: whitesmoke; color: salmon; padding: 10px;">Dato inyectado a plantilla: 
      <span style="font-family: sans-serif;color: skyblue; font-weight: 900">{{id}}</span>
    </p>
    `
    
    const compiledTemplate = Handlebars.compile(htmlTemplate);
    const html = compiledTemplate({ id });
    console.log('html generado', html);
    
    let page = await this.browser.newPage();
    console.log('pagina generada', page)
    await page.setContent(html, {
      waitUntil: 'load'
    })
    console.log('contenido seteado', page)
    
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true
    });
    console.log('pdfbuffer', buffer)
    
    page.close();
    
    return buffer;
  }
}
