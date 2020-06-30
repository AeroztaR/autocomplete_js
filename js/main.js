const search = document.getElementById('search');
const match = document.getElementById('match');

const searchStates = async searchTxt => {
    const res = await fetch('../data/world-cities_json.json');
    const states = await res.json();

    let matches = states.filter(state => {
        const regEx = new RegExp(`^${searchTxt}`, 'gi');

        return state.name.match(regEx);
    });

    if (searchTxt.length === 0) {
        matches = [];
        match.innerHTML = '';
    }

    outputRes(matches);
}

const outputRes = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body my-2">
                <h4>${match.name}, ${match.country}, ${match.subcountry}</h4>
            </div>
        `)
        .join('');

        match.innerHTML = html;
    }
};

search.addEventListener('input', () => {
    searchStates(search.value);
});