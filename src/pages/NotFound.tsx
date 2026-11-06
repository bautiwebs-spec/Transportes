import { usePageMeta } from '../hooks/usePageMeta'
import { Label, wrap } from '../components/ui/Label'
import { Button } from '../components/ui/Button'

export function NotFound() {
  usePageMeta('Página no encontrada', 'La página que buscás no existe.')
  return (
    <section className="bg-smoke">
      <div className={`${wrap} py-28 lg:py-36`}>
        <Label>Error 404</Label>
        <h1 className="t-display mt-6 max-w-3xl text-graphite">Esta página no existe.</h1>
        <p className="t-lead mt-6 max-w-xl text-ink-soft">Puede que la dirección haya cambiado.</p>
        <div className="mt-10">
          <Button to="/" arrow>
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  )
}
