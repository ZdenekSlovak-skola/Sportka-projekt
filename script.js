const sportkaForm = document.getElementById('sportkaForm');
const vysledekDiv = document.getElementById('vysledek');

sportkaForm.addEventListener('submit', function(e){
    e.preventDefault();

    try {

        let uzivCisla = [];

        for (let i = 1; i <= 6; i++) {

            let cislo = parseInt(sportkaForm['cislo' + i].value);

            if (isNaN(cislo) || cislo < 1 || cislo > 49) {
                throw `Číslo ${i} musí být mezi 1 a 49`;
            }

            if (uzivCisla.includes(cislo)) {
                throw `Číslo ${cislo} je duplicitní`;
            }

            uzivCisla.push(cislo);
        }

        let losovanaCisla = [];

        while (losovanaCisla.length < 6) {

            let rand = Math.floor(Math.random() * 49) + 1;

            if (!losovanaCisla.includes(rand)) {
                losovanaCisla.push(rand);
            }
        }

        let uhodnuta = uzivCisla.filter(num =>
            losovanaCisla.includes(num)
        );

        let pocetTref = uhodnuta.length;

        let vyhra = 0;

        switch(pocetTref) {

            case 3:
                vyhra = 100;
                break;

            case 4:
                vyhra = 5000;
                break;

            case 5:
                vyhra = 50000;
                break;

            case 6:
                vyhra = 1000000;
                break;

            default:
                vyhra = 0;
        }

        vysledekDiv.innerHTML = `
            <div class="vysledky-box">

                <h2>Výsledky losování</h2>

                <p><strong>Vaše čísla:</strong> ${uzivCisla.join(', ')}</p>

                <p><strong>Vylosovaná čísla:</strong> ${losovanaCisla.join(', ')}</p>

                <p><strong>Uhodnutá čísla:</strong>
                ${uhodnuta.length > 0 ? uhodnuta.join(', ') : 'žádná'}
                </p>

                <p><strong>Počet tref:</strong> ${pocetTref}</p>

                <h3 class="${vyhra > 0 ? 'vyhra' : 'prohra'}">
                    ${
            vyhra > 0
                ? `Vyhráváš ${vyhra.toLocaleString()} Kč!`
                : 'Tentokrát bez výhry.'
        }
                </h3>

            </div>
        `;

    } catch(err) {

        vysledekDiv.innerHTML = `
            <p style="color:red;">
                Chyba: ${err}
            </p>
        `;
    }
});