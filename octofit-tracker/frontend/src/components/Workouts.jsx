import { useApiCollection } from '../api'
import ResourceState from './ResourceState'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const WORKOUTS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const state = useApiCollection(WORKOUTS_ENDPOINT)

  return (
    <section>
      <h1>Workouts</h1>
      <p className="text-body-secondary mb-4">Personalized routines for every fitness level.</p>
      <ResourceState {...state} emptyMessage="No workouts found.">
        <div className="row g-3">
          {state.items.map((workout) => (
            <div className="col-lg-4 col-md-6" key={workout._id || workout.id || workout.name}>
              <article className="card workout-card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <span className="badge text-bg-success text-capitalize align-self-start mb-3">{workout.difficulty}</span>
                  <h2 className="h5 card-title">{workout.name}</h2>
                  <p className="card-text flex-grow-1">{workout.description}</p>
                  <strong>{workout.durationMinutes ?? workout.duration ?? '—'} minutes</strong>
                </div>
              </article>
            </div>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}
