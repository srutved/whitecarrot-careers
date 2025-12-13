"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const presetColors = [
  "#0ea5e9",
  "#06b6d4",
  "#14b8a6",
  "#22c55e",
  "#84cc16",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#ec4899",
  "#a855f7",
  "#6366f1",
  "#3b82f6",
  "#64748b",
  "#1e293b",
  "#0f172a",
]

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 h-10 bg-transparent"
            aria-label={`Choose ${label}`}
          >
            <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: value }} />
            <span className="font-mono text-sm">{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="start">
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-md border border-border hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onChange(color)
                    setInputValue(color)
                  }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="font-mono text-sm"
                placeholder="#000000"
                aria-label="Custom color hex value"
              />
              <input
                type="color"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value)
                  setInputValue(e.target.value)
                }}
                className="w-10 h-10 rounded cursor-pointer border-0"
                aria-label="Color picker"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
