
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


const fruits = ["Açaí", "Ackee", "Apple","Apricot", "Avocado", "Bananas", "Bilberry", "Blackberry", "Blackcurrant ", "Blueberries", " Boysenberry", " Breadfruit", "Cactus pear ", "Cempedak ", "Currant ","Cherries", "Cherry", "Cherimoya", "Chico fruit ", "Cloudberry ", "Coco De Mer", " Coconut ", "Cranberries", "Damson ", "Date", " Dragonfruit", " Durian ", "Egg Fruit ", "Elderberry", "Feijoa ", "Fig", " Goji berry", " Gooseberry ", "Grape", " Grewia", " asiatica", " Raisin", " Grapefruit", " Guava Hala", "  Honeyberry", " Huckleberry", " Jabuticaba", "Jackfruit", " Jambul ", "Japanese plum ", "Jostaberry", " Jujube ", "Juniper berry", " Kiwano", "Kiwi", " Kumquat", "Lemon", "Lime", " Loganberry ", "Loquat", "Lychee", " Sapote", "Mango", " Mangosteen", " Marionberry", "Melon", " Cantaloupe", "Honeydew", " Watermelon", " Miracle fruit", "Mulberry", " Nectarine", "Orange", "Clementine","Mandarin", "Tangerine", " Papaya ", "Passionfruit ", "Peach", "Pear", "Persimmon", "Plantain", "Plum", "Prune", "Pineapple", " Pineberry", " Plumcot", "Pomegranate", "Pomelo", " Quince", "Raspberries","Raisin", "Salmonberry", "Rambutan ", "Redcurrant", "Satsuma", "Soursop ", "Strawberries", "Tamarillo", "Tamarind", "Tangelo", "Tayberry", "Tomato", "Ugli fruit","Watermelon", "Yuzu", ,"Peanut","Walnut","Brazil","Almond","Cashew","Pistachio","Nuts","Monkey", "Trail","Citrus"]

