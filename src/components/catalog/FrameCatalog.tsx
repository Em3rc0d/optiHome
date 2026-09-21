"use client";
import { useState } from "react";
import { FrameCard } from "@/components/catalog/FrameCard";
import type { CatalogFrame } from "@/content/catalog";
export function FrameCatalog({ frames }: { frames: CatalogFrame[] }) {
  const [style, setStyle] = useState("Todos");
  const [color, setColor] = useState("Todos");
  const styles = ["Todos", ...new Set(frames.map((frame) => frame.style))];
  const colors = [...new Set(frames.map((frame) => frame.color))];
  const filtered = frames.filter(
    (frame) =>
      (style === "Todos" || frame.style === style) &&
      (color === "Todos" || frame.color === color),
  );
  function reset() {
    setStyle("Todos");
    setColor("Todos");
  }
  return (
    <>
      <h2 className="sr-only">Referencias de monturas</h2>
      <div className="catalog-filters">
        <fieldset className="style-filters">
          <legend className="sr-only">Filtrar por estilo</legend>
          {styles.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={style === item}
              onClick={() => setStyle(item)}
            >
              {item}
            </button>
          ))}
        </fieldset>
        <label className="color-filter" htmlFor="catalog-color">
          Color{" "}
          <select
            id="catalog-color"
            aria-label="Color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="Todos">Todos los colores</option>
            {colors.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="catalog-count">
        <p role="status">
          {filtered.length}{" "}
          {filtered.length === 1 ? "referencia" : "referencias"}
        </p>
        {(style !== "Todos" || color !== "Todos") && (
          <button type="button" onClick={reset}>
            Quitar filtros
          </button>
        )}
      </div>
      {filtered.length ? (
        <div className="frame-grid">
          {filtered.map((frame) => (
            <FrameCard key={frame.slug} frame={frame} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <h2>No hay referencias con esa combinación.</h2>
          <p>Prueba con otro color o vuelve a ver todos los estilos.</p>
          <button
            type="button"
            className="button button-outline"
            onClick={reset}
          >
            Ver todos los estilos
          </button>
        </div>
      )}
    </>
  );
}
