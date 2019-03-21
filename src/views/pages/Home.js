const getAllCryptos = async () => {
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
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, options);
            const json = await response.json();
            return json
        } catch (err) {
        console.log('Error: ', err)
    }
};

const Home = {

    render: async () => {
        const cryptos = await getAllCryptos();

        const view = `
            <section class="section">
                <table>
                    ${cryptos.data.map(crypto =>
                        `<tr>
                            <td class="name"><a href="/src/#/crypto/${crypto.id}">${crypto.name}</a> </td>
                            <td>${crypto.symbol}</td>
                            <td>${crypto.quote.USD.price}</td>
                            <td>${crypto.quote.USD.percent_change_24h}</td>
                        </tr>`
                        )}
                    </table>
                </section>
        `;
        return view
    }
};

export default Home;
