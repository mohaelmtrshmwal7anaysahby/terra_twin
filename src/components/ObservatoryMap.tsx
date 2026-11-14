import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { EarthAnalogSite, LocaleCode, ThemeMode } from '../types/terratwin';

export type MapLayerMode = 'standard' | 'satellite' | 'topographic';

interface ObservatoryMapProps {
  sites: EarthAnalogSite[];
  selectedSiteId: string;
  onSelectSite: (id: string) => void;
  theme: ThemeMode;
  locale: LocaleCode;
  mapLayer?: MapLayerMode;
}

export const ObservatoryMap: React.FC<ObservatoryMapProps> = ({
  sites,
  selectedSiteId,
  onSelectSite,
  theme,
  locale,
  mapLayer = 'standard',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const lastFlownSiteRef = useRef<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, {
      center: [22, -20],
      zoom: 2,
      minZoom: 2,
      maxZoom: 14,
      zoomControl: true,
      worldCopyJump: true,
    });

    const markersGroup = L.layerGroup().addTo(map);
    mapRef.current = map;
    markersLayerRef.current = markersGroup;

    // Ensure Leaflet recalculates viewport dimensions after route animations & resizes
    const invalidate = () => {
      map.invalidateSize({ animate: false });
    };
    const rafId = requestAnimationFrame(invalidate);
    const timerId = window.setTimeout(invalidate, 280);

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            invalidate();
          })
        : null;
    observer?.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
      observer?.disconnect();
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
      markersLayerRef.current = null;
      lastFlownSiteRef.current = null;
    };
  }, []);

  // Theme & scientific layer-adaptive tiles (100% free, no API key required)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const layerGroup = L.layerGroup();

    if (mapLayer === 'satellite') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Imagery &copy; Esri, Earthstar Geographics',
          maxNativeZoom: 18,
          maxZoom: 18,
          zIndex: 1,
        }
      ).addTo(layerGroup);

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        {
          maxNativeZoom: 18,
          maxZoom: 18,
          zIndex: 2,
        }
      ).addTo(layerGroup);
    } else if (mapLayer === 'topographic') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Esri, USGS, NOAA',
          maxNativeZoom: 18,
          maxZoom: 18,
          zIndex: 1,
        }
      ).addTo(layerGroup);
    } else {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ',
          maxNativeZoom: 18,
          maxZoom: 18,
          zIndex: 1,
        }
      ).addTo(layerGroup);
    }

    layerGroup.addTo(map);
    tileLayerRef.current = layerGroup;
    map.invalidateSize({ animate: false });
  }, [theme, mapLayer]);

  // Render interactive markers
  useEffect(() => {
    const map = mapRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    sites.forEach((site) => {
      const isSelected = site.id === selectedSiteId;
      const accent =
        site.primaryTwin === 'mars'
          ? '#D96B43'
          : site.primaryTwin === 'moon'
          ? '#94A3B8'
          : '#2A9D9F';

      const iconHtml = `
        <div style="position:relative;width:30px;height:30px;display:flex;align-items:center;justify-content:center;">
          <span style="
            position:absolute;
            width:${isSelected ? '28px' : '18px'};
            height:${isSelected ? '28px' : '18px'};
            border-radius:9999px;
            background:${accent};
            opacity:${isSelected ? '0.32' : '0.18'};
            transition:all 0.2s ease;
          "></span>
          <span style="
            width:${isSelected ? '14px' : '10px'};
            height:${isSelected ? '14px' : '10px'};
            border-radius:9999px;
            background:${isSelected ? '#2FD1D3' : accent};
            border:2px solid #F7F8FA;
            box-shadow:0 2px 8px rgba(0,0,0,0.55);
          "></span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'terratwin-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([site.coordinates.lat, site.coordinates.lng], {
        icon: customIcon,
        title: site.name[locale],
      });

      marker.bindTooltip(site.name[locale], {
        direction: 'top',
        offset: [0, -10],
      });

      marker.on('click', () => {
        onSelectSite(site.id);
      });

      marker.addTo(markersGroup);
    });
  }, [sites, selectedSiteId, onSelectSite, locale]);

  // Smoothly pan to selected site only when selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedSiteId || lastFlownSiteRef.current === selectedSiteId) return;

    const selected = sites.find((s) => s.id === selectedSiteId);
    if (selected) {
      lastFlownSiteRef.current = selectedSiteId;
      map.flyTo([selected.coordinates.lat, selected.coordinates.lng], 4, {
        duration: 0.75,
      });
    }
  }, [sites, selectedSiteId]);

  const useDarkTacticalFilter = theme === 'dark' && mapLayer === 'standard';

  return (
    <div
      className={`relative w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[600px] lg:flex-1 rounded-xl overflow-hidden border border-[#101B2B]/12 dark:border-[#2FD1D3]/22 bg-[#E6EBF1] dark:bg-[#05080F] ${
        useDarkTacticalFilter ? 'tt-map-dark-filter' : ''
      }`}
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10" />
    </div>
  );
};
