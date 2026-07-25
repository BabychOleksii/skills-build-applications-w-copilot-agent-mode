import { useApiCollection } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const ACTIVITIES_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function label(value) {
  if (value && typeof value === 'object') return value.name || value.username || 'Unknown'
  return value || '—'
}

export default function Activities() {
  const state = useApiCollection(ACTIVITIES_ENDPOINT)

  return (
    <section>
      <h1>Activities</h1>
      <p className="text-body-secondary mb-4">Recent movement logged by OctoFit students.</p>
      <ResourceState {...state} emptyMessage="No activities found.">
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead><tr><th>User</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Date</th></tr></thead>
            <tbody>
              {state.items.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{label(activity.user)}</td>
                  <td className="text-capitalize">{activity.type}</td>
                  <td>{activity.durationMinutes ?? activity.duration ?? '—'} min</td>
                  <td>{activity.distanceKilometers ?? activity.distance ?? 0} km</td>
                  <td>{activity.activityDate || activity.date ? new Date(activity.activityDate || activity.date).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}
