import React, { useEffect, useState } from 'react'

import api from './services/api'
import './styles.css'

function App() {
    const [repositories, setRepositories] = useState([])
    
    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data)
        })
    }, [])

    async function handleAddRepository() {
        const response = await api.post('repositories', { 
            title: 'Novo Repositório ' + Date.now(),
            url: 'http://github.com/...',
            techs: ['Node.js', '...']
        })

        const repository = response.data
        setRepositories([ ... repositories, repository ])
    }

    async function handleRemoveRepository(id) {
        const response = await api.delete(`repositories/${id}`)

        repositories.splice(repositories.findIndex(repository => { return repository.id === id }), 1)
        setRepositories([ ... repositories ])
    }

    return (
        <div>
        <ul data-testid='repository-list'>
            {
                repositories.map(repo => {
                    return (
                        <li key={ repo.id }>
                            { repo.title }        
                            <button onClick={() => handleRemoveRepository(repo.id)}>
                                Remover
                            </button>
                        </li>
                    )
                })
            }
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    )
}

export default App
