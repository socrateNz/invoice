"use client";

import { useEffect, useRef, useState } from "react";
import { Pen, Type, Eraser } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Mode = "draw" | "type";

interface SignaturePadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSign: (dataUrl: string) => void;
}

const CANVAS_WIDTH = 460;
const CANVAS_HEIGHT = 180;

export default function SignaturePad({ open, onOpenChange, title, onSign }: SignaturePadProps) {
  const [mode, setMode] = useState<Mode>("draw");
  const [typedName, setTypedName] = useState("");
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Reset the pad each time it's (re)opened for a fresh signature.
  useEffect(() => {
    if (!open) return;
    setMode("draw");
    setTypedName("");
    setHasDrawn(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [open]);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastPointRef.current = getPoint(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const last = lastPointRef.current;
    if (!canvas || !ctx || !last) return;

    const point = getPoint(e);
    const mid = { x: (last.x + point.x) / 2, y: (last.y + point.y) / 2 };
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2.25;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.quadraticCurveTo(last.x, last.y, mid.x, mid.y);
    ctx.stroke();

    lastPointRef.current = point;
    setHasDrawn(true);
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const resolvedCursiveFont = () => {
    if (measureRef.current) return getComputedStyle(measureRef.current).fontFamily;
    return "cursive";
  };

  const rasterizeTypedName = async () => {
    const family = resolvedCursiveFont();
    try {
      await document.fonts.load(`64px ${family}`);
    } catch {
      // best-effort — falls back to the browser default cursive font if the webfont isn't ready
    }

    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d")!;
    ctx.font = `64px ${family}`;
    ctx.fillStyle = "#111827";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(typedName.trim(), canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL("image/png");
  };

  const handleValidate = async () => {
    if (mode === "draw") {
      if (!hasDrawn || !canvasRef.current) {
        toast.error("Dessinez votre signature avant de valider.");
        return;
      }
      onSign(canvasRef.current.toDataURL("image/png"));
    } else {
      if (!typedName.trim()) {
        toast.error("Saisissez votre nom avant de valider.");
        return;
      }
      onSign(await rasterizeTypedName());
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Hidden node used purely to resolve the Caveat CSS variable to a concrete font-family string for canvas rendering. */}
        <span ref={measureRef} style={{ fontFamily: "var(--font-caveat)", position: "absolute", visibility: "hidden" }}>_</span>

        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setMode("draw")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === "draw" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            <Pen size={13} /> Dessiner
          </button>
          <button
            type="button"
            onClick={() => setMode("type")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === "type" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            <Type size={13} /> Taper
          </button>
        </div>

        {mode === "draw" ? (
          <div className="space-y-2">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full touch-none rounded-lg border-2 border-dashed border-gray-300 bg-white cursor-crosshair"
              style={{ height: CANVAS_HEIGHT }}
            />
            <button
              type="button"
              onClick={clearCanvas}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              <Eraser size={13} /> Effacer
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="Votre nom"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div
              className="w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white text-4xl text-gray-900"
              style={{ height: CANVAS_HEIGHT, fontFamily: "var(--font-caveat)" }}
            >
              {typedName.trim() || <span className="text-base text-gray-300 font-sans">Aperçu de la signature</span>}
            </div>
          </div>
        )}

        <DialogFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleValidate}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Valider la signature
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
