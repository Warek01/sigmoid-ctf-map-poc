import { GeoJSON, type GeoJSONProps, MapContainer } from 'react-leaflet'
import type { Feature, GeoJsonObject } from 'geojson'
import type { Map as LeafletMap, PathOptions, StyleFunction } from 'leaflet'
import type { Task } from '@/types/task'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

import { cn } from '@/utils/cn.ts'
// countries-<percentage of detail>.json
import countriesJson from '@/data/countries-5.json'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts'
import { selectTasks } from '@/slices/task.slice.ts'
import {
  selectCountry,
  selectSelectedCountry,
} from '@/slices/ui-state.slice.ts'

interface FeatureProperties {
  // full country name
  ADMIN: string
  // 2-letter name
  ISO_A2: string
  // 3-letter name
  ISO_A3: string
}

interface MapRef {
  enable: () => void
  disable: () => void
}

interface Props {
  width?: string
  height?: string
  className?: string
}

const countries = countriesJson as GeoJsonObject

const sharedStyle: PathOptions = {
  opacity: 1,
  stroke: true,
  fillOpacity: 100,
}

const countryStyle: PathOptions = {
  ...sharedStyle,
  weight: 1,
  color: '#777777',
  fillColor: 'rgba(62, 99, 221, 0.5)',
}

const countryStyleComplete: PathOptions = {
  ...sharedStyle,
  weight: 1,
  color: '#777777',
  fillColor: '#777777',
}

const countryStyleHover: PathOptions = {
  ...sharedStyle,
  weight: 2,
  color: '#FFFFFF',
  fillColor: 'rgb(62, 99, 221)',
}

const countryStyleSelected: PathOptions = {
  ...countryStyleHover,
}

const Map = forwardRef<MapRef, Props>((props, ref) => {
  const { height, width, className } = props
  const tasks = useAppSelector(selectTasks)
  const selectedCountry = useAppSelector(selectSelectedCountry)
  const dispatch = useAppDispatch()
  const disabled = !!selectedCountry
  const mapRef = useRef<LeafletMap>(null)

  // returns the task associated with a feature
  const findFeatureTask = (feature: Feature): Task | null => {
    const properties = feature.properties as FeatureProperties
    return tasks.find((t) => t.country === properties.ADMIN) ?? null
  }

  const mapStyleToFeature: StyleFunction = (feature) => {
    const task = findFeatureTask(feature!)

    if (task?.country === selectedCountry) {
      return countryStyleSelected
    }
    if (task?.completed) {
      return countryStyleComplete
    }

    return countryStyle
  }

  // a feature in our case is a country from file
  const handleOnEachFeature: GeoJSONProps['onEachFeature'] = (
    feature,
    layer,
  ) => {
    const task = findFeatureTask(feature)
    layer.on({
      mouseover: (e) => {
        if (selectedCountry || disabled || task?.completed) {
          return
        }
        e.target.setStyle(countryStyleHover)
      },
      mouseout: (e) => {
        e.target.setStyle(mapStyleToFeature(feature))
      },
      click: (e) => {
        if (!disabled && task) {
          dispatch(selectCountry(task.country))
        }
      },
    })
  }

  const disableMap = () => {
    if (!mapRef.current) {
      return
    }

    const { boxZoom, touchZoom, scrollWheelZoom } = mapRef.current
    boxZoom.disable()
    touchZoom.disable()
    scrollWheelZoom.disable()
  }

  const enableMap = () => {
    if (!mapRef.current) {
      return
    }

    const { boxZoom, touchZoom, scrollWheelZoom } = mapRef.current
    boxZoom.enable()
    touchZoom.enable()
    scrollWheelZoom.enable()
  }

  useEffect(() => {
    disabled ? disableMap() : enableMap()
  }, [disabled])

  // disable map on need from somewhere else
  useImperativeHandle(
    ref,
    () => ({
      enable: enableMap,
      disable: disableMap,
    }),
    [enableMap, disableMap],
  )

  return (
    <MapContainer
      style={{ width, height, background: 'transparent' }}
      className={cn('inline-block', className)}
      ref={mapRef}
      center={[0, 0]}
      zoom={3}
      maxZoom={5}
      minZoom={2}
      zoomAnimation={true}
      fadeAnimation={true}
      markerZoomAnimation={true}
      doubleClickZoom={false}
      attributionControl={false}
      zoomControl={false}
      dragging={!disabled}
      maxBounds={[
        [-85, -180],
        [85, 180],
      ]}
      maxBoundsViscosity={1.0}
    >
      <GeoJSON
        // random key is mandatory since component doesn't update on props change
        key={Math.random()}
        data={countries}
        style={mapStyleToFeature}
        onEachFeature={handleOnEachFeature}
      />
    </MapContainer>
  )
})

export default memo(Map)
