let repos = 0
let stars = 0
let forks = 0
let watchers = 0
let issues = 0
let pull_requests = 0
let commits = 0
let contributors = 0


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
                            console.log(res)
                            // Increment counters
                            repos += 1
                            stars += res.subscribers_count
                            forks += res.forks_count
                            watchers += res.watchers_count
                            //Add data to ids
                            document.getElementById('reposCount').innerHTML = repos
                            document.getElementById('starsCount').innerHTML = stars
                            document.getElementById('watchersCount').innerHTML = watchers
                            data.push(res)
                        })
                }
            })
        document.getElementById('reposCount').classList.remove('animate-pulse')
        document.getElementById('starsCount').classList.remove('animate-pulse')
        document.getElementById('watchersCount').classList.remove('animate-pulse')
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
        const date = new Date(repo.updated_at)
        card.querySelector('[date_card]').innerText = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
        card.querySelector('[commits_cards]').innerText = repo.default_branch

        // Set urls get a from children attribute
        card.querySelector('[title_card]').parentElement.href = repo.svn_url
        card.querySelector('[avatar_card]').parentElement.href = repo.owner.avatar_url
        card.querySelector('[author_card]').href = repo.owner.html_url

        repo.topics.forEach(topic => {
            const topic_elem = `<span class="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-slate-200 rounded-full border border-slate-800">
                                    <svg class="mr-1.5 h-2 w-2 brand-react" fill="currentColor" viewBox="0 0 8 8">
\t                                    <circle cx="4" cy="4" r="3"></circle>
                                    </svg>${topic}
                                </span>`
            card.querySelector('[tags]').innerHTML += (topic_elem)
        })


        // Add the card to the page
        document.getElementById('cards').appendChild(card)
    }



}

addCards().then()