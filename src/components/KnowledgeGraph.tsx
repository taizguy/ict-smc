import React from 'react';
import { SpatialConceptGraph } from './SpatialConceptGraph';
import { ConceptTree } from './ConceptTree';
export interface KnowledgeGraphProps {
  initialViewMode?: 'pipeline' | 'network';
  initialStep?: number;
  initialNodeId?: string;
  onSelectConcept: (id: string) => void;
  onNavigateUrl?: (url: string) => void;
}
export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = () => (
  <div className="space-y-6">
    <SpatialConceptGraph />
    <details className="ct-legacy">
      <summary>Accessible text tree and concept links</summary>
      <ConceptTree />
    </details>
  </div>
);
