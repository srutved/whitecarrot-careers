"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

type JobType = "full-time" | "part-time" | "remote" | "contract"

interface Props {
    companyId: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function CreateJobDialog({
    companyId,
    open,
    onOpenChange,
    onSuccess
}: Props) {
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        title: "",
        location: "",
        type: "full-time" as JobType,
        department: "",
        description: "",
        requirements: ""
    })

    const createJob = async () => {
        setLoading(true)

        const res = await fetch("/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                companyId,
                requirements: form.requirements
                    .split("\n")
                    .map(r => r.trim())
                    .filter(Boolean)
            })
        })

        setLoading(false)

        if (res.ok) {
            onSuccess()
            onOpenChange(false)
        } else {
            alert("Failed to create job")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create new job</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Job title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                    />

                    <Input
                        placeholder="Location"
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                    />

                    <Select
                        value={form.type}
                        onValueChange={value =>
                            setForm({ ...form, type: value as JobType })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Department"
                        value={form.department}
                        onChange={e => setForm({ ...form, department: e.target.value })}
                    />

                    <Textarea
                        placeholder="Job description"
                        rows={4}
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                    />

                    <Textarea
                        placeholder="Requirements (one per line)"
                        rows={3}
                        value={form.requirements}
                        onChange={e => setForm({ ...form, requirements: e.target.value })}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={createJob} disabled={loading}>
                        {loading ? "Creating..." : "Create Job"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
