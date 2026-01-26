
const fs = require('fs');
fetch('https://api-noticias-chi.vercel.app/api/v1/noticias/todas')
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('temp_data.json', JSON.stringify(data.slice(0, 3), null, 2));
    console.log('Data written');
  })
  .catch(err => console.error(err));