//function to turn three arrays into a single object
function zip(arg){
  return Object.entries(arg).reduce((acc,[k,arr]) => {
    arr.forEach((v,i)=> (acc[i] = acc[i] || {}) [k] =v);
    return acc;
  }, [])
}
function dynamicSort(property) {
  let sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }

  return function (a,b) {
      if(sortOrder == -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
  }
}
//start function uses puppeteer and cheerio packages
 const start = async() =>{
    const browser = await puppeteer.launch({
        headless: false,
        args:[
            '--start-fullscreen'
        ]
    })
    
    const page = await browser.newPage()

    await page.setViewport({width:1200, height: 1080})
    
    // below three lines use Cheerio to extract HTML from target page
    const res = await page.goto('https://www.waitrose.com/ecom/shop/browse/groceries/fresh_and_chilled/fresh_fruit')
    const text = await res.text()
    const found = text.includes('blueberries')

    //console.log(found)

    
    const $ = cheerio.load(text);

    //target specific Html returns as a single string. Use regex to format and separate words
    const fruitName = $('.nameWrapper___4c05X .name___CmYia').text().replace(/'+/g).replace(/([A-Z])/g, ' $1').replace(/\s{2,}/g, ' ').replace(/Cooksundefined/g,"").replace(/Mini Easy Peelers/,"Citrus").split(" ")

   //console.log(fruitName)
  
   //use regex to handle weight definitions for fruit i.e g for gram 
    const fruitWeight = $('.sizeMessage___NCDx_ ').text().replace(/6Typical/g,'6 Typical').replace(/6sTypical/g,'6s Typical').replace(/Typical weight/g, "").replace(/g/g, 'g ').replace(/h/g, 'h ').replace(/s/g, " ").replace(/64/,"6 4").replace(/66/,"6 6").replace(/6m/g,"6 m").replace(/61/,"6 1").replace(/6e/,"6 e").replace(/m /g,"m").replace(/n 6/g,"n6").replace(/\s{2,}/g, ' ').replace(/minimum65/g,"minimum6 5").split(" ").slice(1,-1)
    console.log(fruitWeight)
    //console.log(fruitWeight.length)
    
    
    //console.log( fruitName)

    let filtered = [];

// store html names of fruit into array
for(let i =0; i < fruitName.length; i++){
  for(let j = 0; j < fruits.length; j++){
    if(fruitName[i].indexOf(fruits[j]) > -1){
      filtered.push(fruitName[i])
     
    }
  }
}
//console.log(filtered)
//console.log(filtered.length)


    
    const fruitPrice = $('.prices___1JkR4 ').text().split("Item").slice(1);
    //console.log(fruitPrice);
    //console.log(fruitPrice.length)
    

    const result = zip({
      name: filtered,
      weight: fruitWeight,
      price: fruitPrice
    })

    //result.sort(dynamicSort("name"))
    result.forEach((item, i) => {
        item.id = i +1
      })
    //console.log(result)
    return result
}  /*
     function foo(){
    let mountains = [
       { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
       { name: "Monte Falterona", height: 1654, place: "Parco Casentinesi" },
       { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
       { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
       { name: "ragioano", height: 1738, place: "Parco Foreste Casentinesi" }
     ];
     return mountains
}
*/
//foo()
module.exports = {start}



//-------------------------------------------- below code is for scraping Ocado website for fruit name, weight and price--------------------------------------------------------------///
/*
async function start(){
  const browser = await puppeteer.launch({
      headless: false,
      args:[
          '--start-fullscreen'
      ]
  })
  
  const page = await browser.newPage()

  await page.setViewport({width:1200, height: 1080})
  
  
  const res = await page.goto('https://www.ocado.com/on-offer/fresh-20002/fruit-44490')

  
  const text = await res.text() 
  const found = text.includes('Lemons')
  //console.log(found)
  const $ = cheerio.load(text);
  
  
  const fruitName = $('.fop-title span').text().replace(/'+/g).replace(/([A-Z])/g, ' $1').replace(/\s{2,}/g, ' ').replace(/Buchananundefineds/g,"").split(" ")
  //console.log(fruitName)

  const fruitWeight = $('.fop-catch-weight').text().replace(/g1/g,"g,1").replace(/g2/g,"g,2").replace(/g3/g,"g,3").replace(/g4/g,"g,4").replace(/g5/g,"g,5").replace(/g6/g,"g,6").replace(/g7/g,"g,7").replace(/g8/g,"g,8").replace(/k1/g,"k,1").replace(/k2/g,"k,2").replace(/k3/g,"k,3").replace(/k4/g,"k,4").replace(/k5/g,"k,5").replace(/k6/g,"k,6").replace(/k8/g,"k,8").replace(/227g,6 per pack,4 per pack,/,"227g,6 per pack,4 per pack,each,").split(",")
  //console.log(fruitWeight)
  let filtered = [];

for(let i =0; i < fruitName.length; i++){
for(let j = 0; j < fruits.length; j++){
  if(fruitName[i].indexOf(fruits[j]) > -1){
    filtered.push(fruitName[i])
   
  }
}
}
//console.log(filtered)
//console.log(filtered.length)


  
  //const fruitPrice = $('.price-group-wrapper').text() //.split("Item").slice(1);
  const fruitPrice = $('.price-group-wrapper .fop-price').text().replace(/0£/g,"0,£").replace(/1£/g,"1,£").replace(/2£/g,"2,£").replace(/3£/g,"3,£").replace(/5£/g,"5,£").replace(/6£/g,"6,£").replace(/7£/g,"7,£").replace(/9£/g,"9,£").split(",")
  //console.log(fruitPrice);
  //console.log(fruitPrice.length)
  
  const result = zip({
    name: filtered,
    weight: fruitWeight,
    price: fruitPrice
  })

  //result.sort(dynamicSort("name"))
  result.forEach((item, i) => {
      item.id = i +1
    })
  console.log(result)
  
}
start()

*/