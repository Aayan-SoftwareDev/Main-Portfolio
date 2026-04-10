import { useEffect, useState } from "react"
import api from "../lib/axios"
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.post("/admin/show")
      .then(res => {
        if (res.data.success) setMessages(res.data.messages)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const planClass = (plan) => {
    if (!plan) return "plan-custom"
    const p = plan.toLowerCase()
    if (p === "basic") return "plan-basic"
    if (p === "standard") return "plan-standard"
    if (p === "advance") return "plan-advance"
    return "plan-custom"
  }

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric"
    })

  const count = (plan) =>
    messages.filter(m => (m.plan || "").toLowerCase() === plan).length

  return (
    <div className="dashboard">
      <div className="dash-header">
        <h1>Admin dashboard</h1>
        <span>{messages.length} total messages</span>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="label">Total messages</div>
          <div className="value">{messages.length}</div>
        </div>
        <div className="stat">
          <div className="label">Basic plans</div>
          <div className="value">{count("basic")}</div>
        </div>
        <div className="stat">
          <div className="label">Standard plans</div>
          <div className="value">{count("standard")}</div>
        </div>
        <div className="stat">
          <div className="label">Advance plans</div>
          <div className="value">{count("advance")}</div>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Idea</th>
              <th>Custom solution</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="loading">Loading...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan="7" className="loading">No messages yet.</td></tr>
            ) : (
              messages.map(m => (
                <tr key={m._id}>
                  <td className="name-cell">{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.phone}</td>
                  <td>
                    <span className={`plan-badge ${planClass(m.plan)}`}>
                      {m.plan || "—"}
                    </span>
                  </td>
                  <td className="idea-cell">{m.idea || "—"}</td>
                  <td>{m.customSol || "—"}</td>
                  <td className="date-cell">{formatDate(m.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}