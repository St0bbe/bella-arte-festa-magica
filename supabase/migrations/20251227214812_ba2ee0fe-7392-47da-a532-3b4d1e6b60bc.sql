-- Add recurrence fields to appointments
ALTER TABLE public.appointments 
ADD COLUMN recurrence_type text DEFAULT NULL,
ADD COLUMN recurrence_end_date date DEFAULT NULL,
ADD COLUMN parent_appointment_id uuid DEFAULT NULL REFERENCES public.appointments(id) ON DELETE SET NULL,
ADD COLUMN estimated_value numeric DEFAULT 0;

-- Add index for parent appointments
CREATE INDEX idx_appointments_parent ON public.appointments(parent_appointment_id);

-- Add index for recurrence queries
CREATE INDEX idx_appointments_recurrence ON public.appointments(recurrence_type) WHERE recurrence_type IS NOT NULL;