interface Props { members: string[] }

export function TeamSection({ members }: Props) {
  return <section className="team-section page-shell" aria-labelledby="team-title">
    <div className="team-heading">
      <span className="eyebrow">Trabajo universitario</span>
      <h2 id="team-title">Equipo LÚMERA</h2>
      <p>Integrantes del proyecto de Legislación Multimedia.</p>
    </div>
    <div className="team-grid">
      {members.map((member) => <div className="team-member" key={member}><span className="team-avatar">{member.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span><span>{member}</span></div>)}
    </div>
  </section>
}
