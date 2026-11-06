import { usePageMeta } from '../hooks/usePageMeta'
import { Container, Eyebrow } from '../components/ui/Layout'
import { Button } from '../components/ui/Button'

export function NotFound() {
  usePageMeta('Página no encontrada', 'La página que buscás no existe.')
  return (
    <section className="bg-mist pt-[calc(76px+5rem)] pb-28 lg:pt-[calc(88px+7rem)]">
      <Container>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="t-display mt-6 max-w-3xl text-graphite">Este camino no lleva a ningún lado.</h1>
        <p className="t-lead mt-6 max-w-xl text-ink-soft">La página que buscás no existe o cambió de dirección.</p>
        <div className="mt-10">
          <Button to="/" arrow>
            Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  )
}
