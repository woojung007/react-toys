import { Feature, Map } from 'ol';
import { FitOptions } from 'ol/View';

export function fitToFeature(
  olMap: Map,
  feature: Feature,
  fitOptions?: FitOptions
) {
  olMap.getView().fit(
    feature.getGeometry()!.getExtent(),
    fitOptions || {
      padding: [50, 50, 50, 50],
      duration: 1000,
    }
  );
}
