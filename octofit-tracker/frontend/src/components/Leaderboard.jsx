import { useApiCollection } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const LEADERBOARD_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function label(value) {
  if (value && typeof value === 'object') return value.name || value.username || 'Unknown'
  return value || '—'
}

export default function Leaderboard() {
  const state = useApiCollection(LEADERBOARD_ENDPOINT)

  return (
    <section>
      <h1>Leaderboard</h1>
      <p className="text-body-secondary mb-4">Friendly competition ranked by total points.</p>
      <ResourceState {...state} emptyMessage="No leaderboard entries found.">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr><th>Rank</th><th>User</th><th>Team</th><th>Points</th></tr></thead>
            <tbody>
              {state.items.map((entry, index) => (
                <tr key={entry._id || entry.id || index}>
                  <td><span className="rank">#{entry.rank ?? index + 1}</span></td>
                  <td>{label(entry.user)}</td>
                  <td>{label(entry.team)}</td>
                  <td>{entry.totalPoints ?? entry.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}
