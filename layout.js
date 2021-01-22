
const thing = require('./results');
/*
const yo = async () => {
 const result = await thing.foo()
 return result
}



module.exports = () => {
    let content = async () => {
         let ya = await yo()
         let cols = Object.keys(ya[0])
         console.log(cols)
         let rows = ya.map(row => {
            let tds = cols.map(col => `<td>${row[col]}`).join("");
            return `<tr>${tds}</tr>`
        }).join("");

         
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>hello</p>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Height</th>
                    <th>place</th>
                    
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>     
    </body>
    </html>
    `
    }
   
   content()
   
}

   */

  const grabData = async () => {
    const result = await thing.start()
    return result
   }
   
   let contentHtml = async () => {
    let ya = await grabData()
    let cols = Object.keys(ya[0])
    console.log("hello",cols)
    let rows = ya.map(row => {
       let tds = cols.map(col => `<td>${row[col]}`).join("");
       return `<tr>${tds}</tr>`
   }).join("");
   return rows
  }

    const generatehtml = async () =>{
   let result = await contentHtml()
   
   let job =  `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
   </head>
   <body>
       <p>hello</p>
       <table>
           <thead>
               <tr>
                   <th>Name</th>
                   <th>Weight</th>
                   <th>price</th>
                   
               </tr>
           </thead>
           <tbody>
               ${result}
           </tbody>
       </table>     
   </body>
   </html>
   `
   console.log(job)
   return job
    }

   generatehtml()
   
   module.exports = () => {
       
   return generatehtml()
            

      
   }
   
