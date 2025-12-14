"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { SectionItem } from "./section-item"
import type { PageSection } from "@/lib/types"

interface Props {
    section: PageSection
    onEdit: () => void
    onDelete: () => void
    onToggleVisibility: () => void
}

export function SortableSectionItem(props: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: props.section.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={isDragging ? "opacity-50" : ""}
        >
            <SectionItem
                {...props}
                dragHandleProps={{ ...attributes, ...listeners }}
            />
        </div>
    )
}
