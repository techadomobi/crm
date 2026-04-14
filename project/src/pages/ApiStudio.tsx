import { useState } from 'react';
import ApiCatalogWorkspace from '../components/ApiCatalogWorkspace';
import SwaggerApiConsole from '../components/SwaggerApiConsole';

export default function ApiStudio() {
  const [studioSearch, setStudioSearch] = useState('');

  return (
    <div className="space-y-4 animate-fade-in -m-2 sm:-m-3">
      <p className="text-sm text-slate-600 max-w-3xl">
        Full-stack control surface for the OffersMeta v2 backend: every path from{' '}
        <code className="text-xs bg-slate-100 px-1 rounded">swagger.json</code> is listed, grouped by Swagger tag, and can be executed with the same JWT
        session as the rest of NexusCRM.
      </p>

      <ApiCatalogWorkspace onSelectEndpoint={setStudioSearch} />

      <SwaggerApiConsole embedded={false} initialSearch={studioSearch} />
    </div>
  );
}
