import type { Feature, Geometry } from 'geojson'
import { memo } from 'react'
import { ComposableMap, Geographies, ZoomableGroup } from 'react-simple-maps'

import { cn } from '@/utils/cn.ts'
import countries from '@/data/countries.json'
import Country from './Country.tsx'

export interface MapFeatureProperties {
  name: string
}

export interface MapFeature extends Feature<Geometry, MapFeatureProperties> {
  rsmKey: string
  svgPath: string
}

const PROJECTION = 'geoMercator'
const MAX_ZOOM = 3
const MIN_ZOOM = 1

const Map = () => {
  return (
    <ComposableMap projection={PROJECTION} className={cn('flex-1')}>
      <ZoomableGroup maxZoom={MAX_ZOOM} minZoom={MIN_ZOOM} center={[0, 0]}>
        <Geographies geography={countries}>
          {({ geographies }) =>
            geographies.map((feature: MapFeature) => (
              <Country key={feature.rsmKey} feature={feature} />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default memo(Map)
