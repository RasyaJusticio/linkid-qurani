"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type ComboBoxItem = {
  value: string
  label: string
}

interface ComboBoxProps {
  items: ComboBoxItem[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
  widthClass?: string
}

export function ComboBox({
  items,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No item found.",
  className,
  value,
  onChange,
  widthClass = "w-[200px]",
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(value || "")

  const handleSelect = (val: string) => {
    const newVal = val === selected ? "" : val
    setSelected(newVal)
    onChange?.(newVal)
    setOpen(false)
  }

  React.useEffect(() => {
    if (value !== undefined) setSelected(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(widthClass, "justify-between group", className)}
        >
          {selected
            ? items.find((item) => item.value === selected)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0 group-hover:text-success-medium group-hover:opacity-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", widthClass)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
