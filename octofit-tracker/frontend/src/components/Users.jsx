import { useApiCollection } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const USERS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const state = useApiCollection(USERS_ENDPOINT)

  return (
    <section>
      <h1>Users</h1>
      <p className="text-body-secondary mb-4">Student profiles participating in OctoFit.</p>
      <ResourceState {...state} emptyMessage="No users found.">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr><th>Name</th><th>Email</th><th>Age</th></tr></thead>
            <tbody>
              {state.items.map((user) => (
                <tr key={user._id || user.id || user.email}>
                  <td>{user.name || user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.age ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}
