import { useApiCollection } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const TEAMS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const state = useApiCollection(TEAMS_ENDPOINT)

  return (
    <section>
      <h1>Teams</h1>
      <p className="text-body-secondary mb-4">Groups building healthy habits together.</p>
      <ResourceState {...state} emptyMessage="No teams found.">
        <div className="row g-3">
          {state.items.map((team) => (
            <div className="col-md-6" key={team._id || team.id || team.name}>
              <article className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5 card-title">{team.name}</h2>
                  <p className="card-text">{team.description}</p>
                  <span className="badge text-bg-primary">
                    {Array.isArray(team.members) ? team.members.length : 0} members
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}
