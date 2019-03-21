import Utils        from './../../services/Utils.js'

const getCrypto = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': 'd0b1a255-475d-40cb-83be-321c0cfd81c1',
            'Accept': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
        }
    };

   try {
       // had to do something to fix the cors errors...
       const response = await fetch(`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=` + id, options);
       const json = await response.json();
       return json
   } catch (err) {
       console.log('Error: ', err)
   }
};

const Crypto = {

    render : async () => {
        const request = Utils.parseRequestURL();
        const crypto = await getCrypto(request.id);

        const currentCrypto = crypto.data[request.id];

        console.log(currentCrypto);
        
        return `
            <section class="section">
                        <ul>
                            <li>${currentCrypto.id}</li>
                            <li><img src="${currentCrypto.logo}" alt=""></li>
                            <li>${currentCrypto.name}</li>
                            <li>${currentCrypto.slug}</li>
                            <li>${currentCrypto.symbol}</li>
                            <li>${currentCrypto.category}</li>
                            <li>${currentCrypto.date_added }</li>
                            <li>${currentCrypto.description}</li>
                            <li>${currentCrypto.platform}</li>
                            
                        </ul>
             </section>
        `
    }
};

export default Crypto;
