function getRepos() {
    return new Promise(async (resolve, reject) => {
        const data = []
        await fetch('https://api.github.com/users/Alexis06030631/repos')
            .then(res => res.json())
            .then(async res => {
                for (const repo of res) {
                    await fetch(repo.url)
                        .then(res => res.json())
                        .then(res => {
                            data.push(res)
                        })
                }
            })
        resolve(data)
    })
}


async function addCards(){
    const example_card = document.getElementById('card_elem')
    const repos = await getRepos()

    for(const repo of repos) {
        // Create a clone of the card
        const card = example_card.cloneNode(true)
        console.log(repo)
        
        // Set the card's data
        card.querySelector('[title_card]').innerText = repo.name
        card.querySelector('[description_card]').innerText = repo.description
        card.querySelector('[avatar_card]').src = repo.owner.avatar_url
        card.querySelector('[author_card]').innerText = repo.owner.login
        card.querySelector('[date_card]').innerText = repo.updated_at

        
        // Add the card to the page
        document.getElementById('cards').appendChild(card)
    }
    
}

addCards().then()