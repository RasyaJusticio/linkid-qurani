"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"

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
  heightClass?: string
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
  heightClass = "h-[200px]",
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(value || "")
  const [filteredItems, setFilteredItems] = React.useState(items)
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const [isKeyboardNavActive, setIsKeyboardNavActive] = React.useState(false)
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const refCallback = React.useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  const virtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => container,
    estimateSize: () => 35,
  })

  const virtualItems = virtualizer.getVirtualItems()

  const handleSearch = (term: string) => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredItems(filtered)
    setFocusedIndex(-1)
    setIsKeyboardNavActive(false)
    virtualizer.scrollToOffset(0)
  }

  const handleSelect = (val: string) => {
    const newVal = val === selected ? "" : val
    setSelected(newVal)
    onChange?.(newVal)
    setOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setIsKeyboardNavActive(true)
        setFocusedIndex((prev) => {
          const next = Math.min(prev + 1, filteredItems.length - 1)
          virtualizer.scrollToIndex(next, { align: "center" })
          return next
        })
        break
      case "ArrowUp":
        event.preventDefault()
        setIsKeyboardNavActive(true)
        setFocusedIndex((prev) => {
          const next = Math.max(prev - 1, 0)
          virtualizer.scrollToIndex(next, { align: "center" })
          return next
        })
        break
      case "Enter":
        event.preventDefault()
        if (filteredItems[focusedIndex]) {
          handleSelect(filteredItems[focusedIndex].value)
        }
        break
    }
  }

  React.useEffect(() => {
    if (value !== undefined) setSelected(value)
  }, [value])

  React.useEffect(() => {
    if (open) {
      virtualizer.measure();
    }
  }, [open, virtualizer]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combobox"
          role="combobox"
          aria-expanded={open}
          className={cn(widthClass, "justify-between group", className)}
        >
          {selected
            ? items.find((item) => item.value === selected)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0 group-hover:text-accent group-hover:opacity-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", widthClass)}>
        <Command shouldFilter={false} onKeyDown={handleKeyDown}>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9"
            onValueChange={handleSearch}
          />
          <CommandList
            ref={refCallback}
            className={heightClass}
            style={{ overflow: "auto" }}
            onMouseDown={() => setIsKeyboardNavActive(false)}
            onMouseMove={() => setIsKeyboardNavActive(false)}
          >
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {virtualItems.map((virtualRow) => {
                  const item = filteredItems[virtualRow.index]
                  return (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={handleSelect}
                      disabled={isKeyboardNavActive}
                      className={cn(
                        "absolute left-0 top-0 w-full bg-transparent",
                        focusedIndex === virtualRow.index &&
                          "bg-accent text-accent-foreground",
                        isKeyboardNavActive &&
                          focusedIndex !== virtualRow.index &&
                          "aria-selected:bg-transparent aria-selected:text-primary"
                      )}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      onMouseEnter={() =>
                        !isKeyboardNavActive && setFocusedIndex(virtualRow.index)
                      }
                      onMouseLeave={() =>
                        !isKeyboardNavActive && setFocusedIndex(-1)
                      }
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "text-accent-foreground ml-auto h-4 w-4",
                          selected === item.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  )
                })}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
