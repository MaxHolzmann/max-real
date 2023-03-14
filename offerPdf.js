import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import {ToWords} from 'to-words';



async function modifyPdf() {
  
  const url = 'https://eforms.com/images/2018/07/Wisconsin-Residential-Offer-to-Purchase.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pdfFields = pdfDoc.getForm().getFields();

  pdfFields.map((field, i) => console.log({ name: field.getName(), i }))

  // const fields = [
  //   {name: "DATE", fields: [{
  //     field: pdfFields
  //   }]}
  // ]
  
  
  const pages = pdfDoc.getPages()
  //Pages Of Offer
  const firstPage = pages[0]
  const secondPage = pages[1]
  const thirdPage = pages[2]
  const fourthPage = pages[3]
  const fifthPage = pages[4]
  const sixthPage = pages[5]
  const seventhPage = pages[6]
  const eigthPage = pages[7]
  const ninthPage = pages[8]
  const finalPage = pages[9]

  //PDF Info & Settings
  const { width, height } = firstPage.getSize()
  const fontSize = 10;
  const smallerFontSize = 8;
  const textColor = rgb(0.95, 0.1, 0.1)

  const toWords = new ToWords({
    localeCode: 'en-US',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: true,
    }
  });

  /*
  const writeFirstPageOffer = () => {
  //Date Text
  firstPage.drawText('Date Here', {
    x: 230,
    y: 718,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  // Is Agent Of Line: 
  firstPage.drawLine({
    start: {x: 250, y: 690},
    end: {x: 260, y: 690},
    thickness: 2,
    color: rgb(0.75, 0.2, 0.2),
    opacity: 1
  })

  // Buyer Name
  firstPage.drawText('Buyer Name', {
    x: 90,
    y: 694,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  //Street Address
  firstPage.drawText('Street Address', {
    x: 296,
    y: 682,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  // City/County/Town
  firstPage.drawText('City', {
    x: 68,
    y: 659,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })


  // City / Town Name
  firstPage.drawText('Fond du Lac', {
    x: 244,
    y: 659,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  // County Name
  firstPage.drawText('Fond du Lac', {
    x: 55,
    y: 647,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  let purchasePriceNumber = 423456.99
  let purchasePriceWords = toWords.convert(purchasePriceNumber)

  //purchase price as words (add if statement for length..??)
  firstPage.drawText(`${purchasePriceWords}`, {
    x: 230,
    y: 623,
    size: 8,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  //purchase price number - add commas.
  firstPage.drawText(`${purchasePriceNumber}`, {
    x: 395,
    y: 610,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  // Included in Purchase Price - if statement if certain length - API Bounds
  firstPage.drawText('Included in Purchase Price', {
    x: 38,
    y: 570,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

   // NOT Included in Purchase Price - if statement if certain length - API Bounds
   firstPage.drawText('NOT Included in Purchase Price', {
    x: 38,
    y: 474,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  //Binding Acceptance
  firstPage.drawText('Binding Acceptance', {
    x: 94,
    y: 253,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })

  //Closing Date
  firstPage.drawText('Closing Dateee', {
    x: 38,
    y: 146,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  })
}

  const writeSecondPageOffer = () => {
    
    //Property Address
    secondPage.drawText('Property Address', {
      x: 96,
      y: 760,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    //Earnest Money with Offer
    secondPage.drawText('Earnest Money With Offer', {
      x: 157,
      y: 728,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    //Earnest Money Upon Offer Acceptance
    secondPage.drawText('Earnest Money With Acceptance', {
      x: 159,
      y: 706,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    //Earnest Money Upon Acceptance Days To Deliver
    secondPage.drawText('Days', {
      x: 169,
      y: 693,
      size: fontSize,
      font: helveticaFont,
      color: textColor,
    })

    // Cross Out Listing Firm
    secondPage.drawLine({
      start: {x: 250, y: 690},
      end: {x: 260, y: 690},
      thickness: 2,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 1
    })

    //Cross Out Drafting Firm
    secondPage.drawLine({
      start: {x: 250, y: 690},
      end: {x: 260, y: 690},
      thickness: 2,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 1
    })

    //Other Identified As Line for Holding of Earnest Money
    secondPage.drawText('Other Holding Earnest', {
      x: 38,
      y: 670,
      size: fontSize,
      font: helveticaFont,
      color: textColor,
    })




    secondPage.drawLine({
      start: {x: 250, y: 690},
      end: {x: 260, y: 690},
      thickness: 2,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 1
    })

    secondPage.drawLine({
      start: {x: 250, y: 690},
      end: {x: 260, y: 690},
      thickness: 2,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 1
    })

    secondPage.drawLine({
      start: {x: 250, y: 690},
      end: {x: 260, y: 690},
      thickness: 2,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 1
    })

    secondPage.drawLine({
      start: {x: 250, y: 690},
      end: {x: 260, y: 690},
      thickness: 2,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 1
    })

    secondPage.drawLine({
      start: {x: 250, y: 690},
      end: {x: 260, y: 690},
      thickness: 2,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 1
    })

    secondPage.drawText('Time Essence Additions', {
      x: 115,
      y: 331,
      size: smallerFontSize,
      font: helveticaFont,
      color: textColor,
    })

    // Real Estate Condition Report Date
    secondPage.drawText('RECR Date', {
      x: 228,
      y: 128,
      size: fontSize,
      font: helveticaFont,
      color: textColor,
    })

    // Insert Conditions Not Mentioned In Report -- ADD BOUNDS
    secondPage.drawText('Conditions Not In Report', {
      x: 38,
      y: 102,
      size: smallerFontSize,
      font: helveticaFont,
      color: textColor,
    })
  }

  const writeThirdPageOffer = () => {
    //Property Address
    thirdPage.drawText('Property Address', {
      x: 100,
      y: 770,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    })
  }

  const writeFourthPageOffer = () => {
    // Property Address
    fourthPage.drawText('Property Address', {
      x: 100,
      y: 767,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    //Home inspection contingency marking 
    fourthPage.drawText('X', {
      x: 42,
      y: 547,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // add extra to home contingency line
    fourthPage.drawText('Upon further line', {
      x: 110,
      y: 500,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    })

  }


  const writeFifthPageOffer = () => {
    
  }

  const writeSixthPageOffer = () => {
    
  }

  const writeSeventhPageOffer = () => {
    
  }

  const writeEigthPageOffer = () => {
    
  }

  const writeNinthPageOffer = () => {
    
  }

  const writeFinalPageOffer = () => {

  }



  //Write PDF
  writeFirstPageOffer();
  writeSecondPageOffer();
  writeThirdPageOffer();
  writeFourthPageOffer();
  writeFifthPageOffer();
  writeSixthPageOffer();
  writeSeventhPageOffer();
  writeEigthPageOffer();
  writeNinthPageOffer();
  writeFinalPageOffer();
*/ 

  fs.writeFileSync('offer.pdf', await pdfDoc.save())

}

modifyPdf();