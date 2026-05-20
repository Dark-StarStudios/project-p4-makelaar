import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  return (
  <div className="home-page m-4">
    <h1>Welkom bij de Makelaar App</h1>
    <p>Deze app is gebouwd met Next.js en Payload CMS.</p>
    <p>Payload CMS is een headless CMS dat gemakkelijk te integreren is met Next.js voor het bouwen van dynamische webapplicaties.</p>
    <p>Je kunt deze app gebruiken om vastgoedobjecten te beheren en weer te geven.</p>
    <p>Om aan de slag te gaan, ga naar de admin interface van Payload CMS:</p>
    <a href={`${config.serverURL}/admin`} className="admin-link">Ga naar Admin Interface</a>
  </div>
  )
}
