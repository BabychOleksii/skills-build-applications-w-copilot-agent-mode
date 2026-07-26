export default function ResourceState({ loading, error, items, emptyMessage, children }) {
  if (loading) {
    return <div className="alert alert-info">Loading…</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (items.length === 0) {
    return <div className="alert alert-secondary">{emptyMessage}</div>
  }

  return children
}
