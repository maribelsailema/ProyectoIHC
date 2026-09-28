import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

// Nielsen #1: el esqueleto tiene la misma forma que el contenido final
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <p role="status" className="sr-only">
        Cargando resumen de actividad...
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} className="space-y-3">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-20" />
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Skeleton className="h-64 w-full" />
        </Card>
        <Card className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </Card>
      </div>
      <Card>
        <Skeleton className="h-56 w-full" />
      </Card>
    </div>
  );
}