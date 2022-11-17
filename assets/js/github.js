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
    repos.sort((a, b) => b?.description?.length - a?.description?.length)


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

        // Set urls get a from children attribute
        card.querySelector('[title_card]').href = repo.svn_url
        card.querySelector('[avatar_card]').parentElement.href = repo.owner.avatar_url
        card.querySelector('[author_card]').href = repo.owner.html_url

        // reorganize topics by char length
        repo.topics.sort((a, b) => b.length - a.length)
        repo.topics.forEach(topic => {
            const topic_elem = `<span class="inline-block px-2 py-1 leading-none bg-gray-700 text-slate-200 rounded-full font-semibold uppercase tracking-wide text-xs mr-2">${topic}</span>`
            card.querySelector('[tags]').innerHTML += (topic_elem)
        })


        // Add the card to the page
        document.getElementById('cards').appendChild(card)
    }

    // Remove the example card
    example_card.remove()
    document.getElementById('projects_loader').remove()
    document.getElementById('loader_anim').classList.remove('animate-pulse')



}

addCards().then()