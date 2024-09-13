const pots = {
    pot1: [
        { name: "France", country: "France" },
        { name: "Germany", country: "Germany" },
        { name: "Spain", country: "Spain" },
        { name: "Portugal", country: "Portugal" },
        { name: "England", country: "England" },
        { name: "Belgium", country: "Belgium" }
    ],
    pot2: [
        { name: "Italy", country: "Italy" },
        { name: "Netherlands", country: "Netherlands" },
        { name: "Switzerland", country: "Switzerland" },
        { name: "Denmark", country: "Denmark" },
        { name: "Croatia", country: "Croatia" },
        { name: "Poland", country: "Poland" }
    ],
    pot3: [
        { name: "Sweden", country: "Sweden" },
        { name: "Slovakia", country: "Slovakia" },
        { name: "Slovenia", country: "Slovenia" },
        { name: "Ukraine", country: "Ukraine" },
        { name: "BiH", country: "BiH" },
        { name: "Serbia", country: "Serbia" }
    ], 
    pot4: [
        { name: "Turkey", country: "Turkey" },
        { name: "Scotland", country: "Scotland" },
        { name: "Greece", country: "Greece" },
        { name: "Czech", country: "Czech" },
        { name: "Austria", country: "Austria" },
        { name: "Iceland", country: "Iceland" }
    ]
};

function drawGroups() {
    const groups = {
        A: [], B: [], C: [], D: [], E: [], F: []
    };

    const potKeys = Object.keys(pots);

    potKeys.forEach(pot => {
        const shuffledTeams = shuffleArray([...pots[pot]]);
        Object.keys(groups).forEach((group, index) => {
            let teamAdded = false;
            while (!teamAdded) {
                const team = shuffledTeams.pop();
                if (canAddTeam(groups[group], team)) {
                    groups[group].push(team);
                    teamAdded = true;
                } else {
                    shuffledTeams.unshift(team);
                }
            }
        });
    });

    displayGroups(groups);
}

function canAddTeam(group, team) {
    const countryCount = group.reduce((acc, t) => {
        acc[t.country] = (acc[t.country] || 0) + 1;
        return acc;
    }, {});

    if (countryCount[team.country] >= 1) {
        return false;
    }
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayGroups(groups) {
    const groupsContainer = document.getElementById('groups');
    groupsContainer.innerHTML = '';

    Object.keys(groups).forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';

        const groupTitle = document.createElement('h2');
        groupTitle.textContent = `Group ${group}`;
        groupDiv.appendChild(groupTitle);

        const teamsList = document.createElement('ul');
        groups[group].forEach(team => {
            const teamItem = document.createElement('li');
            teamItem.className = 'team';
            teamItem.textContent = team.name;
            teamsList.appendChild(teamItem);
        });
        groupDiv.appendChild(teamsList);
        groupsContainer.appendChild(groupDiv);
    });
}
