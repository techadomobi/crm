import { BookOpenText, Cpu, Layers3, ListChecks } from 'lucide-react';
import { NavPage } from '../types';
import { useApiModuleWorkbenchConfig } from '../hooks/useApiModuleWorkbenchConfig';
import ModuleFunctionalityPanel from '../components/ModuleFunctionalityPanel';

interface ApiModuleWorkbenchProps {
  activePage: NavPage;
}

export default function ApiModuleWorkbench({ activePage }: ApiModuleWorkbenchProps) {
  const config = useApiModuleWorkbenchConfig(activePage);

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <Layers3 size={14} />
              {activePage}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{config.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{config.subtitle}</p>
          </div>
          <a
            href="https://apiv2.offersmeta.in/API-docs/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800"
          >
            <BookOpenText size={14} />
            Open Swagger Docs
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <ListChecks size={14} className="text-cyan-700" />
          Capabilities
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {config.capabilities.map((capability) => (
            <div key={capability} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-sm text-slate-700">{capability}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Cpu size={14} className="text-cyan-700" />
          Module functionality
        </div>
        <ModuleFunctionalityPanel activePage={activePage} />
      </section>
    </div>
  );
}
