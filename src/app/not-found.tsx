import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-cloud-white py-24">
      <Container className="text-center">
        <p className="font-mono text-sm text-brand-blue">404</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-midnight">Page not found</h1>
        <p className="mt-3 text-body">The page you requested does not exist or was moved.</p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
