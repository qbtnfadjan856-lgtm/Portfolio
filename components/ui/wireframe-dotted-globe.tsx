"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type LandFeature = GeoJSON.Feature<GeoJSON.Geometry, { [key: string]: unknown }>;

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingEarth({
  width = 620,
  height = 520,
  className = "",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let active = true;
    let frame = 0;
    let animationId = 0;
    let features: LandFeature[] = [];
    let dots: [number, number][] = [];
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let rotation: [number, number, number] = [0, -8, 0];
    let autoRotate = true;
    let scale = 1;

    const projection = d3.geoOrthographic().clipAngle(90).rotate(rotation);
    const path = d3.geoPath(projection, context);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(240, Math.min(width, rect.width || width));
      const h = Math.min(height, Math.max(260, window.innerHeight * 0.72));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(w, h) * 0.39;
      projection.scale(scale).translate([w / 2, h / 2]);
      draw(w, h);
    };

    const draw = (w: number, h: number) => {
      if (!active) return;
      context.clearRect(0, 0, w, h);
      const center: [number, number] = [w / 2, h / 2];
      const radius = projection.scale();
      context.save();
      context.beginPath();
      context.arc(center[0], center[1], radius, 0, Math.PI * 2);
      const ocean = context.createRadialGradient(center[0] - radius * .34, center[1] - radius * .4, 1, center[0], center[1], radius * 1.2);
      ocean.addColorStop(0, "#102d52");
      ocean.addColorStop(.6, "#071629");
      ocean.addColorStop(1, "#030711");
      context.fillStyle = ocean;
      context.fill();
      context.strokeStyle = "rgba(82,170,255,.8)";
      context.lineWidth = 1;
      context.stroke();

      const graticule = d3.geoGraticule10();
      context.beginPath();
      path(graticule);
      context.strokeStyle = "rgba(105,174,245,.18)";
      context.lineWidth = .6;
      context.stroke();

      context.beginPath();
      features.forEach((feature) => path(feature));
      context.strokeStyle = "rgba(80,164,255,.48)";
      context.lineWidth = .7;
      context.stroke();

      for (const point of dots) {
        const projected = projection(point);
        if (!projected) continue;
        context.beginPath();
        context.arc(projected[0], projected[1], 1.05, 0, Math.PI * 2);
        context.fillStyle = "rgba(125,190,255,.92)";
        context.fill();
      }
      context.restore();
    };

    const animate = () => {
      if (!active) return;
      if (autoRotate && !dragging) {
        rotation = [rotation[0] + .11, rotation[1], rotation[2]];
        projection.rotate(rotation);
        const rect = canvas.getBoundingClientRect();
        draw(Math.max(240, Math.min(width, rect.width || width)), Math.min(height, Math.max(260, window.innerHeight * .72)));
      }
      animationId = window.requestAnimationFrame(animate);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      autoRotate = false;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      rotation = [rotation[0] + (event.clientX - lastX) * .35, Math.max(-75, Math.min(75, rotation[1] - (event.clientY - lastY) * .35)), rotation[2]];
      lastX = event.clientX;
      lastY = event.clientY;
      projection.rotate(rotation);
      const rect = canvas.getBoundingClientRect();
      draw(Math.max(240, Math.min(width, rect.width || width)), Math.min(height, Math.max(260, window.innerHeight * .72)));
    };
    const onPointerUp = () => {
      dragging = false;
      autoRotate = true;
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      projection.scale(Math.max(scale * .72, Math.min(scale * 1.24, projection.scale() * (event.deltaY > 0 ? .96 : 1.04))));
      const rect = canvas.getBoundingClientRect();
      draw(Math.max(240, Math.min(width, rect.width || width)), Math.min(height, Math.max(260, window.innerHeight * .72)));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const load = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json");
        if (!response.ok) throw new Error("Could not load land data");
        const geo = (await response.json()) as GeoJSON.FeatureCollection<GeoJSON.Geometry, { [key: string]: unknown }>;
        if (!active) return;
        features = geo.features as LandFeature[];
        for (let lat = -82; lat <= 82; lat += 3.2) {
          for (let lng = -180; lng < 180; lng += 3.2) {
            const point: [number, number] = [lng, lat];
            if (features.some((feature) => d3.geoContains(feature, point))) dots.push(point);
          }
        }
        resize();
        animationId = window.requestAnimationFrame(animate);
      } catch {
        if (active) setError(true);
      }
    };

    resize();
    void load();

    return () => {
      active = false;
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [width, height]);

  return (
    <div className={`rotating-earth ${className}`} aria-label="Globo terrestre pontilhado animado">
      <canvas ref={canvasRef} role="img" aria-label="Globo terrestre em pontos azuis, girando lentamente" />
      {error && <div className="globe-error">Visualização indisponível no momento.</div>}
      <span className="globe-caption">INTERFACES SEM FRONTEIRAS <i /> DIGITAL EM MOVIMENTO</span>
    </div>
  );
}
