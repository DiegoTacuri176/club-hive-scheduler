
import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { generateTimeSlots } from "@/lib/utils"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  label: string
  className?: string
  disabled?: boolean
  disabledTimes?: string[]
}

export function TimePicker({
  value,
  onChange,
  label,
  className,
  disabled = false,
  disabledTimes = []
}: TimePickerProps) {
  const timeSlots = generateTimeSlots()
  
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={`time-${label}`}>{label}</Label>
      <Select 
        value={value} 
        onValueChange={onChange} 
        disabled={disabled}
      >
        <SelectTrigger id={`time-${label}`} className="w-full">
          <Clock className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Seleccionar hora" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Horarios disponibles</SelectLabel>
            {timeSlots.map((slot) => (
              <SelectItem 
                key={slot.value} 
                value={slot.value}
                disabled={disabledTimes.includes(slot.value)}
              >
                {slot.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
