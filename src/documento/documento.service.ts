import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Handlebars from 'handlebars';
import puppeteer, { Browser } from 'puppeteer';

@Injectable()
export class DocumentoService implements OnModuleInit, OnModuleDestroy {

  private browser: Browser;

  constructor() {}
  
  async onModuleInit() {
      console.log('lanzando chrome')
      this.browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      console.log('browser iniciado', this.browser);
  }
  
  async onModuleDestroy() {
    console.log('destruyendo module')
    await this.browser.close();
  }
  

  async getDocumento(id: string) {
    
    const htmlTemplate = `
    <html>
  <head>
    <meta content="text/html; charset=UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <style type="text/css">
      .tinos-regular {
        font-family: "Tinos", serif;
        font-weight: 400;
        font-style: normal;
      }

      .tinos-bold {
        font-family: "Tinos", serif;
        font-weight: 700;
        font-style: normal;
      }

      .tinos-regular-italic {
        font-family: "Tinos", serif;
        font-weight: 400;
        font-style: italic;
      }

      .tinos-bold-italic {
        font-family: "Tinos", serif;
        font-weight: 700;
        font-style: italic;
      }


      body{
        text-align: justify;
        margin-left: 48pt;
        padding-right: 60pt;
        font-size: 11pt;
        font-family: "Tinos", Arial;
        line-height: 1.3;
      }

      .c22 {
        padding-top: 10.6pt;
      }

      .c9 {
        padding-top: 35.1pt;
        text-indent: 0.2pt;

      }

      .c3 { 
        padding-top: 0.6pt;
      }

      .c1 {
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-style: normal
      }

      .c14 {
        padding-top: 10.5pt;
      }

      .c8 {
        padding-top: 10.7pt;
      }

      .c13 {
        padding-top: 10.6pt;
        text-align: left;
      }

      .c21 {
        padding-top: 15.2pt;
      }

      .c7 {
        padding-top: 10.6pt;
        padding-bottom: 0pt;
      }

      .c18 {
        padding-top: 10.7pt;
      }

      .c11 {
        margin-left: 20pt;
        padding-top: 39.8pt;
        padding-bottom: 0pt;
        text-align: center;
        margin-right: 14.6pt
      }

      .c4 {
        padding-top: 2pt;
        padding-bottom: 0pt;
        line-height: 1.9;
        margin-right: 54.3pt
      }

      .c17 {
        padding-top: 10.5pt;
        text-indent: 36pt;
        padding-bottom: 0pt;
        line-height: 1.0;
        margin-right: 3pt
      }

      .c20 {
        padding-top: 2.2pt;
        line-height: 1.9;
        text-align: left;
        margin-right: 47.3pt
      }

      .c19 {
        padding-top: 40pt;
        line-height: 1.0;
        text-align: right;
        margin-right: 2.6pt
      }

      .c15 {
        padding-top: 0pt;
        line-height: 1.0;
        text-align: left
      }

      .c16 {
        color: #000000;
        text-decoration: none;
        vertical-align: baseline;
        font-style: italic
      }

      .c6 {
        font-weight: 400;
        text-decoration: none;
        font-family: "Arial"
      }

      .c12 {
        max-width: 425pt;
        padding-left: 5%;
      }

      .c5 {
        vertical-align: baseline;
        font-style: normal;
        font-weight: bold;
        text-decoration-line: underline;
      }

      p {
        margin: 0;
      }
      .sub{
        border-bottom: 1px solid black;
      }

    </style>
  </head>
  <body class="c12">
    <p class="c15">
      <span style="overflow: hidden; display: inline-block;    width: 146.87px; height: 73.60px;">
        <img alt="" src="https://www.clinicauandes.cl/assets-new-home/images/logo-header.svg" style="width: 146.87px; height: 73.60px;" title="">
      </span>
    </p>
    <p class="c11">
      <span class="c5">MANDATO ESPECIAL IRREVOCABLE PARA TR&Aacute;MITE DE PAGO DIRECTO ISAPRES Y/O SEGUROS</span>
    </p>

    <div class="c9">
      <span class="c1">Por este acto, y con el objeto de facilitar el pago de cualquier obligaci&oacute;n devengada 
        y/o suma de dinero que el mandante adeude a Universidad de los Andes, espec&iacute;ficamente a su hospital 
        cl&iacute;nico (la &ldquo;Cl&iacute;nica&rdquo;) y que diga relaci&oacute;n con las prestaciones de salud 
        debidamente valorizadas de acuerdo con los convenios vigentes, de cualquier naturaleza que me haya otorgado 
        a m&iacute; &nbsp;o &nbsp;a </span>
        <div style="display: flex;">
          <p class="sub" style="width: 376px;">{{paciente.nombres}}&nbsp;{{paciente.apellidoPaterno}}&nbsp;{{paciente.apellidoMaterno}}</p>
        <span>
          a quien represento en calidad de
        </span>
        </div>
        <div style="display: flex;">
          <p class="sub" style="width: 250px;">{{paciente.parentescoFamiliar}}</p>
          <span style="width: 100%;text-align: justify; ">
            , por concepto de hospitalizaciones, prestaciones ambulatorias, por 
          </span>
        </div>
        <span>
          concepto de hospitalizaciones, prestaciones ambulatorias, farmacia,
          ex&aacute;menes, consultas, tratamientos, honorarios m&eacute;dicos , generados durante su permanencia 
          en la Cl&iacute;nica, incluyendo las prestaciones m&eacute;dicas otorgadas a reci&eacute;n nacido,
          otorgo mandato especial <i>e irrevocable</i>, pero tan amplio como en derecho corresponda, 
          a UNIVERSIDAD DE LOS ANDES para que, en mi 
        </span>
        <div style="display: flex;">
          <span>nombre y representaci&oacute;n, pueda concurrir ante</span>
          <p class="sub" style="width: 290px;">&nbsp; {{aseguradora.seguroConvenio}}</p>
        </div>
        
        
        , as&iacute; como ante cualquier Compa&ntilde;&iacute;a de Seguro y/o ISAPRE, con todas las facultades necesarias
        para activar la cobertura de salud previsional o de seguros de salud, sean estos complementarios,
        de alto costo, urgencias, accidentes personales u otros y, en su caso, gestionar el reembolso de
        las prestaciones recibidas en la Cl&iacute;nica. El mandante confiere expresamente las facultades 
        de cobrar y percibir los dineros correspondientes a la cobertura por las atenciones otorgadas en 
        la Cl&iacute;nica, e instruye que dichos fondos sean aplicados al pago de las respectivas prestaciones.
        Al efecto, confiere al apoderado todas las facultades necesarias para el eficaz y correcto desempe&ntilde;o
        de su mandato, incluso la de firmar los documentos, recibos y resguardos que se le exijan y, en general, 
        lo faculta para que proceda a efectuar todos los tr&aacute;mites que sean precisos para el cumplido &eacute;xito
        del cometido. 
        </span>
      </div>

    <p class="c7">
      <span class="c1">El mandato autoriza expresamente a UNIVERSIDAD DE LOS ANDES, para entregar a las aseguradoras y/o Instituciones de Salud Previsional informaci&oacute;n sobre las atenciones de salud prestadas por la Cl&iacute;nica cuya cobertura se requiera, en lo que sea estrictamente necesarios para el otorgamiento de la cobertura, as&iacute; como tambi&eacute;n gestionar informes con m&eacute;dicos tratantes. </span>
    </p>
    <p class="c18">
      <span class="c1">La Universidad de los Andes ejecutar&aacute; el presente mandato y representar&aacute; al mandante a trav&eacute;s de cualquier de sus apoderados a quienes se confiera la facultad de actuar en nombre de la Universidad para el cumplimiento de mandatos otorgados por terceros.</span>
    </p>
    <p class="c8">
      <span class="c1">El mandatario rendir&aacute; cuenta de su gesti&oacute;n entregando al paciente informaci&oacute;n 
        sobre la cobertura brindada por la Compa&ntilde;&iacute;a de Seguro y/o ISAPRE respectiva y su aplicaci&oacute;n 
        en pago de las respectivas prestaciones debidamente valorizadas de acuerdo con los convenios vigentes, una vez 
        gestionado y efectivamente percibido que sea el pago desde la ISAPRE y /o Compa&ntilde;&iacute;a de Seguros, en 
        su caso. Desde que sea ejecutado el encargo, el Paciente tendr&aacute; 6 meses para requerir a la Cl&iacute;nica 
        cuenta del presente mandato, transcurrido ese plazo, se entender&aacute; para todos los efectos que el mandante 
        da por aprobada &iacute;ntegramente las gestiones realizadas por el mandatario. </span>
    </p>
    <p class="c8">
      <span class="c1">El mandato tendr&aacute; una duraci&oacute;n de doce meses, contado desde su otorgamiento.</span>
    </p>
    <p class="15" style="padding-top: 50pt; padding-bottom: 10pt;">
      <span style="overflow: hidden; display: inline-block; width: 146.87px; height: 73.60px;">
        <img alt="" src="https://www.clinicauandes.cl/assets-new-home/images/logo-header.svg" style="width: 146.87px; height: 73.60px;" title="">
      </span>
    </p>
    <div class="c21" style="text-align: justify;">
      <span class="c1">
        Junto con el mandato conferido a la Cl&iacute;nica, en este acto, y de conformidad a 
        lo establecido en 
      </span>
    </div>
    <div style="display: flex;">
      <span>la letra b) del art&iacute;culo 13 de la Ley 20.584, autorizo expresamente y confiero poder a</span>
      <p class="sub" style="width: 65px;"></p>
    </div>

      <div style="display: flex; justify-content: end;">
        <p class="sub" style="width: 340px;">{{aseguradora.seguroConvenio}}</p>
        <span>
           &nbsp;para solicitar a la Cl&iacute;nica informaci&oacute;n
        </span>
      </div>
      <div style="display: flex;;">
        <span>contenida en mi ficha cl&iacute;nica o en la de: </span>
        <p class="sub" style="width: 330px;">&nbsp; {{paciente.nombres}}&nbsp;</p>
      </div>
      <div style="display: flex;">
        <span>, a quien represento en mi calidad de</span>
        <p class="sub" style="width: 260px;">&nbsp; {{paciente.parentescoFamiliar}}</p>
        <span> para efectos de</span>

      </div>
      obtener la cobertura que corresponda por las atenciones recibidas en ese prestador. </span>
    </p>
    <p class="c22">
      <span class="c1">Las aseguradoras y/o Instituciones de Salud Previsional pueden solicitar informaci&oacute;n o antecedentes adicionales para dar curso a la liquidaci&oacute;n del evento, pudiendo objetar la liquidaci&oacute;n por diversos motivos tales como coberturas no otorgadas, preexistencia, t&eacute;rmino de vigencia del asegurado en la p&oacute;liza, solicitud de antecedentes cl&iacute;nicos, cartolas de Gastos de Salud de la Isapre, etc. En estos casos, los antecedentes ser&aacute;n devueltos, con la indicaci&oacute;n expresa de que debe ser el paciente quien presente los gastos e informaci&oacute;n adicional requerida. </span>
    </p>
    <p class="c14">
      <span class="c1">Si lo anterior ocurre, la Cl&iacute;nica proceder&aacute; a emitir la totalidad del copago al paciente, conforme los procedimientos establecidos, lo que se comunicar&aacute; oportunamente con el fin de que se acerque a pagar y retirar su cuenta para ser presentada por usted en su aseguradoras y/o Instituciones de Salud Previsional. </span>
    </p>
    <p class="c13">
      <span class="c1">Faculto expresamente a Universidad de los Andes en su Cl&iacute;nica y a sus filiales, para gestionar la autorizaci&oacute;n notarial de la firma del suscrito.</span>
    </p>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Nombre paciente: <p class="sub" style="width: 300px; margin-left: 60px;">{{paciente.nombres}} &nbsp; {{paciente.apellidoMaterno}} &nbsp; {{paciente.apellidoPaterno}}</p></span>
    </div>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Rut paciente: <p class="sub" style="width: 300px; margin-left: 87px;">{{paciente.rut}}</p></span>
    </div>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Nombre Titular ISAPRE: <p class="sub" style="width: 300px; margin-left: 17px;">{{aseguradora.nombreTitularIsapre}}</p></span>
    </div>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Rut Titular ISAPRE: <p class="sub" style="width: 300px; margin-left: 44px;">{{aseguradora.rutTitularIsapre}}</p></span>
    </div>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Nombre Titular SEGURO: <p class="sub" style="width: 300px; margin-left: 9px;">{{aseguradora.nombreTitularSeguro}}</p></span>
    </div>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Rut Titular SEGURO: <p class="sub" style="width: 300px; margin-left: 35px;">{{aseguradora.rutTitularSeguro}}</p></span>
    </div>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Firma titular: <p class="sub" style="width: 300px; margin-left: 87px;"></p></span>
    </div>
    <div style="padding-top: 20px;">
      <span style="display: flex;">Episodio: <p class="sub" style="width: 300px; margin-left: 107px;">{{episodio.numEpisodio}}</p></span>
    </div>
    <div style="padding-top: 20px;" >
      <span style="display: flex; justify-content: end;">
        Santiago, 
        <p class="sub" style="width: 50px;">&nbsp; {{dia}}</p>
        ,
        <p class="sub" style="width: 120px;">&nbsp; {{mes}}</p>
        ,
        <p class="sub" style="width: 50px;">&nbsp; {{anio}}</p>
      </span>
    </div>
  </body>
</html>
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
